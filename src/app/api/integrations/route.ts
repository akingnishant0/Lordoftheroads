import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const DEFAULT_PLATFORMS = [
  "FACEBOOK",
  "GOOGLE",
  "JUSTDIAL",
  "GENERIC",
  "BOOKING_COM",
  "MAKEMYTRIP",
];

const memoryConfigs: Record<string, any> = {};

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const configs = await prisma.integrationConfig.findMany({
        orderBy: { platform: "asc" },
      });

      const existingMap = new Map(configs.map((c) => [c.platform, c]));
      const allPlatforms = DEFAULT_PLATFORMS.map((platform) => {
        if (existingMap.has(platform)) {
          return existingMap.get(platform);
        }
        return (
          memoryConfigs[platform] || {
            id: null,
            platform,
            isEnabled: platform === "GENERIC",
            apiKey: "",
            apiSecret: "",
            webhookSecret: "",
            additionalConfig: {},
          }
        );
      });

      return NextResponse.json(allPlatforms);
    } catch (dbErr) {
      console.warn("Database offline, returning default integration configs:", (dbErr as any)?.message);
    }

    const fallbackList = DEFAULT_PLATFORMS.map((platform) => {
      return (
        memoryConfigs[platform] || {
          id: null,
          platform,
          isEnabled: platform === "GENERIC",
          apiKey: "",
          apiSecret: "",
          webhookSecret: "",
          additionalConfig: {},
        }
      );
    });

    return NextResponse.json(fallbackList);
  } catch (error: any) {
    console.error("GET /api/integrations error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch integrations" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { platform, isEnabled, apiKey, apiSecret, webhookSecret, additionalConfig } = body;

    if (!platform) {
      return NextResponse.json({ error: "Platform name is required" }, { status: 400 });
    }

    const normalized = platform.toUpperCase().trim();

    try {
      const updated = await prisma.integrationConfig.upsert({
        where: { platform: normalized },
        update: {
          isEnabled: Boolean(isEnabled),
          apiKey: apiKey !== undefined ? apiKey : undefined,
          apiSecret: apiSecret !== undefined ? apiSecret : undefined,
          webhookSecret: webhookSecret !== undefined ? webhookSecret : undefined,
          additionalConfig: additionalConfig !== undefined ? additionalConfig : undefined,
        },
        create: {
          platform: normalized,
          isEnabled: Boolean(isEnabled),
          apiKey: apiKey || null,
          apiSecret: apiSecret || null,
          webhookSecret: webhookSecret || null,
          additionalConfig: additionalConfig || undefined,
        },
      });

      return NextResponse.json(updated);
    } catch (dbErr) {
      console.warn("Database offline, updating integration config in memory:", (dbErr as any)?.message);
    }

    memoryConfigs[normalized] = {
      id: `mem-${normalized}`,
      platform: normalized,
      isEnabled: Boolean(isEnabled),
      apiKey: apiKey || null,
      apiSecret: apiSecret || null,
      webhookSecret: webhookSecret || null,
      additionalConfig: additionalConfig || {},
    };

    return NextResponse.json(memoryConfigs[normalized]);
  } catch (error: any) {
    console.error("PATCH /api/integrations error:", error);
    return NextResponse.json({ error: error.message || "Failed to update integration" }, { status: 500 });
  }
}
