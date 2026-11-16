import { NextRequest, NextResponse } from "next/server";
import { JustdialAdapter } from "@/adapters/justdialAdapter";
import { getIntegrationConfig, logWebhookEvent } from "@/services/webhookLogger";
import { createLead } from "@/services/leadService";

const jd = new JustdialAdapter();

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let rawBody = "";
  let payload: any = {};

  try {
    rawBody = await req.text();
    try {
      payload = JSON.parse(rawBody);
    } catch {
      payload = { email_body: rawBody };
    }
  } catch (err) {
    payload = {};
  }

  const config = (await getIntegrationConfig("JUSTDIAL")) || {
    platform: "JUSTDIAL",
    isEnabled: true,
  };

  if (!config.isEnabled) {
    await logWebhookEvent({
      platform: "JUSTDIAL",
      endpoint: "/api/webhooks/justdial",
      payload,
      status: "DISABLED",
      errorMessage: "Justdial integration is disabled in Admin Settings",
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ message: "Integration disabled" }, { status: 200 });
  }

  const verification = await jd.verifyRequest(req, rawBody, config);
  if (!verification.isValid) {
    await logWebhookEvent({
      platform: "JUSTDIAL",
      endpoint: "/api/webhooks/justdial",
      payload,
      status: "SIGNATURE_INVALID",
      errorMessage: verification.error,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: verification.error }, { status: verification.statusCode || 401 });
  }

  try {
    const parseResult = await jd.parsePayload(payload, config, rawBody);
    const createdLeads: any[] = [];

    for (const leadInput of parseResult.leads) {
      const result = await createLead(leadInput);
      createdLeads.push(result);
    }

    const firstLead = createdLeads[0];
    const status = firstLead?.isDuplicate ? "DUPLICATE_IGNORED" : "SUCCESS";

    await logWebhookEvent({
      platform: "JUSTDIAL",
      endpoint: "/api/webhooks/justdial",
      payload,
      status,
      leadId: firstLead?.lead?.id || null,
      processedIn: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      processed: createdLeads.length,
      leads: createdLeads.map((r) => ({
        leadNumber: r.lead.leadNumber,
        isDuplicate: r.isDuplicate,
      })),
    });
  } catch (err: any) {
    console.error("Justdial webhook processing error:", err);
    await logWebhookEvent({
      platform: "JUSTDIAL",
      endpoint: "/api/webhooks/justdial",
      payload,
      status: "FAILED",
      errorMessage: err.message,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
