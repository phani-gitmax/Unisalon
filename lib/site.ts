// All business details live here. Replace the TODO placeholders with real values.
// Changing this file updates the whole site: pages, SEO tags, Google structured data and the sitemap.
// The monthly offer lives in content/offer.json and Trends articles in content/trends/ (both updated by automation).

export type Branch = {
  id: string;
  name: string;
  street: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  phoneDisplay: string;
  phone: string;
  whatsapp: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  placeId: string;
};

export const site = {
  name: "Unisalon",
  brand: "Unisalon by Shashi",
  googleName: "Shashi's Unisex Salon",
  url: "https://unisalon.in",
  tagline: "Your Vibe, Your Style",
  since: 2011,
  description:
    "Premium unisex hair salon and spa in Alkapur Township, Manikonda. Professional haircuts, hair colour, keratin, styling, and bridal makeovers open 7 days a week.",
  email: "info@unisalon.in",

  branches: [
    {
      id: "trenton-park",
      name: "Aryamitra Trenton Park Branch",
      street: "G1, G2, Aryamitra Trenton Park, Alkapur Township",
      locality: "Manikonda",
      city: "Hyderabad",
      region: "Telangana",
      postalCode: "500075",
      phoneDisplay: "97047 60328",
      phone: "+919704760328",
      whatsapp: "919704760328", // TODO: confirm this number is on WhatsApp
      // Pin from the branch's Google Maps link (mapsUrl below).
      lat: 17.3913713,
      lng: 78.3678677,
      mapsUrl: "https://maps.app.goo.gl/CqtsmSVbngG98Lg9A",
      placeId: "", // TODO: Google Place ID of this branch's Business Profile
    },
    {
      id: "challas-myspace",
      name: "Challas Myspace Branch",
      street: "110, Road No. 16, Challas Myspace, Alkapur Township",
      locality: "Manikonda",
      city: "Hyderabad",
      region: "Telangana",
      postalCode: "500089",
      phoneDisplay: "76708 26262",
      phone: "+917670826262",
      whatsapp: "917670826262", // TODO: confirm this number is on WhatsApp
      // Pin from the branch's Google Maps link (mapsUrl below).
      lat: 17.3935067,
      lng: 78.3683203,
      mapsUrl: "https://maps.app.goo.gl/e3EGs4J9U4u3bUKg9",
      placeId: "", // TODO
    },
  ] as Branch[],

  // Same hours at both branches.
  hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], open: "09:00", close: "21:00" }],

  social: {
    instagram: "", // TODO: e.g. https://www.instagram.com/unisalon.in/
    facebook: "", // TODO
  },

  // Optional: link to an online booking system (Fresha, Salonist…). Adds a "Book online" button.
  bookingUrl: "",

  // Photos: free Unsplash images for now (see README credits). Replace files in /public/photos with real salon photos.
  heroPhoto: "/photos/in-hero-salon.jpg",
  gallery: ["/photos/in-gallery-1.jpg", "/photos/in-gallery-2.jpg"],

  // Nearby areas — used in page text and SEO so the site ranks for local searches.
  areas: ["Manikonda", "Alkapur Township", "Puppalaguda", "Narsingi", "Lanco Hills", "Gachibowli", "Kokapet", "Neknampur"],

  timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],

  story: [
    { year: "2011", text: "Shashi starts hairdressing in Mumbai, working in renowned salons in Andheri, Seven Bungalows and Lokhandwala." },
    { year: "2014", text: "Opens his first salon, Shreeji Salon in Kandivali — starting with a single chair and building a loyal clientele." },
    { year: "2019", text: "Brings the same care to Hyderabad with Unisalon in Alkapur Township, Manikonda." },
    { year: "Today", text: "Two branches in Alkapur Township serving families across Manikonda and nearby areas." },
  ],

  // TODO: add what each package includes (bonus value, services, validity).
  memberships: [
    { name: "Silver", price: "₹10,000", note: "Prepaid package" },
    { name: "Gold", price: "₹25,000", note: "Prepaid package" },
    { name: "Platinum", price: "₹50,000", note: "Prepaid package" },
  ],

  // TODO: real stylists. Photos go in /public/team/.
  team: [
    { name: "Shashi", role: "Founder & senior stylist", years: "Since 2011" },
    { name: "Ali", role: "Hair stylist", years: "" },
    { name: "Reyaz", role: "Hair stylist", years: "" },
    { name: "Stylist name", role: "Skin & beauty expert", years: "" },
  ],

  // Shown only until live Google reviews are connected (see README). Real reviews from the Google listing.
  fallbackReviews: [
    { author: "AWSM Studios", rating: 5, text: "Nice experience, it's our go to family salon." },
    { author: "Roopak Vasa", rating: 5, text: "Ali and Reyaz are excellent." },
    { author: "kb sumitra", rating: 5, text: "I have been taking services from Shashi's Unisex salon at Alkapoor township from many years. I am very happy with all the services and would highly recommend this salon." },
    { author: "Sangam Ruthvika", rating: 5, text: "Well service... Well trained staff and reasonable prices... Good relaxing ambience." },
  ],
  fallbackReviewCount: 47,

  faqs: [
    { q: "What are your timings?", a: "Both branches are open every day, 9 AM to 9 PM — including Sundays." },
    { q: "Where are your branches?", a: "We have two branches in Alkapur Township, Manikonda: Aryamitra Trenton Park (G1, G2) and Challas Myspace (110, Road No. 16). Both are a short drive from Puppalaguda, Narsingi, Gachibowli and Kokapet." },
    { q: "Do I need an appointment?", a: "Walk-ins are welcome, but booking ahead guarantees your slot — especially on weekends and for spa, colour or senior-stylist services." },
    { q: "Is Unisalon a unisex salon?", a: "Yes. We serve men, women and kids — haircuts, styling, hair spa, colour, skin care and more." },
    { q: "What is the difference between a regular and senior stylist cut?", a: "Senior stylists have many years of experience and handle advanced cuts and makeovers. Prices for both are listed on our price list." },
    { q: "Do you offer memberships?", a: "Yes — prepaid packages of ₹10,000, ₹25,000 and ₹50,000. Ask at the salon or send us a message for the benefits included." },
  ],
};

export type Service = {
  slug: string;
  name: string;
  script: string; // decorative script word shown above the name
  short: string;
  for: "Men" | "Women" | "Unisex";
  seoTitle: string;
  intro: string;
  groups: { title: string; items: { name: string; price: string }[] }[];
  faqs: { q: string; a: string }[];
  duration: string; // typical appointment length
  highlights: string[]; // what's included — confirmed by the salon
  verified: boolean; // true = prices copied from the salon's price list
  from?: string; // overrides the automatic "From ₹…" price
  photo: string; // in /public/photos — replace with your own salon photos any time
};

// One page is generated per service at /services/<slug>, which helps each one rank in Google.
export const services: Service[] = [
  {
    slug: "haircut-in-manikonda",
    photo: "/photos/in-service-haircut.jpg",
    name: "Haircuts",
    script: "Trendy",
    short: "Men's, women's and kids' cuts — regular or with a senior stylist.",
    for: "Unisex",
    seoTitle: "Haircut for Men, Women & Kids in Manikonda, Hyderabad",
    intro: "From a quick trim to a complete makeover — our stylists cut for your face shape, hair type and lifestyle. Choose a regular or senior stylist.",
    verified: true,
    from: "₹220",
    groups: [
      {
        title: "Men",
        items: [
          { name: "Men's haircut", price: "₹220" },
          { name: "Men's haircut (senior stylist)", price: "₹400" },
          { name: "Beard trim", price: "₹150" },
          { name: "Clean shave", price: "₹150" },
          { name: "Hair wash", price: "₹100" },
        ],
      },
      {
        title: "Women",
        items: [
          { name: "Women's haircut / wash / styling", price: "₹800" },
          { name: "Women's haircut / wash / styling (senior stylist)", price: "₹1,000" },
        ],
      },
      {
        title: "Kids",
        items: [
          { name: "Kids' haircut (baby)", price: "₹300" },
          { name: "Creative cut (baby)", price: "₹500" },
        ],
      },
    ],
    faqs: [
      { q: "How much is a men's haircut in Manikonda at Unisalon?", a: "₹220 with a regular stylist, or ₹400 with a senior stylist." },
      { q: "Do I need an appointment for a haircut?", a: "Walk-ins are welcome, but advance booking is recommended on weekends to avoid waiting." },
      { q: "Are kids' haircuts available?", a: "Yes, our stylists are patient and experienced with toddlers' and kids' haircuts." },
    ],
    duration: "30–45 mins",
    highlights: ["Detailed pre-cut consultation", "Relaxing hair wash included", "Blow-dry & styling finish", "Stylists trained in Mumbai since 2011"],
  },
  {
    slug: "hair-styling-in-manikonda",
    photo: "/photos/in-service-styling.jpg",
    name: "Hair Wash & Styling",
    script: "Glam",
    short: "Blow-dry, tongs curls and ironing for every occasion.",
    for: "Unisex",
    seoTitle: "Hair Styling, Blow Dry & Ironing in Manikonda",
    intro: "Party, wedding or office — walk out with salon-perfect hair. Wash and styling with tongs or ironing by our experienced stylists.",
    verified: true,
    groups: [
      {
        title: "Styling",
        items: [
          { name: "Hair wash (blast dry)", price: "₹200 onwards" },
          { name: "Hair wash", price: "₹200" },
          { name: "Wash & styling (senior stylist)", price: "₹600" },
          { name: "Wash & styling — tongs", price: "₹800" },
          { name: "Wash & styling — ironing", price: "₹800" },
        ],
      },
    ],
    faqs: [
      { q: "Can I book styling for an event?", a: "Yes — book a slot ahead so your stylist is ready when you arrive." },
      { q: "What products do you use for hair wash?", a: "We use professional, sulfate-free salon shampoos and conditioners matched to your scalp type." },
    ],
    duration: "30 mins",
    highlights: ["Premium scalp massage wash", "Thermal heat protection applied", "Volume or sleek finish", "Lasting all-day hold"],
  },
  {
    slug: "hair-spa-in-manikonda",
    photo: "/photos/in-service-spa.jpg",
    name: "Hair Spa & Massage",
    script: "Serene",
    short: "L'Oréal hair spa and relaxing oil massages.",
    for: "Unisex",
    seoTitle: "L'Oréal Hair Spa & Head Massage in Manikonda",
    intro: "Repair dry, damaged hair and unwind with a professional L'Oréal hair spa or a relaxing oil or almond oil massage.",
    verified: true,
    groups: [
      {
        title: "L'Oréal hair spa",
        items: [
          { name: "L'Oréal spa (men)", price: "₹800" },
          { name: "L'Oréal spa with concentrate (men)", price: "₹1,100" },
          { name: "L'Oréal spa (women)", price: "₹1,200 onwards" },
          { name: "L'Oréal spa with concentrate (women)", price: "₹1,500 onwards" },
        ],
      },
      {
        title: "Head massage",
        items: [
          { name: "Oil massage (men)", price: "₹200" },
          { name: "Oil massage (women, senior stylist)", price: "₹400" },
          { name: "Almond oil massage (men)", price: "₹400" },
          { name: "Almond oil massage (women)", price: "₹500" },
        ],
      },
    ],
    faqs: [
      { q: "How often should I get a hair spa?", a: "For hard water damage and dry scalp, once every 3 to 4 weeks is recommended." },
    ],
    duration: "45–60 mins",
    highlights: ["Steam infusion for root nourishment", "Anti-dandruff & anti-hairfall options", "20-min neck and shoulder massage", "Immediate softness and shine"],
  },
  {
    slug: "hair-colour-in-manikonda",
    photo: "/photos/in-service-colour.jpg",
    name: "Hair Colour",
    script: "Pro",
    short: "Global colour, highlights, ombré and grey coverage.",
    for: "Unisex",
    seoTitle: "Hair Colour, Highlights & Ombré in Manikonda",
    intro: "Pro colour specialists for natural grey coverage, global colour, highlights and ombré.",
    verified: false, // TODO: replace sample prices with the salon's real colour prices
    groups: [
      {
        title: "Colour",
        items: [
          { name: "Root touch-up", price: "₹1,200" },
          { name: "Global hair colour", price: "₹2,500" },
          { name: "Highlights", price: "₹3,000" },
          { name: "Ombré colour", price: "₹4,000" },
          { name: "Men's hair / beard colour", price: "₹600" },
        ],
      },
    ],
    faqs: [
      { q: "Do you offer ammonia-free colour?", a: "Yes — ammonia-free colour options are available for global colour and root touch-ups." },
      { q: "Will hair colouring damage my hair?", a: "We apply bond-protecting treatments during the colouring process to keep hair strength and texture intact." },
    ],
    duration: "60–120 mins",
    highlights: ["Ammonia-free formulation options", "Zero brassiness guarantee", "Expert colour-matching", "Post-colour conditioning seal"],
  },
  {
    slug: "keratin-treatment-in-manikonda",
    photo: "/photos/in-service-keratin.jpg",
    name: "Keratin & Smoothening",
    script: "Silky",
    short: "Keratin, smoothening and botox for frizz-free hair.",
    for: "Unisex",
    seoTitle: "Keratin Treatment & Hair Smoothening in Manikonda",
    intro: "Tame frizz and get smooth, manageable hair for months with professional keratin and smoothening treatments.",
    verified: false, // TODO
    groups: [
      {
        title: "Treatments",
        items: [
          { name: "Keratin treatment", price: "₹3,500" },
          { name: "Hair smoothening", price: "₹4,000" },
          { name: "Hair botox", price: "₹4,500" },
        ],
      },
    ],
    faqs: [
      { q: "How long does keratin last?", a: "With recommended sulfate-free shampoos, results typically last between 4 and 6 months." },
    ],
    duration: "2.5–3.5 hours",
    highlights: ["Formaldehyde-free safe formulas", "Tames 95% of frizz and curls", "Results last 4 to 6 months", "Includes complete post-care guidance"],
  },
  {
    slug: "facial-in-manikonda",
    photo: "/photos/in-service-beauty.jpg",
    name: "Beauty & Skin",
    script: "Perfect",
    short: "Clean-ups, facials, threading and waxing.",
    for: "Unisex",
    seoTitle: "Facial, Clean-up, Threading & Waxing in Manikonda",
    intro: "Glowing skin and a perfect beauty experience — facials, clean-ups, threading and waxing for men and women.",
    verified: false, // TODO
    groups: [
      {
        title: "Skin",
        items: [
          { name: "Clean-up", price: "₹700" },
          { name: "De-tan", price: "₹600" },
          { name: "Facial", price: "₹1,500" },
        ],
      },
      {
        title: "Threading & waxing",
        items: [
          { name: "Eyebrow threading", price: "₹60" },
          { name: "Full arms waxing", price: "₹400" },
          { name: "Full legs waxing", price: "₹600" },
        ],
      },
    ],
    faqs: [
      { q: "Which facial is right for me?", a: "Your therapist will check your skin type and suggest the best option." },
      { q: "Which facial is best for sun tan?", a: "Our O3+ and herbal de-tan clean-up therapies deliver instant results for tanned skin." },
    ],
    duration: "30–60 mins",
    highlights: ["Skin-type specific clean-up", "Herbal and dermat-tested brands", "Tan removal and pore extraction", "Instant glowing rejuvenation"],
  },
  {
    slug: "bridal-makeup-in-manikonda",
    photo: "/photos/in-service-bridal.jpg",
    name: "Bridal & Makeover",
    script: "Bridal",
    short: "Bridal, party and groom makeovers with hair styling.",
    for: "Unisex",
    seoTitle: "Bridal Makeup & Groom Makeover in Manikonda, Hyderabad",
    intro: "Look your best on the big day. Talk to us about your bridal or groom look, pre-wedding care and a trial.",
    verified: false, // TODO
    groups: [
      {
        title: "Makeover",
        items: [
          { name: "Party makeup", price: "₹2,500" },
          { name: "Bridal makeup", price: "₹12,000" },
          { name: "Groom makeover", price: "₹3,000" },
        ],
      },
    ],
    faqs: [
      { q: "Do you offer bridal makeup trials?", a: "Yes, we provide prior makeup and hair trial consultations to lock in your preferred wedding look." },
    ],
    duration: "2–3 hours",
    highlights: ["Waterproof & sweat-resistant HD makeup", "Complete saree/lehenga draping", "Bridal trials available", "On-time salon delivery"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const allItems = (s: Service) => s.groups.flatMap((g) => g.items);

export const branchAddress = (b: Branch) => `${b.street}, ${b.locality}, ${b.city}, ${b.region} ${b.postalCode}`;

export const mainBranch = site.branches[0];
