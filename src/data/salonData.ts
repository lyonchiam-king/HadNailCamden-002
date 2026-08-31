import { ServiceItem, InstagramPost, ReviewItem } from '../types';

export const SALON_DETAILS = {
  name: "Had Nails Camden",
  owner: "Holli",
  phone: "+44 7476 909044",
  phoneClean: "+447476909044",
  address: "Tusk, 92 Camden High St, London NW1 0LT, UK",
  googleMapsUrl: "https://maps.google.com/?cid=17962850499993314735&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA",
  instagramUrls: [
    "https://instagram.com/had_nails",
    "https://www.instagram.com/had_nails"
  ],
  whatsappUrl: "https://wa.me/447476909044",
  hours: [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "10:00 - 19:00" },
    { day: "Wednesday", hours: "10:00 - 19:00" },
    { day: "Thursday", hours: "10:00 - 19:00" },
    { day: "Friday", hours: "10:00 - 19:00" },
    { day: "Saturday", hours: "10:00 - 18:00" },
    { day: "Sunday", hours: "11:00 - 17:00" },
  ],
  holidayNote: "[TO CONFIRM] Bank holiday and Christmas hours"
};

export const SERVICES: ServiceItem[] = [
  {
    id: "acrylic-full-set",
    name: "Acrylic Full Set",
    badges: ["Bold", "Durable"],
    shortDesc: "Full set of sculpted acrylic extensions built for maximum strength and length.",
    fullDesc: "Custom length and shape tailored to your style. Holli uses high-grade acrylic formulated to resist chipping on Camden High Street. Includes cuticle care, shaping, and solid gel polish finish.",
    priceTag: "Price on consultation",
    duration: "90 - 120 mins",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    popularFor: "Long-lasting extensions & sharp shapes"
  },
  {
    id: "nail-refresh",
    name: "Nail Refresh",
    badges: ["Quick", "Clean"],
    shortDesc: "Infill, re-balance, and top-coat refresh for existing acrylics or gel sets.",
    fullDesc: "Keep your set pristine without a full removal. Holli cleans up cuticle growth, reshapes edges, refills the base, and applies fresh high-shine topcoat to make your nails look brand new.",
    priceTag: "Price on consultation",
    duration: "60 - 75 mins",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    popularFor: "Maintenance every 3-4 weeks"
  },
  {
    id: "nail-art",
    name: "Nail Art",
    badges: ["Custom", "Detailed"],
    shortDesc: "Hand-painted art, 3D gel work, chrome finishes, and custom Camden aesthetic designs.",
    fullDesc: "From chrome lines and airbrush fades to intricate freehand art and gel gems. Bring an Instagram inspiration photo or let Holli design a bespoke set tailored specifically for you.",
    priceTag: "Price on consultation",
    duration: "30 - 60 mins (add-on)",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
    popularFor: "Unique statement sets & chrome accents"
  },
  {
    id: "natural-care",
    name: "Natural Care",
    badges: ["Healthy", "Strong"],
    shortDesc: "Builder gel / BIAB overlay and deep care for natural nail growth and protection.",
    fullDesc: "Strengthen natural nails under a durable protective shield. Perfect for growing out damaged nails while keeping a sleek, natural aesthetic with chip-proof gel color.",
    priceTag: "Price on consultation",
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    popularFor: "Natural nail growth & minimalist chic"
  }
];

export const HIGHLIGHT_BADGES = [
  "Holli's Artistry",
  "Long-Lasting",
  "Inclusive Space"
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    caption: "Neon Chrome Flame set for the weekend 🔥 No chips after 4 weeks! #HadNails #CamdenNails #AcrylicArt",
    likes: 184,
    tags: ["Acrylic Full Set", "Chrome Flame", "Camden Edge"],
    serviceRecommended: "Acrylic Full Set",
    styleName: "Neon Chrome Flame Set"
  },
  {
    id: "ig-2",
    imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    caption: "Fresh 3-week refit for my regular! Kept natural strength underneath 🖤 #NailRefresh #BIABNails",
    likes: 142,
    tags: ["Nail Refresh", "BIAB Overlay", "Clean Finish"],
    serviceRecommended: "Nail Refresh",
    styleName: "Minimalist Black Tip Refresh"
  },
  {
    id: "ig-3",
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
    caption: "3D gel water droplets & liquid silver line art ✨ Holli custom design #NailArt #3DNails",
    likes: 219,
    tags: ["Nail Art", "3D Liquid Silver", "Custom Artistry"],
    serviceRecommended: "Nail Art",
    styleName: "Liquid Silver 3D Art"
  },
  {
    id: "ig-4",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    caption: "Milky pink builder gel overlay with micro chrome aura stars ✨ Strong natural care. #NaturalCare #BIAB",
    likes: 167,
    tags: ["Natural Care", "Micro Chrome Stars", "Nail Growth"],
    serviceRecommended: "Natural Care",
    styleName: "Milky Pink Chrome Star BIAB"
  },
  {
    id: "ig-5",
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    caption: "Gothic Velvet Burgundy Stiletto set with crystal accents 🍷 Camden aesthetic! #GothicNails #StilettoAcrylics",
    likes: 198,
    tags: ["Acrylic Full Set", "Gothic Velvet", "Stiletto Shape"],
    serviceRecommended: "Acrylic Full Set",
    styleName: "Gothic Velvet Stiletto Set"
  },
  {
    id: "ig-6",
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
    caption: "Y2K cyber airbrush swirls with star charms 🛸 Made inside Tusk shoplot. #AirbrushNails #Y2KNailArt",
    likes: 231,
    tags: ["Nail Art", "Airbrush Swirls", "Y2K Aesthetic"],
    serviceRecommended: "Nail Art",
    styleName: "Y2K Cyber Airbrush Set"
  }
];

export const PROOF_ITEMS: ReviewItem[] = [
  {
    id: "p-1",
    author: "Sophie T.",
    rating: 5,
    date: "Recent Google Review",
    text: "Holli is a genius! My acrylics literally survived 5 weeks of heavy work and live gigs without a single lifting edge. Praised for longevity indeed!",
    proofTag: "Praised for longevity"
  },
  {
    id: "p-2",
    author: "Elena M.",
    rating: 5,
    date: "Recent Google Review",
    text: "Holli's artistry is on another level. I gave her a random moodboard and she painted the most insane chrome line art freehand. Best nail shop in Camden.",
    proofTag: "Holli's artistry"
  },
  {
    id: "p-3",
    author: "Jordan K.",
    rating: 5,
    date: "Recent Google Review",
    text: "Such a warm, inclusive space inside Tusk. Zero judgment, super friendly vibes, and unbelievable attention to detail. No DM hassle, just easy online booking!",
    proofTag: "Welcoming space"
  }
];

export const STYLE_FINDER_OPTIONS = {
  shapes: [
    { id: "square", label: "Square", icon: "▢", desc: "Classic sharp edges" },
    { id: "almond", label: "Almond", icon: "⬡", desc: "Tapered elegant curve" },
    { id: "coffin", label: "Coffin / Ballerina", icon: "▭", desc: "Tapered with flat top" },
    { id: "stiletto", label: "Stiletto", icon: "△", desc: "Dramatic pointed tip" },
    { id: "oval", label: "Oval", icon: "◯", desc: "Soft natural curve" },
    { id: "duck", label: "Duck / Flare", icon: "⬛", desc: "Flared retro shape" }
  ],
  lengths: [
    { id: "natural", label: "Natural", desc: "Active & practical length" },
    { id: "medium", label: "Medium", desc: "Balanced daily glam" },
    { id: "long", label: "Long", desc: "Statement length" },
    { id: "extralong", label: "Extra Long", desc: "Full drama length" }
  ],
  vibes: [
    { id: "camden-cyberpunk", label: "Camden Cyberpunk", desc: "Neon purple, chrome lines, metallic drips" },
    { id: "minimal-chrome", label: "Minimal Chrome", desc: "Subtle metallic tips & sheer base" },
    { id: "90s-airbrush", label: "90s Airbrush", desc: "Soft aura gradients & starbursts" },
    { id: "y2k-glitter", label: "Y2K Glitter & Gems", desc: "3D gel droplets, charms & sparkle" },
    { id: "clean-french", label: "Clean Girl French", desc: "Crisp white or black precision tips" },
    { id: "hand-painted", label: "Hand-painted Art", desc: "Bespoke freehand illustration" }
  ]
};
