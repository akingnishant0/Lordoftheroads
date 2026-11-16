"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export type ListingType = "PROPERTY" | "BUS" | "CAB" | "MECHANIC" | "RESTAURANT" | "SHOP_GEAR";

export interface SupplierItem {
  id: string;
  type: ListingType;
  title: string;
  category: string; // e.g., "Heritage Hotel", "Volvo AC Sleeper", "Innova Crysta", "Highway Garage", "Jungle Dhaba", "Travel Gear Store"
  pinCode: string;
  location: string;
  routeDetails?: string; // e.g. "Delhi (110001) -> Rishikesh (249201)" or "NH-44 Mile 120"
  basePrice: number;
  priceUnit: string; // e.g., "/night", "/seat", "/km", "/service", "/thali", "/unit"
  availableUnits: number;
  status: "ACTIVE" | "PENDING_REVIEW" | "PAUSED";
  rating: number;
  confirmedBookingsCount: number;
  amenities: string[];
}

export default function SupplierPartnerPortalPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<
    "listings" | "add-listing" | "pin-coverage" | "emergency-dispatches" | "bookings" | "calendar" | "payouts"
  >("listings");
  const [filterType, setFilterType] = useState<"ALL" | ListingType>("ALL");

  // Rich listings covering Properties, Cabs, Buses, Mechanics & Garages, Jungle Dhaba/Restaurants, and Travel Gear
  const [listings, setListings] = useState<SupplierItem[]>([
    {
      id: "sup-prop-1",
      type: "PROPERTY",
      title: "The Heritage Haveli & Spa (Courtyard Suite)",
      category: "Boutique Heritage Resort",
      pinCode: "302002",
      location: "Jaipur, Rajasthan",
      basePrice: 4200,
      priceUnit: "/night",
      availableUnits: 6,
      status: "ACTIVE",
      rating: 4.8,
      confirmedBookingsCount: 38,
      amenities: ["Free High-Speed WiFi", "Heritage Courtyard Pool", "Authentic Rajasthani Dining", "24/7 Power Backup"],
    },
    {
      id: "sup-prop-2",
      type: "PROPERTY",
      title: "Ganga Serene Riverside Yoga Retreat",
      category: "Wellness & Yoga Homestay",
      pinCode: "249201",
      location: "Tapovan, Rishikesh, Uttarakhand",
      basePrice: 3800,
      priceUnit: "/night",
      availableUnits: 8,
      status: "ACTIVE",
      rating: 4.95,
      confirmedBookingsCount: 64,
      amenities: ["Daily Yoga Hall", "Ganga View Balcony", "Organic Sattvic Meals", "Ayurvedic Spa"],
    },
    {
      id: "sup-bus-1",
      type: "BUS",
      title: "Royal Volvo 9600 Multi-Axle AC Sleeper",
      category: "Luxury Intercity Sleeper Bus",
      pinCode: "110001",
      location: "Kashmere Gate, Delhi -> Tapovan, Rishikesh",
      routeDetails: "Origin: Delhi ISBT (110001) ➔ Rishikesh Natraj Chowk (249201)",
      basePrice: 1250,
      priceUnit: "/seat",
      availableUnits: 28,
      status: "ACTIVE",
      rating: 4.75,
      confirmedBookingsCount: 142,
      amenities: ["Individual USB Ports", "Fresh Washed Blankets", "Live GPS Telemetry", "Emergency SOS"],
    },
    {
      id: "sup-cab-1",
      type: "CAB",
      title: "Toyota Innova Crysta AC (Hill-Certified Chauffeur)",
      category: "Premium Outstation Cab",
      pinCode: "110037",
      location: "Delhi-NCR Garage (IGI Airport Hub)",
      routeDetails: "Operational PINs: 110001 to 249201 (Delhi, Dehradun, Mussoorie, Jaipur)",
      basePrice: 18,
      priceUnit: "/km",
      availableUnits: 4,
      status: "ACTIVE",
      rating: 4.9,
      confirmedBookingsCount: 89,
      amenities: ["Hill-Trained Chauffeur", "Carrier for Luggage", "Sanitized AC Cabin", "All Tolls Pre-calculated"],
    },
    {
      id: "sup-mech-1",
      type: "MECHANIC",
      title: "Shiv Shakti 24/7 Highway Garage & Rapid Recovery",
      category: "Car/Bike Breakdown & Towing",
      pinCode: "249201",
      location: "Haridwar-Rishikesh Bypass NH-58",
      routeDetails: "NH-58 Km 182 · Fast Mobile Towing & Flat Tire Dispatch",
      basePrice: 499,
      priceUnit: "/dispatch",
      availableUnits: 3,
      status: "ACTIVE",
      rating: 4.92,
      confirmedBookingsCount: 112,
      amenities: ["Flatbed Towing Truck", "Mobile Battery Jumpstart", "Tubeless Puncture Kit", "Engine Diagnostics Scanner"],
    },
    {
      id: "sup-mech-2",
      type: "MECHANIC",
      title: "Himachal Mountain Riders Bike & 4x4 Workshop",
      category: "Motorcycle & Off-road Specialist",
      pinCode: "175131",
      location: "Mall Road / Old Manali Bridge",
      routeDetails: "Manali-Leh Highway Support Base",
      basePrice: 350,
      priceUnit: "/inspection",
      availableUnits: 5,
      status: "ACTIVE",
      rating: 4.88,
      confirmedBookingsCount: 76,
      amenities: ["Royal Enfield Spares", "High-Altitude Carburetor Tuning", "Clutch Cable / Brake Pads Stock", "SOS Fuel Delivery"],
    },
    {
      id: "sup-rest-1",
      type: "RESTAURANT",
      title: "Pahadi Rasoi & Jungle Dhaba",
      category: "Highway & Mountain Food Stop",
      pinCode: "249192",
      location: "Shivpuri Forest Road, Rishikesh",
      routeDetails: "Scenic Riverside Overlook with Clean Washrooms",
      basePrice: 220,
      priceUnit: "/thali",
      availableUnits: 40,
      status: "ACTIVE",
      rating: 4.86,
      confirmedBookingsCount: 320,
      amenities: ["Authentic Garhwali Koda Roti", "Pure Desi Ghee Dal Makhani", "Hygienic Clean Restrooms", "EV Charging Point"],
    },
    {
      id: "sup-gear-1",
      type: "SHOP_GEAR",
      title: "Lord of the Road Expedition Store & Gadget Hub",
      category: "Travel Gadgets & Safety Kits",
      pinCode: "110001",
      location: "Connaught Place Flagship & Network Supply",
      routeDetails: "Shipped to all Agent Stores within 24 Hours",
      basePrice: 1499,
      priceUnit: "/kit",
      availableUnits: 150,
      status: "ACTIVE",
      rating: 4.95,
      confirmedBookingsCount: 540,
      amenities: ["Dual Dashcam 4K Night Vision", "Portable Tyre Inflator", "Solar Powerbank SOS Light", "Emergency Medical First Aid Box"],
    },
  ]);

  // Emergency Dispatches for Mechanics
  const [dispatches, setDispatches] = useState([
    {
      id: "DISP-8921",
      vehicle: "Hyundai Creta (DL 8C BD 4410)",
      problem: "Battery dead & Flat tire in rain",
      location: "NH-58 near Cheetal Grand, Khatauli",
      customerName: "Vikas Aggarwal",
      customerPhone: "9810188291",
      distance: "4.2 km away",
      status: "DISPATCHED",
      urgency: "HIGH",
      time: "10 mins ago",
    },
    {
      id: "DISP-8920",
      vehicle: "Royal Enfield Himalayan (UK 07 AF 1290)",
      problem: "Clutch wire snapped on mountain ascent",
      location: "Shivpuri Curve #4, Rishikesh",
      customerName: "Ananya Sen",
      customerPhone: "9711200455",
      distance: "1.8 km away",
      status: "REACHED",
      urgency: "URGENT",
      time: "25 mins ago",
    },
  ]);

  // Form State for Adding New Item
  const [newType, setNewType] = useState<ListingType>("PROPERTY");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPinCode, setNewPinCode] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRoute, setNewRoute] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPriceUnit, setNewPriceUnit] = useState("/night");
  const [newUnits, setNewUnits] = useState("1");
  const [newAmenities, setNewAmenities] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation || !newPrice || !newPinCode) return;

    const newItem: SupplierItem = {
      id: `sup-${newType.toLowerCase()}-${Date.now()}`,
      type: newType,
      title: newTitle,
      category: newCategory || (newType === "PROPERTY" ? "Homestay / Hotel" : newType === "MECHANIC" ? "Garage" : newType === "RESTAURANT" ? "Dhaba" : "Service"),
      pinCode: newPinCode,
      location: newLocation,
      routeDetails: newRoute || undefined,
      basePrice: Number(newPrice),
      priceUnit: newPriceUnit,
      availableUnits: Number(newUnits) || 1,
      status: "ACTIVE",
      rating: 5.0,
      confirmedBookingsCount: 0,
      amenities: newAmenities
        ? newAmenities.split(",").map((s) => s.trim())
        : ["Verified Quality", "24/7 Highway Assistance"],
    };

    setListings([newItem, ...listings]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab("listings");
    }, 1500);

    // Reset fields
    setNewTitle("");
    setNewCategory("");
    setNewPinCode("");
    setNewLocation("");
    setNewRoute("");
    setNewPrice("");
    setNewAmenities("");
  };

  const filteredListings = listings.filter((item) => {
    if (filterType === "ALL") return true;
    return item.type === filterType;
  });

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#1A2621]">
      {/* Top Banner */}
      <div className="bg-[#173B32] text-[#F7F4EC] px-6 py-8 border-b border-[#244E44]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C5A66A] text-[#173B32]">
                Verified Partner Network
              </span>
              <span className="text-xs text-[#D5CDBD]">
                PIN Code Based Local & Highway Marketplace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Supplier & Service Partner Portal
            </h1>
            <p className="text-sm text-[#D5CDBD] mt-1 max-w-2xl">
              होटल, होमस्टे, बस व कैब फ्लीट, हाईवे कार/बाइक मैकेनिक, जंगल ढाबे और ट्रैवल गैजेट वेंडर्स का ऑल-इन-वन मैनेजमेंट डैशबोर्ड।
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("add-listing")}
              className="px-4 py-2.5 rounded-xl bg-[#C5A66A] hover:bg-[#B39356] text-[#173B32] font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>+ Add New Listing / Service</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F4EC] font-semibold text-sm transition-all"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 border-b border-[#E3DCC9]">
          {[
            { id: "listings", label: "All Active Listings", count: listings.length, icon: "📋" },
            { id: "emergency-dispatches", label: "SOS Breakdown Alerts", count: dispatches.length, icon: "🚨", alert: true },
            { id: "add-listing", label: "Register New Asset/Service", icon: "➕" },
            { id: "pin-coverage", label: "PIN Code Coverage Map", icon: "📍" },
            { id: "bookings", label: "Orders & Confirmations", count: 42, icon: "🏷️" },
            { id: "calendar", label: "Availability Calendar", icon: "📅" },
            { id: "payouts", label: "Direct Bank Payouts", count: "₹1,84,200", icon: "💰" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? "bg-white text-[#173B32] border-[#173B32] shadow-sm"
                  : "text-[#5A6D63] border-transparent hover:text-[#173B32] hover:bg-white/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    tab.alert
                      ? "bg-red-500 text-white animate-pulse"
                      : activeTab === tab.id
                      ? "bg-[#173B32]/10 text-[#173B32]"
                      : "bg-[#E3DCC9] text-[#4A5D53]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Section: Listings */}
        {activeTab === "listings" && (
          <div className="mt-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E3DCC9] shadow-sm mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#738379]">
                  Filter By Category:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "ALL", label: "All Items" },
                    { id: "PROPERTY", label: "Stays & Camps (होटल/रिजॉर्ट)" },
                    { id: "MECHANIC", label: "Car/Bike Mechanics (मैकेनिक/गैराज)" },
                    { id: "RESTAURANT", label: "Highway Dhabas & Cafes (ढाबा/कैफे)" },
                    { id: "CAB", label: "Outstation Cabs (कैब फ्लीट)" },
                    { id: "BUS", label: "Volvo Buses (बस ऑपरेटर)" },
                    { id: "SHOP_GEAR", label: "Travel Gear (गैजेट्स स्टोर)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterType(f.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        filterType === f.id
                          ? "bg-[#173B32] text-white shadow-sm"
                          : "bg-[#F7F4EC] text-[#4A5D53] hover:bg-[#E3DCC9]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-xs font-medium text-[#738379]">
                Showing {filteredListings.length} verified supplier partners
              </div>
            </div>

            {/* Grid of Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E3DCC9] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          item.type === "PROPERTY"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.type === "MECHANIC"
                            ? "bg-blue-100 text-blue-800 font-black"
                            : item.type === "RESTAURANT"
                            ? "bg-amber-100 text-amber-800"
                            : item.type === "BUS"
                            ? "bg-purple-100 text-purple-800"
                            : item.type === "SHOP_GEAR"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {item.type === "MECHANIC"
                          ? "🔧 24/7 Roadside Garage"
                          : item.type === "RESTAURANT"
                          ? "🍲 Highway / Jungle Food"
                          : item.type === "PROPERTY"
                          ? "🏡 Stay / Resort"
                          : item.type === "SHOP_GEAR"
                          ? "🎒 Travel Gear & Gadget"
                          : item.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#8B6E32] bg-[#F7F4EC] px-2 py-0.5 rounded border border-[#E3DCC9]">
                        ★ {item.rating} ({item.confirmedBookingsCount} orders)
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#173B32] mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-xs text-[#8B6E32] font-semibold mb-2">
                      {item.category}
                    </div>

                    <div className="text-xs text-[#4A5D53] flex items-center gap-1.5 mb-2">
                      <span>📍</span>
                      <span className="font-medium">{item.location}</span>
                      <span className="font-bold text-[#173B32] bg-[#F7F4EC] px-1.5 py-0.5 rounded border border-[#E3DCC9]">
                        PIN: {item.pinCode}
                      </span>
                    </div>

                    {item.routeDetails && (
                      <div className="text-[11px] bg-[#F7F4EC] p-2 rounded-lg text-[#5A6D63] border border-[#E3DCC9] mb-3">
                        🛣️ <span className="font-medium">{item.routeDetails}</span>
                      </div>
                    )}

                    {/* Amenities / Specialities */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.amenities.map((am, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                        >
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#F7F4EC] px-5 py-3.5 border-t border-[#E3DCC9] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#738379] uppercase font-bold">Base Tariff</div>
                      <div className="text-base font-bold text-[#173B32]">
                        ₹{item.basePrice.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-normal text-[#5A6D63]">{item.priceUnit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {item.status}
                      </span>
                      <button className="px-3 py-1.5 rounded-lg bg-[#173B32] text-white text-xs font-bold hover:bg-[#112B24] transition-all">
                        Edit / Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section: SOS Roadside Dispatches */}
        {activeTab === "emergency-dispatches" && (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-[#E3DCC9] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DCC9] mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚨</span>
                  <h2 className="text-xl font-serif font-bold text-[#173B32]">
                    Live Highway Breakdown & SOS Dispatches
                  </h2>
                </div>
                <p className="text-xs text-[#738379] mt-1">
                  हाईवे पर फंसे यात्रियों से सीधे कनेक्ट हों। टोइंग वैन, मैकेनिक या मोबाइल पंचर यूनिट तुरंत रवाना करें।
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Live GPS Highway Feed
              </span>
            </div>

            <div className="space-y-4">
              {dispatches.map((disp) => (
                <div
                  key={disp.id}
                  className="p-5 rounded-xl border border-red-200 bg-red-50/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-xs font-black bg-red-600 text-white uppercase">
                        {disp.urgency} SOS ALERT
                      </span>
                      <span className="text-xs font-mono font-bold text-[#173B32]">{disp.id}</span>
                      <span className="text-xs text-[#738379]">• {disp.time}</span>
                    </div>
                    <div className="font-bold text-base text-[#173B32]">{disp.vehicle}</div>
                    <div className="text-sm text-red-800 font-semibold mt-0.5">
                      समस्या: {disp.problem}
                    </div>
                    <div className="text-xs text-[#4A5D53] mt-1 flex items-center gap-2">
                      <span>📍 {disp.location}</span>
                      <span className="font-bold text-[#173B32]">({disp.distance})</span>
                      <span>👤 {disp.customerName} ({disp.customerPhone})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${disp.customerPhone}`}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>📞 Call Driver</span>
                    </a>
                    <button
                      onClick={() => alert(`Mechanic team dispatched for ${disp.id}`)}
                      className="px-4 py-2 rounded-xl bg-[#173B32] hover:bg-[#112B24] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>🚀 Dispatch Van</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section: Add Listing */}
        {activeTab === "add-listing" && (
          <div className="mt-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E3DCC9] shadow-sm max-w-3xl mx-auto">
            <div className="pb-4 border-b border-[#E3DCC9] mb-6">
              <h2 className="text-xl font-serif font-bold text-[#173B32]">
                Register New Asset, Garage, Food Stop or Gear
              </h2>
              <p className="text-xs text-[#738379] mt-1">
                अपनी प्रॉपर्टी, बस रूट, कैब फ्लीट, गैराज या रेस्टोरेंट को लॉर्ड ऑफ द रोड नेटवर्क पर तुरंत लाइव करें।
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                <span>✅</span>
                <span>सफलतापूर्वक लिस्ट हो गया! लिस्टिंग सेक्शन में अपडेट हो रहा है...</span>
              </div>
            )}

            <form onSubmit={handleCreateListing} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    Asset / Service Category *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => {
                      const t = e.target.value as ListingType;
                      setNewType(t);
                      if (t === "PROPERTY") setNewPriceUnit("/night");
                      else if (t === "BUS") setNewPriceUnit("/seat");
                      else if (t === "CAB") setNewPriceUnit("/km");
                      else if (t === "MECHANIC") setNewPriceUnit("/dispatch");
                      else if (t === "RESTAURANT") setNewPriceUnit("/thali");
                      else if (t === "SHOP_GEAR") setNewPriceUnit("/unit");
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white font-medium"
                  >
                    <option value="PROPERTY">🏡 Stay / Homestay / Resort (होटल/होमस्टे)</option>
                    <option value="MECHANIC">🔧 Highway Garage & Mechanic (मैकेनिक/टोइंग)</option>
                    <option value="RESTAURANT">🍲 Highway Dhaba & Jungle Cafe (ढाबा/रेस्टोरेंट)</option>
                    <option value="CAB">🚖 Outstation Cab / 4x4 Self-Drive (कैब/कार)</option>
                    <option value="BUS">🚌 Intercity Volvo / Sleeper Bus (बस ऑपरेटर)</option>
                    <option value="SHOP_GEAR">🎒 Travel Gear & Safety Gadgets (गैजेट्स वेंडर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    PIN Code of Location / Base Station *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="उदा. 249201"
                    value={newPinCode}
                    onChange={(e) => setNewPinCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                  Listing Title / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. हिमालयन व्यू बुटीक होमस्टे / हाईवे क्विक रिपेयर गैराज"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    Specific Sub-Type / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 4-स्टार लक्ज़री कॉटेज / 24x7 टोइंग वैन / शुद्ध शाकाहारी थाली"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. तपोवन, ऋषिकेश, उत्तराखंड"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                  Highway / Landmark / Route Details
                </label>
                <input
                  type="text"
                  placeholder="उदा. NH-58 माइलस्टोन 142, बद्रीनाथ रोड या दिल्ली-मनाली रूट"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="उदा. 2500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    Price Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPriceUnit}
                    onChange={(e) => setNewPriceUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                    Available Units / Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    value={newUnits}
                    onChange={(e) => setNewUnits(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5D53] mb-1">
                  Key Amenities / Services (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="उदा. 24/7 पावर बैकअप, वाई-फाई, पार्किंग, ईवी चार्जर, टोइंग क्रेन"
                  value={newAmenities}
                  onChange={(e) => setNewAmenities(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CDBD] text-sm focus:outline-none focus:ring-2 focus:ring-[#173B32] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#173B32] hover:bg-[#112B24] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Publish Listing on Lord of the Road</span>
                <span>➔</span>
              </button>
            </form>
          </div>
        )}

        {/* PIN Coverage Map Tab */}
        {activeTab === "pin-coverage" && (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-[#E3DCC9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#173B32] mb-2">
              Pan-India PIN Code Network Hub
            </h2>
            <p className="text-xs text-[#738379] mb-6">
              हर 25 किमी के दायरे में एक प्रमाणित वर्कशॉप, कैफ़े व सहायता केंद्र की मैपिंग।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { state: "Uttarakhand", pins: "248001 - 249410", nodes: 142, desc: "Dehradun, Rishikesh, Haridwar, Badrinath Route" },
                { state: "Himachal Pradesh", pins: "171001 - 176219", nodes: 98, desc: "Shimla, Manali, Kasol, Spiti Valley Hubs" },
                { state: "Rajasthan", pins: "302001 - 345001", nodes: 184, desc: "Jaipur, Jodhpur, Udaipur, Jaisalmer Desert Highway" },
                { state: "Delhi-NCR", pins: "110001 - 201301", nodes: 310, desc: "Connecting Expressways (Yamuna, Kundli, NH-48)" },
              ].map((reg, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#E3DCC9] bg-[#F7F4EC]">
                  <div className="font-bold text-[#173B32] text-sm">{reg.state}</div>
                  <div className="text-xs text-[#8B6E32] font-semibold mt-0.5">{reg.pins}</div>
                  <div className="text-2xl font-bold text-[#173B32] my-2">{reg.nodes} <span className="text-xs font-normal text-[#5A6D63]">Verified Nodes</span></div>
                  <div className="text-[11px] text-[#5A6D63]">{reg.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Bank Payouts Tab */}
        {activeTab === "payouts" && (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-[#E3DCC9] shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E3DCC9] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#173B32]">
                  Direct Bank Payouts & Settlement
                </h2>
                <p className="text-xs text-[#738379]">
                  दुकान, गैराज और स्टे बुकिंग की कमाई सीधे आपके बैंक खाते में 24 घंटे में स्थानांतरित।
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#738379]">Total Settled This Month</div>
                <div className="text-xl font-bold text-emerald-700">₹1,84,200</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: "PAY-901", partner: "Shiv Shakti Highway Garage", amount: "₹18,400", status: "PROCESSED", date: "12 Nov 2026", bank: "HDFC Bank (***4102)" },
                { id: "PAY-900", partner: "Pahadi Rasoi Jungle Dhaba", amount: "₹42,800", status: "PROCESSED", date: "11 Nov 2026", bank: "SBI (***8821)" },
                { id: "PAY-899", partner: "Royal Volvo 9600 Fleet", amount: "₹1,23,000", status: "PROCESSED", date: "10 Nov 2026", bank: "ICICI Bank (***9910)" },
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#E3DCC9] bg-[#F7F4EC] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#173B32] text-sm">{p.partner}</div>
                    <div className="text-xs text-[#738379]">{p.id} • {p.bank} • {p.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#173B32] text-sm">{p.amount}</div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings / Calendar standard place */}
        {activeTab === "bookings" && (
          <div className="mt-6 bg-white p-6 rounded-2xl border border-[#E3DCC9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#173B32] mb-4">
              Real-time Guest & Service Orders
            </h2>
            <div className="space-y-3">
              {[
                { orderId: "ORD-9912", name: "Rahul Verma", service: "24/7 Towing to Rishikesh", date: "Today, 14:30", amount: "₹1,200", status: "CONFIRMED" },
                { orderId: "ORD-9911", name: "Pooja Malhotra", service: "Pahadi Rasoi Thali (4 Guests)", date: "Today, 13:00", amount: "₹880", status: "SERVED" },
                { orderId: "ORD-9910", name: "Amitabh Sen", service: "Heritage Haveli Suite (2 Nights)", date: "14-16 Nov 2026", amount: "₹8,400", status: "CONFIRMED" },
              ].map((o, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E3DCC9] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#173B32]">{o.service}</div>
                    <div className="text-xs text-[#738379]">{o.orderId} • Guest: {o.name} • {o.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#173B32]">{o.amount}</div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="mt-6 bg-white p-8 rounded-2xl border border-[#E3DCC9] shadow-sm text-center">
            <span className="text-4xl mb-2 block">📅</span>
            <h2 className="text-lg font-bold text-[#173B32]">Dynamic Inventory & Slot Availability</h2>
            <p className="text-xs text-[#738379] max-w-md mx-auto mt-1">
              Your mechanical fleet, dining tables, and luxury suites are dynamically synchronized with real-time traveler booking inquiries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
