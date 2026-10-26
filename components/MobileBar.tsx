"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BranchPicker } from "./BranchPicker";

// Floating Call / WhatsApp / Book bar on phones — home page only. It fades in once the visitor
// scrolls down to the element with id `showFrom` (the block after the hero), and hides again
// back at the top. Call and WhatsApp ask which branch first, since each branch has its own number.
export function MobileBar({ showFrom }: { showFrom: string }) {
  const bar = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = document.getElementById(showFrom);
    if (!target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // Never hide it while a branch picker is open — the dialog would become inert with it.
      if (bar.current?.querySelector("dialog[open]")) return;
      setShown(target.getBoundingClientRect().top < window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showFrom]);

  return (
    <nav ref={bar} className={`mobile-bar glass-strong${shown ? " is-shown" : ""}`} aria-label="Quick contact" inert={!shown}>
      <BranchPicker action="call">Call</BranchPicker>
      <BranchPicker action="whatsapp">WhatsApp</BranchPicker>
      <Link href="/book" className="primary" prefetch={false}>Book appointment</Link>
    </nav>
  );
}
