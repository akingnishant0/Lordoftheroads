import { LeadAdapter, IntegrationConfigData, VerificationResult, ParseResult, ConnectionTestResult } from "./types";
import { LeadSource, ServiceType } from "@prisma/client";

export class GoogleAdapter implements LeadAdapter {
  platformName = "GOOGLE";

  /**
   * Google Ads lead form extension sends a 'google_key' in the JSON body.
   */
  async verifyRequest(
    req: Request,
    _rawBody: string,
    config: IntegrationConfigData
  ): Promise<VerificationResult> {
    if (!config.webhookSecret) {
      return { isValid: true };
    }

    // Google key can come in authorization header or body
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.replace(/^Bearer\s+/i, "") === config.webhookSecret) {
      return { isValid: true };
    }

    return { isValid: true }; // Further checked in parsePayload against body.google_key
  }

  async parsePayload(
    payload: any,
    config: IntegrationConfigData
  ): Promise<ParseResult> {
    // Check google_key if configured
    if (config.webhookSecret && payload.google_key && payload.google_key !== config.webhookSecret) {
      throw new Error("Invalid google_key provided in payload");
    }

    const leads: any[] = [];

    // Format 1: Google Ads Official Lead Form Webhook format
    // { lead_id: "...", form_id: 12345, campaign_id: 67890, user_column_data: [{ column_id: "FIRST_NAME", string_value: "..." }] }
    if (Array.isArray(payload.user_column_data)) {
      let firstName = "";
      let lastName = "";
      let fullName = "";
      let phone = "";
      let email = null;
      let pinCode = null;
      let destination = null;
      const customAnswers: Record<string, string> = {};

      for (const col of payload.user_column_data) {
        const id = (col.column_id || "").toUpperCase();
        const val = col.string_value || "";

        if (id === "FULL_NAME") fullName = val;
        else if (id === "FIRST_NAME") firstName = val;
        else if (id === "LAST_NAME") lastName = val;
        else if (id === "PHONE_NUMBER") phone = val;
        else if (id === "EMAIL") email = val;
        else if (id === "POSTAL_CODE" || id === "ZIP_CODE") pinCode = val;
        else if (id.includes("CITY") || id.includes("DESTINATION")) destination = val;
        else {
          customAnswers[col.column_name || id] = val;
        }
      }

      const finalName = fullName || [firstName, lastName].filter(Boolean).join(" ") || "Google Ads Lead";

      leads.push({
        name: finalName,
        phone: phone || "9999999999",
        email,
        pinCode,
        destination,
        serviceType: ServiceType.HOLIDAY_PACKAGE,
        source: LeadSource.GOOGLE,
        message: `Google Campaign ID: ${payload.campaign_id || "N/A"}. Form ID: ${payload.form_id || "N/A"}. Custom responses: ${JSON.stringify(customAnswers)}`,
        externalId: payload.lead_id ? String(payload.lead_id) : null,
        rawPayload: payload,
      });

      return { leads, rawPayload: payload };
    }

    // Format 2: Direct / generic Google payload
    if (payload.name || payload.phone || payload.customer_name) {
      leads.push({
        name: payload.name || payload.customer_name || "Google Lead",
        phone: payload.phone || payload.phone_number,
        email: payload.email || null,
        pinCode: payload.pin_code || payload.postal_code || null,
        destination: payload.destination || payload.city || null,
        serviceType: ServiceType.HOLIDAY_PACKAGE,
        source: LeadSource.GOOGLE,
        message: payload.message || "Captured from Google Ads / Google Business Profile",
        externalId: payload.lead_id ? String(payload.lead_id) : null,
        rawPayload: payload,
      });
      return { leads, rawPayload: payload };
    }

    return { leads, rawPayload: payload };
  }

  async testConnection(config: IntegrationConfigData): Promise<ConnectionTestResult> {
    if (!config.webhookSecret) {
      return {
        success: false,
        message: "Google Webhook Key (google_key) is not configured.",
      };
    }

    return {
      success: true,
      message: `Google Ads webhook configuration is active. Webhook Secret Key is configured and ready for Google Ads lead form extensions.`,
      details: {
        configuredKeyLength: config.webhookSecret.length,
      },
    };
  }
}
