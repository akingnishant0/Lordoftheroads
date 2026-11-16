export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  category: "Mountain" | "Beach" | "Cultural" | "Adventure" | "Wellness" | "Nature";
  isInternational: boolean;
  bestTimeToVisit: string;
  duration: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  tagline: string;
  overview: string;
  highlights: string[];
  itinerarySummary: { day: number; title: string; desc: string }[];
  recommendedStay: string;
  recommendedActivity: string;
  imageUrl: string;
  emoji: string;
}

export interface HolidayPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  category: "Domestic" | "International" | "Honeymoon" | "Family" | "Adventure";
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inclusions: string[];
  highlights: string[];
  itinerary: { day: number; title: string; details: string }[];
  departureCities: string[];
  imageUrl: string;
}

export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  type: "Hotel" | "Resort" | "Heritage Palace" | "Boutique";
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  address: string;
  amenities: string[];
  roomTypes: {
    name: string;
    bed: string;
    maxGuests: number;
    price: number;
    perks: string[];
  }[];
  imageUrl: string;
}

export interface VillaProperty {
  id: string;
  slug: string;
  name: string;
  location: string;
  stateOrCountry: string;
  bedrooms: number;
  maxGuests: number;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  hostName: string;
  highlights: string[];
  imageUrl: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  originAirport: string;
  destination: string;
  destinationAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  cabinClass: "Economy" | "Premium Economy" | "Business";
  baggage: string;
}

export interface BusOption {
  id: string;
  operator: string;
  busType: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  rating: number;
  price: number;
  seatsAvailable: number;
  boardingPoint: string;
  droppingPoint: string;
}

export interface TrainOption {
  id: string;
  trainNumber: string;
  trainName: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  classes: {
    code: string;
    name: string;
    price: number;
    availability: string;
  }[];
}

export interface CabOption {
  id: string;
  category: "Sedan" | "SUV" | "Luxury Innova" | "Tempo Traveller";
  modelExample: string;
  capacity: string;
  luggage: string;
  baseFarePerKm: number;
  localPackagePrice: number; // 8hr / 80km
  outstationRatePerKm: number;
  airportFlatRate: number;
  features: string[];
}

export interface TourExperience {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: "Guided Walk" | "Day Trip" | "Adventure" | "Culinary" | "Wildlife Safari";
  inclusions: string[];
  highlights: string[];
}

export interface VisaInfo {
  countryCode: string;
  countryName: string;
  visaType: "e-Visa" | "Visa On Arrival" | "Sticker Visa" | "Visa Free";
  processingTime: string;
  validity: string;
  govtFeeApprox: number;
  serviceFee: number;
  requirements: string[];
  documentsRequired: string[];
  disclaimer: string;
}

// ------------------- DATASETS -------------------

export const DESTINATIONS_DATA: Destination[] = [
  {
  id: "dest-kashmir",
  slug: "kashmir-valley",
  name: "Kashmir Valley",
  country: "India",
  region: "North India",
  category: "Mountain",
  isInternational: false,
  bestTimeToVisit: "April – October (Spring/Autumn) & Dec – Feb (Snow)",
  duration: "5 – 7 Days",
  startingPrice: 28500,
  rating: 4.9,
  reviewsCount: 642,
  tagline: "Paradise on Earth with Dal Lake houseboats and snow-capped peaks",
  overview:
    "Surrounded by the Pir Panjal and Himalayan ranges, Kashmir is a dreamscape of emerald valleys, cascading pine forests, and quiet waters. Stay on a wooden cedar houseboat on Dal Lake, take a shikara ride at sunrise, marvel at the alpine meadows of Gulmarg and Pahalgam, and sip steaming saffron kehwa.",
  highlights: [
    "Sunrise Shikara ride on peaceful Dal Lake",
    "Gulmarg Phase 2 Gondola ride up to 13,780 ft",
    "Betaab Valley, Chandanwari & Aru in Pahalgam",
    "Pampore saffron farms & Mughal Shalimar Gardens",
  ],
  itinerarySummary: [
    { day: 1, title: "Srinagar Arrival & Dal Lake Shikara", desc: "Check-in to a luxury cedar wood houseboat. Evening slow shikara ride visiting floating markets." },
    { day: 2, title: "Srinagar to Gulmarg Day Trip", desc: "Scenic drive through apple orchards to Gulmarg. Ascend with the Gondola cable car." },
    { day: 3, title: "Gulmarg to Pahalgam Valley", desc: "Follow the Lidder river into Pahalgam. Visit Betaab Valley and Pine glades." },
    { day: 4, title: "Aru Valley & Baisaran Meadows", desc: "Trek or pony ride through Kashmir's mini-Switzerland and alpine meadows." },
    { day: 5, title: "Mughal Gardens & Heritage Departure", desc: "Visit Nishat & Shalimar baghs, pick up authentic walnut wood crafts and depart." },
  ],
  recommendedStay: "Heritage Wooden Houseboat or Pine Glade Mountain Resort",
  recommendedActivity: "Private guided Pahalgam meadow trail with fresh noon chai",
  imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
  emoji: "🏔️",
},
{
  id: "dest-kerala",
  slug: "kerala-backwaters",
  name: "Kerala Backwaters & Munnar",
  country: "India",
  region: "South India",
  category: "Nature",
  isInternational: false,
  bestTimeToVisit: "September – March",
  duration: "5 – 6 Days",
  startingPrice: 22800,
  rating: 4.85,
  reviewsCount: 820,
  tagline: "Slow days by peaceful backwaters, lush tea hills, and Ayurvedic wellness",
  overview:
    "God's Own Country presents a tranquil blend of lush spice plantations, misty green tea hills in Munnar, and languid waterways in Alleppey. Float gently on a private kettuvallam houseboat, savor fresh Karimeen fish curry, and revitalize your senses with authentic Ayurvedic herbal therapies.",
  highlights: [
    "Private Alleppey Houseboat with onboard chef",
    "Munnar tea plantation jeep safari & tea museum",
    "Periyar Wildlife Sanctuary bamboo rafting",
    "Traditional Kathakali cultural theatre & Kalaripayattu",
  ],
  itinerarySummary: [
    { day: 1, title: "Cochin to Munnar Hills", desc: "Drive past Cheeyappara waterfalls into mist-covered tea gardens of Munnar." },
    { day: 2, title: "Munnar Tea Estates & Eravikulam", desc: "Spot the endangered Nilgiri Tahr and walk through sprawling tea gardens." },
    { day: 3, title: "Munnar to Thekkady Spice Hills", desc: "Explore cardamom plantations and watch evening Kalaripayattu martial arts." },
    { day: 4, title: "Alleppey Houseboat Cruise", desc: "Board your private thatched houseboat and cruise serene coconut-fringed backwaters." },
    { day: 5, title: "Fort Kochi Heritage & Departure", desc: "Stroll by Chinese fishing nets and Jewish Synagogue before heading to the airport." },
  ],
  recommendedStay: "Waterfront Thatched Villa or Tea Estate Heritage Bungalow",
  recommendedActivity: "Evening sunset cruise through backwater canals with fresh toddy & snacks",
  imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  emoji: "🌴",
},
{
  id: "dest-rajasthan",
  slug: "royal-rajasthan",
  name: "Royal Rajasthan (Jaipur & Jaisalmer)",
  country: "India",
  region: "West India",
  category: "Cultural",
  isInternational: false,
  bestTimeToVisit: "October – March",
  duration: "6 – 8 Days",
  startingPrice: 26500,
  rating: 4.92,
  reviewsCount: 910,
  tagline: "Golden sand dunes, majestic amber forts, and heritage palatial stays",
  overview:
    "Step into the land of maharajas, grand sandstone bastions, and vibrant desert music. Wander through the Pink City of Jaipur, admire intricate marble lattices in Udaipur, and camp under the Thar desert starlight in Jaisalmer with folk musicians and fresh Rajasthani thali.",
  highlights: [
    "Sunrise view over Amer Fort & Nahargarh",
    "Sam Sand Dunes luxury desert camp & camel trek",
    "Jodhpur Mehrangarh Fort & Blue City walk",
    "Traditional Kalbelia dance with desert bonfire",
  ],
  itinerarySummary: [
    { day: 1, title: "Pink City Jaipur Welcome", desc: "Arrive in Jaipur, check-in to a heritage haveli, and explore Johari Bazaar." },
    { day: 2, title: "Amer Fort & City Palace", desc: "Explore Sheesh Mahal at Amer Fort, Hawa Mahal, and Jantar Mantar observatory." },
    { day: 3, title: "Jaipur to Jodhpur Blue City", desc: "Travel to the Blue City, explore the ramparts of Mehrangarh Fort." },
    { day: 4, title: "Jodhpur to Jaisalmer Golden City", desc: "Drive into Thar Desert, explore the living Golden Fort of Jaisalmer." },
    { day: 5, title: "Thar Desert Glamping & Stargazing", desc: "Sunset camel safari across Sam Sand Dunes followed by live Rajasthani folk music." },
    { day: 6, title: "Patwon ki Haveli & Farewell", desc: "Admire yellow sandstone carvings and depart with royal memories." },
  ],
  recommendedStay: "Royal Heritage Haveli or Desert Glamping Swiss Tent",
  recommendedActivity: "Private camel safari and stargazing in Thar desert with campfire feast",
  imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
  emoji: "🏰",
},
{
  id: "dest-ladakh",
  slug: "ladakh-himalayas",
  name: "High Roads of Ladakh",
  country: "India",
  region: "Himalayas",
  category: "Adventure",
  isInternational: false,
  bestTimeToVisit: "May – September",
  duration: "7 – 8 Days",
  startingPrice: 34500,
  rating: 4.95,
  reviewsCount: 512,
  tagline: "High mountain passes, magnetic hills, and azure Pangong Tso",
  overview:
    "Cross world's highest motorable passes into a stark, mystical Tibetan landscape of moonscapes, high-altitude turquoise lakes, and ancient cliffside gompas. Experience the magnetic pull of Khardung La, the double-humped camels of Nubra Valley, and the changing colors of Pangong Lake.",
  highlights: [
    "Pangong Lake sunrise camp at 14,270 ft",
    "Khardung La high pass (17,982 ft)",
    "Nubra Valley white sand dunes & Bactrian camels",
    "Thiksey & Diskit monasteries with 106ft Buddha",
  ],
  itinerarySummary: [
    { day: 1, title: "Leh Arrival & Rest / Acclimatization", desc: "Arrive at Kushok Bakula Rimpochee Airport. Gentle rest day with Leh market walk." },
    { day: 2, title: "Sham Valley & Magnetic Hill", desc: "Visit Hall of Fame, Magnetic Hill, and confluence of Indus and Zanskar rivers." },
    { day: 3, title: "Leh to Nubra Valley via Khardung La", desc: "Conquer the mighty Khardung La and reach Hunder dunes for sunset camel ride." },
    { day: 4, title: "Turtuk Village Experience", desc: "Excursion to the last northern village on the LoC, rich in Balti heritage." },
    { day: 5, title: "Nubra to Pangong Tso via Shyok", desc: "Drive along the Shyok river to the legendary blue Pangong Lake." },
    { day: 6, title: "Pangong Sunrise to Leh via Chang La", desc: "Wake up to sparkling turquoise waters. Cross Chang La pass back to Leh." },
    { day: 7, title: "Monastery Tour & Departure", desc: "Visit Thiksey monastery morning prayer and board return flight." },
  ],
  recommendedStay: "Luxury Geodesic Domes near Pangong Lake",
  recommendedActivity: "Chauffeured 4x4 off-road mountain traverse with oxygen kit and guide",
  imageUrl: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
  emoji: "🌌",
},
{
  id: "dest-goa",
  slug: "goa-coastal",
  name: "Goa (Heritage & Coastal)",
  country: "India",
  region: "West Coast",
  category: "Beach",
  isInternational: false,
  bestTimeToVisit: "November – April",
  duration: "4 – 5 Days",
  startingPrice: 18500,
  rating: 4.8,
  reviewsCount: 1240,
  tagline: "Portuguese heritage quarters, serene south beaches, and sunset cruises",
  overview:
    "Beyond the bustling party strips lies a soulful coastal enclave of pastel Portuguese villas, quiet palmfringed southern beaches, and aromatic spice farms. Enjoy sunset sailing, fresh sea prawn balchão, and cycle through the historic Latin quarter of Fontainhas.",
  highlights: [
    "Fontainhas Latin Quarter colorful heritage walk",
    "Dudhsagar waterfalls jeep trek through sanctuary",
    "Private sunset catamaran cruise on Mandovi",
    "Organic spice plantation tour with Goan buffet",
  ],
  itinerarySummary: [
    { day: 1, title: "Goa Arrival & North Coastal Sunset", desc: "Check-in to a boutique Portuguese villa. Relax at Anjuna or Vagator beach." },
    { day: 2, title: "Old Goa Churches & Fontainhas", desc: "Visit Basilica of Bom Jesus, Se Cathedral, and take an architectural photo walk." },
    { day: 3, title: "South Goa Serenity & Spice Plantation", desc: "Visit Sahakari Spice Farm, lunch on banana leaves, and unwind at Palolem." },
    { day: 4, title: "Catamaran Sailing & Water Sports", desc: "Charter a private catamaran cruise or try jet-skiing and parasailing." },
  ],
  recommendedStay: "Portuguese Boutique Villa with private plunge pool",
  recommendedActivity: "South Goa private island dolphin-spotting boat and picnic",
  imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
  emoji: "🏖️",
},
{
  id: "dest-dubai",
  slug: "dubai-emirates",
  name: "Dubai & Desert Safari",
  country: "United Arab Emirates",
  region: "Middle East",
  category: "Cultural",
  isInternational: true,
  bestTimeToVisit: "November – March",
  duration: "5 – 6 Days",
  startingPrice: 48000,
  rating: 4.88,
  reviewsCount: 780,
  tagline: "Futuristic architecture, red dune desert safaris, and luxury shopping",
  overview:
    "Dubai is the shimmering jewel of the Gulf where hyper-modern engineering meets Bedouin tradition. Ascend Burj Khalifa, cruise along Dubai Marina in a private luxury yacht, blast over red sand dunes in a 4x4 Land Cruiser, and visit the futuristic Museum of the Future.",
  highlights: [
    "Burj Khalifa At the Top 124th floor fast-track ticket",
    "Red Dune 4x4 desert safari with live Tanoura & BBQ",
    "Marina luxury yacht cruise with skyline views",
    "Museum of the Future & Dubai Mall fountain show",
  ],
  itinerarySummary: [
    { day: 1, title: "Dubai Arrival & Dhow Cruise", desc: "Welcome to Dubai. Evening Marina luxury dhow cruise with dinner." },
    { day: 2, title: "Modern Dubai & Burj Khalifa", desc: "Explore Dubai Frame, Dubai Mall, and ascend the Burj Khalifa at sunset." },
    { day: 3, title: "Red Dune Desert Safari", desc: "Thrilling dune bashing, sandboarding, camel rides, and Arabic barbecue feast." },
    { day: 4, title: "Museum of the Future & Old Souks", desc: "Tour the groundbreaking museum and cross Dubai Creek on an authentic Abra to the Gold Souk." },
    { day: 5, title: "Palm Jumeirah & Atlantis Aquaventure", desc: "Visit The Pointe, Atlantis waterpark, and enjoy world-class dining." },
  ],
  recommendedStay: "Downtown 5-Star Hotel or Palm Jumeirah Beachfront Resort",
  recommendedActivity: "Desert starlight dinner with Tanoura folk show and quad biking",
  imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  emoji: "🏙️",
},
{
  id: "dest-bali",
  slug: "bali-indonesia",
  name: "Bali (Ubud & Seminyak)",
  country: "Indonesia",
  region: "Southeast Asia",
  category: "Wellness",
  isInternational: true,
  bestTimeToVisit: "April – October",
  duration: "6 – 7 Days",
  startingPrice: 42000,
  rating: 4.91,
  reviewsCount: 650,
  tagline: "Emerald rice terraces, ancient water temples, and tropical beach sunsets",
  overview:
    "The Island of the Gods welcomes you with lush terraced rice fields in Ubud, sacred temple blessings at Tirta Empul, dramatic clifftop views at Uluwatu, and vibrant beach clubs in Seminyak. Perfect for couples, honeymooners, and mindful wellness seekers.",
  highlights: [
    "Tegallalang rice terrace & jungle swing",
    "Mount Batur sunrise 4WD jeep adventure",
    "Uluwatu sunset cliff temple & Kecak fire dance",
    "Nusa Penida island day trip to Kelingking beach",
  ],
  itinerarySummary: [
    { day: 1, title: "Denpasar Arrival & Transfer to Ubud", desc: "Check-in to a private jungle pool villa surrounded by rainforest." },
    { day: 2, title: "Ubud Waterfalls & Rice Terraces", desc: "Visit Tegenungan Waterfall, Tegallalang rice fields, and Bali jungle swing." },
    { day: 3, title: "Mount Batur Sunrise Jeep & Hot Springs", desc: "Watch dawn break over the volcano from a 4x4 open-top jeep. Soak in natural hot springs." },
    { day: 4, title: "Transfer to Seminyak & Uluwatu Sunset", desc: "Head to the coast. Watch the mesmerizing Kecak fire dance on Uluwatu cliffs." },
    { day: 5, title: "Nusa Penida Island Speedboat Tour", desc: "Cruise to Nusa Penida to photograph the famous T-Rex cliff at Kelingking Beach." },
    { day: 6, title: "Beach Club Relaxation & Balinese Spa", desc: "Indulge in a 2-hour flower bath spa and seaside sunset dinner." },
  ],
  recommendedStay: "Private Jungle Pool Villa in Ubud or Seminyak Beachfront",
  recommendedActivity: "Traditional Balinese holistic wellness & flower bath ceremony",
  imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  emoji: "🌺",
},
{
  id: "dest-switzerland",
  slug: "swiss-alps",
  name: "Swiss Alps & Interlaken",
  country: "Switzerland",
  region: "Europe",
  category: "Mountain",
  isInternational: true,
  bestTimeToVisit: "May – September (Hikes) & Dec – March (Ski)",
  duration: "7 – 8 Days",
  startingPrice: 115000,
  rating: 4.98,
  reviewsCount: 420,
  tagline: "Glacier summits, panoramic alpine trains, and crystal clear mountain lakes",
  overview:
    "Experience the pinnacle of European travel across postcard meadows, majestic mountain peaks, and gleaming blue lakes. Ride the cogwheel train to Jungfraujoch, sail on Lake Brienz, board the panoramic Glacier Express, and stroll through Zurich's historic Old Town.",
  highlights: [
    "Jungfraujoch – Top of Europe at 11,333 ft",
    "Scenic Glacier Express panoramic train through gorges",
    "Lake Brienz & Thun steamboat cruise",
    "Zermatt & Matterhorn views with Gornergrat railway",
  ],
  itinerarySummary: [
    { day: 1, title: "Zurich Arrival & Lucerne Transfer", desc: "Arrive in Zurich, take Swiss Rail to Lucerne. Walk across Chapel Bridge." },
    { day: 2, title: "Mount Titlis Cable Car with Rotair", desc: "Ascend to rotating cable car, walk across Titlis Cliff Walk bridge." },
    { day: 3, title: "Lucerne to Interlaken GoldenPass Express", desc: "Glide along alpine lakes and waterfalls to the adventure capital Interlaken." },
    { day: 4, title: "Jungfraujoch Glacier Expedition", desc: "Take the Eiger Express gondola and cogwheel train to the top of Europe." },
    { day: 5, title: "Grindelwald First & Lake Brienz Cruise", desc: "Walk the First Cliff Walk metal walkway and cruise turquoise waters." },
    { day: 6, title: "Zermatt & The Majestic Matterhorn", desc: "Visit car-free alpine village Zermatt and view the pyramidal Matterhorn." },
    { day: 7, title: "Zurich Old Town & Departure", desc: "Return to Zurich for luxury shopping at Bahnhofstrasse before flying home." },
  ],
  recommendedStay: "Alpine Chalet with balcony mountain vistas & Swiss fondue",
  recommendedActivity: "First Cliff Walk and Grindelwald cable car thrilling alpine traverse",
  imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
  emoji: "❄️",
}
];

export const HOLIDAY_PACKAGES_DATA: HolidayPackage[] = [
  {
    id: "pkg-kashmir-heaven",
    slug: "kashmir-paradise-on-earth",
    title: "Kashmir: Houseboat, Gondola & Valleys",
    destination: "Kashmir Valley",
    country: "India",
    category: "Domestic",
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 27999,
    originalPrice: 34999,
    rating: 4.9,
    reviewsCount: 312,
    inclusions: [
      "5 Nights accommodation (1N Houseboat + 4N Resorts)",
      "Daily Breakfast and Dinner",
      "All transfers & sightseeing in private Non-AC vehicle",
      "1 Hour Shikara ride on Dal Lake",
      "Gulmarg Gondola Phase 1 & 2 tickets included",
      "Toll taxes, parking & 24/7 on-call coordinator",
    ],
    highlights: [
      "Dal Lake cedar wood houseboat stay",
      "World's 2nd highest Gondola ride at Gulmarg",
      "Pahalgam Lidder valley & Betaab valley excursion",
      "Authentic Wazwan dinner tasting session",
    ],
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Dal Lake Shikara", details: "Pick-up from Srinagar airport, transfer to luxury Dal Lake houseboat. Evening sunset shikara ride." },
      { day: 2, title: "Srinagar to Gulmarg Expedition", details: "Day trip to Gulmarg. Ride Phase 1 & 2 Gondola. Return to Srinagar hotel." },
      { day: 3, title: "Srinagar to Pahalgam Valleys", details: "Drive through Saffron fields of Pampore to Pahalgam. Visit Betaab Valley and Aru." },
      { day: 4, title: "Pahalgam Pine Glade & River Trails", details: "Enjoy Lidder river views, pony ride to Baisaran meadow, campfire evening." },
      { day: 5, title: "Pahalgam to Srinagar Mughal Gardens", details: "Return to Srinagar, visit Shalimar Bagh, Nishat Bagh and Chashme Shahi." },
      { day: 6, title: "Airport Drop & Sweet Memories", details: "Transfer to Srinagar airport with complimentary walnut and saffron souvenir pack." },
    ],
    departureCities: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Ahmedabad"],
    imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pkg-kerala-serene",
    slug: "kerala-tea-hills-and-houseboat",
    title: "Kerala Backwaters & Munnar Hills Escape",
    destination: "Kerala Backwaters & Munnar",
    country: "India",
    category: "Family",
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 21999,
    originalPrice: 28999,
    rating: 4.86,
    reviewsCount: 420,
    inclusions: [
      "2N Munnar + 1N Thekkady + 1N Alleppey Houseboat",
      "All meals on Houseboat (Lunch, Dinner, Breakfast)",
      "Daily breakfast at hotels",
      "Private AC Sedan/SUV for entire itinerary",
      "Spice garden guided tour",
      "Houseboat cruise through palm-lined backwaters",
    ],
    highlights: [
      "Private Alleppey houseboat with chef",
      "Munnar sprawling tea plantations & waterfalls",
      "Periyar wildlife reserve spice trail",
      "Fort Kochi colonial architecture walk",
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar Drive", details: "Pick up from Cochin Airport/Station. Scenic drive through Valara & Cheeyappara waterfalls." },
      { day: 2, title: "Munnar Sightseeing Tour", details: "Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and Tea Museum." },
      { day: 3, title: "Munnar to Thekkady Wild Spice", details: "Drive to Thekkady. Spice plantation walking tour and boat ride on Periyar Lake." },
      { day: 4, title: "Alleppey Houseboat Boarding", details: "Check-in at noon. Cruise through Vembanad Lake canals with fresh Kerala meals." },
      { day: 5, title: "Alleppey to Cochin Departure", details: "Breakfast on houseboat, check-out and airport drop at Cochin." },
    ],
    departureCities: ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Delhi"],
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pkg-dubai-royal",
    slug: "dubai-luxury-safari-and-skyline",
    title: "Dubai Skyline & Red Dunes Royal Getaway",
    destination: "Dubai & Desert Safari",
    country: "United Arab Emirates",
    category: "International",
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 46999,
    originalPrice: 59999,
    rating: 4.92,
    reviewsCount: 510,
    inclusions: [
      "4 Nights in 4-Star Downtown Dubai Hotel",
      "Daily Buffet Breakfast",
      "Burj Khalifa 124th Floor Entry Ticket",
      "Red Dunes 4x4 Desert Safari with BBQ Dinner & Show",
      "Marina Dhow Cruise with International Buffet",
      "Return Airport Transfers in AC Private Coach",
      "Complimentary UAE Tourist Visa assistance",
    ],
    highlights: [
      "Sunset views from top of Burj Khalifa",
      "Desert 4x4 dune bashing with fire shows",
      "Dubai Marina luxury yacht/dhow night",
      "Gold and Spice Souk shopping",
    ],
    itinerary: [
      { day: 1, title: "Dubai Arrival & Dhow Cruise", details: "Airport meet and greet, hotel check-in. Evening Marina Dhow cruise with dinner." },
      { day: 2, title: "Half Day City Tour & Burj Khalifa", details: "Dubai Frame, Jumeirah Beach photo stop, Burj Khalifa observation deck at sunset." },
      { day: 3, title: "Desert Safari Extravaganza", details: "Afternoon 4x4 pickup, red dune bashing, camel riding, Henna painting, and BBQ buffet." },
      { day: 4, title: "Museum of the Future & Mall of Emirates", details: "Morning visit to Museum of the Future. Free afternoon for duty free shopping." },
      { day: 5, title: "Departure to India", details: "Breakfast at hotel and seamless transfer to DXB International Airport." },
    ],
    departureCities: ["Mumbai", "Delhi", "Ahmedabad", "Kochi", "Hyderabad", "Bangalore"],
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pkg-bali-honeymoon",
    slug: "bali-romantic-jungle-and-beach",
    title: "Bali: Romantic Ubud Jungle & Seminyak Beach",
    destination: "Bali (Ubud & Seminyak)",
    country: "Indonesia",
    category: "Honeymoon",
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 41500,
    originalPrice: 52000,
    rating: 4.95,
    reviewsCount: 388,
    inclusions: [
      "3 Nights Ubud Private Pool Villa + 2 Nights Seminyak Beach Resort",
      "Daily Breakfast + 1 Romantic Candlelight Dinner",
      "Complimentary Honeymoon Cake & Bed Flower Decor",
      "Tegallalang Jungle Swing & Rice Terrace Tour",
      "Mount Batur 4x4 Sunrise Jeep & Natural Hot Springs",
      "Uluwatu Sunset Temple & Kecak Dance Show",
      "Private AC Car with English-speaking Balinese driver guide",
    ],
    highlights: [
      "Private Ubud plunge pool villa",
      "Famous Bali jungle swing photo session",
      "Sunrise jeep tour over Mount Batur volcano",
      "Clifftop Uluwatu sunset fire dance",
    ],
    itinerary: [
      { day: 1, title: "Bali Arrival & Ubud Villa Check-in", details: "Flower garland welcome at Denpasar Airport. Check into secluded Ubud pool villa." },
      { day: 2, title: "Ubud Waterfalls, Rice Fields & Swing", details: "Visit Tegenungan waterfall, swing above rice terraces, coffee tasting plantation." },
      { day: 3, title: "Mount Batur Sunrise & Hot Spring", details: "Early morning open-roof 4WD jeep ascent. Thermal mineral bath soak." },
      { day: 4, title: "Transfer to Seminyak & Sunset Uluwatu", details: "Drive south, check into beach resort, evening sunset show at Uluwatu." },
      { day: 5, title: "Nusa Penida Island Tour or Beach Day", details: "Explore Kelingking beach cliff or relax with seaside massages." },
      { day: 6, title: "Farewell Bali Departure", details: "Breakfast, souvenir stop at Krishna Oleh Oleh, airport transfer." },
    ],
    departureCities: ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"],
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  },
];

export const HOTELS_DATA: HotelProperty[] = [
  {
    id: "htl-kashmir-1",
    slug: "the-kashmir-crown-resort",
    name: "The Kashmir Crown Luxury Resort & Spa",
    city: "Srinagar",
    country: "India",
    type: "Resort",
    stars: 5,
    rating: 4.88,
    reviewsCount: 420,
    pricePerNight: 8500,
    address: "Boulevard Road, Opposite Ghat No. 7, Dal Lake, Srinagar",
    amenities: ["Free Wi-Fi", "Heated Swimming Pool", "Lake View Balcony", "Spa & Sauna", "24/7 Room Service", "Wazwan Restaurant"],
    roomTypes: [
      { name: "Deluxe Lake View Room", bed: "1 King Bed", maxGuests: 2, price: 8500, perks: ["Free Breakfast", "Welcome Kehwa Tea", "Free Cancellation"] },
      { name: "Chinar Valley Suite", bed: "1 King Bed + Sofa Bed", maxGuests: 4, price: 14500, perks: ["Free Breakfast & Dinner", "Personal Butler", "Jacuzzi"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "htl-kerala-1",
    slug: "munnar-tea-haven-resort",
    name: "Munnar Tea Haven Mountain Resort",
    city: "Munnar",
    country: "India",
    type: "Resort",
    stars: 4,
    rating: 4.82,
    reviewsCount: 380,
    pricePerNight: 5800,
    address: "Chithirapuram Post, Tea Valley Road, Munnar, Kerala",
    amenities: ["Tea Plantation View", "Bonfire Nights", "Ayurvedic Spa", "Complimentary Breakfast", "Guided Nature Trails"],
    roomTypes: [
      { name: "Valley Mist Room", bed: "1 Queen Bed", maxGuests: 2, price: 5800, perks: ["Breakfast included", "Free cancellation up to 48 hrs"] },
      { name: "Plantation Cottage", bed: "1 King Bed", maxGuests: 3, price: 8900, perks: ["Breakfast included", "Private Veranda", "Plantation Tour"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "htl-jaipur-1",
    slug: "rajputana-heritage-palace",
    name: "Rajputana Grand Heritage Palace",
    city: "Jaipur",
    country: "India",
    type: "Heritage Palace",
    stars: 5,
    rating: 4.94,
    reviewsCount: 610,
    pricePerNight: 9800,
    address: "Palace Road, Near Jal Mahal, Amber Circle, Jaipur",
    amenities: ["Marble Courtyards", "Peacock Gardens", "Rooftop Restaurant", "Outdoor Swimming Pool", "Cultural Folk Music"],
    roomTypes: [
      { name: "Heritage Royal Room", bed: "1 Four-Poster King Bed", maxGuests: 2, price: 9800, perks: ["Breakfast included", "Welcome Royal Drink", "Free Wifi"] },
      { name: "Maharaja Suite with Plunge Pool", bed: "1 Grand King Bed", maxGuests: 3, price: 21000, perks: ["All Meals", "Private Pool", "Heritage Butler"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "htl-dubai-1",
    slug: "marina-view-luxury-suites",
    name: "The Marina Pearl Grand Suites",
    city: "Dubai",
    country: "United Arab Emirates",
    type: "Hotel",
    stars: 5,
    rating: 4.9,
    reviewsCount: 890,
    pricePerNight: 14500,
    address: "Dubai Marina Promenade, Next to Marina Mall, Dubai",
    amenities: ["Infinity Pool on 45th Floor", "Direct Marina Walk Access", "State-of-art Gym", "24/7 Concierge", "Valet Parking"],
    roomTypes: [
      { name: "Executive Marina View Room", bed: "1 King Bed", maxGuests: 2, price: 14500, perks: ["Breakfast included", "High Floor Guarantee", "Free cancellation"] },
      { name: "Two Bedroom Marina Sky Suite", bed: "2 King Beds", maxGuests: 5, price: 28000, perks: ["Breakfast included", "Full Kitchen", "Club Lounge Access"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const VILLAS_DATA: VillaProperty[] = [
  {
    id: "vla-goa-1",
    slug: "casa-portuguesa-heritage-villa",
    name: "Casa Portuguesa Private Pool Villa",
    location: "Assagao, North Goa",
    stateOrCountry: "Goa, India",
    bedrooms: 3,
    maxGuests: 8,
    pricePerNight: 16500,
    rating: 4.92,
    reviewsCount: 140,
    amenities: ["Private Swimming Pool", "Dedicated Chef on Demand", "Lush Courtyard", "High-speed Wi-Fi", "Daily Housekeeping", "Bicycles Provided"],
    hostName: "Antonio & Maria D'Souza",
    highlights: ["Restored 150-year-old Indo-Portuguese architecture", "Close to top Assagao cafes and restaurants", "Private garden with mango trees"],
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vla-lonavala-1",
    slug: "misty-meadows-cliffside-villa",
    name: "Misty Meadows Cliffside Villa with Jacuzzi",
    location: "Khandala / Lonavala",
    stateOrCountry: "Maharashtra, India",
    bedrooms: 4,
    maxGuests: 12,
    pricePerNight: 22000,
    rating: 4.88,
    reviewsCount: 95,
    amenities: ["Infinity Valley View", "Heated Jacuzzi", "BBQ Grill & Gazebo", "Indoor Games Room (Pool Table)", "Caretaker On-site"],
    hostName: "Vikram Singhania",
    highlights: ["Panoramic sunset view over Western Ghats", "Spacious lawn for family gatherings", "100% power backup and super-fast broadband"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vla-bali-1",
    slug: "ubud-zen-jungle-retreat",
    name: "Ubud Zen Sanctuary Jungle Pool Villa",
    location: "Tegallalang, Ubud",
    stateOrCountry: "Bali, Indonesia",
    bedrooms: 2,
    maxGuests: 4,
    pricePerNight: 12800,
    rating: 4.96,
    reviewsCount: 168,
    amenities: ["Private Jungle Plunge Pool", "Outdoor Stone Bathtub", "Complimentary Floating Breakfast", "Yoga Pavilion", "Scooter Rental"],
    hostName: "Wayan & Kadek",
    highlights: ["Overlooks sacred Ayung river valley", "Daily organic Balinese herbal tea & tropical fruit basket", "Holistic wellness sanctuary"],
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
];

export const FLIGHTS_DATA: FlightOption[] = [
  {
    id: "flt-6e-214",
    airline: "IndiGo",
    flightNumber: "6E 214",
    origin: "Delhi (DEL)",
    originAirport: "Indira Gandhi Intl T3",
    destination: "Srinagar (SXR)",
    destinationAirport: "Sheikh ul-Alam Intl",
    departureTime: "06:15 AM",
    arrivalTime: "07:45 AM",
    duration: "1h 30m",
    stops: 0,
    price: 4850,
    cabinClass: "Economy",
    baggage: "15 kg Check-in + 7 kg Cabin",
  },
  {
    id: "flt-ai-825",
    airline: "Air India",
    flightNumber: "AI 825",
    origin: "Delhi (DEL)",
    originAirport: "Indira Gandhi Intl T3",
    destination: "Srinagar (SXR)",
    destinationAirport: "Sheikh ul-Alam Intl",
    departureTime: "10:30 AM",
    arrivalTime: "12:05 PM",
    duration: "1h 35m",
    stops: 0,
    price: 5400,
    cabinClass: "Economy",
    baggage: "25 kg Check-in + 7 kg Cabin (Free Meal Included)",
  },
  {
    id: "flt-6e-551",
    airline: "IndiGo",
    flightNumber: "6E 551",
    origin: "Mumbai (BOM)",
    originAirport: "Chhatrapati Shivaji Maharaj T2",
    destination: "Goa (GOI)",
    destinationAirport: "Dabolim Airport",
    departureTime: "08:45 AM",
    arrivalTime: "10:05 AM",
    duration: "1h 20m",
    stops: 0,
    price: 3650,
    cabinClass: "Economy",
    baggage: "15 kg Check-in + 7 kg Cabin",
  },
  {
    id: "flt-ek-501",
    airline: "Emirates",
    flightNumber: "EK 501",
    origin: "Mumbai (BOM)",
    originAirport: "Chhatrapati Shivaji Maharaj T2",
    destination: "Dubai (DXB)",
    destinationAirport: "Dubai Intl Terminal 3",
    departureTime: "04:30 AM",
    arrivalTime: "06:15 AM",
    duration: "3h 15m",
    stops: 0,
    price: 19800,
    cabinClass: "Economy",
    baggage: "30 kg Check-in + 7 kg Cabin (Hot Gourmet Meals)",
  },
];

export const BUSES_DATA: BusOption[] = [
  {
    id: "bus-zing-01",
    operator: "Zingbus Electric & Multi-Axle",
    busType: "BharatBenz AC Sleeper (2+1)",
    origin: "Delhi (ISBT Kashmere Gate)",
    destination: "Manali (Mall Road)",
    departureTime: "07:30 PM",
    arrivalTime: "08:45 AM",
    duration: "13h 15m",
    rating: 4.8,
    price: 1250,
    seatsAvailable: 8,
    boardingPoint: "Kashmere Gate Metro Gate 5",
    droppingPoint: "Private Bus Parking, Manali",
  },
  {
    id: "bus-vrl-02",
    operator: "VRL Travels",
    busType: "Volvo Multi-Axle I-Shift AC Sleeper",
    origin: "Bangalore (Majestic)",
    destination: "Goa (Panjim)",
    departureTime: "08:00 PM",
    arrivalTime: "08:30 AM",
    duration: "12h 30m",
    rating: 4.75,
    price: 1450,
    seatsAvailable: 14,
    boardingPoint: "Anand Rao Circle, Majestic",
    droppingPoint: "Panaji KTC Bus Stand",
  },
  {
    id: "bus-neeta-03",
    operator: "Neeta Tours & Travels",
    busType: "Mercedes Benz Multi-Axle AC Semi-Sleeper",
    origin: "Mumbai (Borivali)",
    destination: "Pune (Shivaji Nagar)",
    departureTime: "06:00 AM",
    arrivalTime: "09:45 AM",
    duration: "3h 45m",
    rating: 4.6,
    price: 490,
    seatsAvailable: 22,
    boardingPoint: "Borivali East Carter Road",
    droppingPoint: "Wakad Bridge / Shivaji Nagar",
  },
];

export const TRAINS_DATA: TrainOption[] = [
  {
    id: "trn-12004",
    trainNumber: "12004",
    trainName: "Lucknow Swarna Shatabdi",
    origin: "New Delhi (NDLS)",
    destination: "Lucknow Junction (LJN)",
    departureTime: "06:10 AM",
    arrivalTime: "12:50 PM",
    duration: "6h 40m",
    classes: [
      { code: "CC", name: "AC Chair Car", price: 1165, availability: "AVAILABLE-0042" },
      { code: "EC", name: "Executive Class", price: 1850, availability: "AVAILABLE-0008" },
    ],
  },
  {
    id: "trn-22436",
    trainNumber: "22436",
    trainName: "Vande Bharat Express",
    origin: "New Delhi (NDLS)",
    destination: "Varanasi Jn (BSB)",
    departureTime: "06:00 AM",
    arrivalTime: "02:00 PM",
    duration: "8h 00m",
    classes: [
      { code: "CC", name: "Chair Car (AC)", price: 1750, availability: "AVAILABLE-0064" },
      { code: "EC", name: "Exec Chair Car (AC)", price: 3300, availability: "AVAILABLE-0012" },
    ],
  },
  {
    id: "trn-12952",
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani Express",
    origin: "New Delhi (NDLS)",
    destination: "Mumbai Central (MMCT)",
    departureTime: "04:55 PM",
    arrivalTime: "08:35 AM",
    duration: "15h 40m",
    classes: [
      { code: "3A", name: "3 Tier AC", price: 2190, availability: "RAC-0012" },
      { code: "2A", name: "2 Tier AC", price: 3120, availability: "AVAILABLE-0018" },
      { code: "1A", name: "First AC", price: 5380, availability: "AVAILABLE-0004" },
    ],
  },
];

export const CABS_DATA: CabOption[] = [
  {
    id: "cab-sedan",
    category: "Sedan",
    modelExample: "Dzire, Etios, Aura",
    capacity: "4 Passengers",
    luggage: "2 Large Bags + 2 Handbags",
    baseFarePerKm: 12,
    localPackagePrice: 1999, // 8hr / 80km
    outstationRatePerKm: 13,
    airportFlatRate: 899,
    features: ["Clean AC vehicle", "Verified courteous chauffeur", "Toll & state tax assistance", "Live GPS tracking"],
  },
  {
    id: "cab-suv",
    category: "SUV",
    modelExample: "Ertiga, Triber, Rumion",
    capacity: "6 Passengers",
    luggage: "3 Large Bags + 3 Handbags",
    baseFarePerKm: 16,
    localPackagePrice: 2899,
    outstationRatePerKm: 17,
    airportFlatRate: 1299,
    features: ["Spacious legroom for families", "Roof carrier on request", "Chilled dual AC vents", "Free bottled water"],
  },
  {
    id: "cab-innova",
    category: "Luxury Innova",
    modelExample: "Innova Crysta, Hycross",
    capacity: "6 - 7 Passengers",
    luggage: "4 Large Bags + 4 Handbags",
    baseFarePerKm: 21,
    localPackagePrice: 3899,
    outstationRatePerKm: 22,
    airportFlatRate: 1799,
    features: ["Plush reclining captain seats", "Top mountain safety stability", "Uniformed expert hill chauffeur", "Mobile chargers on all rows"],
  },
  {
    id: "cab-tempo",
    category: "Tempo Traveller",
    modelExample: "Force Urbania / Traveller (12 - 17 Seater)",
    capacity: "12 - 17 Passengers",
    luggage: "10+ Large Bags",
    baseFarePerKm: 28,
    localPackagePrice: 5999,
    outstationRatePerKm: 30,
    airportFlatRate: 2999,
    features: ["Ideal for group & corporate tours", "High roof with pushback seats", "Surround audio & LED TV", "Dedicated luggage boot"],
  },
];

export const TOURS_DATA: TourExperience[] = [
  {
    id: "tur-dal-lake",
    slug: "dal-lake-sunrise-shikara-heritage",
    title: "Dal Lake Sunrise Shikara & Floating Market Walk",
    location: "Srinagar, Kashmir",
    duration: "3 Hours",
    price: 1200,
    rating: 4.95,
    reviewsCount: 340,
    category: "Guided Walk",
    inclusions: ["Private Shikara boat", "Local Kashmiri storyteller guide", "Fresh Kehwa with almond flakes", "Floating vegetable market visit"],
    highlights: ["Watch sunrise paint the Himalayan peaks", "Witness century-old barter at the floating vegetable market", "Photography stops at lily and lotus beds"],
  },
  {
    id: "tur-amer-sunrise",
    slug: "amer-fort-royal-history-heritage",
    title: "Amer Fort Royal History & Stepwells Walk",
    location: "Jaipur, Rajasthan",
    duration: "4 Hours",
    price: 1450,
    rating: 4.88,
    reviewsCount: 420,
    category: "Guided Walk",
    inclusions: ["Expert government-licensed guide", "Amer Fort entry ticket skip-the-line", "Panna Meena ka Kund photo session", "Lassi tasting"],
    highlights: ["Unravel tales of Rajput bravery and Mughal alliances", "Intricate mirror work at Sheesh Mahal", "Visit ancient stepwells and hidden tunnels"],
  },
  {
    id: "tur-alleppey-kayak",
    slug: "alleppey-backwater-canal-kayaking",
    title: "Alleppey Silent Backwater Canal Kayaking",
    location: "Alleppey, Kerala",
    duration: "3.5 Hours",
    price: 1800,
    rating: 4.91,
    reviewsCount: 215,
    category: "Adventure",
    inclusions: ["Sit-on-top kayak and life jacket", "Certified kayaking instructor", "Village walk & fresh coconut water", "Traditional Kerala breakfast"],
    highlights: ["Paddle through narrow village waterways inaccessible to big houseboats", "Spot kingfishers, egrets and migratory birds", "Meet local toddy tappers and coir weavers"],
  },
  {
    id: "tur-dubai-desert",
    slug: "dubai-red-dune-quad-bbq",
    title: "Dubai Red Dunes 4x4 Safari, Quad Bike & Star Camp",
    location: "Lahbab Desert, Dubai",
    duration: "6 Hours",
    price: 3600,
    rating: 4.92,
    reviewsCount: 890,
    category: "Adventure",
    inclusions: ["Hotel pickup & drop in 4x4 Land Cruiser", "Dune bashing on high red dunes", "Sandboarding & Camel ride", "Live Belly dance, Tanoura & Fire show", "Lavish BBQ buffet dinner"],
    highlights: ["Adrenaline surge on 300ft dunes", "Golden hour desert sunset photography", "Arabian night hospitality under stars"],
  },
];

export const VISA_DATA: VisaInfo[] = [
  {
    countryCode: "AE",
    countryName: "United Arab Emirates (Dubai)",
    visaType: "e-Visa",
    processingTime: "48 – 72 Hours (Express 24h available)",
    validity: "30 or 60 Days Single/Multiple Entry",
    govtFeeApprox: 6800,
    serviceFee: 999,
    requirements: [
      "Passport valid for minimum 6 months from date of departure",
      "Recent passport-sized photo on pure white background (35x45mm)",
      "Return flight ticket booking and hotel confirmation voucher",
      "No embassy interview or physical passport submission required",
    ],
    documentsRequired: [
      "Color scan of Passport first and last page",
      "Passport-sized photograph with 80% face coverage",
      "Confirmed air tickets and hotel stay details",
      "Pan Card copy (for primary applicant)",
    ],
    disclaimer:
      "Lord of the Road provides visa documentation assistance and application submission services. Visa issuance is subject to the sole discretion of the General Directorate of Residency and Foreigners Affairs (GDRFA) and UAE Immigration authorities.",
  },
  {
    countryCode: "TH",
    countryName: "Thailand",
    visaType: "Visa Free",
    processingTime: "Instant on Arrival (Visa Exemption Scheme)",
    validity: "Up to 60 Days per visit",
    govtFeeApprox: 0,
    serviceFee: 499,
    requirements: [
      "Indian passport holders currently enjoy Visa-Free entry under government exemption",
      "Passport valid for at least 6 months",
      "Proof of confirmed return flight ticket within allowed stay",
      "Proof of funds (approx 20,000 THB per family or equivalent in USD/INR)",
      "Hotel reservation voucher",
    ],
    documentsRequired: [
      "Valid passport",
      "Return air ticket",
      "Hotel reservation copy",
      "Completed digital arrival card",
    ],
    disclaimer:
      "Visa-free entry policy is maintained by the Royal Thai Embassy and subject to periodic government announcements. Border immigration maintains authority on entry approval.",
  },
  {
    countryCode: "SG",
    countryName: "Singapore",
    visaType: "e-Visa",
    processingTime: "3 – 5 Working Days",
    validity: "30 Days Multiple Entry (Valid up to 2 years)",
    govtFeeApprox: 2200,
    serviceFee: 1200,
    requirements: [
      "Passport valid for at least 6 months",
      "Authorized agent e-visa submission (Lord of the Road is accredited)",
      "Bank statement showing minimum ₹1,00,000 balance per adult",
      "Proof of employment / business letterhead",
    ],
    documentsRequired: [
      "Original passport & scan copies",
      "Form 14A filled and signed",
      "2 Matte finish passport photos with white background",
      "Last 3 months bank statement stamped by bank",
      "Covering letter detailing itinerary",
    ],
    disclaimer:
      "Approval is granted directly by the Immigration & Checkpoints Authority (ICA) of Singapore. Lord of the Road ensures 100% compliance with submission criteria.",
  },
  {
    countryCode: "EU",
    countryName: "Schengen (France, Switzerland, Germany, Italy)",
    visaType: "Sticker Visa",
    processingTime: "15 – 25 Calendar Days",
    validity: "Duration of stay up to 90 Days",
    govtFeeApprox: 8100,
    serviceFee: 2499,
    requirements: [
      "VFS / TLS Contact physical appointment with biometric fingerprinting",
      "Mandatory Travel Insurance with minimum €30,000 emergency medical coverage (Provided via our Travel Shield portal)",
      "Day-wise verified travel itinerary and hotel booking vouchers",
      "Last 6 months bank statement and last 3 years Income Tax Returns (ITR)",
    ],
    documentsRequired: [
      "Passport with at least 2 blank pages and 6 months validity beyond return",
      "Completed Schengen visa application form",
      "Last 3 years ITR Acknowledgement & Form 16",
      "Last 6 months bank statement with bank stamp & seal",
      "Leave approval letter from employer / Company registration certificate",
      "Overseas travel medical insurance policy",
    ],
    disclaimer:
      "Schengen visa processing requires mandatory biometric appointment at the relevant VFS/TLS consulate center. Visa issuance decisions are strictly at the sole prerogative of the respective Schengen Member State consulate.",
  },
];
