"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomerHeader } from "@/components/customer/CustomerHeader";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  state: string;
  readTime: string;
  image: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  content: string[];
  gallery: string[];
  relatedRoute: {
    title: string;
    link: string;
  };
}

const ORIGINAL_STORIES: StoryItem[] = [
  {
    id: "harsil-mini-switzerland",
    title: "Harsil: The Mini Switzerland on the Banks of Bhagirathi",
    subtitle: "Untouched Deodar Forests, Apple Orchards, and Mountain Solitude along the Gangotri Pilgrimage Corridor",
    region: "Uttarkashi, Garhwal Himalayas",
    state: "Uttarakhand",
    readTime: "6 min read",
    image: "/images/1 (2).jpg",
    category: "Himalayan Retreat",
    author: {
      name: "Dheerendra Sharma",
      role: "Field Historian & Explorer",
      avatar: "/images/profiledt1.jpg",
    },
    excerpt: "Harsil, famously known as the Mini Switzerland of India, is an idyllic village situated at an altitude of 2,745 meters along the roaring Bhagirathi River on the route to Gangotri. Nestled amidst towering deodar and pine trees, it offers profound tranquility away from tourist crowds.",
    content: [
      "Perched in the majestic Himalayas, Harsil has managed to retain its raw, untamed beauty. The river Bhagirathi cuts through the valley like a ribbon of turquoise silk, flanked on both sides by apple orchards planted during the British Raj by Frederick E. Wilson—popularly known as Raja Wilson.",
      "Walking through the silent cobblestone pathways of Dharali and Harsil, one encounters century-old wooden houses carved with delicate Garhwali floral motifs. The crisp mountain air carries the scent of cedar wood and mountain thyme.",
      "For spiritual travelers and photographers alike, Harsil serves as the serene staging ground before making the sacred ascent toward Gangotri temple and Gaumukh glacier.",
    ],
    gallery: ["/images/1 (2).jpg", "/images/1 (5).jpg", "/images/1 (8).jpg"],
    relatedRoute: {
      title: "Harsil Valley & Gangotri Explorer Package",
      link: "/holiday-packages",
    },
  },
  {
    id: "braj-sacred-holi",
    title: "Braj Ki Holi: The Sacred Celebration of Colours, Love & Spring",
    subtitle: "In the Ancient Courtyards of Barsana, Nandgaon, and Vrindavan",
    region: "Braj Bhumi, Mathura",
    state: "Uttar Pradesh",
    readTime: "7 min read",
    image: "/images/1 (4).jpg",
    category: "Sacred Festivals",
    author: {
      name: "Pandit Kailash Nath Mishra",
      role: "Vedic & Heritage Storyteller",
      avatar: "/images/profile1.jpg",
    },
    excerpt: "Holi in Braj is not merely a single-day event; it is a 40-day celestial celebration of divine love between Radha and Krishna. From the Lathmar Holi of Barsana to the Phoolon Ki Holi of Banke Bihari, every ritual echoes ancient folklore.",
    content: [
      "In the land of Braj, the celebration of spring begins on Vasant Panchami and peaks with the extraordinary Lathmar Holi. The men of Nandgaon—Krishna’s village—arrive at Barsana—Radha’s village—where they are playfully greeted by the women wielding decorated wooden staves (lathis), which the men deflect with brass shields.",
      "Clouds of crimson abeer and fragrant marigold petals fill the ancient sandstone temple courtyards. Devotional hymns and Dhamar compositions resonate through the air, creating an atmosphere that moves beyond celebration into an emotional spiritual trance.",
      "Lord Of The Roads arranges respectful, curated access for cultural photographers and travelers wishing to witness this ancient tradition with local custodians.",
    ],
    gallery: ["/images/1 (4).jpg", "/images/1 (6).jpg", "/images/1 (10).jpg"],
    relatedRoute: {
      title: "Braj Heritage & Photography Trail",
      link: "/photography-trails",
    },
  },
  {
    id: "ancient-silk-routes",
    title: "The Salt & Wool Passes: Ancient Himalayan Trade Corridors",
    subtitle: "Tracing the Footsteps of Bhotia Traders through Niti, Mana and Jadung Passes",
    region: "Chamoli & Ladakh Borders",
    state: "Uttarakhand & Ladakh",
    readTime: "8 min read",
    image: "/images/1 (6).jpg",
    category: "Historical Chronicles",
    author: {
      name: "Vikram Singh Rathore",
      role: "Fortress & Route Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    excerpt: "Before modern cartography, centuries of merchants and caravans navigated treacherous high-altitude Himalayan passes bartering salt, pashmina wool, borax, and silk. Discover the forgotten stone shelters and trail cairns that still dot these high passes.",
    content: [
      "High above the tree line in the Indo-Tibetan frontier villages of Mana, Niti, and Nelang Valley, ancient wooden cantilever bridges and stone trail markers still survive.",
      "The Bhotia and Jad traders were masters of high-altitude navigation, relying on rock cairns and mountain passes at over 16,000 feet to sustain trade networks that connected Central Asia to the plains of Northern India.",
      "Today, these forgotten corridors offer some of the most rewarding offbeat trekking and archaeological routes in the world.",
    ],
    gallery: ["/images/1 (6).jpg", "/images/1 (1).jpg", "/images/1 (3).jpg"],
    relatedRoute: {
      title: "Ancient Border Trails Expedition",
      link: "/treks",
    },
  },
];

export default function StoriesBlogPage() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F0605] flex flex-col font-sans">
      <CustomerHeader />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E6E0] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#737B76]">
          <Link href="/" className="hover:text-[#BA1E04] transition">Home</Link>
          <span>/</span>
          <span className="text-[#BA1E04] font-semibold">Canvas Stories & Blog</span>
          <span>/</span>
          <Link href="/archaeologist" className="hover:text-[#BA1E04] transition">Archaeologists</Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#1F0605] via-[#BA1E04] to-[#1F0605] text-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FBF774] text-xs font-bold uppercase tracking-wider">
              <span>📜</span>
              <span>Authentic Field Chronicles & Living Traditions</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              The Canvas Stories & Blog
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/85 leading-relaxed font-serif italic">
              "Moving beyond the majestic beauty of Bharat, we take you on a journey through the arts, culture, history, the flora fauna, and the way of life that the people of these lands live."
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/archaeological-sites"
                className="px-5 py-2.5 rounded-xl bg-white text-[#BA1E04] text-xs font-bold shadow-md hover:bg-[#FAF8F5] transition"
              >
                Archaeological Sites 🏛️
              </Link>
              <Link
                href="/photography-trails"
                className="px-5 py-2.5 rounded-xl border border-white/30 text-[#FBF774] text-xs font-semibold hover:bg-white/10 transition"
              >
                Photography Trails 📷
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center w-full md:w-72 shrink-0">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 p-2 border border-[#FBF774]">
              <img src="/images/icon7.png" alt="Stories & Blog" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Field Dispatches</h3>
            <p className="text-xs text-[#FAF8F5]/80 mt-1">
              Authored directly by field archaeologists, folklorists, and local keepers of history.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="space-y-8">
          {ORIGINAL_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-3xl border border-[#E7E6E0] overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 md:grid-cols-12 gap-0 group"
            >
              <div className="md:col-span-5 relative h-64 md:h-full min-h-[260px] bg-neutral-900 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1F0605]/80 backdrop-blur-md text-[#FBF774] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {story.category}
                </span>
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                  📍 {story.region}
                </span>
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#737B76]">
                    <span className="font-bold text-[#EE6C19]">{story.state}</span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F0605] group-hover:text-[#BA1E04] transition">
                    {story.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#737B76] leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E6E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={story.author.avatar}
                      alt={story.author.name}
                      className="w-10 h-10 rounded-full border border-[#BA1E04] object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#1F0605] block">{story.author.name}</span>
                      <span className="text-[11px] text-[#737B76]">{story.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedStory(story)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-xs hover:brightness-105 transition cursor-pointer"
                    >
                      Read Full Story ➔
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Lightbox / Modal */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 my-8 space-y-6 border border-[#E7E6E0] shadow-2xl animate-fadeIn">
              <div className="flex items-start justify-between border-b border-[#E7E6E0] pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#BA1E04] tracking-wider">
                    {selectedStory.category} • {selectedStory.region}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1F0605] mt-1">{selectedStory.title}</h3>
                  <p className="text-xs text-[#EE6C19] italic">{selectedStory.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="w-9 h-9 rounded-full bg-[#FAF8F5] text-[#1F0605] font-bold flex items-center justify-center hover:bg-neutral-200 transition shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1F0605] leading-relaxed">
                {selectedStory.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Photo Gallery Strip */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#737B76] block mb-2">
                  Field Photo Documentation:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {selectedStory.gallery.map((img, i) => (
                    <div key={i} className="h-24 sm:h-32 rounded-xl overflow-hidden border border-[#E7E6E0]">
                      <img src={img} alt="Story photo" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E6E0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#EE6C19]">Experience This Journey</span>
                  <h4 className="font-serif font-bold text-sm text-[#1F0605]">{selectedStory.relatedRoute.title}</h4>
                </div>
                <Link
                  href={selectedStory.relatedRoute.link}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BA1E04] to-[#EE6C19] text-white text-xs font-bold shadow-md hover:brightness-105 transition"
                >
                  Explore Route Packages ➔
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <CustomerFooter />
    </div>
  );
}
