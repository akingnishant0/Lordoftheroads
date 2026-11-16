import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { addLeadNote, CurrentUserContext } from "@/services/leadService";
import { Role } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    if (!body.content || !body.content.trim()) {
      return NextResponse.json(
        { error: "Note content cannot be empty" },
        { status: 400 }
      );
    }

    const userContext: CurrentUserContext = {
      id: session.user.id,
      role: session.user.role as Role,
      officeId: (session.user as any).officeId,
    };

    const note = await addLeadNote(id, body.content, userContext);
    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/leads/[id]/notes error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add note" },
      { status: 500 }
    );
  }
}
