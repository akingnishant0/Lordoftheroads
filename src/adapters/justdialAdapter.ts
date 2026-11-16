import { LeadAdapter, IntegrationConfigData, VerificationResult, ParseResult, ConnectionTestResult } from "./types";
import { LeadSource, ServiceType } from "@prisma/client";

export class JustdialAdapter implements LeadAdapter {
  platformName = "JUSTDIAL";

  async verifyRequest(
    req: Request,
    _rawBody: string,
    config: IntegrationConfigData
  ): Promise<VerificationResult> {
    if (!config.webhookSecret) {
      return { isValid: true };
    }

    const authHeader = req.headers.get("authorization");
    const secretQuery = new URL(req.url).searchParams.get("secret");

    if (
      secretQuery === config.webhookSecret ||
      authHeader === `Bearer ${config.webhookSecret}` ||
      authHeader === config.webhookSecret
    ) {
      return { isValid: true };
    }

    return { isValid: false, error: "Invalid Justdial webhook authorization secret", statusCode: 401 };
  }

  async parsePayload(
    payload: any,
    _config: IntegrationConfigData,
    rawBody?: string
  ): Promise<ParseResult> {
    const leads: any[] = [];

    // Format 1: Inbound Email Body parser (if payload contains email_body, text, or rawBody is email text)
    const emailText = payload.email_body || payload.text || payload.html || (typeof payload === "string" ? payload : null);

    if (emailText && typeof emailText === "string") {
      const parsedFromEmail = this.parseJustdialEmailText(emailText);
      if (parsedFromEmail) {
        leads.push({
          ...parsedFromEmail,
          source: LeadSource.JUSTDIAL,
          serviceType: ServiceType.HOLIDAY_PACKAGE,
          rawPayload: payload,
        });
        return { leads, rawPayload: payload };
      }
    }

    // Format 2: Justdial JSON Webhook
    // Standard Justdial fields: { leadid, name, mobile, phone, email, category, city, area, pincode }
    if (payload.mobile || payload.phone || payload.name) {
      leads.push({
        name: payload.name || "Justdial Lead",
        phone: payload.mobile || payload.phone || "9999999999",
        email: payload.email || null,
        pinCode: payload.pincode || payload.pin_code || payload.area_pin || null,
        destination: payload.destination || payload.city || null,
        serviceType: this.mapServiceCategory(payload.category),
        source: LeadSource.JUSTDIAL,
        message: `Justdial Category: ${payload.category || "Travel"}. Area: ${payload.area || "N/A"}. Query: ${payload.query || payload.comments || "Inquiry via Justdial"}`,
        externalId: payload.leadid ? String(payload.leadid) : null,
        rawPayload: payload,
      });

      return { leads, rawPayload: payload };
    }

    return { leads, rawPayload: payload };
  }

  /**
   * Parses typical Justdial Lead Email formats using regex.
   * Extracts Name, Mobile, Category, City, Pin Code.
   */
  private parseJustdialEmailText(text: string) {
    const clean = text.replace(/<[^>]*>/g, " "); // Strip HTML tags if any

    // Match Contact Name: "Name: Vikram Singh" or "Customer Name: ..."
    const nameMatch = clean.match(/(?:Name|Customer Name|Caller Name)\s*[:\-]\s*([A-Za-z\s]+?)(?:\r?\n|,|Mobile|Phone|Email)/i);
    const name = nameMatch ? nameMatch[1].trim() : "Justdial Inquirer";

    // Match Mobile: "Mobile: 9876543210" or "Phone: ..."
    const phoneMatch = clean.match(/(?:Mobile|Phone|Contact No|Mobile No)\s*[:\-]\s*([+\d\s\-]{10,14})/i);
    const phone = phoneMatch ? phoneMatch[1].replace(/\D/g, "").slice(-10) : "";

    if (!phone) return null;

    // Match Email: "Email: ..."
    const emailMatch = clean.match(/(?:Email|E-mail)\s*[:\-]\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    const email = emailMatch ? emailMatch[1].trim() : null;

    // Match Pin Code: 6 consecutive digits
    const pinMatch = clean.match(/(?:Pin Code|Pincode|Pin)\s*[:\-]\s*(\d{6})/i) || clean.match(/\b([1-9]\d{5})\b/);
    const pinCode = pinMatch ? pinMatch[1] : null;

    // Match Category: "Category: Tour Operator / Holiday Packages"
    const catMatch = clean.match(/(?:Category|Requirement|Service)\s*[:\-]\s*([A-Za-z0-9\s/]+?)(?:\r?\n|,|City|Location)/i);
    const category = catMatch ? catMatch[1].trim() : "Travel Inquiry";

    // Match City: "City: Jaipur"
    const cityMatch = clean.match(/(?:City|Location|Area)\s*[:\-]\s*([A-Za-z\s]+?)(?:\r?\n|,|Pin|Date)/i);
    const city = cityMatch ? cityMatch[1].trim() : null;

    return {
      name,
      phone,
      email,
      pinCode,
      destination: city,
      message: `Extracted from Justdial Email Notification. Category: "${category}". Location: "${city || "N/A"}"`,
    };
  }

  private mapServiceCategory(cat?: string): ServiceType {
    if (!cat) return ServiceType.HOLIDAY_PACKAGE;
    const c = cat.toUpperCase();
    if (c.includes("HOTEL")) return ServiceType.HOTEL;
    if (c.includes("FLIGHT") || c.includes("AIR")) return ServiceType.FLIGHT;
    if (c.includes("BUS")) return ServiceType.BUS;
    if (c.includes("TRAIN") || c.includes("RAIL")) return ServiceType.TRAIN;
    if (c.includes("CAB") || c.includes("TAXI") || c.includes("CAR")) return ServiceType.CAB;
    return ServiceType.HOLIDAY_PACKAGE;
  }

  async testConnection(config: IntegrationConfigData): Promise<ConnectionTestResult> {
    return {
      success: true,
      message: "Justdial adapter is active. Configured for both HTTP Webhook and Inbound Email body parsing.",
      details: {
        authProtected: Boolean(config.webhookSecret),
      },
    };
  }
}
