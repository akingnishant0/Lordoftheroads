import { NextResponse } from "next/server";
import { PLATFORM_CONFIG } from "@/config/platformConfig";

export async function GET() {
  return NextResponse.json(PLATFORM_CONFIG, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
