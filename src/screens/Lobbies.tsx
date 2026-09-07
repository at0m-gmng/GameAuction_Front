import { useEffect, useRef } from "react";
import { SharedTopNav } from "@/components/SharedTopNav";
import OpenLobbies from "@/imports/OpenLobbies/index";
import type { Page } from "@/lib/navigation";

export function InteractiveLobbies({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // NOTE: only the "ENTER LOBBY" CTA buried in the raw Figma table markup is
  // matched by text here — real nav (CATALOG/LOBBIES/PROFILE) is handled by
  // SharedTopNav's own onClick buttons below, not by this hack.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim().toUpperCase() ?? "";
      if (text === "ENTER LOBBY") { e.preventDefault(); e.stopPropagation(); onNavigate("login"); }
    };

    el.addEventListener("click", handler, true);
    return () => el.removeEventListener("click", handler, true);
  }, [onNavigate]);

  return (
    <div ref={ref} style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <SharedTopNav active="lobbies" onNavigate={onNavigate} />
      <OpenLobbies />
    </div>
  );
}
