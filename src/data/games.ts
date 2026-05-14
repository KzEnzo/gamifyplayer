export type GameId = "red-desert" | "gta-6" | "once-human";

export const games: Record<
  GameId,
  {
    id: GameId;
    name: string;
    tagline: string;
    versionNote: string;
    lastPageReview: string;
    accent: string;
  }
> = {
  "red-desert": {
    id: "red-desert",
    name: "Red Desert",
    tagline: "Open-world action-adventure — curated, version-checked routes.",
    versionNote: "Pre-release / technical test builds change weekly. Guides are labeled by the build they were verified against.",
    lastPageReview: "2026-05-12",
    accent: "#ff6e40",
  },
  "gta-6": {
    id: "gta-6",
    name: "GTA 6",
    tagline: "Vice City region — mission prep without the noise.",
    versionNote: "Post-launch patches will move fast. We prioritize one-problem pages with explicit verification dates.",
    lastPageReview: "2026-05-12",
    accent: "#ff5252",
  },
  "once-human": {
    id: "once-human",
    name: "Once Human",
    tagline: "Survival sanity — builds, materials, and seasonal cadence.",
    versionNote: "Seasonal resets affect economy nodes. Check lastVerified on each guide before grinding.",
    lastPageReview: "2026-05-12",
    accent: "#ff8a65",
  },
};

export const gameOrder: GameId[] = ["red-desert", "gta-6", "once-human"];
