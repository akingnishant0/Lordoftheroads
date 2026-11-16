import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  generateInsuranceQuotes,
  issueInsurancePolicy,
  getAgentPolicies,
  InsuranceQuoteRequest,
  InsurerQuote,
} from "@/services/insuranceEngineService";

export async function GET() {
  try {
    const policies = getAgentPolicies();
    const totalCommission = policies.reduce((sum, p) => sum + p.agentCommissionAmount, 0);
    return NextResponse.json({ policies, totalCommission });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch policies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();

    // Mode 1: Generate Quotes comparing top insurers (Travel ShieldPro style)
    if (body.action === "GENERATE_QUOTES") {
      const quoteReq: InsuranceQuoteRequest = body.request;
      const quotes = generateInsuranceQuotes(quoteReq);
      return NextResponse.json({ quotes });
    }

    // Mode 2: Issue Policy
    if (body.action === "ISSUE_POLICY") {
      const { quote, customer } = body as { quote: InsurerQuote; customer: any };
      const agent = {
        name: session?.user?.name || "Lord of the Road Partner Agent",
        pospCode: (session?.user as any)?.pospCode || "POSP-LOTR-7721",
      };

      const policy = issueInsurancePolicy(quote, customer, agent);
      return NextResponse.json({ success: true, policy }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Insurance API error:", error);
    return NextResponse.json({ error: error.message || "Insurance service error" }, { status: 500 });
  }
}
