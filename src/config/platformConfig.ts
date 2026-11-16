export interface ServiceTabFeature {
  id: string;
  label: string;
  enabled: boolean;
  features: string[];
  disclaimer?: string;
}

export interface PlatformConfig {
  travel_platform: {
    name: string;
    features: {
      ai_travel_agent: {
        enabled: boolean;
        name: string;
        functions: string[];
        destination_booking: {
          enabled: boolean;
          search_fields: string[];
          actions: string[];
        };
        booking_rules: {
          show_live_prices: boolean;
          verify_availability_before_booking: boolean;
          require_user_confirmation: boolean;
          require_payment_authorization: boolean;
          provide_booking_reference: boolean;
          never_fake_availability: boolean;
        };
      };
      service_tabs: ServiceTabFeature[];
    };
    booking_flow: string[];
    user_dashboard: {
      enabled: boolean;
      features: string[];
    };
  };
}

export const PLATFORM_CONFIG: PlatformConfig = {
  travel_platform: {
    name: "Travel Booking Platform",
    features: {
      ai_travel_agent: {
        enabled: true,
        name: "AI Travel Agent",
        functions: [
          "destination_recommendations",
          "destination_booking",
          "trip_planning",
          "budget_planning",
          "itinerary_creation",
          "hotel_recommendations",
          "transport_recommendations",
          "tour_recommendations",
          "visa_guidance",
          "booking_assistance",
          "booking_management",
          "cancellation_assistance",
        ],
        destination_booking: {
          enabled: true,
          search_fields: [
            "destination",
            "origin",
            "travel_dates",
            "return_date",
            "adults",
            "children",
            "rooms",
            "budget",
            "travel_preferences",
          ],
          actions: [
            "search_destinations",
            "check_live_availability",
            "compare_options",
            "view_details",
            "select_services",
            "create_booking",
            "confirm_booking",
            "manage_booking",
          ],
        },
        booking_rules: {
          show_live_prices: true,
          verify_availability_before_booking: true,
          require_user_confirmation: true,
          require_payment_authorization: true,
          provide_booking_reference: true,
          never_fake_availability: true,
        },
      },
      service_tabs: [
        {
          id: "holiday_packages",
          label: "Holiday Packages",
          enabled: true,
          features: [
            "domestic_packages",
            "international_packages",
            "custom_packages",
            "family_trips",
            "honeymoon",
            "group_trips",
          ],
        },
        {
          id: "hotels",
          label: "Hotels",
          enabled: true,
          features: [
            "search_hotels",
            "room_selection",
            "guest_reviews",
            "amenities",
            "price_comparison",
            "hotel_booking",
          ],
        },
        {
          id: "villas_homestays",
          label: "Villas & Homestays",
          enabled: true,
          features: [
            "property_search",
            "guest_capacity",
            "amenities",
            "property_photos",
            "availability",
            "property_booking",
          ],
        },
        {
          id: "flights",
          label: "Flights",
          enabled: true,
          features: [
            "one_way",
            "round_trip",
            "multi_city",
            "flight_comparison",
            "baggage_details",
            "flight_booking",
          ],
        },
        {
          id: "buses",
          label: "Buses",
          enabled: true,
          features: [
            "bus_search",
            "seat_selection",
            "boarding_points",
            "drop_points",
            "bus_booking",
          ],
        },
        {
          id: "trains",
          label: "Trains",
          enabled: true,
          features: [
            "train_search",
            "class_selection",
            "availability",
            "fare_details",
            "train_booking",
          ],
        },
        {
          id: "cabs",
          label: "Cabs",
          enabled: true,
          features: [
            "local_cabs",
            "airport_transfers",
            "outstation",
            "round_trip",
            "vehicle_selection",
            "cab_booking",
          ],
        },
        {
          id: "tours",
          label: "Tours",
          enabled: true,
          features: [
            "activities",
            "sightseeing",
            "guided_tours",
            "adventure_activities",
            "local_experiences",
            "tour_booking",
          ],
        },
        {
          id: "visa_help",
          label: "Visa Help",
          enabled: true,
          features: [
            "visa_requirements",
            "document_checklist",
            "application_guidance",
            "appointment_guidance",
            "visa_assistance_request",
            "application_status_tracking",
          ],
          disclaimer: "Visa approval is determined by the relevant authorities.",
        },
      ],
    },
    booking_flow: [
      "select_service",
      "enter_trip_details",
      "search_options",
      "check_availability",
      "compare_results",
      "select_option",
      "enter_traveller_details",
      "review_booking",
      "authorize_payment",
      "confirm_with_provider",
      "display_booking_confirmation",
    ],
    user_dashboard: {
      enabled: true,
      features: [
        "upcoming_trips",
        "booking_history",
        "traveller_profiles",
        "payments",
        "cancellations",
        "refund_status",
        "support",
      ],
    },
  },
};

export function getServiceTabs(): ServiceTabFeature[] {
  return PLATFORM_CONFIG.travel_platform.features.service_tabs;
}

export function getAiAgentConfig() {
  return PLATFORM_CONFIG.travel_platform.features.ai_travel_agent;
}

export function getBookingFlowSteps(): string[] {
  return PLATFORM_CONFIG.travel_platform.booking_flow;
}

export function getUserDashboardFeatures(): string[] {
  return PLATFORM_CONFIG.travel_platform.user_dashboard.features;
}
