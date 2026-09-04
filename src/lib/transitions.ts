export type TransitionType = "fade" | "slide" | "scale" | "glitch" | "wipe";
export type Direction = "left" | "right" | "up" | "down";
export type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier(0.34,1.56,0.64,1)";
export type TransitionState = "idle" | "exiting" | "entering";

export interface AnimConfig {
  transition: TransitionType;
  direction: Direction;
  duration: number;
  easing: Easing;
  scanlines: boolean;
  grid: boolean;
  glitchColor: boolean;
}

export const defaultConfig: AnimConfig = {
  transition: "glitch",
  direction: "left",
  duration: 480,
  easing: "ease-in-out",
  scanlines: true,
  grid: false,
  glitchColor: false,
};

export function getAnimationNames(
  type: TransitionType,
  dir: Direction
): { enter: string; exit: string } {
  switch (type) {
    case "fade":
      return { enter: "nx-fade-in", exit: "nx-fade-out" };
    case "scale":
      return { enter: "nx-scale-in", exit: "nx-scale-out" };
    case "glitch":
      return { enter: "nx-glitch-in", exit: "nx-glitch-out" };
    case "slide": {
      const map: Record<Direction, { enter: string; exit: string }> = {
        left:  { enter: "nx-slide-in-right",  exit: "nx-slide-out-left" },
        right: { enter: "nx-slide-in-left",   exit: "nx-slide-out-right" },
        up:    { enter: "nx-slide-in-down",   exit: "nx-slide-out-up" },
        down:  { enter: "nx-slide-in-up",     exit: "nx-slide-out-down" },
      };
      return map[dir];
    }
    case "wipe": {
      const map: Record<Direction, { enter: string; exit: string }> = {
        left:  { enter: "nx-wipe-in-left",  exit: "nx-wipe-out-right" },
        right: { enter: "nx-wipe-in-right", exit: "nx-wipe-out-left" },
        up:    { enter: "nx-wipe-in-down",  exit: "nx-wipe-out-up" },
        down:  { enter: "nx-wipe-in-down",  exit: "nx-wipe-out-up" },
      };
      return map[dir];
    }
  }
}
