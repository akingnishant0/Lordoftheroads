import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PartnerAdapter } from "@/adapters/partnerAdapter";
import { createLead } from "@/services/leadService";
import { Role, LeadSource } from "@prisma/client";

const partner = new PartnerAdapter();

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as Role;
    if (role !== Role.SUPER_ADMIN && role !== Role.OFFICE_ADMIN && role !== Role.AGENT) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";
    let csvText = "";
    let source: LeadSource = LeadSource.CSV_IMPORT;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const srcParam = formData.get("source") as string | null;

      if (!file) {
        return NextResponse.json({ error: "No CSV file provided in upload" }, { status: 400 });
      }

      csvText = await file.text();
      if (srcParam && Object.values(LeadSource).includes(srcParam as LeadSource)) {
        source = srcParam as LeadSource;
      }
    } else {
      const body = await req.json();
      csvText = body.csvText || "";
      if (body.source) source = body.source;
    }

    if (!csvText || !csvText.trim()) {
      return NextResponse.json({ error: "CSV content is empty" }, { status: 400 });
    }

    // Parse CSV rows into leads
    const parsedLeads = partner.parseCsvLeads(csvText, source);
    if (parsedLeads.length === 0) {
      return NextResponse.json(
        { error: "No valid lead rows found in CSV. Please verify column headers (Name, Phone, etc.)." },
        { status: 400 }
      );
    }

    let importedCount = 0;
    let duplicateCount = 0;
    const errors: string[] = [];
    const createdResults: any[] = [];

    for (const leadInput of parsedLeads) {
      try {
        const result = await createLead({
          ...leadInput,
          createdById: session.user.id,
          source,
        });

        if (result.isDuplicate) {
          duplicateCount++;
        } else {
          importedCount++;
        }
        createdResults.push(result);
      } catch (err: any) {
        errors.push(`Row for ${leadInput.name} (${leadInput.phone}): ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      totalRows: parsedLeads.length,
      imported: importedCount,
      duplicates: duplicateCount,
      failed: errors.length,
      sampleLeads: createdResults.slice(0, 5).map((r) => ({
        leadNumber: r.lead.leadNumber,
        name: r.lead.name,
        phone: r.lead.phone,
        office: r.lead.office?.name || "Unassigned",
        isDuplicate: r.isDuplicate,
      })),
      errors: errors.slice(0, 5),
    });
  } catch (err: any) {
    console.error("CSV Import error:", err);
    return NextResponse.json({ error: err.message || "Failed to process CSV" }, { status: 500 });
  }
}
