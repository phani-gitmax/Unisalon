import { site, allItems, type Service } from "./site";

function to12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return m ? `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}` : `${h % 12 || 12} ${suffix}`;
}

function dayRange(days: string[]) {
  if (days.length === 7) return "All days";
  const short = days.map((d) => d.slice(0, 3));
  return short.length > 2 ? `${short[0]}–${short[short.length - 1]}` : short.join(" & ");
}

export const hoursText = site.hours.map((h) => ({ days: dayRange(h.days), time: `${to12h(h.open)} – ${to12h(h.close)}` }));

export const fromPrice = (s: Service) =>
  s.from ??
  "₹" + Math.min(...allItems(s).map((i) => Number(i.price.replace(/[^\d]/g, "")))).toLocaleString("en-IN");
