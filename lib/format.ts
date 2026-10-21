import { site } from "./site";

function to12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function dayRange(days: string[]) {
  const short = days.map((d) => d.slice(0, 3));
  return short.length > 2 ? `${short[0]}–${short[short.length - 1]}` : short.join(" & ");
}

export const hoursText = site.hours.map((h) => ({ days: dayRange(h.days), time: `${to12h(h.open)} – ${to12h(h.close)}` }));

export const fromPrice = (items: { price: string }[]) =>
  "₹" + Math.min(...items.map((i) => Number(i.price.replace(/[^\d]/g, "")))).toLocaleString("en-IN");
