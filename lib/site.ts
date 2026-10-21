// All business details live here. Replace the TODO placeholders with real values.
// Changing this file updates the whole site: pages, SEO tags, Google structured data and the sitemap.

export const site = {
  name: "Unisalon",
  legalName: "Unisalon Unisex Salon",
  url: "https://www.unisalon.in",
  tagline: "Unisex Salon in Manikonda, Hyderabad",
  description:
    "Unisalon is a unisex salon in Manikonda, Hyderabad for haircuts, hair colour, keratin, facials, waxing, nail care and bridal makeup. Book your appointment online or on WhatsApp.",

  contact: {
    phoneDisplay: "+91 00000 00000", // TODO
    phone: "+910000000000", // TODO: E.164 format
    whatsapp: "910000000000", // TODO: country code + number, digits only
    email: "hello@unisalon.in", // TODO
  },

  address: {
    street: "Shop No. __, Main Road, Manikonda", // TODO: exact street address
    locality: "Manikonda",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500089",
    country: "IN",
    // TODO: copy exact coordinates from Google Maps (right-click the pin)
    lat: 17.4048,
    lng: 78.387,
  },

  // 24h format. Used on the page and in Google structured data.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "10:00", close: "21:00" }, // TODO
    { days: ["Saturday", "Sunday"], open: "09:00", close: "21:30" }, // TODO
  ],

  // Google Business Profile
  google: {
    // TODO: your Place ID — find it at https://developers.google.com/maps/documentation/places/web-service/place-id
    placeId: "",
    // TODO: your Google Maps share link (Maps → your business → Share → Copy link)
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Unisalon+Manikonda+Hyderabad",
  },

  social: {
    instagram: "", // TODO: e.g. https://www.instagram.com/unisalon.in/
    facebook: "", // TODO
  },

  // Optional: link to an online booking system (Fresha, Salonist, Setmore…).
  // When set, a "Book online" button appears next to the booking form.
  bookingUrl: "",

  // Nearby areas — used in page text and SEO so the site ranks for local searches.
  areas: ["Manikonda", "Puppalaguda", "Alkapur Township", "Narsingi", "Lanco Hills", "Gachibowli", "Kokapet", "Shaikpet"],

  // TODO: replace with this month's real offer, or set to null to hide the banner.
  offer: {
    title: "First visit? Get 20% off any service",
    text: "Mention this offer when you book. Valid Monday to Thursday.",
  } as { title: string; text: string } | null,

  timeSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],

  // TODO: real stylists. Photos go in /public/team/.
  team: [
    { name: "Stylist name", role: "Senior hair stylist", years: "8+ years" },
    { name: "Stylist name", role: "Colour & keratin specialist", years: "6+ years" },
    { name: "Stylist name", role: "Skin & bridal makeup artist", years: "7+ years" },
    { name: "Stylist name", role: "Men's grooming expert", years: "5+ years" },
  ],

  // Shown only when live Google reviews aren't connected (see README).
  // TODO: replace with real reviews from your Google Business Profile, or leave empty.
  fallbackReviews: [] as { author: string; rating: number; text: string }[],

  faqs: [
    { q: "Do I need an appointment, or can I walk in?", a: "Walk-ins are welcome, but booking ahead guarantees your slot — especially on weekends and for colour, keratin or bridal services." },
    { q: "Is Unisalon a unisex salon?", a: "Yes. We offer haircuts, grooming, hair and skin treatments for men, women and kids." },
    { q: "Where in Manikonda are you located?", a: "We're on the main road in Manikonda, easily reached from Puppalaguda, Alkapur Township, Narsingi and Gachibowli. Use the map on this page for directions." },
    { q: "Which products do you use?", a: "We use professional salon brands for hair colour, keratin and skin care. Ask your stylist for options that suit your hair and skin type." }, // TODO: name brands
    { q: "Do you offer bridal and party makeup at home?", a: "Bridal and party makeup is available at the salon, and at your venue on request. Book a free consultation to plan your look." },
  ],
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  for: "Men" | "Women" | "Unisex";
  icon: string;
  seoTitle: string;
  intro: string;
  items: { name: string; price: string }[];
  faqs: { q: string; a: string }[];
};

// One page is generated per service at /services/<slug>, which helps each one rank in Google.
// TODO: replace the sample prices with your real price list.
export const services: Service[] = [
  {
    slug: "haircut-in-manikonda",
    name: "Haircuts & Styling",
    short: "Precision cuts, blow-dry and styling for men, women and kids.",
    for: "Unisex",
    icon: "✂️",
    seoTitle: "Haircut & Hair Styling in Manikonda, Hyderabad",
    intro: "From a quick trim to a complete makeover, our stylists listen first and cut for your face shape, hair type and lifestyle.",
    items: [
      { name: "Men's haircut", price: "₹250" },
      { name: "Women's haircut", price: "₹500" },
      { name: "Kids' haircut (under 10)", price: "₹200" },
      { name: "Hair wash & blow-dry", price: "₹400" },
      { name: "Hair styling / ironing / curls", price: "₹600" },
    ],
    faqs: [
      { q: "How long does a haircut take?", a: "Around 30 minutes for men and 45–60 minutes for women, including a wash." },
    ],
  },
  {
    slug: "mens-grooming-in-manikonda",
    name: "Men's Grooming",
    short: "Beard shaping, shaves, hair spa and grooming packages.",
    for: "Men",
    icon: "🧔",
    seoTitle: "Men's Salon & Beard Grooming in Manikonda",
    intro: "Sharp fades, clean beard lines and relaxing grooming rituals — everything a modern man needs under one roof.",
    items: [
      { name: "Beard trim & shaping", price: "₹150" },
      { name: "Clean shave", price: "₹150" },
      { name: "Haircut + beard combo", price: "₹350" },
      { name: "Men's hair spa", price: "₹700" },
      { name: "Men's facial", price: "₹900" },
    ],
    faqs: [
      { q: "Do you do fades and modern men's cuts?", a: "Yes — skin fades, tapers, textured crops and classic cuts." },
    ],
  },
  {
    slug: "hair-colour-in-manikonda",
    name: "Hair Colour",
    short: "Global colour, highlights, balayage and grey coverage.",
    for: "Unisex",
    icon: "🎨",
    seoTitle: "Hair Colour, Highlights & Balayage in Manikonda",
    intro: "Ammonia-free and professional colour options, from natural grey coverage to bold fashion shades.",
    items: [
      { name: "Root touch-up", price: "₹1,200" },
      { name: "Global hair colour", price: "₹2,500" },
      { name: "Highlights", price: "₹3,000" },
      { name: "Balayage", price: "₹4,500" },
      { name: "Men's hair / beard colour", price: "₹600" },
    ],
    faqs: [
      { q: "Do you offer ammonia-free colour?", a: "Yes. Ask for ammonia-free options during your consultation." },
    ],
  },
  {
    slug: "keratin-treatment-in-manikonda",
    name: "Keratin & Smoothening",
    short: "Keratin, smoothening, botox and nanoplastia for frizz-free hair.",
    for: "Unisex",
    icon: "✨",
    seoTitle: "Keratin Treatment & Hair Smoothening in Manikonda",
    intro: "Tame frizz and get smooth, manageable hair for months with our professional treatments.",
    items: [
      { name: "Keratin treatment", price: "₹3,500" },
      { name: "Hair smoothening", price: "₹4,000" },
      { name: "Hair botox", price: "₹4,500" },
      { name: "Nanoplastia", price: "₹5,500" },
      { name: "Hair spa", price: "₹1,000" },
    ],
    faqs: [
      { q: "How long does keratin last?", a: "Typically 3–5 months, depending on hair type and aftercare." },
    ],
  },
  {
    slug: "facial-in-manikonda",
    name: "Facials & Skin Care",
    short: "Clean-ups, facials, de-tan and skin treatments.",
    for: "Unisex",
    icon: "🌸",
    seoTitle: "Facial, Clean-up & De-tan in Manikonda, Hyderabad",
    intro: "Glowing, healthy skin with treatments chosen for your skin type — for men and women.",
    items: [
      { name: "Clean-up", price: "₹700" },
      { name: "De-tan", price: "₹600" },
      { name: "Fruit facial", price: "₹1,200" },
      { name: "Gold / diamond facial", price: "₹2,000" },
      { name: "Hydra facial", price: "₹3,500" },
    ],
    faqs: [
      { q: "Which facial is right for me?", a: "Your therapist will check your skin type and suggest the best option." },
    ],
  },
  {
    slug: "waxing-threading-in-manikonda",
    name: "Waxing & Threading",
    short: "Quick, hygienic waxing and threading.",
    for: "Women",
    icon: "🪷",
    seoTitle: "Waxing & Threading in Manikonda",
    intro: "Smooth skin with gentle wax options and expert threading, done hygienically.",
    items: [
      { name: "Eyebrow threading", price: "₹60" },
      { name: "Upper lip", price: "₹40" },
      { name: "Full arms waxing", price: "₹400" },
      { name: "Full legs waxing", price: "₹600" },
      { name: "Rica full body", price: "₹2,500" },
    ],
    faqs: [
      { q: "Do you offer Rica / chocolate wax?", a: "Yes, along with regular honey wax." },
    ],
  },
  {
    slug: "manicure-pedicure-in-manikonda",
    name: "Nails, Manicure & Pedicure",
    short: "Classic and spa manicures, pedicures and gel nails.",
    for: "Unisex",
    icon: "💅",
    seoTitle: "Manicure, Pedicure & Gel Nails in Manikonda",
    intro: "Relaxing hand and foot care plus long-lasting gel polish and nail art.",
    items: [
      { name: "Classic manicure", price: "₹500" },
      { name: "Classic pedicure", price: "₹600" },
      { name: "Spa pedicure", price: "₹1,000" },
      { name: "Gel polish", price: "₹800" },
      { name: "Nail art (per hand)", price: "₹300" },
    ],
    faqs: [
      { q: "How long does gel polish last?", a: "Usually 2–3 weeks with proper care." },
    ],
  },
  {
    slug: "bridal-makeup-in-manikonda",
    name: "Bridal & Party Makeup",
    short: "Bridal, engagement and party makeup with hair styling.",
    for: "Women",
    icon: "👰",
    seoTitle: "Bridal Makeup & Party Makeup in Manikonda, Hyderabad",
    intro: "Look your best on the big day. Book a free consultation to plan your bridal look, pre-bridal care and trial.",
    items: [
      { name: "Party makeup", price: "₹2,500" },
      { name: "Engagement makeup", price: "₹6,000" },
      { name: "Bridal makeup (HD)", price: "₹12,000" },
      { name: "Pre-bridal package", price: "₹8,000" },
      { name: "Groom makeup & grooming", price: "₹3,000" },
    ],
    faqs: [
      { q: "Do you offer a makeup trial?", a: "Yes, trials are available before the wedding. Ask when you book." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
