# HackDesk ⚡

> **Collegiate Hackathon Posting & Participation Platform**
> A single record in, a complete verified hackathon presence out.

**HackDesk** is a dedicated hackathon posting and participation desk designed for developers, student teams, and organizers. Built with Claude AI's signature editorial typography and warm palette, it generates an entire verified presence from one JSON record:

1. **Public Event Presence**: Editorial hero, live countdown, 5 challenge tracks, 48-hour 3-day chronological milestones, prize awards (₹1,00,000 cash pool), interactive track selector, FAQ, and organizing committee.
2. **Participant Pass Generator**: Real-time canvas badge and 100x140mm print lanyard ticket with QR code linking to the live event record, customizable attendee identity, non-transferable student ID notice, and authorized organizer sign-off.
3. **Hackathon Guide & Submission Brief**: Mandatory deliverables checklist (GitHub repo, demo video, live deployment, 5-slide pitch deck), scoring weights (Innovation 30%, Complexity 30%, Polish 20%, Impact 20%), code integrity standards, and browser-persisted sprint workspace.
4. **In-Memory Admin Desk**: Password-protected (`dumass-dev`) schema editor for posting and editing hackathons, instant canvas poster regeneration, and one-click export of updated `events.json`.

---

## Architecture & Design System

- **Claude AI Signature Aesthetics**: Warm cream oat paper (`#fbf9f5`), editorial serif typography (*Newsreader*), warm charcoal ink, and Claude Terracotta (`#d97757`) accents. Zero AI slop, zero dark neon.
- **Pure Vanilla HTML5 / CSS3 / JavaScript**: Zero runtime npm dependencies, zero build tools, zero bundlers.
- **Client-Side Hash Router**: Deep-linkable URLs:
  - `#/e/<slug>` — Public hackathon overview
  - `#/e/<slug>/pass` — Participant pass & lanyard badge
  - `#/e/<slug>/brief` — Hackathon submission guide & rubrics
  - `#/admin` — Password-protected admin desk (`dumass-dev`)
- **Strict Hackathon Integrity**: Every date, venue, track, criteria, and contact email matches character-for-character across all views.
- **Print Stylesheet (`@media print`)**: Chrome stripped, navigation hidden, pass scaled to 100x140mm on standard A4 paper.

---

## Repository Layout

```text
├── index.html          # Semantic HTML5 container & landmarks
├── style.css           # Claude signature stylesheet & mobile engine
├── app.js              # Hash router, canvas pass/poster generators, state store
├── data/
│   └── events.json     # Primary source of truth records
├── posters/
│   ├── hackmalabar-2026.png    # Pre-rendered 1240x1754 A3 poster for seed hackathon
│   └── build-kernel-kochi.png  # Pre-rendered 1240x1754 A3 poster for seed workshop
├── README.md           # Deployment and hackathon authoring guide
└── .nojekyll           # Bypasses Jekyll processing for GitHub Pages static serving
```

---

## Deployment (GitHub Pages)

This repository is designed to be served directly via GitHub Pages:
- Target branch: `main`
- Path: `/` (root)
- URL: `https://<user>.github.io/<repo>/`
