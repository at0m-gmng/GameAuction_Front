import { useEffect, useRef } from "react";
import LandingTerminal from "@/imports/LandingTerminal/index";
import type { Page } from "@/lib/navigation";

export function InteractiveLanding({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOBBIES") { e.preventDefault(); e.stopPropagation(); onNavigate("lobbies"); }
      else if (text === "PROFILE") { e.preventDefault(); e.stopPropagation(); onNavigate("profile"); }
      else if (text === "BROWSE CATALOG") { e.preventDefault(); e.stopPropagation(); onNavigate("catalog"); }
      else if (text === "LOGIN / REGISTER") { e.preventDefault(); e.stopPropagation(); onNavigate("login"); }
    };

    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%" }}>
      <LandingTerminal />
    </div>
  );
}
