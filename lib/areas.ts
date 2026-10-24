// Nearby areas served by both branches, one page each at /salon-near/<slug>.
// Drive times and routes are from Google Maps directions (area → branch pin), measured October 2026.
// Re-measure if a branch moves; never estimate these by hand.

import { site, type Branch } from "./site";

export type Route = { time: string; distance: string; via: string };
export type Area = {
  slug: string;
  name: string;
  inArea: boolean; // a branch is inside this area ("salon in …" rather than "near …")
  routes: Record<string, Route>; // keyed by branch id
};

export const areas: Area[] = [
  {
    slug: "manikonda",
    name: "Manikonda",
    inArea: true,
    routes: {
      "trenton-park": { time: "9 min", distance: "2.5 km", via: "Puppalaguda Rd/Shaikpet Main Rd" },
      "challas-myspace": { time: "9 min", distance: "2.3 km", via: "Puppalaguda Rd/Shaikpet Main Rd" },
    },
  },
  {
    slug: "alkapur-township",
    name: "Alkapur Township",
    inArea: true,
    routes: {
      "trenton-park": { time: "1 min", distance: "250 m", via: "Rd Number 21" },
      "challas-myspace": { time: "1 min", distance: "450 m", via: "unnamed roads" },
    },
  },
  {
    slug: "puppalaguda",
    name: "Puppalaguda",
    inArea: false,
    routes: {
      "trenton-park": { time: "5 min", distance: "1.5 km", via: "Begonia Homes Rd" },
      "challas-myspace": { time: "4 min", distance: "1.2 km", via: "Begonia Homes Rd" },
    },
  },
  {
    slug: "narsingi",
    name: "Narsingi",
    inArea: false,
    routes: {
      "trenton-park": { time: "8 min", distance: "2.0 km", via: "Caterpillar Rd" },
      "challas-myspace": { time: "8 min", distance: "2.5 km", via: "Narsingi - Puppalaguda Main Rd" },
    },
  },
  {
    slug: "lanco-hills",
    name: "Lanco Hills",
    inArea: false,
    routes: {
      "trenton-park": { time: "11 min", distance: "3.0 km", via: "Puppalaguda Rd/Shaikpet Main Rd" },
      "challas-myspace": { time: "10 min", distance: "2.8 km", via: "Puppalaguda Rd/Shaikpet Main Rd" },
    },
  },
  {
    slug: "gachibowli",
    name: "Gachibowli",
    inArea: false,
    routes: {
      "trenton-park": { time: "20 min", distance: "9.4 km", via: "Nehru Outer Ring Rd" },
      "challas-myspace": { time: "20 min", distance: "9.1 km", via: "Nehru Outer Ring Rd" },
    },
  },
  {
    slug: "kokapet",
    name: "Kokapet",
    inArea: false,
    routes: {
      "trenton-park": { time: "17 min", distance: "5.2 km", via: "Narsingi - Puppalaguda Main Rd" },
      "challas-myspace": { time: "16 min", distance: "5.1 km", via: "Narsingi - Puppalaguda Main Rd" },
    },
  },
  {
    slug: "neknampur",
    name: "Neknampur",
    inArea: false,
    routes: {
      "trenton-park": { time: "4 min", distance: "1.3 km", via: "Rd Number 25" },
      "challas-myspace": { time: "4 min", distance: "1.5 km", via: "Rd Number 25" },
    },
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);

const minutes = (r: Route) => parseInt(r.time, 10);
const metres = (r: Route) => parseFloat(r.distance) * (r.distance.endsWith("km") ? 1000 : 1);

// The quicker branch to reach from this area (shorter drive time, then shorter distance).
export function closestBranch(a: Area): Branch {
  return [...site.branches].sort((x, y) => {
    const rx = a.routes[x.id], ry = a.routes[y.id];
    return minutes(rx) - minutes(ry) || metres(rx) - metres(ry);
  })[0];
}

export const directionsUrl = (a: Area, b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${a.name}, Hyderabad, Telangana`)}&destination=${b.lat},${b.lng}`;
