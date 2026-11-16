import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAdapter } from "@/adapters";
import { getIntegrationConfig } from "@/services/webhookLogger";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { platform } = await req.json();
    if (!platform) {
      return NextResponse.json({ error: "Platform name is required" }, { status: 400 });
    }

    const adapter = getAdapter(platform);
    if (!adapter) {
      return NextResponse.json({ error: `No adapter found for platform ${platform}` }, { status: 404 });
    }

    const config = (await getIntegrationConfig(platform)) || {
      platform,
      isEnabled: true,
    };

    const testResult = await adapter.testConnection(config);
    return NextResponse.json(testResult);
  } catch (err: any) {
    console.error("Test connection error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
