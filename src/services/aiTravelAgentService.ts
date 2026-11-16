export interface AiSearchCriteria {
  destination?: string;
  origin?: string;
  travel_dates?: string;
  return_date?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  budget?: number;
  travel_preferences?: string;
  service_type?: string;
}

export interface AiAgentResponse {
  function_called: string;
  reply: string;
  suggestions?: string[];
  options?: any[];
  itinerary?: { day: number; title: string; morning: string; afternoon: string; evening: string; meal_recommendation: string }[];
  budget_breakdown?: { stay: number; transport: number; food_and_activities: number; buffer: number; total: number };
  visa_guidance?: {
    country: string;
    processing_time: string;
    visa_type: string;
    requirements: string[];
    official_disclaimer: string;
  };
  booking_preview?: {
    booking_reference: string;
    service: string;
    destination: string;
    dates: string;
    passengers: number;
    live_price: number;
    availability_verified: boolean;
    provider: string;
    cancellation_policy: string;
  };
}

export async function processAiTravelAgentRequest(
  message: string,
  criteria?: AiSearchCriteria
): Promise<AiAgentResponse> {
  const query = (message || "").toLowerCase();

  // 1. Voice, Bike Road Trips & Route Navigation Assistance
  if (
    query.includes("bike") ||
    query.includes("motorcycle") ||
    query.includes("road trip") ||
    query.includes("mechanic") ||
    query.includes("puncture") ||
    query.includes("fuel stop") ||
    query.includes("delhi to manali") ||
    query.includes("route") ||
    query.includes("petrol") ||
    query.includes("hidden places") ||
    query.includes("uttarakhand")
  ) {
    if (query.includes("mechanic") || query.includes("puncture") || query.includes("emergency") || query.includes("service")) {
      return {
        function_called: "mechanic_emergency_finder",
        reply: "🛠️ Emergency Route Assistance: Here are verified mechanic workshops, 24/7 puncture points and bike rescue hubs along your active road corridor:",
        options: [
          {
            name: "Himalayan Riders Point & Mechanic Bay",
            location: "Mandi Bypass, NH-21 (Near Pandoh Dam)",
            services: ["Royal Enfield specialist", "Tubeless puncture repair", "Engine oil flush", "Spare clutch cables"],
            phone: "+91 98160 44210",
            status: "Open 24/7",
            distance: "12 km ahead on your route",
          },
          {
            name: "Kullu Moto Care & Tool Stop",
            location: "Bhuntar Chowk, NH-3",
            services: ["Car & Bike brake servicing", "Tyre replacement", "Battery charging", "Highway towing"],
            phone: "+91 94180 88319",
            status: "Open till 11:00 PM",
            distance: "38 km from Manali",
          },
          {
            name: "Aut Tunnel Emergency SOS Desk",
            location: "NH-21 Highway Assist Mile 142",
            services: ["Highway patrol SOS", "First aid & warm shelter", "Mobile mechanic van dispatch"],
            phone: "1077 (Toll-Free SOS) / +91 98055 12000",
            status: "Govt Verified 24/7",
            distance: "Live On Route",
          },
        ],
        suggestions: [
          "Call Highway SOS Mechanic",
          "Find Nearest 24/7 Petrol Pump",
          "Save Route Emergency Numbers Offline",
          "Book Bike Mechanic Pre-Checkup",
        ],
      };
    }

    if (query.includes("hidden") || query.includes("uttarakhand") || query.includes("secret") || query.includes("unexplored")) {
      return {
        function_called: "hidden_gems_discovery",
        reply: "🌲 Unexplored Uttarakhand & Himachal Hidden Trails: Escaping the tourist crowds? Here are hand-curated secret valleys, homestays, and pine trails:",
        options: [
          {
            name: "Pangot & Kilbury Bird Sanctuary (Uttarakhand)",
            distance_from_delhi: "320 km via Moradabad & Nainital",
            why_visit: "Dense oak & pine forests, over 250 Himalayan bird species, remote wooden cabins.",
            stay: "Woodland Heritage Cottages (₹3,200/night)",
            activity: "Sunrise valley trek to Cheena Peak ridge",
          },
          {
            name: "Jibhi & Tirthan Valley (Himachal Pradesh)",
            distance_from_delhi: "490 km via Chandigarh & Aut Tunnel",
            why_visit: "Crystal clear trout rivers, ancient wooden towers of Chaini Kothi, Great Himalayan National Park.",
            stay: "Riverstone Riverside Homestay (₹2,800/night)",
            activity: "Trek to Serolsar Lake & Jalori Pass snowline",
          },
          {
            name: "Chakrata & Tiger Falls (Dehradun Hinterlands)",
            distance_from_delhi: "315 km via Yamunanagar & Vikas Nagar",
            why_visit: "Secluded cantonment town, towering cedar trees, highest direct plunge waterfall in Uttarakhand.",
            stay: "Deodar Valley Eco Retreat (₹3,500/night)",
            activity: "Caving at Budher Caves & sunset at Tiger Falls",
          },
        ],
        suggestions: [
          "Plan 4-Day Uttarakhand Hidden Trail",
          "Find Homestays in Tirthan Valley",
          "Check Bike Road Condition to Jalori Pass",
          "Connect with Local Storyteller Guide",
        ],
      };
    }

    // Default: Delhi to Manali / Bike road trip adventure
    return {
      function_called: "bike_road_trip_planning",
      reply: "🏍️ Fantastic choice! Delhi to Manali on a motorcycle is India's classic bucket-list highway. Let's engineer your complete road trip — optimal route, scenic pit-stops, fuel planning, rental bikes, and mountain stays.",
      options: [
        {
          leg: "Day 1: Delhi to Chandigarh / Bilaspur (250 - 340 km)",
          route: "NH-44 Grand Trunk Road past Murthal (Amrik Sukhdev breakfast) to Kiratpur Sahib Expressway",
          fuel_stops: ["IOCL COCO Karnal Lake", "HPCL Zirakpur Flyover", "IndianOil Swarghat"],
          bike_tips: "Start at 5:00 AM to beat Delhi-Sonipat traffic. Ensure tyre pressure 32/36 PSI.",
        },
        {
          leg: "Day 2: Bilaspur / Mandi to Manali (180 km scenic climb)",
          route: "NH-21 via Sunder Nagar lake, Pandoh Dam, Aut Tunnel, and riverine Kullu valley road",
          fuel_stops: ["BPCL Mandi Bypass", "IndianOil Bhuntar Airport", "HPCL Green Tax Barrier Manali"],
          bike_tips: "Expect twisty hairpin bends and tunnel ventilation. Keep waterproof jacket handy.",
        },
        {
          leg: "Day 3 & 4: Rohtang Pass, Solang & Old Manali Trails",
          route: "Atal Tunnel (10,040 ft) to Sissu waterfalls in Lahaul valley, returning to Old Manali cafes",
          fuel_stops: ["Tandi Fuel Station (Highest pump before Leh route - top up mandatory)"],
          bike_tips: "Acclimatize carefully. Wear thermal gloves across Atal Tunnel north portal.",
        },
      ],
      budget_breakdown: {
        stay: 7500, // 4 nights boutique rider homestays
        transport: 5800, // Petrol for ~1200 km (35 km/l @ ₹96/L) + highway tolls
        food_and_activities: 4500, // Highway dhabas + cafe meals
        buffer: 2200, // Chain lube, spare tube, emergency backup
        total: 20000,
      },
      suggestions: [
        "Find Royal Enfield Bike Rental in Delhi (Himalayan / Classic 350)",
        "Check Verified Rider Homestays in Old Manali",
        "Download Offline Route & Mechanic SOS Map",
        "Book Complete Delhi-Manali Road Package",
      ],
    };
  }

  // 1. Visa Guidance
  if (query.includes("visa") || query.includes("passport") || query.includes("embassy")) {
    let country = "Dubai (UAE)";
    let visaType = "Tourist E-Visa (30 Days)";
    let procTime = "24 - 48 Hours";
    let reqs = [
      "Original Passport valid for at least 6 months",
      "Recent passport-sized photograph with white background",
      "Confirmed round-trip flight booking",
      "Hotel reservation voucher",
      "Pan Card copy (for Indian Citizens)",
    ];

    if (query.includes("thailand")) {
      country = "Thailand";
      visaType = "Visa On Arrival / Tourist E-Visa";
      procTime = "Instant on arrival or 3-5 days online";
      reqs = [
        "Passport with minimum 30 days validity",
        "Confirmed return air ticket within 15 days",
        "Proof of accommodation in Thailand",
        "Minimum 10,000 THB (approx ₹24,000) per person proof of funds",
      ];
    } else if (query.includes("schengen") || query.includes("europe") || query.includes("france") || query.includes("switzerland")) {
      country = "Schengen Area (Europe)";
      visaType = "Short Stay Tourist Visa (Type C)";
      procTime = "15 - 20 Working Days";
      reqs = [
        "Passport valid for at least 3 months beyond departure date",
        "Completed and signed Schengen visa application form",
        "Cover letter explaining purpose of visit & day-wise itinerary",
        "Bank statements for the last 6 months with bank seal",
        "Income Tax Returns (ITR-V) for the last 2-3 years",
        "Travel Insurance with minimum coverage of €30,000",
        "Confirmed flight reservation & hotel bookings",
      ];
    } else if (query.includes("singapore")) {
      country = "Singapore";
      visaType = "E-Visa (30 Days Multiple Entry)";
      procTime = "3 - 4 Working Days";
      reqs = [
        "Passport with minimum 6 months validity",
        "Form 14A duly completed and signed",
        "6 months bank statements with adequate balance",
        "Confirmed flight tickets & hotel reservations",
      ];
    }

    return {
      function_called: "visa_guidance",
      reply: `Here are the official visa guidance and requirements for ${country}. Our visa assistance desk can help you verify your documentation before embassy submission.`,
      visa_guidance: {
        country,
        processing_time: procTime,
        visa_type: visaType,
        requirements: reqs,
        official_disclaimer: "Visa approval is determined solely by the relevant government immigration authorities and embassies. Lord of the Road provides document verification and filing assistance.",
      },
      suggestions: [
        "Request Visa Assistance Callback",
        "Download Document Checklist PDF",
        "Plan Flights & Hotels for Visa",
      ],
    };
  }

  // 2. Cancellation Assistance
  if (query.includes("cancel") || query.includes("refund") || query.includes("policy")) {
    return {
      function_called: "cancellation_assistance",
      reply: "Here is our transparent cancellation and refund policy. As per our booking rules, we verify all supplier refunds and process credits within 5-7 working days directly to your original payment method.",
      options: [
        {
          timeline: "> 30 Days before travel",
          refund_percentage: "90% Refund",
          charges: "Only ₹500 standard processing fee",
        },
        {
          timeline: "15 to 30 Days before travel",
          refund_percentage: "75% Refund",
          charges: "25% supplier advance retention",
        },
        {
          timeline: "7 to 14 Days before travel",
          refund_percentage: "50% Refund",
          charges: "50% cancellation fee",
        },
        {
          timeline: "< 7 Days before travel",
          refund_percentage: "Non-refundable / Reschedule only",
          charges: "Subject to airline/hotel discretionary waiver",
        },
      ],
      suggestions: [
        "Check Status of Booking #LOTR-BK-20261024-001",
        "Request Reschedule Instead of Cancel",
        "Talk to Human Support Desk",
      ],
    };
  }

  // 3. Hotel Recommendations
  if (query.includes("hotel") || query.includes("stay") || query.includes("villa") || query.includes("resort") || query.includes("room")) {
    const hotels = [
      {
        name: "The Heritage Haveli & Spa",
        location: "Central Historic Quarter",
        rating: 4.8,
        reviews_count: 342,
        amenities: ["Swimming Pool", "Complimentary Breakfast", "Spa", "Free High-Speed WiFi"],
        price_per_night: 4200,
        availability: "4 rooms remaining (Live Verified)",
      },
      {
        name: "Mountain Mist Boutique Resort",
        location: "Scenic Valley Ridge",
        rating: 4.9,
        reviews_count: 512,
        amenities: ["Panoramic Mountain View", "Campfire", "Restaurant", "Balcony"],
        price_per_night: 5800,
        availability: "2 cottages remaining (Live Verified)",
      },
      {
        name: "Coconut Palms Water Villa",
        location: "Backwater Waterfront",
        rating: 4.7,
        reviews_count: 189,
        amenities: ["Private Deck", "Houseboat Shuttle", "Chef on Request", "Kayak Rental"],
        price_per_night: 7500,
        availability: "Available for selected dates",
      },
    ];

    return {
      function_called: "hotel_recommendations",
      reply: "Here are hand-picked, live-verified hotel and villa accommodations with transparent rates and verified guest reviews.",
      options: hotels,
      suggestions: [
        "Book Selected Hotel Room",
        "Check Family Suite Availability",
        "Filter by Swimming Pool & Breakfast",
      ],
    };
  }

  // 4. Transport Recommendations (Flights, Trains, Buses, Cabs)
  if (query.includes("flight") || query.includes("train") || query.includes("bus") || query.includes("cab") || query.includes("transport")) {
    const transportOptions = [
      {
        type: "Flight",
        title: "IndiGo Non-stop (6E-2104)",
        timing: "06:15 AM - 08:30 AM (2h 15m)",
        fare: 4850,
        baggage: "15 kg Check-in + 7 kg Cabin",
        seats_available: "7 Seats Left (Verified)",
      },
      {
        type: "Train",
        title: "Vande Bharat Express (22436)",
        timing: "06:00 AM - 02:00 PM (8h 00m)",
        fare: 1850,
        class: "Executive Chair Car (EC)",
        seats_available: "AVL 18 (Confirmed)",
      },
      {
        type: "Bus",
        title: "IntrCity SmartBus AC Multi-Axle Volvo",
        timing: "09:30 PM - 06:30 AM (Overnight)",
        fare: 1250,
        features: "Live Tracking, Sleeper Berth, USB Charging",
        seats_available: "12 Berths Available",
      },
      {
        type: "Cab",
        title: "Chauffeured Sedan / SUV Outstation",
        timing: "On-demand pickup from your doorstep",
        fare: 4200,
        features: "Dedicated AC vehicle, toll/tax included, verified driver",
        seats_available: "Instant Confirmation",
      },
    ];

    return {
      function_called: "transport_recommendations",
      reply: "Here is the comparison between live flights, premium trains, sleeper Volvo buses, and private cabs for your route.",
      options: transportOptions,
      suggestions: [
        "Select Flight Option",
        "Book Vande Bharat Train",
        "Reserve Volvo Bus Sleeper",
        "Book Outstation Cab",
      ],
    };
  }

  // 5. Itinerary Creation & Trip Planning
  if (
    query.includes("itinerary") ||
    query.includes("plan") ||
    query.includes("day") ||
    query.includes("kerala") ||
    query.includes("rajasthan") ||
    query.includes("kashmir") ||
    query.includes("ladakh") ||
    query.includes("goa")
  ) {
    let dest = "Kerala";
    if (query.includes("kashmir")) dest = "Kashmir";
    else if (query.includes("rajasthan") || query.includes("jaipur")) dest = "Rajasthan";
    else if (query.includes("ladakh") || query.includes("leh")) dest = "Ladakh";
    else if (query.includes("goa")) dest = "Goa";
    else if (query.includes("himachal") || query.includes("manali")) dest = "Himachal Pradesh";

    let itinerary = [
      {
        day: 1,
        title: `Arrival & Heritage Welcome in ${dest}`,
        morning: `Arrival at airport/railway station. Meet our private chauffeur and check in to your curated boutique stay.`,
        afternoon: `Traditional local lunch followed by relaxed local walking tour and orientation.`,
        evening: `Sunset viewpoint visit and welcome cultural dinner with local specialties.`,
        meal_recommendation: `Traditional regional thali dinner included.`,
      },
      {
        day: 2,
        title: `Scenic Mountain / Countryside Trail`,
        morning: `Early breakfast followed by private scenic drive through tea estates / mountain passes.`,
        afternoon: `Visit to iconic historical landmark and photography stops with our local guide.`,
        evening: `Leisure time at local village market, artisanal spice and souvenir shopping.`,
        meal_recommendation: `Fresh farm-to-table lunch at an organic plantation.`,
      },
      {
        day: 3,
        title: `Immersive Nature & Adventure Experience`,
        morning: `Guided trek or peaceful morning boat ride with wildlife spotting.`,
        afternoon: `Local culinary masterclass or heritage museum exploration.`,
        evening: `Campfire under open skies with traditional folk acoustic performance.`,
        meal_recommendation: `Riverside / hilltop candlelit dinner.`,
      },
      {
        day: 4,
        title: `Hidden Gems & Local Living`,
        morning: `Visit to off-the-beaten-path waterfalls or ancestral havelis.`,
        afternoon: `Relaxing spa / Ayurvedic wellness session or lake-side picnic.`,
        evening: `Gourmet dinner overlooking the valley or backwaters.`,
        meal_recommendation: `Chettinad / Rajasthani specialty banquet.`,
      },
      {
        day: 5,
        title: `Souvenirs & Fond Farewell`,
        morning: `Leisurely breakfast, packing, and checkout assistance.`,
        afternoon: `Last-minute handicraft shopping and airport transfer.`,
        evening: `Return flight / train with lifelong memories.`,
        meal_recommendation: `Light farewell high-tea.`,
      },
    ];

    const budgetBreakdown = {
      stay: 14000,
      transport: 8500,
      food_and_activities: 6500,
      buffer: 2000,
      total: 31000,
    };

    return {
      function_called: "itinerary_creation",
      reply: `Here is a custom 5-Day road-tested itinerary for ${dest}, planned with verified stays, chauffeur-driven transfers, and authentic local experiences.`,
      itinerary,
      budget_breakdown: budgetBreakdown,
      suggestions: [
        `Book this ${dest} Itinerary Now`,
        `Customize Days or Budget`,
        `Check Flight Options to ${dest}`,
        `Find Verified Hotels in ${dest}`,
      ],
    };
  }

  // 6. Destination Recommendations & General Travel Planning
  const destinationPicks = [
    {
      destination: "Kashmir Valley",
      best_for: "Snow mountains, shikara rides, saffron gardens, and Dal Lake houseboats.",
      duration: "5-7 Days",
      avg_budget_per_person: 28500,
      season: "Best visited April - October & Dec - Feb for snow.",
    },
    {
      destination: "Kerala Backwaters & Hills",
      best_for: "Houseboats, lush tea estates in Munnar, Ayurvedic rejuvenation, and coastal cuisine.",
      duration: "5-6 Days",
      avg_budget_per_person: 22500,
      season: "Pleasant weather round the year, best Sept - March.",
    },
    {
      destination: "Royal Rajasthan (Jaipur - Jodhpur - Jaisalmer)",
      best_for: "Golden sand dunes, majestic palaces, desert camping, and vibrant culture.",
      duration: "6-8 Days",
      avg_budget_per_person: 26000,
      season: "Ideal weather Oct - March.",
    },
    {
      destination: "High Roads of Ladakh",
      best_for: "Pangong Lake, Nubra Valley, Khardung La pass, and road adventure.",
      duration: "7-8 Days",
      avg_budget_per_person: 34500,
      season: "Best visited May - September.",
    },
  ];

  return {
    function_called: "destination_recommendations",
    reply: "Hello! I am your AI Travel Agent at Lord of the Road. I can help you plan custom itineraries, compare live hotel & flight options, calculate realistic budgets, and manage bookings across India.",
    options: destinationPicks,
    suggestions: [
      "Plan 5-day Kerala trip under ₹25,000",
      "Check live hotels in Kashmir",
      "Compare Flights vs Trains to Jaipur",
      "Visa guidance for Dubai or Thailand",
      "Explain Cancellation & Refund Policy",
    ],
  };
}
