import { NextRequest, NextResponse } from "next/server";
import { FacebookAdapter } from "@/adapters/facebookAdapter";
import { getIntegrationConfig, logWebhookEvent } from "@/services/webhookLogger";
import { createLead } from "@/services/leadService";

const fb = new FacebookAdapter();

/**
 * Facebook Webhook Handshake Verification (GET)
 */
export async function GET(req: NextRequest) {
  const config = (await getIntegrationConfig("FACEBOOK")) || {
    platform: "FACEBOOK",
    isEnabled: true,
  };

  const url = new URL(req.url);
  const handshake = fb.verifyHandshake(url, config);

  if (handshake.isValid && handshake.challenge) {
    return new NextResponse(handshake.challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json(
    { error: handshake.error || "Handshake verification failed" },
    { status: 403 }
  );
}

/**
 * Facebook/Instagram Lead Ads Webhook (POST)
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let rawBody = "";
  let payload: any = {};

  try {
    rawBody = await req.text();
    payload = JSON.parse(rawBody || "{}");
  } catch (err) {
    payload = {};
  }

  const config = (await getIntegrationConfig("FACEBOOK")) || {
    platform: "FACEBOOK",
    isEnabled: true,
  };

  // Check if integration is enabled
  if (!config.isEnabled) {
    await logWebhookEvent({
      platform: "FACEBOOK",
      endpoint: "/api/webhooks/facebook",
      payload,
      status: "DISABLED",
      errorMessage: "Facebook Lead Ads integration is disabled in Admin Settings",
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ message: "Integration disabled" }, { status: 200 });
  }

  // Verify HMAC-SHA256 signature
  const verification = await fb.verifyRequest(req, rawBody, config);
  if (!verification.isValid) {
    await logWebhookEvent({
      platform: "FACEBOOK",
      endpoint: "/api/webhooks/facebook",
      payload,
      status: "SIGNATURE_INVALID",
      errorMessage: verification.error,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: verification.error }, { status: verification.statusCode || 403 });
  }

  // Parse payload into leads
  try {
    const parseResult = await fb.parsePayload(payload, config);
    const createdLeads: any[] = [];

    for (const leadInput of parseResult.leads) {
      const result = await createLead(leadInput);
      createdLeads.push(result);
    }

    const firstLead = createdLeads[0];
    const status = firstLead?.isDuplicate ? "DUPLICATE_IGNORED" : "SUCCESS";

    await logWebhookEvent({
      platform: "FACEBOOK",
      endpoint: "/api/webhooks/facebook",
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
    console.error("Facebook webhook processing error:", err);
    await logWebhookEvent({
      platform: "FACEBOOK",
      endpoint: "/api/webhooks/facebook",
      payload,
      status: "FAILED",
      errorMessage: err.message,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
