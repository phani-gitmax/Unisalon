"use client";

import { useRef } from "react";
import { site, branchAddress } from "@/lib/site";
import { track } from "./Analytics";

const waText = encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`);

// A Call or WhatsApp button that first asks which branch — each branch has its own number.
export function BranchPicker({
  action,
  className,
  children,
}: {
  action: "call" | "whatsapp";
  className?: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" className={className} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
        {children}
      </button>
      <dialog
        ref={dialog}
        className="branch-sheet glass-strong"
        aria-label={action === "call" ? "Choose a branch to call" : "Choose a branch to WhatsApp"}
        // Clicking the dimmed backdrop (the dialog element itself) closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="branch-sheet-inner">
          <div className="branch-sheet-head">
            <p className="eyebrow">{action === "call" ? "Call" : "WhatsApp"}</p>
            <h2>Which branch?</h2>
            <button type="button" className="branch-sheet-close" onClick={close} aria-label="Close">×</button>
          </div>
          {site.branches.map((b) => (
            <a
              key={b.id}
              className="branch-option"
              href={action === "call" ? `tel:${b.phone}` : `https://wa.me/${b.whatsapp}?text=${waText}`}
              {...(action === "whatsapp" && { target: "_blank", rel: "noopener noreferrer" })}
              onClick={() => {
                track(action === "call" ? "click_call" : "click_whatsapp", { branch: b.id });
                close();
              }}
            >
              <strong>{b.name.replace(/ Branch$/, "")}</strong>
              <span>{branchAddress(b)}</span>
              <span className="branch-option-cta">{action === "call" ? `Call ${b.phoneDisplay}` : "Chat on WhatsApp"} →</span>
            </a>
          ))}
        </div>
      </dialog>
    </>
  );
}
