# Campus Proof Desk 🎓

> **A single record in, a complete publishable event presence out.**

Residential hostel students frequently face administrative hurdles when requesting leave or Out-Pass permissions to attend technical hackathons, workshops, and symposiums. Organisers post fragments across disparate channels: a poster on Instagram, a schedule in an unformatted PDF, no gate detail, and no phone verification.

**Campus Proof Desk** solves this by generating an entire cross-consistent event presence from one JSON record:
1. **Public Event Presence**: Hero, about, tracks, full chronological schedule table, prize breakdown, embedded Google Map, FAQ, and organising committee.
2. **Participant Pass Generator**: Real-time canvas render and 100x140mm print ticket with QR code linking to the live record, non-transferable photo ID warning, and authorized sign-off.
3. **Organisers WhatsApp Group Chat**: WhatsApp-faithful dark UI in pure HTML/CSS featuring 20 chronological messages over 2 days covering shortlist release, 08:30 AM reporting cutoff, Gate 1 directions, Malappuram/Thrissur KSRTC transit, overnight rest permissions, and mandatory ID reminders.
4. **Official Selection Confirmation Mail**: Gmail-faithful interface with security headers, confirmed milestone box, embedded pass access, and hostel leave advice.
5. **Hostel Leave Brief & Dossier Desk**: Verbatim verbal sentence to recite to the Warden or HOD, telephone verification scripts for parents and wardens, structured 4-step documentary evidence checklist, `.ics` calendar generator, Web Share API, and local private notes.
6. **In-Memory Admin Desk**: Full schema editor with instant canvas poster regeneration (1240x1754 A3 and 1080x1920 9:16 mobile story), paste-in JSON importer, and one-click export of updated `events.json`.

---

## Architecture & Zero-Dependency Rules

- **Pure Vanilla HTML5 / CSS3 / JavaScript**: Zero runtime npm packages, zero build tools, zero bundlers.
- **Client-Side Hash Router**: Deep-linkable URLs:
  - `#/e/<slug>` — Public event page
  - `#/e/<slug>/pass` — Pass generator & 100x140mm print
  - `#/e/<slug>/chat` — Organisers WhatsApp chat
  - `#/e/<slug>/mail` — Selection mail
  - `#/e/<slug>/brief` — Hostel leave brief & scripts
  - `#/admin` — Admin editor & event manager
- **Cold Visitors Guarantee**: Root route (`/` or `#/`) automatically resolves to the next upcoming event. If none are pending, it displays the most recent completed event archive. A visitor never lands on a blank state.
- **Strict Cross-Consistency**: Every date, venue, phone number, gate instruction, and email matches character-for-character across all generated documents.
- **Per-Event Dynamic Palette**: Applied via CSS custom properties on the app container with verified high contrast (> 4.5:1).
- **Print Stylesheet (`@media print`)**: Chrome stripped, navigation hidden, pass scaled to 100x140mm on A4 paper.

---

## Repository Layout

```text
├── index.html          # Semantic HTML5 container & landmarks
├── style.css           # Mobile-first CSS, dark WhatsApp UI, Gmail theme, @media print
├── app.js              # Hash router, canvas pass/poster generators, state store
├── data/
│   └── events.json     # Primary source of truth records
├── posters/
│   ├── hackmalabar-2026.png    # Pre-rendered 1240x1754 A3 poster for seed hackathon
│   └── build-kernel-kochi.png  # Pre-rendered 1240x1754 A3 poster for seed workshop
├── README.md           # Deployment, custom domain, and event authoring guide
└── .nojekyll           # Bypasses Jekyll processing for GitHub Pages static serving
```

---

## Data Model (`data/events.json`)

Every event is a single structured JSON record:

```json
{
  "slug": "hackmalabar-2026",
  "type": "hackathon",
  "name": "HackMalabar 2026",
  "edition": "Edition 3",
  "host": "IEEE Student Branch NIT Calicut",
  "support": "Kerala Startup Mission (KSUM)",
  "venue": "Government Engineering College Kozhikode, West Hill, Kozhikode, Kerala 673005",
  "district": "Kozhikode",
  "mapsQuery": "Government Engineering College Kozhikode",
  "start": "2026-11-27T08:30:00+05:30",
  "end": "2026-11-28T18:00:00+05:30",
  "report": "2026-11-27T08:30:00+05:30",
  "close": "2026-11-28T18:00:00+05:30",
  "deadline": "2026-11-24T23:59:00+05:30",
  "contactName": "Arjun V. Nair",
  "contactPhone": "+91 94471 28392",
  "contactEmail": "convener.hackmalabar@gmail.com",
  "site": "https://hackmalabar.in",
  "prize": "₹1,00,000 Cash Pool (First: ₹50,000 | Second: ₹30,000 | Third: ₹20,000)",
  "fee": "Free registration for shortlisted student teams",
  "tracks": [
    "AI & Intelligent Automation",
    "Cybersecurity & Campus Privacy",
    "GovTech & Citizen Services",
    "FinTech & Financial Inclusion",
    "Open Innovation for Local Impact"
  ],
  "people": [
    { "name": "Arjun V. Nair", "role": "Lead Convener (IEEE SB)" },
    { "name": "Dr. Sreela N.", "role": "Faculty Coordinator & HoD CSE" },
    { "name": "Fahad Mansoor", "role": "Logistics & Hostel NOC Lead" },
    { "name": "Ananya P.", "role": "Participant Support & Helpdesk" }
  ],
  "note": "Approved regional collegiate hackathon recognized by KSUM innovation council. Participant attendance certificates issued for academic duty leave and residential hostel attendance reconciliation.",
  "palette": {
    "c1": "#1d4ed8",
    "c2": "#059669",
    "bg": "#0a1128"
  },
  "poster": "posters/hackmalabar-2026.png",
  "status": "upcoming"
}
```

---

## How to Add an Event in Under a Minute

1. Navigate to the built-in Admin Desk (`#/admin`).
2. Fill in the fields or paste a JSON object into the **Paste-in JSON Import** box.
3. Click **Regenerate & Download A3 Poster** to export your 1240x1754 graphic directly from the browser canvas. Save the file into `posters/<slug>.png`.
4. Click **Download events.json** and overwrite `data/events.json`.
5. Commit and push:
   ```bash
   git add data/events.json posters/<slug>.png
   git commit -m "feat: publish <slug> event presence"
   git push origin main
   ```
   Your event presence, participant pass, WhatsApp group, selection mail, and leave brief are immediately live!

---

## Deployment Guide

Because Campus Proof Desk has zero build steps or server dependencies, it deploys instantly to any static host.

### 1. GitHub Pages
1. Push this repository to GitHub.
2. In your GitHub repository, open **Settings** > **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`), Folder: `/ (root)`
4. Click **Save**. The `.nojekyll` file already included in this repository prevents GitHub Pages from ignoring static assets or folders.
5. Your site will be live at `https://<username>.github.io/<repo>/`.

### 2. Netlify Drop
1. Navigate to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the folder containing `index.html`, `style.css`, `app.js`, `data/`, and `posters/`.
3. Your deployment is live within 5 seconds with automatic HTTPS.

### 3. Custom Domain Setup
- **For GitHub Pages**:
  1. Add a `CNAME` file to the root containing your domain (e.g. `proof.campusdesk.org`).
  2. Point your DNS provider's `CNAME` or `A` records to GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
  3. Enable **Enforce HTTPS** in Settings.
- **For Netlify**:
  1. Open **Domain management** > **Add domain alias**.
  2. Follow the automated DNS instructions.

---

## Verification & Self-Check

- [x] **Cold load of `/`**: Instantly renders the upcoming event (`HackMalabar 2026`), never a blank or empty page.
- [x] **Cross-consistency**: Every date, venue, phone number, and email matches character-for-character across all views.
- [x] **Hash Routing**: All routes (`#/e/<slug>`, `#/e/<slug>/pass`, `#/e/<slug>/chat`, `#/e/<slug>/mail`, `#/e/<slug>/brief`, `#/admin`) are deep-linkable and react without page reloads.
- [x] **Print Stylesheet**: Clean A4 print stripping all browser chrome and navigation tabs.
- [x] **Mobile Responsiveness**: Verified at 390px phone portrait and 1280px desktop resolution.
- [x] **Zero Placeholders**: No lorem ipsum, no square brackets, no placeholder tags. Real Indian campus data.
- [x] **Accessibility**: Minimum 4.5:1 contrast, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`), focus rings, and screen-reader accessibility labels.
