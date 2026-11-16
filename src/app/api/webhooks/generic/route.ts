import { NextRequest, NextResponse } from "next/server";
import { GenericAdapter } from "@/adapters/genericAdapter";
import { getIntegrationConfig, logWebhookEvent } from "@/services/webhookLogger";
import { createLead } from "@/services/leadService";

const generic = new GenericAdapter();

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

  const config = (await getIntegrationConfig("GENERIC")) || {
    platform: "GENERIC",
    isEnabled: true,
  };

  if (!config.isEnabled) {
    await logWebhookEvent({
      platform: "GENERIC",
      endpoint: "/api/webhooks/generic",
      payload,
      status: "DISABLED",
      errorMessage: "Generic Webhook integration is disabled in Admin Settings",
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ message: "Integration disabled" }, { status: 200 });
  }

  const verification = await generic.verifyRequest(req, rawBody, config);
  if (!verification.isValid) {
    await logWebhookEvent({
      platform: "GENERIC",
      endpoint: "/api/webhooks/generic",
      payload,
      status: "SIGNATURE_INVALID",
      errorMessage: verification.error,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: verification.error }, { status: verification.statusCode || 401 });
  }

  try {
    const parseResult = await generic.parsePayload(payload, config);
    const createdLeads: any[] = [];

    for (const leadInput of parseResult.leads) {
      const result = await createLead(leadInput);
      createdLeads.push(result);
    }

    const firstLead = createdLeads[0];
    const status = firstLead?.isDuplicate ? "DUPLICATE_IGNORED" : "SUCCESS";

    await logWebhookEvent({
      platform: "GENERIC",
      endpoint: "/api/webhooks/generic",
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
    console.error("Generic webhook processing error:", err);
    await logWebhookEvent({
      platform: "GENERIC",
      endpoint: "/api/webhooks/generic",
      payload,
      status: "FAILED",
      errorMessage: err.message,
      processedIn: Date.now() - startTime,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
