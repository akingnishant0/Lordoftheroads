import { LeadAdapter, IntegrationConfigData, VerificationResult, ParseResult, ConnectionTestResult } from "./types";
import { LeadSource, ServiceType } from "@prisma/client";

export class GenericAdapter implements LeadAdapter {
  platformName = "GENERIC";

  async verifyRequest(
    req: Request,
    _rawBody: string,
    config: IntegrationConfigData
  ): Promise<VerificationResult> {
    const requiredApiKey = config.apiKey || process.env.GENERIC_WEBHOOK_API_KEY;

    if (!requiredApiKey) {
      return { isValid: true }; // Open endpoint if no key is configured
    }

    const headerApiKey = req.headers.get("x-api-key");
    const authHeader = req.headers.get("authorization");
    const bearerKey = authHeader ? authHeader.replace(/^Bearer\s+/i, "") : null;
    const queryKey = new URL(req.url).searchParams.get("api_key") || new URL(req.url).searchParams.get("apiKey");

    const providedKey = headerApiKey || bearerKey || queryKey;

    if (providedKey === requiredApiKey) {
      return { isValid: true };
    }

    return {
      isValid: false,
      error: "Invalid or missing API key in x-api-key header or ?api_key query parameter",
      statusCode: 401,
    };
  }

  async parsePayload(
    payload: any,
    _config: IntegrationConfigData
  ): Promise<ParseResult> {
    const leads: any[] = [];

    // Support single object or array of objects
    const items = Array.isArray(payload) ? payload : Array.isArray(payload.leads) ? payload.leads : [payload];

    for (const item of items) {
      const name =
        item.name ||
        item.fullName ||
        item.full_name ||
        item.customer_name ||
        [item.first_name, item.last_name].filter(Boolean).join(" ") ||
        "Inquiry";

      const phone =
        item.phone ||
        item.mobile ||
        item.phoneNumber ||
        item.phone_number ||
        item.contact ||
        item.contact_number;

      if (!phone) continue;

      const email = item.email || item.emailAddress || item.email_address || null;
      const pinCode = item.pinCode || item.pin_code || item.pincode || item.postal_code || item.zip || null;
      const destination = item.destination || item.city || item.travel_to || item.to || null;
      const serviceType = this.mapService(item.serviceType || item.service || item.category);

      leads.push({
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        pinCode: pinCode ? String(pinCode).trim() : null,
        destination: destination ? String(destination).trim() : null,
        serviceType,
        source: LeadSource.API_PARTNER,
        travelDateStart: item.travelDateStart || item.travelDate || item.start_date || null,
        travelDateEnd: item.travelDateEnd || item.end_date || null,
        paxAdults: Number(item.paxAdults || item.adults || item.pax || 1),
        paxChildren: Number(item.paxChildren || item.children || 0),
        budgetMin: item.budgetMin || item.budget_min ? Number(item.budgetMin || item.budget_min) : null,
        budgetMax:
          item.budgetMax || item.budget_max || item.budget
            ? Number(item.budgetMax || item.budget_max || item.budget)
            : null,
        message: item.message || item.notes || item.remarks || "Received via Generic Webhook",
        externalId: item.id || item.external_id || item.externalId || null,
        rawPayload: item,
      });
    }

    return { leads, rawPayload: payload };
  }

  private mapService(s?: string): ServiceType {
    if (!s) return ServiceType.HOLIDAY_PACKAGE;
    const upper = String(s).toUpperCase();
    if (upper.includes("HOTEL")) return ServiceType.HOTEL;
    if (upper.includes("FLIGHT")) return ServiceType.FLIGHT;
    if (upper.includes("BUS")) return ServiceType.BUS;
    if (upper.includes("TRAIN")) return ServiceType.TRAIN;
    if (upper.includes("CAB")) return ServiceType.CAB;
    if (upper.includes("INSURANCE")) return ServiceType.INSURANCE;
    if (upper.includes("SHOP")) return ServiceType.TRAVEL_SHOP;
    return ServiceType.HOLIDAY_PACKAGE;
  }

  async testConnection(config: IntegrationConfigData): Promise<ConnectionTestResult> {
    const key = config.apiKey || process.env.GENERIC_WEBHOOK_API_KEY;
    return {
      success: true,
      message: key
        ? "Generic Webhook is ready and protected with API Key."
        : "Generic Webhook is open (no API key configured). It is recommended to set an API Key.",
      details: {
        hasApiKey: Boolean(key),
        sampleHeader: key ? `x-api-key: ${key}` : "None required",
      },
    };
  }
}
