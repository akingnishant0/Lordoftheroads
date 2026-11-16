import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

let payoutHistory: Array<{
  id: string;
  amount: number;
  method: string;
  destinationDetails: string;
  status: string;
  referenceId: string;
  requestedAt: string;
}> = [
  {
    id: "payout-001",
    amount: 15400,
    method: "UPI Instant Transfer",
    destinationDetails: "agent@okhdfcbank",
    status: "PROCESSED",
    referenceId: "UPI-TXN-8891024",
    requestedAt: "2026-10-20T16:00:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({ payouts: payoutHistory });
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const { amount, method, destinationDetails } = body;

    if (!amount || amount < 500) {
      return NextResponse.json({ error: "Minimum withdrawal amount is ₹500" }, { status: 400 });
    }

    const newPayout = {
      id: `payout-${Date.now()}`,
      amount: Number(amount),
      method: method || "UPI",
      destinationDetails: destinationDetails || "Registered Bank Account",
      status: "PROCESSED",
      referenceId: `LOTR-PAY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      requestedAt: new Date().toISOString(),
    };

    payoutHistory.unshift(newPayout);

    return NextResponse.json({
      success: true,
      message: `Instant payout of ₹${amount.toLocaleString("en-IN")} processed successfully to ${destinationDetails}. Ref ID: ${newPayout.referenceId}`,
      payout: newPayout,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process payout" }, { status: 500 });
  }
}
