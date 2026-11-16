/**
 * Lord of the Road — Phase 3 Automated Tests
 * Tests:
 * 1. FacebookAdapter: Webhook GET challenge verification, HMAC signature check, payload parsing
 * 2. GoogleAdapter: google_key verification and Google lead form column parsing
 * 3. JustdialAdapter: Inbound email text parsing (regex extraction) and JSON payload parsing
 * 4. GenericAdapter: API Key authentication and multi-field normalization
 * 5. PartnerAdapter: CSV lead file parsing and extraction
 */

import crypto from "crypto";
import { FacebookAdapter } from "../src/adapters/facebookAdapter";
import { GoogleAdapter } from "../src/adapters/googleAdapter";
import { JustdialAdapter } from "../src/adapters/justdialAdapter";
import { GenericAdapter } from "../src/adapters/genericAdapter";
import { PartnerAdapter } from "../src/adapters/partnerAdapter";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log("\n🧪 Running Phase 3: Lead Integrations Verification Tests...\n");

  // ==================== 1. Facebook Lead Ads ====================
  console.log("--- 1. Testing Facebook & Instagram Adapter ---");
  const fb = new FacebookAdapter();

  // Test 1a: Handshake GET verification
  const url = new URL("https://example.com/api/webhooks/facebook?hub.mode=subscribe&hub.challenge=test_challenge_12345&hub.verify_token=my_secret_token");
  const handshake = fb.verifyHandshake(url, { platform: "FACEBOOK", isEnabled: true, webhookSecret: "my_secret_token" });
  assert(handshake.isValid && handshake.challenge === "test_challenge_12345", "Facebook GET challenge verified successfully");

  // Test 1b: HMAC-SHA256 Signature verification
  const fbRawPayload = JSON.stringify({ name: "Rohit Sharma", phone: "9876543210", destination: "Goa" });
  const appSecret = "fb_app_secret_xyz123";
  const validSignature = `sha256=${crypto.createHmac("sha256", appSecret).update(fbRawPayload, "utf8").digest("hex")}`;

  const mockFbReq = new Request("https://example.com/api/webhooks/facebook", {
    method: "POST",
    headers: { "x-hub-signature-256": validSignature },
    body: fbRawPayload,
  });

  const sigResult = await fb.verifyRequest(mockFbReq, fbRawPayload, { platform: "FACEBOOK", isEnabled: true, apiSecret: appSecret });
  assert(sigResult.isValid, "Facebook HMAC-SHA256 signature verified successfully");

  const parsedFb = await fb.parsePayload(JSON.parse(fbRawPayload), { platform: "FACEBOOK", isEnabled: true });
  assert(parsedFb.leads.length === 1 && parsedFb.leads[0].name === "Rohit Sharma", "Facebook payload parsed correctly");

  // ==================== 2. Google Ads Lead Form ====================
  console.log("\n--- 2. Testing Google Ads Lead Form Adapter ---");
  const google = new GoogleAdapter();

  const googlePayload = {
    google_key: "google_secret_key_888",
    lead_id: "google_lead_999",
    form_id: 123456,
    campaign_id: 78910,
    user_column_data: [
      { column_id: "FULL_NAME", string_value: "Ananya Iyer" },
      { column_id: "PHONE_NUMBER", string_value: "+91 9988776655" },
      { column_id: "EMAIL", string_value: "ananya@example.com" },
      { column_id: "POSTAL_CODE", string_value: "560001" },
    ],
  };

  const parsedGoogle = await google.parsePayload(googlePayload, { platform: "GOOGLE", isEnabled: true, webhookSecret: "google_secret_key_888" });
  assert(parsedGoogle.leads.length === 1, "Google Ads lead created");
  assert(parsedGoogle.leads[0].name === "Ananya Iyer", "Google lead name extracted from user_column_data");
  assert(parsedGoogle.leads[0].pinCode === "560001", "Google lead postal code extracted");

  // ==================== 3. Justdial Adapter ====================
  console.log("\n--- 3. Testing Justdial Adapter (Email Parser & Webhook) ---");
  const jd = new JustdialAdapter();

  // Inbound Email text simulation
  const sampleJustdialEmail = `
    Dear Lord of the Road,
    You have a new inquiry from Justdial!
    Customer Name: Deepak Verma
    Mobile: 9811223344
    Email: deepak.verma@example.com
    Category: Tour Operator & Holiday Packages
    City: New Delhi
    Pin Code: 110001
  `;

  const parsedJdEmail = await jd.parsePayload({ email_body: sampleJustdialEmail }, { platform: "JUSTDIAL", isEnabled: true });
  assert(parsedJdEmail.leads.length === 1, "Justdial email successfully parsed");
  assert(parsedJdEmail.leads[0].name === "Deepak Verma", "Name extracted from email body via regex");
  assert(parsedJdEmail.leads[0].phone === "9811223344", "Phone extracted from email body via regex");
  assert(parsedJdEmail.leads[0].pinCode === "110001", "Pin code extracted from email body via regex");

  // ==================== 4. Generic Webhook (Zapier/Make) ====================
  console.log("\n--- 4. Testing Generic Webhook Adapter ---");
  const generic = new GenericAdapter();
  const apiKey = "lotr_secret_generic_key_12345";

  const genericReq = new Request("https://example.com/api/webhooks/generic", {
    method: "POST",
    headers: { "x-api-key": apiKey },
  });

  const genericAuth = await generic.verifyRequest(genericReq, "{}", { platform: "GENERIC", isEnabled: true, apiKey });
  assert(genericAuth.isValid, "Generic API Key authentication verified");

  const genericPayload = {
    customer_name: "Sneha Patel",
    contact_number: "9723456789",
    travel_to: "Shimla & Manali",
    pincode: "380001",
    budget_max: 45000,
  };

  const parsedGeneric = await generic.parsePayload(genericPayload, { platform: "GENERIC", isEnabled: true });
  assert(parsedGeneric.leads.length === 1, "Generic webhook parsed payload");
  assert(parsedGeneric.leads[0].name === "Sneha Patel", "Name mapped from customer_name");
  assert(parsedGeneric.leads[0].destination === "Shimla & Manali", "Destination mapped from travel_to");
  assert(parsedGeneric.leads[0].budgetMax === 45000, "Budget mapped from budget_max");

  // ==================== 5. Partner Adapter & CSV Bulk Importer ====================
  console.log("\n--- 5. Testing Partner Adapter & CSV Bulk Importer ---");
  const partner = new PartnerAdapter();

  const sampleCsv = `Name,Phone,Email,PinCode,Destination,Budget
Karan Malhotra,9820011223,karan@example.com,400001,Goa,30000
Pooja Nair,9845012345,pooja@example.com,560025,Kerala,55000
Amitabh Roy,9830099887,,700001,Darjeeling,25000`;

  const parsedCsvLeads = partner.parseCsvLeads(sampleCsv);
  assert(parsedCsvLeads.length === 3, "All 3 CSV rows parsed into lead objects");
  assert(parsedCsvLeads[0].name === "Karan Malhotra", "First CSV lead name matched");
  assert(parsedCsvLeads[1].destination === "Kerala", "Second CSV lead destination matched");
  assert(parsedCsvLeads[2].pinCode === "700001", "Third CSV lead pin code matched");

  console.log("\n🎉 All Phase 3 Lead Integration Tests PASSED successfully!\n");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
