---
title: "Condenser loop for early blueprints (seasonal-safe)"
description: "A repeatable material route that survives economy tuning — with motion cues for the interact timing."
game: "once-human"
gameVersion: "S2 / client 1.4.x"
lastVerified: 2026-05-10
platforms:
  - PC (Steam)
  - PC (NetEase)
hasAnimatedMedia: true
animatedMediaSrc: "/media/guides/motion-placeholder.svg"
animatedMediaAlt: "Replace this SVG with an exported gameplay GIF showing the condenser interaction window."
---

## Problem

You need **Condenser II** parts without burning rare accelerants during a seasonal patch window.

## What we verified

This route was checked on **PC (Steam)** after the economy node refresh. Console timing can differ by a few frames — if your interact prompt feels late, add +0.2s to each hold shown in the motion reference.

## Steps

1. Clear the **Abandoned Highway** event stash once (daily lockout applies).
2. Buy **Industrial solvent** from the rotating vendor before leaving the hub — stock resets on UTC midnight.
3. Craft the **loop kit** at any mid-tier bench; do not upgrade the bench mid-craft (known soft-lock on some builds).

## Failure modes

- If the bench UI skips stage 2, relog — this is a client desync we saw on NetEase PC builds.

## Next guide

Pair this with the [material checklist](/tools/once-human-materials/) tool to track vendor deltas after patches.
