"use client";

import NationwideEcosystemSection from "./NationwideEcosystemSection";
import { OriginalCanvasSection } from "./OriginalCanvasSection";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DESTINATIONS_DATA, HOLIDAY_PACKAGES_DATA } from "@/data/travelData";
import { FuelTollCalculator } from "@/components/travel/FuelTollCalculator";
import { HighwaySosModal } from "@/components/travel/HighwaySosModal";

interface StayItem {
  id: string;
  title: string;
  location: string;
  category: string;
  distance: string;
  dates: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  guestFavorite: boolean;
  image: string;
  gallery: string[];
  coords: { lat: number; lng: number };
  tag: string;
  description: string;
  host: {
    name: string;
    badge: string;
    responseTime: string;
    avatar: string;
  };
  amenities: string[];
}

interface EditorialHomepageProps {
  onOpenAiAgent: (initialQuery?: string) => void;
  onOpenBookingModal: (data?: any) => void;
}

export function EditorialHomepage({ onOpenAiAgent, onOpenBookingModal }: EditorialHomepageProps) {
  const router = useRouter();

  // Search Bar State
  const [searchDestination, setSearchDestination] = useState("");
  const [travelDate, setTravelDate] = useState("2026-12-15");
  const [travellersCount, setTravellersCount] = useState("2 Travellers");

  // Airbnb discovery active category state
  const [activeAirbnbCategory, setActiveAirbnbCategory] = useState("Iconic Stays");
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<StayItem | null>(null);

  // Quick View Modal & Lightbox
  const [quickViewStay, setQuickViewStay] = useState<StayItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Wishlist Drawer State
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [savedStays, setSavedStays] = useState<StayItem[]>([]);

  // Community Review Upvotes
  const [upvotes, setUpvotes] = useState<Record<number, number>>({ 0: 42, 1: 37, 2: 54, 3: 29 });
  const [userVoted, setUserVoted] = useState<Record<number, boolean>>({});

  // Floating AI companion quick question state
  const [aiQuickQuery, setAiQuickQuery] = useState("");

  // Airbnb Discovery Categories
  const airbnbCategories = [
    { id: "Iconic Stays", icon: "✨", label: "Iconic Stays" },
    { id: "Mountain Views", icon: "🏔️", label: "Mountain Views" },
    { id: "Villas & Pools", icon: "🏊‍♂️", label: "Villas & Pools" },
    { id: "Heritage Havelis", icon: "🏰", label: "Heritage Havelis" },
    { id: "Cabins & Cottages", icon: "🏡", label: "Cabins & Cottages" },
    { id: "Off-Grid Camping", icon: "⛺", label: "Off-Grid & Tents" },
    { id: "Beachfront", icon: "🏖️", label: "Beachfront" },
    { id: "Lakefront & Rivers", icon: "🛶", label: "Lakefront" },
    { id: "Boutique Farms", icon: "🌿", label: "Farms & Nature" },
  ];

  // Airbnb-style Stay Listings with Galleries, Superhosts & Amenities
  const airbnbStays: StayItem[] = [
    {
      id: "stay-1",
      title: "The Glass House on Dal Lake",
      location: "Srinagar, Kashmir",
      category: "Lakefront & Rivers",
      distance: "4.2 km from City Center",
      dates: "Dec 18 – 23",
      pricePerNight: 8500,
      rating: 4.96,
      reviews: 142,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 34.0837, lng: 74.7973 },
      tag: "Dal Lake Front",
      description: "Floor-to-ceiling panoramic glass windows facing snow-covered Pir Panjal peaks. Includes traditional Kashmiri wood fireplace, private cedar shikara transfers, and Kahwa breakfast on the lake terrace.",
      host: {
        name: "Bashir Ahmed",
        badge: "Superhost · 7 yrs hosting",
        responseTime: "Responds in under 10 minutes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Panoramic Lake View", "Starlink Wi-Fi", "Private Shikara Pickup", "Heated Bedrooms", "Traditional Fireplace", "Kashmiri Breakfast"],
    },
    {
      id: "stay-2",
      title: "Pine Crest Cedarwood Chalet",
      location: "Old Manali, Himachal Pradesh",
      category: "Mountain Views",
      distance: "Mountain Ridge View · 1.5 km to Mall",
      dates: "Dec 20 – 25",
      pricePerNight: 5200,
      rating: 4.98,
      reviews: 218,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 32.2432, lng: 77.1892 },
      tag: "Snow Peak Panorama",
      description: "Handcrafted pine and cedar chalet perched atop Old Manali ridge. Direct view of Solang Valley glaciers, wood-burning bukhari heating, organic apple orchard garden, and 4x4 snow vehicle support.",
      host: {
        name: "Vikram & Tanya",
        badge: "Superhost · 5 yrs hosting",
        responseTime: "Responds in 15 minutes",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Snow Glacier Views", "Indoor Bukhari Fireplace", "Apple Orchard Garden", "High-Speed Wi-Fi", "4x4 Snow Car Parking", "Pet Friendly"],
    },
    {
      id: "stay-3",
      title: "Casa Amor Heritage Portuguese Villa",
      location: "Assagao, North Goa",
      category: "Villas & Pools",
      distance: "Private Plunge Pool · 10 min to Vagator",
      dates: "Jan 04 – 09",
      pricePerNight: 14500,
      rating: 4.92,
      reviews: 95,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 15.5898, lng: 73.7744 },
      tag: "Entire Villa · 3 Beds",
      description: "Restored 19th-century Portuguese estate nestled in verdant Assagao. Features high vaulted ceilings, private emerald plunge pool, tropical garden patio, and in-house Goan home-style culinary chef.",
      host: {
        name: "Maria Fernandes",
        badge: "Superhost · 6 yrs hosting",
        responseTime: "Responds in 20 minutes",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Private Plunge Pool", "Dedicated In-House Chef", "Tropical Courtyard", "High-Speed Fibre Wi-Fi", "Bicycle Fleet Included", "Air Conditioned"],
    },
    {
      id: "stay-4",
      title: "Rawla Haveli Royal Heritage Suite",
      location: "Jaipur, Rajasthan",
      category: "Heritage Havelis",
      distance: "Historic Courtyard · 5 min to Hawa Mahal",
      dates: "Dec 22 – 27",
      pricePerNight: 6800,
      rating: 4.88,
      reviews: 164,
      guestFavorite: false,
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 26.9124, lng: 75.7873 },
      tag: "Royal Courtyard",
      description: "Authentic Rajput haveli with hand-painted fresco arches, marble courtyards, evening sitar recitals, and rooftop dining overlooking the Amber Fort mountain ridges.",
      host: {
        name: "Ranveer Singh",
        badge: "Heritage Host · 9 yrs",
        responseTime: "Responds in 1 hour",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Rooftop Fort View", "Rajasthani Breakfast Included", "Evening Folk Recital", "Vintage Jeep Tours", "Free Valet Parking", "Fresco Interior"],
    },
    {
      id: "stay-5",
      title: "Wilderness Stargazing Dome & Campsite",
      location: "Pangong Tso, Ladakh",
      category: "Off-Grid Camping",
      distance: "Heated Geodesic Domes · Lakefront",
      dates: "May 10 – 15",
      pricePerNight: 7200,
      rating: 4.94,
      reviews: 82,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 33.7595, lng: 78.6674 },
      tag: "Milky Way Stargazing",
      description: "Insulated transparent geodesic domes perched directly on the turquoise shores of Pangong Lake at 14,270 ft. Clear view of the Milky Way galaxy, heated blankets, and on-site medical oxygen concentrator.",
      host: {
        name: "Stanzin & Tenzing",
        badge: "Ladakh Explorer · 8 yrs",
        responseTime: "Responds in 30 minutes",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Telescope Stargazing", "Heated Thermal Blankets", "24/7 Medical Oxygen Support", "Warm Tibetan Meals", "Lakefront Sunset Deck"],
    },
    {
      id: "stay-6",
      title: "Riverstone Glade Treehouse & Homestay",
      location: "Jibhi, Tirthan Valley",
      category: "Cabins & Cottages",
      distance: "Forest Stream Trail · Pine Wood Interior",
      dates: "Dec 15 – 20",
      pricePerNight: 4600,
      rating: 4.97,
      reviews: 133,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 31.6366, lng: 77.3491 },
      tag: "Himalayan Stream",
      description: "Dual-level wooden treehouse built among cedar trees next to a gushing freshwater Himalayan stream. Waterfall hiking trails, campfire barbecue, and trout fishing permits.",
      host: {
        name: "Hemraj Sharma",
        badge: "Superhost · 4 yrs",
        responseTime: "Responds in 15 minutes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Freshwater Stream Access", "Bonfire & BBQ Setup", "Nature Waterfall Trail", "Starlink Wi-Fi", "Homemade Himachali Food", "Balcony Hammock"],
    },
    {
      id: "stay-7",
      title: "The Coconut Grove Lagoon Houseboat",
      location: "Kumarakom, Kerala",
      category: "Lakefront & Rivers",
      distance: "Private Sunset Deck · Personal Chef",
      dates: "Jan 12 – 16",
      pricePerNight: 9800,
      rating: 4.91,
      reviews: 104,
      guestFavorite: true,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 9.6175, lng: 76.4301 },
      tag: "Private Houseboat",
      description: "Eco-crafted traditional Kettuvallam cruising through Vembanad lake backwaters. Captain, personal chef preparing Karimeen pollichathu on deck, and air-conditioned luxury suites.",
      host: {
        name: "Captain Varghese",
        badge: "Master Navigator · 12 yrs",
        responseTime: "Responds in 25 minutes",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Private Captain & Chef", "Vembanad Lake Cruise", "Sunset Upper Deck", "Air Conditioned Bedrooms", "Ayurvedic Massage on Demand"],
    },
    {
      id: "stay-8",
      title: "Ananda Foothills Eco Yoga Sanctuary",
      location: "Tapovan, Rishikesh",
      category: "Boutique Farms",
      distance: "Ganga Valley Panorama · Organic Cafe",
      dates: "Dec 16 – 21",
      pricePerNight: 5400,
      rating: 4.89,
      reviews: 177,
      guestFavorite: false,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      ],
      coords: { lat: 30.0869, lng: 78.2676 },
      tag: "Ayurvedic Spa & Yoga",
      description: "Nestled in the lush hills above Laxman Jhula with unobstructed views of the sacred Ganges. Sunrise meditation shala, certified sound bath healers, and organic farm-to-table vegetarian cafe.",
      host: {
        name: "Acharya Devrat",
        badge: "Wellness Guide · 10 yrs",
        responseTime: "Responds in under 1 hour",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      amenities: ["Ganga River Panorama", "Sunrise Yoga Shala", "Ayurvedic Spa Treatments", "Organic Farm Cafe", "Silent Meditation Garden", "Starlink Wi-Fi"],
    },
  ];

  // Sync Saved Wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const stored = localStorage.getItem("lotr_saved_stays");
        if (stored) {
          const parsed = JSON.parse(stored);
          setSavedStays(Array.isArray(parsed) ? parsed : []);
        } else {
          // Pre-populate with first stay for initial demo
          setSavedStays([airbnbStays[1]]);
          localStorage.setItem("lotr_saved_stays", JSON.stringify([airbnbStays[1]]));
        }
      } catch {
        setSavedStays([]);
      }
    };

    loadWishlist();

    const handleOpenDrawerEvent = () => setShowWishlistDrawer(true);
    window.addEventListener("lotr-open-wishlist-drawer", handleOpenDrawerEvent);

    return () => {
      window.removeEventListener("lotr-open-wishlist-drawer", handleOpenDrawerEvent);
    };
  }, []);

  const toggleWishlist = (stay: StayItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: StayItem[] = [];
    const exists = savedStays.some((s) => s.id === stay.id);
    if (exists) {
      updated = savedStays.filter((s) => s.id !== stay.id);
    } else {
      updated = [...savedStays, stay];
      setShowWishlistDrawer(true); // Open drawer on save
    }
    setSavedStays(updated);
    try {
      localStorage.setItem("lotr_saved_stays", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("lotr-wishlist-updated"));
    } catch {}
  };

  const isStaySaved = (stayId: string) => savedStays.some((s) => s.id === stayId);

  const openQuickView = (stay: StayItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setQuickViewStay(stay);
    setActivePhotoIndex(0);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = searchDestination.trim() || "Manali";
    router.push(`/destinations?search=${encodeURIComponent(dest)}`);
  };

  const handleAiQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuickQuery.trim()) return;
    onOpenAiAgent(aiQuickQuery.trim());
    setAiQuickQuery("");
  };

  const handleUpvote = (idx: number) => {
    if (userVoted[idx]) return;
    setUpvotes((prev) => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
    setUserVoted((prev) => ({ ...prev, [idx]: true }));
  };

  const filteredStays =
    activeAirbnbCategory === "Iconic Stays"
      ? airbnbStays
      : airbnbStays.filter(
          (s) =>
            s.category.toLowerCase().includes(activeAirbnbCategory.toLowerCase()) ||
            activeAirbnbCategory.toLowerCase().includes(s.category.toLowerCase())
        );

  return (
    <div className="w-full bg-[#FAF8F4] text-[#242A28]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full bg-[#1F0605] text-[#F7F4EC] pt-8 sm:pt-14 pb-14 sm:pb-20">
        {/* Background Layer with Dark Artistic Tint (overflow-hidden scoped to image only) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic Himalayan Ridge"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F0605]/85 via-[#2A0804]/60 to-[#1F0605]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Top Tagline / Category Highlights */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F4]/10 backdrop-blur-md border border-[#FAF8F4]/20 text-[#FAF8F4] text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#EE6C19] animate-ping" />
            <span>Don&apos;t Just Book a Trip. Live the Journey.</span>
          </div>

          {/* Hero Central Editorial Headline */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#EE6C19]">
              Lord of the Road · Curated Journeys
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Your Journey <i className="font-normal font-serif text-[#EE6C19]">Begins Here.</i>
            </h1>
            <p className="text-xs sm:text-base text-[#FED7AA] max-w-xl font-light leading-relaxed">
              Discover Airbnb-style mountain chalets, plan road adventures, and explore untouched India with your 24/7 personal AI travel companion.
            </p>
          </div>

          {/* Quick AI Prompt Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-[#EDE5D8]/80 font-mono">Ask AI:</span>
            {[
              "Plan my 5-day Manali trip",
              "Find bike rentals in Leh",
              "Suggest hidden places in Uttarakhand",
              "Affordable private pool villas in Goa",
            ].map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onOpenAiAgent(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C5A66A] hover:text-[#173B32] transition-colors border border-white/15 text-[#F7F4EC] backdrop-blur-xs cursor-pointer"
              >
                ✦ {prompt}
              </button>
            ))}
          </div>

          {/* Structured Search Panel (Airbnb Style Pill Search - Fully Visible & Clean) */}
          <div className="pt-2 sm:pt-4">
            <form
              id="airbnb-search-bar"
              onSubmit={handleHeroSearch}
              className="bg-white rounded-3xl sm:rounded-full p-3 sm:p-3.5 shadow-2xl border-2 border-white/90 grid grid-cols-1 sm:grid-cols-12 gap-2 text-[#242A28] items-center"
            >
              {/* Where to */}
              <div className="sm:col-span-4 px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-[#E7E6E0]">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#737B76]">
                  Where to?
                </label>
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder="Manali, Spiti, Goa, Kashmir..."
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#173B32] focus:outline-none placeholder:text-gray-400 py-0.5"
                />
              </div>

              {/* When */}
              <div className="sm:col-span-3 px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-[#E7E6E0]">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#737B76]">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#173B32] focus:outline-none py-0.5"
                />
              </div>

              {/* Who */}
              <div className="sm:col-span-3 px-4 py-1.5 border-b sm:border-b-0 sm:border-r border-[#E7E6E0]">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#737B76]">
                  Travellers
                </label>
                <select
                  value={travellersCount}
                  onChange={(e) => setTravellersCount(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#173B32] focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="1 Solo Traveller">1 Solo Traveller</option>
                  <option value="2 Travellers">2 Travellers (Couple)</option>
                  <option value="3-5 Travellers">3–5 Travellers (Group)</option>
                  <option value="6+ Travellers">6+ Travellers (Family)</option>
                </select>
              </div>

              {/* Explore Button */}
              <div className="sm:col-span-2 p-1">
                <button
                  type="submit"
                  className="w-full h-11 sm:h-12 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#BA1E04] via-[#CD2306] to-[#EE6C19] hover:brightness-110 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#FBF774]/30"
                >
                  <span>Search</span>
                  <span className="text-base font-bold">➔</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Original Heritage & Canvas Section from Original Design */}
      <OriginalCanvasSection />

      {/* 2. AIRBNB-STYLE CATEGORY BAR & MAP TOGGLE */}
      <section className="py-3.5 border-b border-[#E7E6E0] bg-white sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2">
          {/* Horizontal Category Scroller */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 flex-1">
            {airbnbCategories.map((cat) => {
              const active = activeAirbnbCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveAirbnbCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all cursor-pointer shrink-0 border ${
                    active
                      ? "border-[#173B32] bg-[#173B32] text-white shadow-xs"
                      : "border-transparent text-[#737B76] hover:text-[#173B32] hover:bg-[#FAF8F4]"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-[11px] font-semibold whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Airbnb Floating Map Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMapModal(!showMapModal)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#173B32] text-white text-xs font-bold shadow-lg hover:bg-[#287C70] transition shrink-0 cursor-pointer"
          >
            <span>{showMapModal ? "📋 Show List" : "🗺️ Show Map"}</span>
          </button>
        </div>
      </section>

      {/* 3. AIRBNB-STYLE LISTINGS & SPLIT-MAP SECTION */}
      <section id="airbnb-stays-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173B32]">
              {activeAirbnbCategory} Across India
            </h2>
            <p className="text-xs text-[#737B76] mt-0.5">
              Verified private stays, hill chalets, and heritage boutique estates. Click any stay for photo preview or direct checkout.
            </p>
          </div>
          <span className="text-xs text-[#737B76] font-medium hidden sm:inline">
            Showing {filteredStays.length} hand-picked stays
          </span>
        </div>

        {/* Layout: Normal Grid vs Split Map Mode */}
        {showMapModal ? (
          /* Split View with Interactive Map */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 cols: Listings */}
            <div className="lg:col-span-6 space-y-6 max-h-[82vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredStays.map((stay) => (
                  <div
                    key={stay.id}
                    onMouseEnter={() => setSelectedMapPin(stay)}
                    onClick={() => openQuickView(stay)}
                    className="bg-white rounded-2xl border border-[#E7E6E0] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group cursor-pointer"
                  >
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={stay.image}
                        alt={stay.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {stay.guestFavorite && (
                        <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#173B32] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          Guest favorite
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(stay, e)}
                        className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-xs transition shadow-sm ${
                          isStaySaved(stay.id)
                            ? "bg-red-500 text-white"
                            : "bg-black/30 hover:bg-black/50 text-white"
                        }`}
                        title="Save to wishlist"
                      >
                        ❤️
                      </button>
                      <span className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                        ★ {stay.rating}
                      </span>
                    </div>

                    <div className="p-3.5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-[#173B32]">
                          <span className="truncate">{stay.location}</span>
                        </div>
                        <h4 className="text-xs text-[#737B76] line-clamp-1 mt-0.5">{stay.title}</h4>
                        <p className="text-[11px] text-[#737B76] mt-0.5">{stay.dates}</p>
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-[#E7E6E0] flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-[#173B32]">
                            ₹{stay.pricePerNight.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-[#737B76]"> night</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/checkout?item=${encodeURIComponent(stay.title)}&price=${stay.pricePerNight}&travellers=2`
                            );
                          }}
                          className="px-3 py-1 rounded-lg bg-[#173B32] text-white text-[10px] font-bold hover:bg-[#287C70] transition"
                        >
                          Book ➔
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 cols: Sticky Interactive Airbnb Map */}
            <div className="lg:col-span-6 sticky top-24 h-[80vh] rounded-3xl overflow-hidden border border-[#E7E6E0] bg-[#e5e3df] shadow-md relative flex flex-col justify-between p-4">
              {/* Map Canvas Background Simulation */}
              <div
                className="absolute inset-0 bg-cover bg-center filter saturate-75 brightness-95"
                style={{
                  backgroundImage:
                    "radial-gradient(#d3cfc7 1.5px, transparent 1.5px), radial-gradient(#d3cfc7 1.5px, #f2efe9 1.5px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Map Top Header */}
              <div className="relative z-10 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E7E6E0] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#173B32]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Live Map View · {filteredStays.length} Verified Properties</span>
                </div>
                <span className="text-[10px] font-mono text-[#737B76]">Pan India</span>
              </div>

              {/* Simulated Map Price Pills (Airbnb Style) */}
              <div className="relative z-10 flex-1 flex flex-wrap items-center justify-around p-6 gap-6">
                {filteredStays.slice(0, 6).map((stay, idx) => {
                  const isSelected = selectedMapPin?.id === stay.id;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedMapPin(stay);
                        openQuickView(stay);
                      }}
                      className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-md transform hover:scale-110 cursor-pointer ${
                        isSelected
                          ? "bg-[#173B32] text-white ring-4 ring-[#C5A66A]/40 scale-110 z-20"
                          : "bg-white text-[#173B32] hover:bg-[#173B32] hover:text-white"
                      }`}
                    >
                      ₹{(stay.pricePerNight / 1000).toFixed(1)}k
                    </button>
                  );
                })}
              </div>

              {/* Selected Pin Bottom Card */}
              {selectedMapPin && (
                <div className="relative z-10 bg-white rounded-2xl p-3 border border-[#E7E6E0] shadow-xl flex items-center gap-3 animate-fadeIn">
                  <img
                    src={selectedMapPin.image}
                    alt={selectedMapPin.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#C5A66A] uppercase tracking-wider block">
                      ★ {selectedMapPin.rating} · {selectedMapPin.tag}
                    </span>
                    <h4 className="text-xs font-bold text-[#173B32] truncate">{selectedMapPin.title}</h4>
                    <p className="text-xs font-bold text-[#173B32]">
                      ₹{selectedMapPin.pricePerNight.toLocaleString("en-IN")}{" "}
                      <span className="text-[10px] font-normal text-[#737B76]">night</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/checkout?item=${encodeURIComponent(selectedMapPin.title)}&price=${selectedMapPin.pricePerNight}&travellers=2`
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-[#173B32] text-white text-[10px] font-bold shrink-0 hover:bg-[#287C70] transition"
                  >
                    Reserve ➔
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Standard 4-Column Clean Airbnb Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStays.map((stay) => {
              const saved = isStaySaved(stay.id);
              return (
                <div
                  key={stay.id}
                  className="group flex flex-col cursor-pointer"
                  onClick={() => openQuickView(stay)}
                >
                  {/* Visual Square Card Image with Heart & Guest Favorite */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={stay.image}
                      alt={stay.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {stay.guestFavorite && (
                      <span className="absolute top-3 left-3 bg-white/95 text-[#173B32] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        Guest favorite
                      </span>
                    )}

                    {/* Quick View Eye Pill on hover */}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#173B32] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <span>👁️</span>
                      <span>Quick View</span>
                    </span>

                    {/* Heart Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(stay, e)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition shadow-md ${
                        saved ? "bg-red-500 text-white scale-110" : "bg-black/30 hover:bg-black/50 text-white"
                      }`}
                      aria-label="Save to wishlist"
                      title={saved ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      ❤️
                    </button>
                    <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      {stay.tag}
                    </span>
                  </div>

                  {/* Clean Metadata Layout */}
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-[#173B32] truncate">{stay.location}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#173B32]">
                      <span>★</span>
                      <span>{stay.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#737B76] line-clamp-1 mt-0.5">{stay.title}</p>
                  <p className="text-xs text-[#737B76] mt-0.5">{stay.dates}</p>

                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-base font-bold text-[#173B32]">
                        ₹{stay.pricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#737B76]">night</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/checkout?item=${encodeURIComponent(stay.title)}&price=${stay.pricePerNight}&travellers=2`
                        );
                      }}
                      className="text-[11px] font-bold text-[#173B32] hover:text-[#B7955B] underline"
                    >
                      Direct Book ➔
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. POPULAR DESTINATIONS EDITORIAL TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#E7E6E0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A66A]">
              Signature Escapes
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173B32] mt-2">
              Popular Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#173B32] hover:text-[#287C70] uppercase tracking-wider"
          >
            <span>View All Destinations</span>
            <span>➔</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DESTINATIONS_DATA.slice(0, 3).map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E6E0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-gray-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#173B32] uppercase tracking-wider">
                  {dest.category} · {dest.duration}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-bold leading-snug">{dest.name}</h3>
                  <p className="text-xs text-[#EDE5D8] line-clamp-1 mt-1 font-light">{dest.tagline}</p>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between text-xs border-t border-[#E7E6E0]">
                <div>
                  <span className="text-[#737B76] block text-[10px] uppercase font-bold">Estimated Trip</span>
                  <span className="font-serif text-lg font-bold text-[#173B32]">
                    ₹{dest.startingPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#E7E6E0] font-bold text-[#173D32] group-hover:bg-[#173D32] group-hover:text-white transition">
                  Explore ➔
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. ADVENTURE & ROAD TRIPS (Bike & Car Focus) */}
      <section className="bg-[#173B32] text-[#F7F4EC] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A66A]">
                The Open Road
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
                Adventure & Road Trips
              </h2>
              <p className="text-sm text-[#EDE5D8] max-w-xl mt-2 font-light">
                Motorcycle expeditions, self-drive 4x4 trails, verified highway mechanics, and hill-certified pitstops across the Himalayas.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <button
              type="button"
              onClick={() => setShowSosModal(true)}
              className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center gap-1.5 animate-pulse"
            >
              <span>🚨</span>
              <span>Highway SOS & Pitstops</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAiAgent("I want to travel from Delhi to Manali on a bike")}
              className="mt-4 md:mt-0 px-5 py-2.5 rounded-full bg-[#C5A66A] text-[#173B32] font-bold text-xs uppercase tracking-wider hover:bg-white transition cursor-pointer"
            >
              Plan Road Trip with AI ➔
            </button>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Delhi to Manali & Atal Tunnel",
                distance: "540 km · 4 Days",
                image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
                desc: "NH-44 through Murthal dhabas, Kiratpur expressway, Aut tunnel, and Rohtang valley snow passes.",
                tag: "Motorcycle Classic",
              },
              {
                title: "Manali to Leh — High Mountain Passes",
                distance: "428 km · 7 Days",
                image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
                desc: "Baralacha La, Tanglang La & Gata Loops. Mandatory mechanic checkup and acclimatization stops.",
                tag: "High-Altitude Epic",
              },
              {
                title: "Rishikesh to Chopta & Tungnath",
                distance: "210 km · 3 Days",
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                desc: "Devprayag sangam, pine forests of Sari village, and the highest Shiva temple on earth.",
                tag: "Spiritual Trail",
              },
            ].map((route, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-[#C5A66A] transition-colors"
              >
                <div>
                  <div className="h-48 rounded-2xl overflow-hidden mb-5">
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A] bg-[#C5A66A]/10 px-2.5 py-1 rounded-md">
                    {route.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-2.5 mb-1.5">{route.title}</h3>
                  <p className="text-xs text-[#EDE5D8]/80 leading-relaxed">{route.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#EDE5D8] font-mono">{route.distance}</span>
                  <button
                    type="button"
                    onClick={() => onOpenAiAgent(`Plan road trip for ${route.title}`)}
                    className="text-[#C5A66A] font-bold hover:underline cursor-pointer"
                  >
                    Get Route & Mechanics ➔
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Fuel & Toll Cost Calculator (High-Impact Upgrade) */}
          <div className="mt-12 text-[#242A28]">
            <FuelTollCalculator onOpenAi={(prompt) => onOpenAiAgent(prompt)} />
          </div>
        </div>
      </section>

      {/* 6. AI-POWERED TRIP PLANNER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-white rounded-3xl border border-[#E7E6E0] p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A66A]">
              Intelligent Itineraries
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173B32]">
              AI-Powered Trip Planner
            </h2>
            <p className="text-sm text-[#737B76] leading-relaxed">
              No generic brochures. Tell our travel agent your group size, vehicle choice, budget, and travel preferences. In seconds, get day-wise itineraries, verified homestays, fuel budgets, and direct booking links.
            </p>

            <div className="space-y-2 pt-2">
              {[
                "✓ Real-time route optimization with highway pit stops & fuel stations",
                "✓ Verified emergency mechanics and mobile repair van dispatch",
                "✓ Transparent budget breakdown with zero hidden booking charges",
                "✓ Dual English and Hindi conversational assistance",
              ].map((feat, fi) => (
                <div key={fi} className="text-xs text-[#242A28] font-medium flex items-center gap-2">
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenAiAgent("Plan my 5-day Manali trip")}
                className="px-6 py-3 rounded-full bg-[#173B32] hover:bg-[#287C70] text-white text-xs font-bold tracking-wider uppercase transition shadow-sm cursor-pointer"
              >
                Launch AI Planner ➔
              </button>
              <Link
                href="/travel-agent"
                className="px-6 py-3 rounded-full bg-[#FAF8F4] border border-[#E7E6E0] text-[#173D32] hover:bg-[#EDE5D8] text-xs font-bold tracking-wider uppercase transition"
              >
                Full Workspace Screen ↗
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FAF8F4] rounded-2xl p-5 border border-[#E7E6E0] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E6E0]">
              <span className="font-bold text-[#173B32]">LIVE TRIP SIMULATION</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                ● AI ACTIVE
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E7E6E0] space-y-1">
              <span className="text-[#C5A66A] font-bold text-[10px]">USER PROMPT:</span>
              <p className="text-[#173B32] font-semibold">“I want to travel from Delhi to Manali on a bike.”</p>
            </div>

            <div className="bg-[#173B32] text-[#F7F4EC] p-3.5 rounded-xl space-y-2">
              <span className="text-[#C5A66A] font-bold text-[10px]">AI COMPANION RESPONSE:</span>
              <p className="text-xs leading-relaxed font-sans">
                “Great! Let&apos;s plan your adventure. I can help you with the route, bike rentals, fuel stops, sightseeing, accommodation, and emergency mechanic support.”
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-sans pt-1">
                <div className="bg-white/10 p-2 rounded">
                  <b>Day 1:</b> Delhi to Bilaspur (250 km) via Murthal
                </div>
                <div className="bg-white/10 p-2 rounded">
                  <b>Day 2:</b> Bilaspur to Manali (180 km) via Aut Tunnel
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRAVELER SOCIAL PROOF & COMMUNITY FIELD NOTES (HIGH-IMPACT UPGRADE) */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#E7E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A66A]">
              Community Field Notes & Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173B32] mt-2">
              Real Journeys, Verified Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#737B76] mt-3">
              Unfiltered feedback and captured moments from travelers who journeyed across India with Lord of the Road.
            </p>

            {/* 4 Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E7E6E0]">
              <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]/60">
                <span className="font-serif text-2xl font-bold text-[#173B32] block">4.95 ★</span>
                <span className="text-[10px] uppercase font-bold text-[#737B76]">Average Rating</span>
              </div>
              <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]/60">
                <span className="font-serif text-2xl font-bold text-[#173B32] block">18,400+</span>
                <span className="text-[10px] uppercase font-bold text-[#737B76]">Journeys Curated</span>
              </div>
              <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]/60">
                <span className="font-serif text-2xl font-bold text-[#173B32] block">100%</span>
                <span className="text-[10px] uppercase font-bold text-[#737B76]">Verified Stays</span>
              </div>
              <div className="p-3 bg-[#FAF8F4] rounded-2xl border border-[#E7E6E0]/60">
                <span className="font-serif text-2xl font-bold text-[#173B32] block">24 / 7</span>
                <span className="text-[10px] uppercase font-bold text-[#737B76]">Roadside Concierge</span>
              </div>
            </div>
          </div>

          {/* 4 Verified Reviews Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Arjun & Neha Sharma",
                city: "Bengaluru",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                trip: "Pine Crest Cedarwood Chalet, Manali",
                tag: "Verified Stay · 5 Nights",
                photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
                rating: 5,
                comment:
                  "The AI consultant planned our 5-day route and suggested this hidden chalet. The cedarwood aroma, bukhari heating, and snow peak sunrise were unreal. Direct checkout made booking instant!",
              },
              {
                name: "Pooja Malhotra",
                city: "Mumbai",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
                trip: "Casa Amor Portuguese Villa, Goa",
                tag: "Verified Stay · 4 Nights",
                photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
                rating: 5,
                comment:
                  "Instead of a generic crowded resort, we got this serene 3-bedroom private villa with our own plunge pool and private chef. The concierge team handled every detail seamlessly.",
              },
              {
                name: "Kabir Sen",
                city: "New Delhi",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                trip: "Wilderness Stargazing Dome, Ladakh",
                tag: "Verified Stay · 3 Nights",
                photo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
                rating: 5,
                comment:
                  "Stargazing at 14,000 feet right on Pangong Lake! The heated geodesic dome and on-site medical oxygen gave us total peace of mind. Truly unforgettable adventure.",
              },
              {
                name: "Dr. Ananya Deshmukh",
                city: "Pune",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
                trip: "The Glass House on Dal Lake, Srinagar",
                tag: "Verified Stay · 4 Nights",
                photo: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80",
                rating: 5,
                comment:
                  "Waking up to shikaras gliding past our glass terrace was magical. Warm kahwa every morning, heated rooms, and private transfers from Srinagar airport without any hassle.",
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F4] rounded-3xl border border-[#E7E6E0] p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Photo captured during stay */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-gray-200">
                    <img src={rev.photo} alt={rev.trip} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                      📸 Captured by Guest
                    </span>
                  </div>

                  {/* Rating & Trip Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-500 text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      ✓ {rev.tag}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-[#242A28] leading-relaxed italic mb-4">
                    “{rev.comment}”
                  </p>
                </div>

                {/* Reviewer Bio & Upvote */}
                <div className="pt-3 border-t border-[#E7E6E0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#173B32] leading-tight">{rev.name}</h4>
                      <span className="text-[10px] text-[#737B76]">{rev.city}</span>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    type="button"
                    onClick={() => handleUpvote(idx)}
                    className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border transition cursor-pointer ${
                      userVoted[idx]
                        ? "bg-[#173B32] text-white border-[#173B32]"
                        : "bg-white text-[#737B76] border-[#E7E6E0] hover:text-[#173B32]"
                    }`}
                  >
                    <span>👍</span>
                    <span className="font-semibold">{upvotes[idx] || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SPECIAL HOLIDAY PACKAGES */}
      <section className="bg-[#FAF8F4] py-16 sm:py-24 border-t border-[#E7E6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A66A]">
                All-Inclusive Journeys
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#173B32] mt-2">
                Special Holiday Packages
              </h2>
            </div>
            <Link
              href="/holiday-packages"
              className="mt-4 md:mt-0 text-xs font-bold text-[#173D32] hover:text-[#287C70] uppercase tracking-wider"
            >
              View All 15+ Packages ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HOLIDAY_PACKAGES_DATA.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#173D32]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </span>
                  <span className="absolute top-3 right-3 bg-[#C5A66A] text-[#173B32] text-[10px] font-bold px-2 py-0.5 rounded">
                    ★ {pkg.rating}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs text-[#737B76]">📍 {pkg.destination}</span>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] mt-1 mb-3 group-hover:text-[#287C70] transition">
                      {pkg.title}
                    </h3>
                    <div className="space-y-1 mb-4">
                      {pkg.highlights.slice(0, 2).map((hl, hli) => (
                        <p key={hli} className="text-xs text-[#737B76] line-clamp-1">
                          ✓ {hl}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E7E6E0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#737B76] block">Per person</span>
                      <span className="font-serif text-2xl font-bold text-[#173D32]">
                        ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/checkout?item=${encodeURIComponent(pkg.title)}&price=${pkg.pricePerPerson}&travellers=2`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Book Now ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL 1: STAY QUICK-VIEW PHOTO LIGHTBOX MODAL (HIGH-IMPACT UPGRADE)
         ========================================================================= */}
      {quickViewStay && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setQuickViewStay(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E7E6E0] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close Bar */}
            <div className="p-4 sm:p-6 border-b border-[#E7E6E0] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#C5A66A] uppercase tracking-wider">
                    {quickViewStay.category}
                  </span>
                  {quickViewStay.guestFavorite && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Guest Favorite
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173B32]">
                  {quickViewStay.title}
                </h3>
                <p className="text-xs text-[#737B76]">{quickViewStay.location} · {quickViewStay.distance}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleWishlist(quickViewStay, e)}
                  className={`p-2.5 rounded-full border transition ${
                    isStaySaved(quickViewStay.id)
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-[#FAF8F4] text-[#173B32] border-[#E7E6E0] hover:border-[#173B32]"
                  }`}
                  title="Save to wishlist"
                >
                  ❤️
                </button>
                <button
                  type="button"
                  onClick={() => setQuickViewStay(null)}
                  className="w-9 h-9 rounded-full bg-[#FAF8F4] hover:bg-[#EDE5D8] text-[#173B32] flex items-center justify-center font-bold text-sm transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Photo Lightbox Carousel */}
            <div className="p-4 sm:p-6 space-y-3">
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-black/5">
                <img
                  src={quickViewStay.gallery[activePhotoIndex] || quickViewStay.image}
                  alt={quickViewStay.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Nav Arrows */}
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === 0 ? quickViewStay.gallery.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#173B32] flex items-center justify-center font-bold shadow-md"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === quickViewStay.gallery.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#173B32] flex items-center justify-center font-bold shadow-md"
                >
                  ›
                </button>

                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-mono px-2.5 py-1 rounded-md">
                  {activePhotoIndex + 1} / {quickViewStay.gallery.length} Photos
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickViewStay.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIndex(i)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activePhotoIndex === i ? "border-[#173B32] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details & Instant Reserve Grid */}
            <div className="p-4 sm:p-6 border-t border-[#E7E6E0] grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAF8F4]/50">
              {/* Left Column: Host & Amenities */}
              <div className="lg:col-span-7 space-y-4">
                {/* Host Card */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E7E6E0]">
                  <img
                    src={quickViewStay.host.avatar}
                    alt={quickViewStay.host.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#173B32]">
                      Hosted by {quickViewStay.host.name}
                    </h4>
                    <span className="text-xs text-emerald-800 font-semibold block">
                      ★ {quickViewStay.host.badge}
                    </span>
                    <span className="text-[11px] text-[#737B76]">
                      {quickViewStay.host.responseTime}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#242A28] leading-relaxed">
                  {quickViewStay.description}
                </p>

                {/* Amenities */}
                <div>
                  <h5 className="text-[11px] uppercase font-bold text-[#737B76] tracking-wider mb-2">
                    What this place offers
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {quickViewStay.amenities.map((am, ai) => (
                      <div
                        key={ai}
                        className="flex items-center gap-2 text-xs text-[#173B32] bg-white p-2 rounded-xl border border-[#E7E6E0]"
                      >
                        <span className="text-emerald-700">✓</span>
                        <span className="truncate">{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Checkout */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E7E6E0] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between pb-3 border-b border-[#E7E6E0]">
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#173B32]">
                        ₹{quickViewStay.pricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#737B76]"> / night</span>
                    </div>
                    <span className="text-xs font-bold text-[#173B32]">
                      ★ {quickViewStay.rating} ({quickViewStay.reviews} reviews)
                    </span>
                  </div>

                  {/* Stay Calculation */}
                  <div className="py-3 space-y-2 text-xs text-[#737B76]">
                    <div className="flex justify-between">
                      <span>₹{quickViewStay.pricePerNight.toLocaleString("en-IN")} × 2 nights</span>
                      <span className="text-[#173B32] font-semibold">
                        ₹{(quickViewStay.pricePerNight * 2).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning & Sanitization</span>
                      <span className="text-[#173B32] font-semibold">₹500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lord of the Road Service Fee</span>
                      <span className="text-[#173B32] font-semibold">₹420</span>
                    </div>
                    <div className="pt-2 border-t border-[#E7E6E0] flex justify-between text-sm font-bold text-[#173B32]">
                      <span>Total (Before taxes)</span>
                      <span>
                        ₹{(quickViewStay.pricePerNight * 2 + 920).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickViewStay(null);
                      router.push(
                        `/checkout?item=${encodeURIComponent(quickViewStay.title)}&price=${quickViewStay.pricePerNight}&travellers=2`
                      );
                    }}
                    className="w-full py-3 rounded-xl bg-[#173B32] hover:bg-[#287C70] text-white font-bold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Instant Reserve</span>
                    <span>➔</span>
                  </button>
                  <p className="text-[10px] text-center text-[#737B76]">
                    You won&apos;t be charged until booking confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: HIGHWAY SOS & RAPID ASSISTANCE MODAL (HIGH-IMPACT UPGRADE)
         ========================================================================= */}
      <NationwideEcosystemSection />

      <HighwaySosModal isOpen={showSosModal} onClose={() => setShowSosModal(false)} />

      {/* =========================================================================
          DRAWER 2: WISHLIST / SAVED TRIPS SLIDE-OVER DRAWER (HIGH-IMPACT UPGRADE)
         ========================================================================= */}
      {showWishlistDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setShowWishlistDrawer(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E7E6E0] flex items-center justify-between bg-[#FAF8F4]">
              <div className="flex items-center gap-2">
                <span className="text-xl">❤️</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#173B32]">Your Saved Wishlist</h3>
                  <span className="text-[11px] text-[#737B76]">{savedStays.length} properties saved</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWishlistDrawer(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-sm font-bold text-[#173B32] border border-[#E7E6E0]"
              >
                ✕
              </button>
            </div>

            {/* Stays List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {savedStays.length === 0 ? (
                <div className="text-center py-16 text-[#737B76] space-y-3">
                  <span className="text-4xl block">🤍</span>
                  <p className="text-sm font-medium">Your wishlist is currently empty.</p>
                  <p className="text-xs">Click the heart ❤️ on any stay card to save it for your next trip!</p>
                </div>
              ) : (
                savedStays.map((stay) => (
                  <div
                    key={stay.id}
                    className="flex gap-3 p-3 rounded-2xl border border-[#E7E6E0] hover:border-[#173B32] transition bg-white"
                  >
                    <img
                      src={stay.image}
                      alt={stay.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#173B32] truncate">
                            {stay.location}
                          </span>
                          <span className="text-[10px] font-bold text-[#C5A66A]">
                            ★ {stay.rating}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#173B32] truncate mt-0.5">{stay.title}</h4>
                        <span className="text-xs font-bold text-[#173B32] block mt-1">
                          ₹{stay.pricePerNight.toLocaleString("en-IN")}{" "}
                          <span className="text-[10px] font-normal text-[#737B76]">/ night</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowWishlistDrawer(false);
                            router.push(
                              `/checkout?item=${encodeURIComponent(stay.title)}&price=${stay.pricePerNight}&travellers=2`
                            );
                          }}
                          className="text-[10px] font-bold text-white bg-[#173B32] hover:bg-[#287C70] px-3 py-1 rounded-lg"
                        >
                          Book ➔
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(stay)}
                          className="text-[10px] text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E7E6E0] bg-[#FAF8F4] space-y-2">
              <Link
                href="/saved-trips"
                onClick={() => setShowWishlistDrawer(false)}
                className="w-full py-2.5 rounded-xl border border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-white font-bold text-xs text-center block transition"
              >
                View Full Saved Trips Page ➔
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
