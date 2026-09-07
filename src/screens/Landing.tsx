import { useEffect, useRef } from "react";
import { SharedTopNav } from "@/components/SharedTopNav";
import LandingTerminal from "@/imports/LandingTerminal/index";
import type { Page } from "@/lib/navigation";

export function InteractiveLanding({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // NOTE: only CTAs buried in the raw Figma hero markup are matched by text
  // here — real nav (CATALOG/LOBBIES/PROFILE) is handled by SharedTopNav's
  // own onClick buttons below, not by this click-anywhere-and-guess hack.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "BROWSE CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOGIN / REGISTER") { e.preventDefault(); e.stopPropagation(); onNavigate("login"); }
    };

    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="landing" onNavigate={onNavigate} minimal />
      <LandingTerminal />
    </div>
  );
}
