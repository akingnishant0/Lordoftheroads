import { NextRequest, NextResponse } from "next/server";
import { processAiTravelAgentRequest } from "@/services/aiTravelAgentService";
import { generatePersonalizedTripPlan, TripPlanPreferences } from "@/services/tripPlanningService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, criteria, tripPreferences, action } = body;

    // Handle full personalized trip generation workflow
    if (action === "generate_trip_plan" && tripPreferences) {
      const generatedPlan = generatePersonalizedTripPlan(tripPreferences as TripPlanPreferences);
      return NextResponse.json({
        function_called: "comprehensive_trip_plan",
        reply: `🎉 Excellent! Your personalized ${generatedPlan.totalDays}-Day itinerary for ${generatedPlan.destination} has been generated with verified accommodation, routes, meal recommendations, and highway safety support.`,
        plan: generatedPlan,
      });
    }

    const result = await processAiTravelAgentRequest(message || "", criteria);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Agent error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process AI Travel Agent request" },
      { status: 500 }
    );
  }
}
