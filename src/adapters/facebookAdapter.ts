import crypto from "crypto";
import { LeadAdapter, IntegrationConfigData, VerificationResult, ParseResult, ConnectionTestResult } from "./types";
import { LeadSource, ServiceType } from "@prisma/client";

export class FacebookAdapter implements LeadAdapter {
  platformName = "FACEBOOK";

  /**
   * Verifies the Facebook HMAC-SHA256 signature in X-Hub-Signature-256 header.
   */
  async verifyRequest(
    req: Request,
    rawBody: string,
    config: IntegrationConfigData
  ): Promise<VerificationResult> {
    const signature = req.headers.get("x-hub-signature-256");

    // If appSecret is configured, enforce cryptographic signature check
    if (config.apiSecret) {
      if (!signature) {
        return { isValid: false, error: "Missing x-hub-signature-256 header", statusCode: 401 };
      }

      const expectedSignature = `sha256=${crypto
        .createHmac("sha256", config.apiSecret)
        .update(rawBody, "utf8")
        .digest("hex")}`;

      const isValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );

      if (!isValid) {
        return { isValid: false, error: "Invalid signature verification", statusCode: 403 };
      }
    }

    return { isValid: true };
  }

  /**
   * Handles GET webhook challenge verification for Facebook webhook registration.
   */
  verifyHandshake(
    url: URL,
    config: IntegrationConfigData
  ): { isValid: boolean; challenge?: string | null; error?: string } {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    const expectedToken = config.webhookSecret || process.env.FACEBOOK_VERIFY_TOKEN;

    if (mode === "subscribe" && token === expectedToken) {
      return { isValid: true, challenge };
    }

    return { isValid: false, error: "Verification token mismatch or invalid mode" };
  }

  /**
   * Parses the Facebook Lead Ads webhook payload.
   * Supports both direct payload format and Meta Graph API leadgen data structure.
   */
  async parsePayload(
    payload: any,
    config: IntegrationConfigData
  ): Promise<ParseResult> {
    const leads: any[] = [];

    // Format 1: Direct test / simplified payload
    if (payload.full_name || payload.name || payload.phone_number || payload.phone) {
      leads.push({
        name: payload.full_name || payload.name || "Facebook Lead",
        phone: payload.phone_number || payload.phone,
        email: payload.email || null,
        pinCode: payload.pin_code || payload.postal_code || payload.zip_code || null,
        destination: payload.destination || payload.city || null,
        serviceType: this.mapServiceType(payload.service || payload.interest),
        source: LeadSource.FACEBOOK,
        message: payload.notes || payload.message || "Captured from Facebook/Instagram Lead Ad",
        externalId: payload.leadgen_id || payload.id || null,
        rawPayload: payload,
      });
      return { leads, rawPayload: payload };
    }

    // Format 2: Standard Meta Webhook event format
    // { entry: [{ id: "...", changes: [{ field: "leadgen", value: { leadgen_id: "...", form_id: "..." } }] }] }
    if (Array.isArray(payload.entry)) {
      for (const entry of payload.entry) {
        if (Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === "leadgen" && change.value) {
              const leadgenId = change.value.leadgen_id;
              const formId = change.value.form_id;

              // If Facebook Page Access Token is configured, we can fetch full form questions
              let leadDetails: any = null;
              if (config.apiKey) {
                try {
                  leadDetails = await this.fetchMetaLeadDetails(leadgenId, config.apiKey);
                } catch (err) {
                  console.warn("Could not fetch Graph API lead details:", err);
                }
              }

              if (leadDetails) {
                leads.push({
                  name: leadDetails.name,
                  phone: leadDetails.phone,
                  email: leadDetails.email,
                  pinCode: leadDetails.pinCode,
                  destination: leadDetails.destination,
                  serviceType: leadDetails.serviceType || ServiceType.HOLIDAY_PACKAGE,
                  source: LeadSource.FACEBOOK,
                  message: `Meta Form ID: ${formId}. Questions: ${JSON.stringify(leadDetails.questions || {})}`,
                  externalId: leadgenId,
                  rawPayload: { webhook: change.value, metaDetails: leadDetails },
                });
              } else {
                // Fallback lead stub when Page Token is pending
                leads.push({
                  name: `Meta Lead #${leadgenId.slice(-6)}`,
                  phone: "9999999999", // placeholder updated once Graph API syncs
                  source: LeadSource.FACEBOOK,
                  serviceType: ServiceType.HOLIDAY_PACKAGE,
                  message: `Leadgen ID: ${leadgenId}, Form: ${formId}. Configure Page Token in Integrations to fetch full contact answers.`,
                  externalId: leadgenId,
                  rawPayload: change.value,
                });
              }
            }
          }
        }
      }
    }

    return { leads, rawPayload: payload };
  }

  /**
   * Fetch lead answers using official Meta Graph API v19.0
   */
  private async fetchMetaLeadDetails(leadgenId: string, pageAccessToken: string) {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${pageAccessToken}`
    );
    if (!res.ok) {
      throw new Error(`Graph API returned ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const fieldData = data.field_data || [];

    let name = "Meta Lead";
    let phone = "";
    let email = null;
    let pinCode = null;
    let destination = null;
    const questions: Record<string, string> = {};

    for (const field of fieldData) {
      const fieldName = (field.name || "").toLowerCase();
      const val = (field.values && field.values[0]) || "";

      questions[field.name] = val;

      if (fieldName.includes("name") || fieldName.includes("full_name")) {
        name = val;
      } else if (fieldName.includes("phone")) {
        phone = val;
      } else if (fieldName.includes("email")) {
        email = val;
      } else if (fieldName.includes("zip") || fieldName.includes("pin") || fieldName.includes("postal")) {
        pinCode = val;
      } else if (fieldName.includes("dest") || fieldName.includes("city") || fieldName.includes("location")) {
        destination = val;
      }
    }

    return { name, phone, email, pinCode, destination, questions };
  }

  private mapServiceType(service?: string): ServiceType {
    if (!service) return ServiceType.HOLIDAY_PACKAGE;
    const s = service.toUpperCase();
    if (s.includes("HOTEL")) return ServiceType.HOTEL;
    if (s.includes("FLIGHT")) return ServiceType.FLIGHT;
    if (s.includes("BUS")) return ServiceType.BUS;
    if (s.includes("TRAIN")) return ServiceType.TRAIN;
    if (s.includes("CAB")) return ServiceType.CAB;
    return ServiceType.HOLIDAY_PACKAGE;
  }

  /**
   * Tests connection with Meta Graph API
   */
  async testConnection(config: IntegrationConfigData): Promise<ConnectionTestResult> {
    if (!config.apiKey) {
      return {
        success: false,
        message: "Page Access Token is required to test Meta Graph API connection.",
      };
    }

    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/me?access_token=${config.apiKey}`);
      const data = await res.json();

      if (data.id) {
        return {
          success: true,
          message: `Connected successfully to Meta Page: ${data.name || data.id}`,
          details: { pageId: data.id, name: data.name },
        };
      }

      return {
        success: false,
        message: data.error?.message || "Invalid Meta Page Access Token",
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Connection error: ${err.message}`,
      };
    }
  }
}
