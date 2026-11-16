export interface TripPlanPreferences {
  destination: string;
  duration: string;
  origin: string;
  travelMode: string;
  tripType: string;
  travellers: string;
  budget: string;
  accommodation: string;
  interests: string[];
  additionalNotes?: string;
  bikeModel?: string; // Conditional for bike trips
  vehicleSize?: string; // Conditional for group trips
}

export interface DayPlan {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  mealRecommendation: string;
  suggestedStay: string;
  travelDistance: string;
  journeyTime: string;
  approxExpense: number;
  coordinates?: { lat: number; lng: number };
}

export interface ComprehensiveItineraryResponse {
  destination: string;
  tagline: string;
  totalDays: number;
  overview: string;
  itinerary: DayPlan[];
  budgetBreakdown: {
    accommodation: number;
    transport: number;
    foodAndSightseeing: number;
    bufferEmergency: number;
    totalPerPerson: number;
    grandTotal: number;
  };
  smartAssistance: {
    title: string;
    action: string;
    icon: string;
  }[];
  mapWaypoints: {
    name: string;
    type: "origin" | "stop" | "destination" | "scenic" | "mechanic" | "petrol";
    coordinates: { lat: number; lng: number };
    note: string;
  }[];
}

const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  manali: { lat: 32.2432, lng: 77.1892 },
  goa: { lat: 15.2993, lng: 74.124 },
  rishikesh: { lat: 30.0869, lng: 78.2676 },
  kashmir: { lat: 34.0837, lng: 74.7973 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  ladakh: { lat: 34.1526, lng: 77.5771 },
  kerala: { lat: 9.9312, lng: 76.2673 },
  delhi: { lat: 28.6139, lng: 77.209 },
  chandigarh: { lat: 30.7333, lng: 76.7794 },
};

export function generatePersonalizedTripPlan(pref: TripPlanPreferences): ComprehensiveItineraryResponse {
  const destLower = (pref.destination || "manali").toLowerCase();
  const numDays = parseInt(pref.duration, 10) || (pref.duration.includes("1–2") ? 2 : pref.duration.includes("3–4") ? 4 : pref.duration.includes("8–10") ? 8 : 5);
  const numPax = parseInt(pref.travellers, 10) || (pref.travellers.includes("1") ? 1 : pref.travellers.includes("2") ? 2 : pref.travellers.includes("3") ? 4 : pref.travellers.includes("6") ? 8 : 2);

  // Budget calculations based on selected preference
  let baseBudget = 18000;
  if (pref.budget.includes("Under ₹3,000")) baseBudget = 2800;
  else if (pref.budget.includes("3,000–₹5,000")) baseBudget = 4500;
  else if (pref.budget.includes("5,000–₹10,000")) baseBudget = 8500;
  else if (pref.budget.includes("10,000–₹20,000")) baseBudget = 16500;
  else if (pref.budget.includes("20,000–₹50,000")) baseBudget = 32000;
  else if (pref.budget.includes("50,000+")) baseBudget = 62000;

  const stayCost = Math.round(baseBudget * 0.42);
  const transCost = Math.round(baseBudget * 0.28);
  const foodCost = Math.round(baseBudget * 0.22);
  const bufferCost = Math.round(baseBudget * 0.08);
  const totalPerPax = stayCost + transCost + foodCost + bufferCost;
  const grandTotal = totalPerPax * numPax;

  // Day plans generator tailored to destination
  const itinerary: DayPlan[] = [];

  if (destLower.includes("manali")) {
    itinerary.push(
      {
        day: 1,
        title: `Journey from ${pref.origin || "Delhi"} & Riverside Check-in`,
        morning: `Commence travel via ${pref.travelMode || "Scenic Road / Cab"}. Pass through Kiratpur Expressway and enjoy breakfast at scenic highway stop.`,
        afternoon: `Cross the famous Aut Tunnel into Kullu valley. Arrive in Manali, check-in to your ${pref.accommodation || "Boutique Riverside Cottage"}.`,
        evening: `Stroll through charming Old Manali wooden lanes. Enjoy steaming mountain Thukpa & herbal Rhododendron tea.`,
        mealRecommendation: "Café 1947 — Riverside wood-fired pizza & mountain trout.",
        suggestedStay: "The Riverstone Glade / Whispering Pines Homestay",
        travelDistance: "530 km",
        journeyTime: "8h 30m",
        approxExpense: Math.round(totalPerPax / numDays),
      },
      {
        day: 2,
        title: "Atal Tunnel (10,040 ft) & Sissu Waterfall Crossing",
        morning: "Scenic drive through the world's longest highway tunnel above 10,000 feet into pristine Lahaul Valley.",
        afternoon: "Witness the magnificent Sissu waterfall, wooden suspension bridge, and take mountain photography against jagged snow peaks.",
        evening: "Return to Solang Valley for optional zipline, paragliding or relaxed valley views.",
        mealRecommendation: "Lahauli Momos & hot butter tea at Sissu alpine stalls.",
        suggestedStay: "The Riverstone Glade, Manali",
        travelDistance: "75 km round-trip",
        journeyTime: "3h 15m",
        approxExpense: Math.round(totalPerPax / numDays),
      },
      {
        day: 3,
        title: "Jogini Waterfalls Pine Hike & Vashisht Hot Springs",
        morning: "Gentle 45-minute trek through pine forest and apple orchards from Vashisht village to the multi-tier Jogini Waterfalls.",
        afternoon: "Soak in the natural sulfur therapeutic hot water springs at ancient Vashisht Rishi temple.",
        evening: "Leisure shopping on Mall Road for handmade Kullu shawls, local apple jam, and pine artifacts.",
        mealRecommendation: "Johnson's Lodge & Bar — Baked Himalayan Trout with herb potatoes.",
        suggestedStay: "The Riverstone Glade, Manali",
        travelDistance: "18 km",
        journeyTime: "1h 10m",
        approxExpense: Math.round(totalPerPax / numDays),
      }
    );

    if (numDays >= 4) {
      itinerary.push({
        day: 4,
        title: "Naggar Castle Heritage & Art Trail",
        morning: "Drive along the quieter left bank road of Beas river to historic 500-year-old Naggar Castle.",
        afternoon: "Visit Nicholas Roerich Russian Art Gallery and Tripura Sundari pagoda temple.",
        evening: "Sunset coffee on the wooden balconies of Naggar Castle overlooking the valley.",
        mealRecommendation: "Nightingale Artisan Italian Bakery, Naggar.",
        suggestedStay: "Naggar Heritage Retreat",
        travelDistance: "42 km round-trip",
        journeyTime: "2h 00m",
        approxExpense: Math.round(totalPerPax / numDays),
      });
    }

    if (numDays >= 5) {
      itinerary.push({
        day: 5,
        title: "Hampta Valley Glade & Departure with Memories",
        morning: "Short scenic road drive toward Sethan Buddhist dome village / Hampta base for sweeping Pir Panjal vistas.",
        afternoon: "Souvenir shopping, packaging of mountain walnuts, and checkout assistance.",
        evening: `Commence comfortable return journey to ${pref.origin || "Delhi"} via ${pref.travelMode || "Transport"}.`,
        mealRecommendation: "Chopsticks Old Manali — Authentic Tibetan steamed buns & noodle soup.",
        suggestedStay: "Homeward Bound",
        travelDistance: "530 km return",
        journeyTime: "8h 45m",
        approxExpense: Math.round(totalPerPax / numDays),
      });
    }
  } else if (destLower.includes("goa")) {
    itinerary.push(
      {
        day: 1,
        title: `Arrival in Tropical Goa & Sunset Beach Walk`,
        morning: `Arrival at Goa via ${pref.travelMode || "Flight"}. Private transfer to your ${pref.accommodation || "Boutique Coastal Villa"}.`,
        afternoon: `Unwind with fresh coconut water and walk along peaceful golden sand beaches.`,
        evening: `Sunset cocktails at a cliffside shack with live acoustic Goan music.`,
        mealRecommendation: "Fisherman's Wharf — Traditional Goan Fish Curry with steamed rice.",
        suggestedStay: "Heritage Portuguese Villa, Assagao",
        travelDistance: "35 km from airport",
        journeyTime: "45m",
        approxExpense: Math.round(totalPerPax / numDays),
      },
      {
        day: 2,
        title: "Latin Quarter Heritage Walk & Secret Spice Plantation",
        morning: "Walking photography tour through colorful pastel-hued lanes of Fontainhas, Panjim.",
        afternoon: "Traditional lunch on banana leaf at Sahakari Spice Farm followed by guided spice trail.",
        evening: "Mandovi river sunset catamaran cruise with Goan folk dance performances.",
        mealRecommendation: "Viva Panjim — Prawn Balchão & Bebinca dessert.",
        suggestedStay: "Heritage Portuguese Villa, Assagao",
        travelDistance: "48 km",
        journeyTime: "2h 10m",
        approxExpense: Math.round(totalPerPax / numDays),
      },
      {
        day: 3,
        title: "Dudhsagar Waterfalls & Backwater Kayaking",
        morning: "Morning 4x4 open-top jeep safari through Bhagwan Mahavir Wildlife Sanctuary to Dudhsagar waterfall.",
        afternoon: "Swim in the natural pool at the base of the milky white four-tiered falls.",
        evening: "Peaceful sunset kayaking session in the backwaters of Chorao Island.",
        mealRecommendation: "Gunpowder Assagao — Malabar Parotta with Pepper Chicken.",
        suggestedStay: "Heritage Portuguese Villa, Assagao",
        travelDistance: "110 km round-trip",
        journeyTime: "3h 40m",
        approxExpense: Math.round(totalPerPax / numDays),
      }
    );
  } else {
    // Default generic comprehensive itinerary for Kashmir / Jaipur / Rishikesh / etc.
    const destName = pref.destination || "Scenic Escape";
    for (let d = 1; d <= Math.min(numDays, 5); d++) {
      itinerary.push({
        day: d,
        title: d === 1 ? `Arrival in ${destName} & Orientation` : d === numDays ? `Farewell & Heritage Keepsakes` : `Curated Sightseeing & Hidden Trail - Day ${d}`,
        morning: d === 1 ? `Arrival via ${pref.travelMode || "Transport"}. Transfer to your ${pref.accommodation || "Verified Stay"}.` : `Early breakfast and guided excursion to iconic landmarks and photo viewpoints.`,
        afternoon: `Experience local cuisine and visit artisan workshops matching your interests: ${(pref.interests || []).join(", ") || "Culture & Nature"}.`,
        evening: d === numDays ? `Checkout and comfortable return journey to ${pref.origin || "Home"}.` : `Relaxed sunset viewpoint followed by cultural dinner and storytelling.`,
        mealRecommendation: `Chef's special regional tasting thali at top-rated local dining hall.`,
        suggestedStay: pref.accommodation || "Curated Boutique Retreat",
        travelDistance: `${20 + d * 15} km`,
        journeyTime: `${1 + d * 0.5}h`,
        approxExpense: Math.round(totalPerPax / numDays),
      });
    }
  }

  // Smart Contextual Assistance & Map Waypoints
  const destCoords = DESTINATION_COORDINATES[destLower] || { lat: 32.2432, lng: 77.1892 };
  const originCoords = DESTINATION_COORDINATES[(pref.origin || "").toLowerCase()] || { lat: 28.6139, lng: 77.209 };

  const smartAssistance = [
    { title: `Find verified hotels in ${pref.destination} under ${pref.budget}`, action: "find_hotels", icon: "🏨" },
    { title: `Find mechanics & emergency puncture bays on ${pref.origin || "Delhi"} to ${pref.destination} route`, action: "find_mechanics", icon: "🛠️" },
    { title: `Find Royal Enfield / Scooter rentals in ${pref.destination}`, action: "find_bike_rental", icon: "🏍️" },
    { title: `Suggest 5 hidden gems & non-touristy spots in ${pref.destination}`, action: "find_hidden_gems", icon: "🌲" },
    { title: `Show 24/7 petrol pumps & highway food dhabas`, action: "show_fuel_stops", icon: "⛽" },
    { title: `Check emergency hospitals & SOS helpline`, action: "find_hospitals", icon: "🏥" },
  ];

  const mapWaypoints = [
    { name: pref.origin || "Starting Point (Delhi)", type: "origin" as const, coordinates: originCoords, note: "Trip departure point" },
    { name: "Karnal Highway Assist & Fuel Stop", type: "petrol" as const, coordinates: { lat: 29.6857, lng: 76.9905 }, note: "24/7 fuel, tire pressure & dhabas" },
    { name: "Aut Tunnel Highway Mechanic SOS", type: "mechanic" as const, coordinates: { lat: 31.7584, lng: 77.2066 }, note: "Mobile repair van & SOS breakdown" },
    { name: pref.destination || "Destination Hub", type: "destination" as const, coordinates: destCoords, note: "Main holiday stay & base camp" },
  ];

  return {
    destination: pref.destination,
    tagline: `A bespoke ${numDays}-Day ${pref.tripType || "Adventure"} designed for ${pref.travellers || "2 Travellers"} via ${pref.travelMode || "Scenic Route"}`,
    totalDays: numDays,
    overview: `Crafted especially for your group starting from ${pref.origin || "Delhi"} traveling via ${pref.travelMode || "Transport"}. This road-tested itinerary balances must-see highlights with off-beat serenity, verified stays, and real-time highway support.`,
    itinerary,
    budgetBreakdown: {
      accommodation: stayCost,
      transport: transCost,
      foodAndSightseeing: foodCost,
      bufferEmergency: bufferCost,
      totalPerPerson: totalPerPax,
      grandTotal,
    },
    smartAssistance,
    mapWaypoints,
  };
}
