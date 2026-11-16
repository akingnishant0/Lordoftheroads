export interface InsurerQuote {
  id: string;
  insurerName: string;
  insurerLogo: string;
  planName: string;
  idvAmount?: number;
  idvRange?: { min: number; max: number };
  coverAmount?: string;
  cashlessHospitals?: number;
  networkGarages?: number;
  csrRating: string; // Claim Settlement Ratio
  annualPremium: number;
  agentCommissionPercent: number;
  agentCommissionAmount: number;
  keyFeatures: string[];
  addOnsIncluded: string[];
}

export interface InsuranceQuoteRequest {
  insuranceCategory: "BIKE" | "CAR" | "HEALTH" | "TRAVEL" | "TERM_LIFE" | "SHOP";
  vehicleNumber?: string;
  vehicleMakeModel?: string;
  vehicleMfgYear?: number;
  pincode?: string;
  healthAge?: number;
  healthMembers?: string; // "Self", "Self + Spouse", "Self + Spouse + 2 Kids"
  healthSumInsured?: string; // "5 Lakhs", "10 Lakhs", "25 Lakhs", "1 Crore"
  travelDestination?: string;
  travelDurationDays?: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

export function generateInsuranceQuotes(req: InsuranceQuoteRequest): InsurerQuote[] {
  const cat = req.insuranceCategory;

  if (cat === "BIKE") {
    return [
      {
        id: "quote-digit-bike",
        insurerName: "Go Digit General Insurance",
        insurerLogo: "🛵",
        planName: "Digit Super Comprehensive Plan",
        idvAmount: 64500,
        csrRating: "97.8% CSR",
        networkGarages: 5800,
        annualPremium: 1350,
        agentCommissionPercent: 17.5,
        agentCommissionAmount: 236,
        keyFeatures: [
          "Zero Depreciation Cover included",
          "Paperless 24-hr claim approvals via smartphone video",
          "24x7 Roadside assistance across India",
          "Personal Accident Cover of ₹15 Lakhs for owner-driver",
        ],
        addOnsIncluded: ["Zero Dep", "24x7 RSA", "Consumables Cover"],
      },
      {
        id: "quote-hdfc-bike",
        insurerName: "HDFC ERGO General Insurance",
        insurerLogo: "🏦",
        planName: "HDFC ERGO Two Wheeler Shield",
        idvAmount: 68000,
        csrRating: "98.4% CSR",
        networkGarages: 7200,
        annualPremium: 1520,
        agentCommissionPercent: 15.0,
        agentCommissionAmount: 228,
        keyFeatures: [
          "Overnight repair guarantee at authorized workshops",
          "Zero deductible on windshield & engine protection",
          "Instant cashless settlement",
        ],
        addOnsIncluded: ["Zero Dep", "Engine Protect"],
      },
      {
        id: "quote-icici-bike",
        insurerName: "ICICI Lombard General Insurance",
        insurerLogo: "🛡️",
        planName: "ICICI Lombard Smart Two-Wheeler Package",
        idvAmount: 65000,
        csrRating: "98.0% CSR",
        networkGarages: 6500,
        annualPremium: 1420,
        agentCommissionPercent: 16.0,
        agentCommissionAmount: 227,
        keyFeatures: [
          "Doorstep pickup & drop in major cities",
          "No Claim Bonus (NCB) retention shield",
          "Instant digital policy issuance",
        ],
        addOnsIncluded: ["Zero Dep", "NCB Protect"],
      },
    ];
  }

  if (cat === "CAR") {
    return [
      {
        id: "quote-tata-car",
        insurerName: "Tata AIG General Insurance",
        insurerLogo: "🚗",
        planName: "Tata AIG Auto Secure Platinum",
        idvAmount: 620000,
        csrRating: "99.1% CSR",
        networkGarages: 8500,
        annualPremium: 14800,
        agentCommissionPercent: 15.0,
        agentCommissionAmount: 2220,
        keyFeatures: [
          "Comprehensive bumper-to-bumper zero depreciation",
          "Engine and gearbox water-ingression protector",
          "Key and lock replacement up to ₹25,000",
          "Return to Invoice (RTI) full price reimbursement",
        ],
        addOnsIncluded: ["Zero Dep", "Engine Protect", "RTI Cover", "24x7 RSA"],
      },
      {
        id: "quote-hdfc-car",
        insurerName: "HDFC ERGO Car Insurance",
        insurerLogo: "🏦",
        planName: "HDFC ERGO Optima Drive",
        idvAmount: 645000,
        csrRating: "98.5% CSR",
        networkGarages: 9200,
        annualPremium: 16200,
        agentCommissionPercent: 15.0,
        agentCommissionAmount: 2430,
        keyFeatures: [
          "Unlimited zero depreciation claims per year",
          "Tyre damage & alloy wheel protection",
          "Free towing support up to 100 km",
        ],
        addOnsIncluded: ["Zero Dep", "Consumables", "Tyre Protect"],
      },
      {
        id: "quote-icici-car",
        insurerName: "ICICI Lombard Motor Insurance",
        insurerLogo: "🛡️",
        planName: "ICICI Lombard Complete Motor Protect",
        idvAmount: 630000,
        csrRating: "98.2% CSR",
        networkGarages: 8800,
        annualPremium: 15400,
        agentCommissionPercent: 15.0,
        agentCommissionAmount: 2310,
        keyFeatures: [
          "Instant claim approval on video survey",
          "Cashless claims settled in 30 minutes",
          "Personal belongings loss cover up to ₹50,000",
        ],
        addOnsIncluded: ["Zero Dep", "Engine Protect", "Personal Baggage"],
      },
    ];
  }

  if (cat === "HEALTH") {
    return [
      {
        id: "quote-care-health",
        insurerName: "Care Health Insurance",
        insurerLogo: "🏥",
        planName: "Care Supreme (Super Unlimited Recharge)",
        coverAmount: req.healthSumInsured || "₹10 Lakhs",
        cashlessHospitals: 11400,
        csrRating: "99.2% CSR",
        annualPremium: 11800,
        agentCommissionPercent: 20.0,
        agentCommissionAmount: 2360,
        keyFeatures: [
          "Unlimited 100% automatic restore of sum insured",
          "No Room Rent Capping (Any single private AC room)",
          "Annual comprehensive health checkup for all adults",
          "Daycare procedures covered up to sum insured",
        ],
        addOnsIncluded: ["Unlimited Recharge", "No Claim Bonus Super (500% max)", "Air Ambulance"],
      },
      {
        id: "quote-star-health",
        insurerName: "Star Health & Allied Insurance",
        insurerLogo: "⭐",
        planName: "Star Health Comprehensive Gold",
        coverAmount: req.healthSumInsured || "₹10 Lakhs",
        cashlessHospitals: 14000,
        csrRating: "99.0% CSR",
        annualPremium: 13200,
        agentCommissionPercent: 20.0,
        agentCommissionAmount: 2640,
        keyFeatures: [
          "Maternity cover for normal & C-section deliveries",
          "Newborn baby cover from Day 1",
          "Bariatric surgery and organ donor expenses covered",
          "OPD dental & ophthalmic consultations included",
        ],
        addOnsIncluded: ["Maternity & Newborn Cover", "Accidental Death Double Cover"],
      },
      {
        id: "quote-niva-health",
        insurerName: "Niva Bupa Health Insurance",
        insurerLogo: "🩺",
        planName: "Niva Bupa ReAssure 2.0 Titanium",
        coverAmount: req.healthSumInsured || "₹10 Lakhs",
        cashlessHospitals: 10200,
        csrRating: "98.7% CSR",
        annualPremium: 12400,
        agentCommissionPercent: 18.0,
        agentCommissionAmount: 2232,
        keyFeatures: [
          "AgeLock benefit: Pay premium as per entry age until first claim",
          "Safeguard+: Covers all non-payable consumables (gloves, PPE, syringes)",
          "Live Healthy discount up to 30% on renewal based on step tracker",
        ],
        addOnsIncluded: ["AgeLock", "Safeguard Consumables", "Booster+"],
      },
    ];
  }

  if (cat === "TRAVEL") {
    return [
      {
        id: "quote-tata-travel",
        insurerName: "Tata AIG Travel Guard",
        insurerLogo: "✈️",
        planName: "Tata AIG International Gold Shield",
        coverAmount: "$250,000 USD Medical + ₹50,000 Trip Cover",
        csrRating: "99.1% CSR",
        annualPremium: 2200,
        agentCommissionPercent: 22.0,
        agentCommissionAmount: 484,
        keyFeatures: [
          "Direct cashless hospitalization worldwide",
          "Schengen & US/Canada visa compliant",
          "Baggage delay & total loss reimbursement",
          "Trip cancellation and emergency family visit cover",
        ],
        addOnsIncluded: ["Emergency Medical Evacuation", "Passport Loss Replacement", "Flight Delay"],
      },
      {
        id: "quote-icici-travel",
        insurerName: "ICICI Lombard Travel Insurance",
        insurerLogo: "🌍",
        planName: "ICICI Lombard Global Voyage Elite",
        coverAmount: "$100,000 USD Emergency Medical",
        csrRating: "98.2% CSR",
        annualPremium: 1750,
        agentCommissionPercent: 20.0,
        agentCommissionAmount: 350,
        keyFeatures: [
          "Zero deductible on outpatient and inpatient medical claims",
          "Dental emergency relief covered",
          "Financial emergency cash assistance",
        ],
        addOnsIncluded: ["Medical Evacuation", "Hijack Distress Allowance"],
      },
    ];
  }

  // Fallback / Term Life / Shopkeeper Insurance
  return [
    {
      id: "quote-commercial-shop",
      insurerName: "Bajaj Allianz General Insurance",
      insurerLogo: "🏪",
      planName: "Bajaj Allianz Bharat Sookshma Udyam Suraksha",
      coverAmount: "₹25 Lakhs Stock & Building",
      csrRating: "98.8% CSR",
      annualPremium: 3850,
      agentCommissionPercent: 20.0,
      agentCommissionAmount: 770,
      keyFeatures: [
        "Fire, flood, earthquake & storm damage protection",
        "Burglary and housebreaking coverage",
        "Loss of cash in transit and safe up to ₹2 Lakhs",
        "Public liability to third parties",
      ],
      addOnsIncluded: ["Accidental Glass Breakage", "Business Interruption"],
    },
    {
      id: "quote-term-life",
      insurerName: "HDFC Life Insurance",
      insurerLogo: "👨‍👩‍👧",
      planName: "HDFC Life Click 2 Protect Super",
      coverAmount: "₹1 Crore Life Cover",
      csrRating: "99.3% CSR",
      annualPremium: 9600,
      agentCommissionPercent: 25.0,
      agentCommissionAmount: 2400,
      keyFeatures: [
        "Tax benefits under 80C & 10(10D)",
        "Terminal illness accelerated payout",
        "Critical illness cover for 34 major ailments",
        "Waiver of premium on accidental total disability",
      ],
      addOnsIncluded: ["Critical Illness Rider", "Accidental Death Benefit"],
    },
  ];
}

export interface IssuedPolicyRecord {
  id: string;
  policyNumber: string;
  category: string;
  insurerName: string;
  planName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  premiumAmount: number;
  agentCommissionAmount: number;
  policyDocUrl?: string;
  issuedAt: string;
  pospAgentName: string;
  pospCode: string;
}

// In-memory ledger for agent insurance policies
let agentIssuedPolicies: IssuedPolicyRecord[] = [
  {
    id: "pol-101",
    policyNumber: "POL-DIGIT-20261024-9021",
    category: "Two-Wheeler Insurance",
    insurerName: "Go Digit General Insurance",
    planName: "Digit Super Comprehensive Plan",
    customerName: "Sanjay Singhania",
    customerPhone: "+91 98290 88990",
    customerEmail: "sanjay.s@example.com",
    premiumAmount: 1350,
    agentCommissionAmount: 236,
    issuedAt: "2026-10-24T10:15:00.000Z",
    pospAgentName: "Lord of the Road Partner Desk",
    pospCode: "POSP-LOTR-7721",
  },
  {
    id: "pol-102",
    policyNumber: "POL-CARE-20261023-4412",
    category: "Health Insurance",
    insurerName: "Care Health Insurance",
    planName: "Care Supreme (₹10 Lakhs Cover)",
    customerName: "Sunita Mehra",
    customerPhone: "+91 98110 55667",
    customerEmail: "sunita.m@example.com",
    premiumAmount: 11800,
    agentCommissionAmount: 2360,
    issuedAt: "2026-10-23T14:30:00.000Z",
    pospAgentName: "Lord of the Road Partner Desk",
    pospCode: "POSP-LOTR-7721",
  },
];

export function issueInsurancePolicy(
  quote: InsurerQuote,
  customer: { name: string; phone: string; email: string },
  agent: { name: string; pospCode?: string }
): IssuedPolicyRecord {
  const policyNum = `POL-${quote.insurerName.split(" ")[0].toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const record: IssuedPolicyRecord = {
    id: `pol-${Date.now()}`,
    policyNumber: policyNum,
    category: quote.planName.includes("Bike") || quote.planName.includes("Two") ? "Two-Wheeler" : quote.planName.includes("Car") ? "Private Car" : quote.planName.includes("Health") || quote.planName.includes("Care") || quote.planName.includes("Star") ? "Health Insurance" : "Travel Insurance",
    insurerName: quote.insurerName,
    planName: quote.planName,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerEmail: customer.email,
    premiumAmount: quote.annualPremium,
    agentCommissionAmount: quote.agentCommissionAmount,
    issuedAt: new Date().toISOString(),
    pospAgentName: agent.name,
    pospCode: agent.pospCode || "POSP-LOTR-7721",
  };

  agentIssuedPolicies.unshift(record);
  return record;
}

export function getAgentPolicies(): IssuedPolicyRecord[] {
  return agentIssuedPolicies;
}
