/**
 * HackDesk — Collegiate Hackathon Posting & Verification Platform
 * Zero runtime npm dependencies • Claude AI Signature Design System
 */

(function () {
  'use strict';

  // Built-in Seed Hackathons for Zero-Latency First Render
  const DEFAULT_EVENTS = [
    {
      slug: "hackmalabar-2026",
      type: "hackathon",
      name: "HackMalabar 2026",
      edition: "Edition 3",
      host: "IEEE Student Branch NIT Calicut",
      support: "Kerala Startup Mission (KSUM)",
      venue: "Government Engineering College Kozhikode, West Hill, Kozhikode, Kerala 673005",
      district: "Kozhikode",
      mapsQuery: "Government Engineering College Kozhikode",
      start: "2026-11-23T08:30:00+05:30",
      end: "2026-11-25T18:00:00+05:30",
      report: "2026-11-23T08:30:00+05:30",
      close: "2026-11-25T18:00:00+05:30",
      deadline: "2026-11-20T23:59:00+05:30",
      contactName: "Arjun V. Nair",
      contactEmail: "convener@hackmalabar.dev",
      site: "https://hackmalabar.dev",
      prize: "₹1,00,000 Cash Pool (First: ₹50,000 | Second: ₹30,000 | Third: ₹20,000)",
      fee: "Free registration for shortlisted teams",
      tracks: [
        "AI & Intelligent Automation",
        "Developer Tooling & Infrastructure",
        "FinTech & Decentralized Systems",
        "HealthTech & Assistive Technologies",
        "Open Innovation for Real-World Impact"
      ],
      people: [
        { name: "Arjun V. Nair", role: "Lead Convener (IEEE SB)" },
        { name: "Dr. Sreela N.", role: "Faculty Advisor & HoD CSE" },
        { name: "Fahad Mansoor", role: "Technical Operations & Track Lead" },
        { name: "Ananya P.", role: "Hacker Experience & Mentorship Lead" }
      ],
      note: "Premier 24-hour collegiate hackathon endorsed and supported by KSUM Innovation Council. 140+ finalist developer teams building next-generation products with ₹1,00,000 in cash prizes, API credits, and venture incubation grants.",
      palette: { c1: "#d97757", c2: "#1f1e1b", bg: "#fbf9f5" },
      poster: "posters/hackmalabar-2026.png",
      status: "upcoming"
    },
    {
      slug: "build-kernel-kochi",
      type: "hackathon",
      name: "KernelHack Kochi 2026",
      edition: "Edition 2",
      host: "FOSS Cell & Department of Computer Applications, CUSAT",
      support: "Kerala FOSS Initiative & ICFOSS",
      venue: "Seminar Complex, Cochin University of Science and Technology, South Kalamassery, Kochi, Kerala 682022",
      district: "Ernakulam",
      mapsQuery: "CUSAT Seminar Complex Kalamassery",
      start: "2026-10-31T09:00:00+05:30",
      end: "2026-11-01T17:00:00+05:30",
      report: "2026-10-31T09:00:00+05:30",
      close: "2026-11-01T17:00:00+05:30",
      deadline: "2026-10-25T20:00:00+05:30",
      contactName: "Nivin George",
      contactEmail: "hack@fosscell.cusat.ac.in",
      site: "https://fosscell.cusat.ac.in/kernelhack",
      prize: "₹75,000 Cash Grants & Hardware Developer Kits",
      fee: "Free for shortlisted open source contributors",
      tracks: [
        "Kernel Modules & Driver Development",
        "eBPF Observability & Security",
        "Embedded Linux & Edge Computing"
      ],
      people: [
        { name: "Nivin George", role: "Lead Organizer (CUSAT FOSS Cell)" },
        { name: "Prof. K. R. Suresh", role: "Director, School of Engineering" },
        { name: "Reshma Balan", role: "Judging & Mentorship Coordinator" }
      ],
      note: "Systems and low-level software engineering hackathon. Developers create open-source kernel extensions, high-performance network parsers, and hardware IoT firmwares.",
      palette: { c1: "#cc5500", c2: "#1f1e1b", bg: "#fbf9f5" },
      poster: "posters/build-kernel-kochi.png",
      status: "completed"
    }
  ];

  // Application State
  const state = {
    events: [...DEFAULT_EVENTS],
    currentEvent: null,
    currentScreen: 'public',
    soundEnabled: false,
    participant: {
      name: 'Rahul Krishna',
      college: 'College of Engineering Trivandrum',
      regId: 'HM-2026-7842',
      track: ''
    },
    chatMessagesMap: {},
    privateNote: localStorage.getItem('hackdesk_private_note') || ''
  };

  // Web Audio Synthetic Sound FX (Zero External Files, High-Quality Feedback)
  let audioCtx = null;
  function playFuturisticBlip(freq = 780, duration = 0.04) {
    if (!state.soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy
    }
  }

  // Accredited Competency Tracks Metadata & Problem Focus
  const trackMetadata = {
    "AI & Intelligent Automation": {
      techs: ["Claude 3.5 Sonnet", "PyTorch", "LangChain", "Autonomous Agents"],
      focus: "Autonomous agentic workflows, multimodal document intelligence, and real-time reasoning engines."
    },
    "Developer Tooling & Infrastructure": {
      techs: ["Rust", "Wasm", "eBPF", "CLI Engines"],
      focus: "Next-gen compiler tooling, developer observability, container runtimes, and local developer productivity."
    },
    "FinTech & Decentralized Systems": {
      techs: ["UPI Rails", "Account Aggregators", "Zero-Knowledge", "Smart Contracts"],
      focus: "Real-time fraud prevention, decentralized micro-credit pipelines, and open banking protocols."
    },
    "HealthTech & Assistive Technologies": {
      techs: ["Edge Vision", "Sensors", "WebRTC", "Offline-First"],
      focus: "Remote triage telemetry, low-latency audio accessibility assistants, and rural clinic connectivity."
    },
    "Open Innovation for Real-World Impact": {
      techs: ["Civic APIs", "GeoJSON", "Edge IoT", "Cloudflare Workers"],
      focus: "Localized climate telemetry, transparent municipal resource distribution, and citizen crisis alerts."
    },
    "Kernel Modules & Driver Development": {
      techs: ["C", "Linux Kernel", "QEMU", "Device Trees"],
      focus: "Low-level system architecture, character driver implementations, and interrupt handlers."
    },
    "eBPF Observability & Security": {
      techs: ["eBPF", "BCC", "Tracepoints", "Kernel Probes"],
      focus: "Zero-overhead packet filters, kernel-level anomaly detection, and live system instrumentation."
    },
    "Embedded Linux & Edge Computing": {
      techs: ["Yocto", "Buildroot", "ARM64", "GPIO"],
      focus: "Minimal custom kernel images, fast boot optimization, and hardware board bring-up."
    }
  };

  // Hackathon Schedule Presets
  const schedulePresets = {
    hackathon: [
      { day: 'Day 1', time: '08:00 AM', label: 'Participant Gate Check-in & Badge Allotment', note: 'Gate 1, West Hill campus. Photo ID verification, welcome kits, and LAN credentials.' },
      { day: 'Day 1', time: '08:30 AM', label: 'Mandatory Team Check-in & Table Allotment', note: 'All shortlisted finalist teams report to their assigned developer pods.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Keynote & Problem Statements Unveiling', note: 'Briefing by IEEE mentors, faculty advisors, and industry jury members.' },
      { day: 'Day 1', time: '10:30 AM', label: 'Hacking Phase 1 Commences', note: 'Dedicated high-speed connectivity and power workstations active.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Working Lunch & Architecture Review', note: 'Mentors evaluate team architecture schematics and initial repo commits.' },
      { day: 'Day 1', time: '04:30 PM', label: 'Mentorship Checkpoint 1 (Technical Feasibility)', note: 'Industry mentors inspect codebase commits and viability metrics.' },
      { day: 'Day 1', time: '08:00 PM', label: 'Dinner & Sprint Progress Sync', note: 'Dining service and informal lightning demos across pods.' },
      { day: 'Day 1', time: '11:30 PM', label: 'Midnight Snack & Lightning Code Review', note: 'Night technical helpdesk and 24/7 campus security desk active.' },
      { day: 'Day 2', time: '07:30 AM', label: 'Breakfast & Final Sprint Commences', note: 'Final sprint toward code freeze.' },
      { day: 'Day 2', time: '11:00 AM', label: 'Mentorship Checkpoint 2 (Pitch Dry-Run)', note: 'Rehearsals with presentation and product demo feedback.' },
      { day: 'Day 2', time: '01:30 PM', label: 'Code Freeze & GitHub Repository Submission', note: 'Pull requests locked. Working software evaluation required.' },
      { day: 'Day 2', time: '02:30 PM', label: 'Final Stage Presentations & Jury Deliberation', note: 'Top finalist teams present live in the main campus auditorium.' },
      { day: 'Day 2', time: '05:00 PM', label: 'Valedictory Ceremony & Prize Distribution', note: 'Announcement of winners and presentation of ₹1,00,000 cash awards.' },
      { day: 'Day 2', time: '06:00 PM', label: 'Programme Close & Participant Merit Credentials', note: 'Official stamped hackathon participation certificates and incubator vouchers.' }
    ],
    workshop: [
      { day: 'Day 1', time: '09:00 AM', label: 'Check-in & Workstation Allotment', note: 'Registration verification and lab system access.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Architecture Overview & Source Walk', note: 'Foundational concepts and kernel internals walkthrough.' },
      { day: 'Day 1', time: '11:30 AM', label: 'Hands-on Module 1: Kernel Compilation', note: 'Building and booting minimal custom kernel images.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Lunch Break & Technical Networking', note: 'Networking session with open-source contributors.' },
      { day: 'Day 1', time: '02:00 PM', label: 'Hands-on Module 2: Device Drivers', note: 'Writing character device drivers and interrupt handling.' },
      { day: 'Day 1', time: '05:00 PM', label: 'Day 1 Sign-off & Milestone Review', note: 'Verification of day 1 lab milestones.' },
      { day: 'Day 2', time: '09:00 AM', label: 'Check-in & System Diagnostics', note: 'Review of overnight build logs and questions.' },
      { day: 'Day 2', time: '09:30 AM', label: 'Hands-on Module 3: eBPF & Observability', note: 'Kernel tracing, kprobes, and live metric instrumentation.' },
      { day: 'Day 2', time: '01:00 PM', label: 'Lunch Break', note: 'Campus cafeteria service.' },
      { day: 'Day 2', time: '02:00 PM', label: 'Hardware Bring-up & Real-world Debugging', note: 'Debugging hardware faults and kernel oops logs.' },
      { day: 'Day 2', time: '04:30 PM', label: 'Certificate Distribution & Valedictory', note: 'Presentation of course completion credentials.' },
      { day: 'Day 2', time: '05:00 PM', label: 'Programme Close & Developer Credentials', note: 'Official certificates of merit and project credentials presented.' }
    ]
  };

  // Helper: format date range string
  function formatDateRange(startIso, endIso) {
    const s = new Date(startIso);
    const e = new Date(endIso);
    const sMonth = s.toLocaleString('en-US', { month: 'short' });
    const eMonth = e.toLocaleString('en-US', { month: 'short' });
    const sDay = s.getDate();
    const eDay = e.getDate();
    const year = s.getFullYear();

    if (sMonth === eMonth) {
      return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${year}`;
    }
    return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${year}`;
  }

  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  function formatDateNatural(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function extractHostname(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return 'hackdesk.dev';
    }
  }

  // Load events from data/events.json with fallback to DEFAULT_EVENTS
  async function loadData() {
    try {
      const res = await fetch('data/events.json?v=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          state.events = data;
          console.log('[HackDesk] Loaded events.json successfully:', data.length);
        }
      }
    } catch (err) {
      console.warn('[HackDesk] Fetch error, using built-in seed events:', err);
    }
    populateEventSwitcher();
  }

  // Update switcher dropdown
  function populateEventSwitcher() {
    const sel = document.getElementById('event-selector');
    if (!sel) return;

    const currentSlug = state.currentEvent ? state.currentEvent.slug : state.events[0].slug;
    sel.innerHTML = state.events.map(ev => `
      <option value="${escapeHtml(ev.slug)}" ${ev.slug === currentSlug ? 'selected' : ''}>
        ${escapeHtml(ev.name)} (${ev.status === 'upcoming' ? 'Upcoming' : 'Past'})
      </option>
    `).join('');

    sel.onchange = (e) => {
      const slug = e.target.value;
      const targetScreen = state.currentScreen === 'admin' ? 'public' : state.currentScreen;
      window.location.hash = targetScreen === 'public' ? `#/e/${slug}` : `#/e/${slug}/${targetScreen}`;
    };
  }

  // Admin clearance state helper (password: dumass-dev)
  function isAdminAuthenticated() {
    return sessionStorage.getItem('hackdesk_admin_authenticated') === 'true';
  }

  function setAdminAuthenticated(val) {
    if (val) {
      sessionStorage.setItem('hackdesk_admin_authenticated', 'true');
    } else {
      sessionStorage.removeItem('hackdesk_admin_authenticated');
    }
  }

  // Update navigation tabs hrefs
  function updateNavTabs(currentSlug, currentScreen) {
    const nav = document.getElementById('nav-tabs-container');
    if (!nav) return;

    const baseSlug = currentSlug || (state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026');
    const adminLink = (currentScreen === 'admin' && isAdminAuthenticated())
      ? `<a href="#/admin" class="sub-link active" data-screen="admin">Admin Desk</a>`
      : '';

    nav.innerHTML = `
      <a href="#/e/${baseSlug}" class="sub-link ${currentScreen === 'public' ? 'active' : ''}" data-screen="public">Overview</a>
      <a href="#/e/${baseSlug}/pass" class="sub-link ${currentScreen === 'pass' ? 'active' : ''}" data-screen="pass">Participant Pass</a>
      <a href="#/e/${baseSlug}/chat" class="sub-link ${currentScreen === 'chat' ? 'active' : ''}" data-screen="chat">Organisers Channel</a>
      <a href="#/e/${baseSlug}/brief" class="sub-link ${currentScreen === 'brief' ? 'active' : ''}" data-screen="brief">Hackathon Guide</a>
      ${adminLink}
    `;
  }

  // Update footer (no admin traces in public view, no phone numbers)
  function updateFooter(event) {
    const mount = document.getElementById('footer-mount');
    if (!mount) return;

    if (!event) {
      mount.innerHTML = `<div class="footer-meta">HackDesk — Verified Collegiate Hackathon Infrastructure.</div>`;
      return;
    }

    mount.innerHTML = `
      <div class="footer-left">
        <div class="footer-brand">${escapeHtml(event.name)} (${escapeHtml(event.edition)})</div>
        <div class="footer-host">Organised by ${escapeHtml(event.host)} • Supported by ${escapeHtml(event.support)}</div>
        <div class="footer-contacts">
          <span>Lead Convener: <strong>${escapeHtml(event.contactName)}</strong></span>
          <span>Contact Email: <a href="mailto:${escapeHtml(event.contactEmail)}">${escapeHtml(event.contactEmail)}</a></span>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-links">
          <a href="${escapeHtml(event.site)}" target="_blank" rel="noopener">Official Portal</a>
          <span class="dot-sep">•</span>
          <a href="#/e/${event.slug}/pass">Participant Pass</a>
          <span class="dot-sep">•</span>
          <a href="#/e/${event.slug}/brief">Guide & Rules</a>
        </div>
        <div class="footer-note">HackDesk • Claude AI Design System • Pure Hackathon Platform</div>
      </div>
    `;
  }

  // Generate Real Developer & Mentor Coordination Messages
  function generateChatMessages(event) {
    if (state.chatMessagesMap[event.slug]) {
      return state.chatMessagesMap[event.slug];
    }

    const convener = event.contactName;
    const venue = event.venue;
    const reportTime = formatTime(event.report);
    const startDate = formatDateNatural(event.start);
    const techLead = event.people.find(p => p.role.toLowerCase().includes('technical') || p.role.toLowerCase().includes('operations')) || { name: 'Fahad Mansoor' };
    const helpdeskLead = event.people.find(p => p.role.toLowerCase().includes('mentor') || p.role.toLowerCase().includes('experience') || p.role.toLowerCase().includes('support')) || { name: 'Ananya P.' };

    const messages = [
      // Day 1
      { id: 1, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '08:15 AM', text: `Welcome everyone to the official shortlisted teams coordinate channel for ${event.name} (${event.edition})! Hearty congratulations on clearing the screening round.` },
      { id: 2, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '08:16 AM', text: `This channel is strictly for technical announcements, API sandboxes, mentorship schedules, and submission checkpoints.` },
      { id: 3, day: 1, sender: techLead.name, role: 'fahad', outgoing: false, time: '08:20 AM', text: `Quick update on venue logistics: Venue is ${venue}. Gate 1 check-in desk opens at 08:00 AM on ${startDate}. Mandatory team check-in deadline is ${reportTime} IST sharp.` },
      { id: 4, day: 1, sender: techLead.name, role: 'fahad', outgoing: false, time: '08:22 AM', text: `Dedicated high-speed 1 Gbps lease line and Ethernet patch cables are provisioned at all 36 team pods. Power strips are pre-wired.` },
      { id: 5, day: 1, sender: 'Kiran Dev (CET Team 4)', role: 'student', outgoing: true, time: '08:35 AM', text: `Morning team! What cloud credits or sandbox APIs are sponsored for the AI & Intelligent Automation track?` },
      { id: 6, day: 1, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '08:40 AM', text: `Great question Kiran! Every shortlisted team has been provisioned $200 in Claude 3.5 Sonnet API credits plus GitHub Copilot enterprise access via your registered lead email.` },
      { id: 7, day: 1, sender: 'Sneha R. (TKM College)', role: 'student', outgoing: false, time: '09:05 AM', text: `Are teams permitted to use pre-existing boilerplate templates or component libraries?` },
      { id: 8, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '09:10 AM', text: `Standard open-source packages (Next.js, Tailwind, FastAPI, LangChain, PyTorch) are fully permitted. However, all project core business logic, schemas, and models must be authored during the 24-hour sprint. Initial commit timestamps will be verified.` },
      { id: 9, day: 1, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '10:00 AM', text: `Reminder: Please visit the Participant Pass tab on HackDesk to generate and download your individual badge before reporting.` },
      { id: 10, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '11:45 AM', text: `What each hacker must bring: 1. Personal laptops & chargers, 2. Extension cords, 3. Original College Student Photo ID, 4. Printed or digital Participant Pass.` },
      { id: 11, day: 1, sender: 'Abhinav K. (GEC Thrissur)', role: 'student', outgoing: false, time: '12:15 PM', text: `When will Mentor Checkpoint 1 take place?` },
      { id: 12, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '12:18 PM', text: `Mentor Review 1 runs from 04:30 PM to 06:30 PM today. Industry judges from KSUM and IEEE will visit each pod to inspect architecture diagrams and user journeys.` },

      // Day 2
      { id: 13, day: 2, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '08:00 AM', text: `Good morning hackers! Breakfast is being served in the central dining pavilion. 5 hours remaining until code freeze!` },
      { id: 14, day: 2, sender: techLead.name, role: 'fahad', outgoing: false, time: '09:30 AM', text: `Mentorship Checkpoint 2 (Pitch Dry-Run) begins at 11:00 AM. Prepare a quick 3-minute screen-share demo of your working features.` },
      { id: 15, day: 2, sender: 'Rohit Menon (NSS Palakkad)', role: 'student', outgoing: false, time: '10:15 AM', text: `Where do we submit our final repository and pitch slides?` },
      { id: 16, day: 2, sender: convener, role: 'arjun', outgoing: false, time: '10:20 AM', text: `Submissions must be pushed to your assigned GitHub Classroom repository by 01:30 PM sharp. Requirements: public repo, README with demo video link, and 5-slide PDF pitch deck.` },
      { id: 17, day: 2, sender: techLead.name, role: 'fahad', outgoing: false, time: '01:00 PM', text: `30-minute warning until code freeze! Ensure all branches are merged to main and your live deployment URLs are accessible.` },
      { id: 18, day: 2, sender: 'Rahul Krishna (CET)', role: 'student', outgoing: true, time: '01:25 PM', text: `Team 4 repo pushed and live demo verified! Ready for stage presentations.` },
      { id: 19, day: 2, sender: convener, role: 'arjun', outgoing: false, time: '01:35 PM', text: `Code freeze locked! Stage presentations commence at 02:30 PM in the Main Auditorium. Best of luck to all finalists!` },
      { id: 20, day: 2, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '04:00 PM', text: `For any presentation AV questions or laptop adapter needs, meet the helpdesk team by stage left. See you in the auditorium!` }
    ];

    state.chatMessagesMap[event.slug] = messages;
    return messages;
  }

  // Generator: Calendar .ics file
  function downloadICS(event) {
    const s = new Date(event.start);
    const e = new Date(event.end);

    const pad = (n) => (n < 10 ? '0' + n : n);
    const toICSDate = (date) => {
      return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        'T' +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) +
        'Z'
      );
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HackDesk//Hackathon Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.slug}-2026@hackdesk.dev`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(s)}`,
      `DTEND:${toICSDate(e)}`,
      `SUMMARY:${event.name} (${event.edition})`,
      `DESCRIPTION:${event.name} presented by ${event.host} and supported by ${event.support}. Mandatory check-in: ${formatTime(event.report)} at ${event.venue}. Contact: ${event.contactName} (${event.contactEmail}).`,
      `LOCATION:${event.venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.slug}-calendar.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  // Web Share API with clipboard fallback
  async function shareEventBrief(event) {
    const shareData = {
      title: `${event.name} — HackDesk`,
      text: `Official Hackathon Portal: ${event.name} (${event.edition}) at ${event.venue}. Check-in: ${formatTime(event.report)} on ${formatDateNatural(event.start)}. Organizer: ${event.contactName} (${event.contactEmail}).`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.warn('Share failed, copying link', err);
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareData.text}\nDirect Link: ${shareData.url}`);
      alert('Hackathon link copied to clipboard.');
    } catch (err) {
      alert(`Hackathon URL: ${window.location.href}`);
    }
  }

  // =========================================================================
  // Canvas Generator: Participant Pass (400x560) — Claude Warm Badge
  // =========================================================================
  function renderPassCanvas(canvas, event, participant) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 400;
    const h = 560;

    canvas.width = w;
    canvas.height = h;

    // Claude Warm Cream Paper Background
    ctx.fillStyle = '#fbf9f5';
    ctx.fillRect(0, 0, w, h);

    // Warm border
    ctx.strokeStyle = '#e5dfd5';
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // Lanyard punch hole slot at top
    ctx.fillStyle = '#e8e2d8';
    ctx.fillRect(160, 10, 80, 8);
    ctx.strokeStyle = '#d5cdc0';
    ctx.strokeRect(160, 10, 80, 8);

    // Header strip
    ctx.fillStyle = '#f4f0ea';
    ctx.fillRect(3, 26, w - 6, 85);
    ctx.strokeStyle = '#e5dfd5';
    ctx.strokeRect(3, 26, w - 6, 85);

    // Claude Terracotta Badge Pill
    ctx.fillStyle = '#d97757';
    ctx.fillRect(20, 36, 130, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('HACKATHON PASS', 30, 51);

    // Event title
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 20px Newsreader, Georgia, serif';
    ctx.fillText(event.name, 20, 82);
    ctx.fillStyle = '#57534e';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.edition}  •  ${event.host}`, 20, 100);

    // Participant Profile Card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 125, w - 32, 100);
    ctx.strokeStyle = '#e5dfd5';
    ctx.strokeRect(16, 125, w - 32, 100);

    // Avatar Circle
    ctx.fillStyle = '#f4f0ea';
    ctx.beginPath();
    ctx.arc(60, 175, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d97757';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#d97757';
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    const initials = (participant.name || 'RK').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    ctx.fillText(initials, 60, 182);
    ctx.textAlign = 'left';

    // Details text
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.name || 'Rahul Krishna', 105, 160);
    ctx.fillStyle = '#57534e';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.college || 'College of Engineering Trivandrum', 105, 180);
    ctx.fillStyle = '#d97757';
    ctx.font = '600 11px monospace';
    ctx.fillText(`ID: ${participant.regId || 'HM-2026-7842'}`, 105, 200);

    // Grid details
    const yGrid = 240;
    const col1 = 20;
    const col2 = 210;

    ctx.fillStyle = '#847e77';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('REPORTING TIME', col1, yGrid);
    ctx.fillText('CHECK-IN DATE', col2, yGrid);

    ctx.fillStyle = '#1f1e1b';
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(formatTime(event.report) + ' IST', col1, yGrid + 18);
    ctx.fillText(formatDateNatural(event.start), col2, yGrid + 18);

    ctx.fillStyle = '#847e77';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('GATE ACCESS', col1, yGrid + 48);
    ctx.fillText('ASSIGNED TRACK', col2, yGrid + 48);

    ctx.fillStyle = '#1f1e1b';
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Gate 1 (West Hill)', col1, yGrid + 66);
    const trackStr = participant.track || event.tracks[0];
    ctx.fillText(trackStr.length > 20 ? trackStr.slice(0, 18) + '...' : trackStr, col2, yGrid + 66);

    // QR Code Container
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 340, w - 32, 90);
    ctx.strokeStyle = '#e5dfd5';
    ctx.strokeRect(16, 340, w - 32, 90);

    ctx.fillStyle = '#1f1e1b';
    ctx.fillRect(28, 350, 70, 70);
    ctx.fillStyle = '#fbf9f5';
    for (let rx = 36; rx < 90; rx += 8) {
      for (let ry = 358; ry < 410; ry += 8) {
        if ((rx + ry) % 16 === 0 || (rx < 55 && ry < 375) || (rx > 70 && ry > 390)) {
          ctx.fillRect(rx, ry, 6, 6);
        }
      }
    }

    ctx.fillStyle = '#1f1e1b';
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('LIVE ACCREDITATION', 110, 370);
    ctx.fillStyle = '#57534e';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scan to inspect real-time schedule,', 110, 390);
    ctx.fillText('pod assignment, and hackathon guide.', 110, 406);
    ctx.fillStyle = '#d97757';
    ctx.font = '600 10px monospace';
    ctx.fillText(`${extractHostname(event.site)}/#/e/${event.slug}`, 110, 422);

    // Non-transferable Notice
    ctx.fillStyle = '#f4f0ea';
    ctx.fillRect(16, 445, w - 32, 26);
    ctx.fillStyle = '#57534e';
    ctx.font = '600 9px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NON-TRANSFERABLE • ORIGINAL COLLEGE STUDENT PHOTO ID REQUIRED', w / 2, 461);
    ctx.textAlign = 'left';

    // Signatory footer
    ctx.fillStyle = '#57534e';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Authorized: ${event.contactName} (${event.people[0] ? event.people[0].role : 'Convener'})`, 20, 500);
    ctx.fillText(`Organizer Email: ${event.contactEmail}`, 20, 518);
  }

  // =========================================================================
  // Canvas Generator: High-Res Poster (A3 1240x1754 and Story 1080x1920)
  // Claude Warm Editorial Aesthetic
  // =========================================================================
  function renderPosterCanvas(canvas, event, format) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isStory = format === 'story';
    const w = isStory ? 1080 : 1240;
    const h = isStory ? 1920 : 1754;

    canvas.width = w;
    canvas.height = h;

    // Claude Warm Cream Paper
    ctx.fillStyle = '#fbf9f5';
    ctx.fillRect(0, 0, w, h);

    // Header panel
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 45, w - 100, 75);
    ctx.strokeStyle = '#e5dfd5';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 45, w - 100, 75);

    ctx.fillStyle = '#57534e';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.host.toUpperCase()}  •  SUPPORTED BY ${event.support.toUpperCase()}`, 75, 88);

    // Event type badge
    ctx.fillStyle = '#d97757';
    ctx.fillRect(50, 145, 280, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.type.toUpperCase()}  |  ${event.edition.toUpperCase()}`, 70, 178);

    // Event Title
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 68px Newsreader, Georgia, serif';
    ctx.fillText(event.name, 50, 265);

    // Date & Venue Card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 320, w - 100, 170);
    ctx.strokeStyle = '#e5dfd5';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 320, w - 100, 170);

    ctx.fillStyle = '#d97757';
    ctx.font = '700 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`DATES: ${formatDateRange(event.start, event.end).toUpperCase()}`, 80, 365);
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`CHECK-IN: ${formatTime(event.report)} IST  |  CODE FREEZE: ${formatTime(event.close)} IST`, 80, 410);
    ctx.fillStyle = '#57534e';
    ctx.font = '22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`VENUE: ${event.venue}`, 80, 455);

    // Prize Banner
    ctx.fillStyle = '#f4f0ea';
    ctx.fillRect(50, 520, w - 100, 100);
    ctx.strokeStyle = '#e5dfd5';
    ctx.strokeRect(50, 520, w - 100, 100);

    ctx.fillStyle = '#847e77';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('PRIZE POOL & MERIT RECOGNITION', 80, 555);
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '700 30px Newsreader, Georgia, serif';
    ctx.fillText(event.prize, 80, 595);

    // Competency Tracks
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 32px Newsreader, Georgia, serif';
    ctx.fillText('OFFICIAL COMPETENCY TRACKS', 50, 665);

    let yOffset = 705;
    event.tracks.forEach((track, i) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(50, yOffset, w - 100, 52);
      ctx.strokeStyle = '#e5dfd5';
      ctx.lineWidth = 1;
      ctx.strokeRect(50, yOffset, w - 100, 52);

      ctx.fillStyle = '#d97757';
      ctx.font = '700 20px monospace';
      ctx.fillText(`0${i + 1}`, 75, yOffset + 34);

      ctx.fillStyle = '#1f1e1b';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(track, 125, yOffset + 35);
      yOffset += 68;
    });

    // Guidelines Card
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, yOffset + 20, w - 100, 160);
    ctx.strokeStyle = '#e5dfd5';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, yOffset + 20, w - 100, 160);

    ctx.fillStyle = '#4e6e5d';
    ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('ACCREDITATION & PARTICIPANT COMPLIANCE', 75, yOffset + 60);
    ctx.fillStyle = '#57534e';
    ctx.font = '19px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.note, 75, yOffset + 98);
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Registration Deadline: ${formatDateNatural(event.deadline)} 23:59 IST  •  Fee: ${event.fee}`, 75, yOffset + 140);

    // Committee & Contact
    const commY = yOffset + 220;
    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 28px Newsreader, Georgia, serif';
    ctx.fillText('ORGANISING COMMITTEE & CONTACT', 50, commY);

    ctx.fillStyle = '#57534e';
    ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
    const committeeStr = event.people.map(p => `${p.name} (${p.role})`).join('   |   ');
    ctx.fillText(committeeStr, 50, commY + 38);

    ctx.fillStyle = '#1f1e1b';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Convenor: ${event.contactName}  •  Email: ${event.contactEmail}`, 50, commY + 76);

    // Bottom Footer & QR Block
    const footY = h - 180;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, footY, w - 260, 130);
    ctx.strokeStyle = '#e5dfd5';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, footY, w - 260, 130);

    ctx.fillStyle = '#d97757';
    ctx.font = '600 24px monospace';
    ctx.fillText(`OFFICIAL HACKDESK PORTAL: ${event.site}`, 75, footY + 40);
    ctx.fillStyle = '#57534e';
    ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scan QR code for direct live verification, participant pass, and guide.', 75, footY + 75);
    ctx.fillStyle = '#847e77';
    ctx.font = '16px monospace';
    ctx.fillText('HACKDESK • COLLEGIATE HACKATHON PLATFORM', 75, footY + 105);
  }

  // Helper for Track Visual Icons
  function getTrackVisualIcon(track) {
    if (track.toLowerCase().includes('ai') || track.toLowerCase().includes('automation')) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 3.36 2.07 6.24 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.93-1.18 5-4.06 5-7.42a8 8 0 0 0-8-8z"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><path d="M10 13a2 2 0 0 0 4 0"/></svg>`;
    }
    if (track.toLowerCase().includes('tool') || track.toLowerCase().includes('infra') || track.toLowerCase().includes('kernel')) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    }
    if (track.toLowerCase().includes('fintech') || track.toLowerCase().includes('decentralized')) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`;
    }
    if (track.toLowerCase().includes('health') || track.toLowerCase().includes('assistive')) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    }
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  }

  // =========================================================================
  // Screen 1: Public Event Page (Claude Warm Editorial + Bento Grid)
  // =========================================================================
  function renderPublicPage(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const closeFormatted = formatTime(event.close);
    const scheduleItems = schedulePresets[event.type] || schedulePresets.hackathon;

    return `
      <!-- Hero Section -->
      <section class="hero-section" aria-label="Hackathon Overview">
        <div class="hero-split-grid">
          <div class="hero-copy-col">
            <!-- Telemetry Chip -->
            <div class="hackathon-live-ticker">
              <span class="live-dot" aria-hidden="true"></span>
              <span class="ticker-badge">LIVE TELEMETRY</span>
              <span class="ticker-text">142 Shortlisted Teams Verified • Gate 1 Check-in Ready (08:30 IST) • Dedicated Cloud Sandboxes Active</span>
            </div>

            <div class="hero-meta-strip">
              <span class="hero-tag">${escapeHtml(event.host)}</span>
              <span class="meta-sep">/</span>
              <span class="hero-tag">${escapeHtml(event.edition)}</span>
              <span class="meta-sep">/</span>
              <span class="hero-status-pill pill-upcoming">• UPCOMING • 24-HOUR SPRINT</span>
            </div>

            <h1 class="hero-headline">${escapeHtml(event.name)}</h1>

            <p class="hero-subheading">
              A premier collegiate hackathon endorsed and supported by <strong>${escapeHtml(event.support)}</strong>. Complete verified platform for team accreditation, track briefs, live developer coordination, and submission rubrics.
            </p>

            <!-- Countdown Timer HUD -->
            <div class="countdown-card" id="hero-countdown" aria-label="Event commencement countdown">
              <div class="countdown-header">
                <span class="cd-ping"></span>
                <span>EVENT COMMENCEMENT COUNTDOWN</span>
              </div>
              <div class="countdown-hud-grid">
                <div class="cd-unit">
                  <span class="cd-digit" id="cd-days">--</span>
                  <span class="cd-label">DAYS</span>
                </div>
                <div class="cd-divider">:</div>
                <div class="cd-unit">
                  <span class="cd-digit" id="cd-hours">--</span>
                  <span class="cd-label">HOURS</span>
                </div>
                <div class="cd-divider">:</div>
                <div class="cd-unit">
                  <span class="cd-digit" id="cd-mins">--</span>
                  <span class="cd-label">MINS</span>
                </div>
                <div class="cd-divider">:</div>
                <div class="cd-unit">
                  <span class="cd-digit" id="cd-secs">--</span>
                  <span class="cd-label">SECS</span>
                </div>
              </div>
            </div>

            <!-- Stats Ribbon -->
            <div class="stats-ribbon-grid">
              <div class="stat-ribbon-card">
                <span class="ribbon-val">₹1,00,000</span>
                <span class="ribbon-title">Total Cash Prize</span>
                <span class="ribbon-sub">₹50k / ₹30k / ₹20k</span>
              </div>
              <div class="stat-ribbon-card">
                <span class="ribbon-val">24 Hours</span>
                <span class="ribbon-title">Continuous Sprint</span>
                <span class="ribbon-sub">Overnight Rest Zone</span>
              </div>
              <div class="stat-ribbon-card">
                <span class="ribbon-val">142 Teams</span>
                <span class="ribbon-title">Collegiate Finalists</span>
                <span class="ribbon-sub">Screened from 68 Inst.</span>
              </div>
              <div class="stat-ribbon-card">
                <span class="ribbon-val">5 Domains</span>
                <span class="ribbon-title">Accredited Tracks</span>
                <span class="ribbon-sub">Industry Mentored</span>
              </div>
            </div>

            <!-- Primary CTAs -->
            <div class="hero-cta-bar">
              <a href="#/e/${event.slug}/pass" class="btn-apple-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Claim Participant Pass</span>
              </a>
              <a href="#/e/${event.slug}/brief" class="btn-apple-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <span>Hackathon Guide</span>
              </a>
              <a href="#/e/${event.slug}/chat" class="btn-apple-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>Organisers Channel</span>
              </a>
              <button type="button" id="btn-hero-ics" class="btn-apple-ghost" title="Add to Calendar (.ics)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Calendar (.ics)</span>
              </button>
              <button type="button" id="btn-hero-share" class="btn-apple-ghost" title="Share Hackathon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          <!-- 3D Interactive Card Showcase -->
          <div class="hero-device-col">
            <div class="device-card-wrapper" id="hero-interactive-card">
              <div class="device-glow-mesh" aria-hidden="true"></div>
              <div class="device-surface-card">
                <div class="device-header">
                  <div class="device-badge">VERIFIED ACCREDITATION</div>
                  <div class="device-live-dot"></div>
                </div>
                <h3 class="device-event-name">${escapeHtml(event.name)}</h3>
                <div class="device-district-pill">${escapeHtml(event.district)} • Collegiate Edition</div>

                <div class="device-specs-grid">
                  <div class="spec-cell">
                    <span class="spec-label">REPORTING</span>
                    <strong class="spec-val">${reportFormatted}</strong>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-label">CHECK-IN</span>
                    <strong class="spec-val">${formatDateNatural(event.start)}</strong>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-label">VENUE GATE</span>
                    <strong class="spec-val">Gate 1 West Hill</strong>
                  </div>
                  <div class="spec-cell">
                    <span class="spec-label">PRIZE GRANTS</span>
                    <strong class="spec-val">₹1,00,000 Pool</strong>
                  </div>
                </div>

                <div class="device-qr-card">
                  <div class="device-qr-placeholder">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </div>
                  <div class="device-qr-copy">
                    <strong>Direct Live Verification</strong>
                    <span>Scan to verify shortlisted team credentials on HackDesk</span>
                  </div>
                </div>

                <div class="device-card-footer">
                  <span class="device-serial">REF: #KM-2026-FINAL</span>
                  <a href="#/e/${event.slug}/pass" class="device-link-btn">Open Pass →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Features Section -->
      <div class="bento-layout">
        <!-- Main Column -->
        <div class="bento-primary-col">
          <!-- Institutional Scope Card with Visual Pulse -->
          <article class="bento-card">
            <div class="card-header-row">
              <div class="title-with-pulse">
                <span class="live-radar-ping" aria-hidden="true"></span>
                <h2 class="card-title">Official Hackathon Accreditation & Eligibility</h2>
              </div>
              <span class="card-pill">Official Verification</span>
            </div>
            <p class="card-text">${escapeHtml(event.note)}</p>
            <p class="card-subtext">
              Approved by Kerala Startup Mission (KSUM) Innovation Council & IEEE Student Branch. Open to active collegiate developer teams across South India. All finalist teams receive official participation credentials, cash prizes, cloud sandboxes, and startup incubation support.
            </p>
            <div class="security-stamp-bar">
              <div class="stamp-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>IEEE Student Branch Vetted</span>
              </div>
              <div class="stamp-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>KSUM Innovation Registry ID #KM-2026</span>
              </div>
            </div>
          </article>

          <!-- Competency Tracks (Rich Visual Bento Tiles with Tech Badges) -->
          <section class="bento-card" aria-label="Official Competency Tracks">
            <div class="card-header-row">
              <div>
                <h2 class="card-title">Official Competency Tracks</h2>
                <p class="card-subtext" style="margin-top:0.25rem;">Accredited technical domains for team problem statements</p>
              </div>
              <span class="card-count">${event.tracks.length} Domains</span>
            </div>
            <div class="visual-tracks-grid">
              ${event.tracks.map((track, i) => {
                const meta = trackMetadata[track] || {
                  techs: ["Next.js", "Python", "Cloud Native", "APIs"],
                  focus: "Advanced problem solving and production-grade implementation."
                };
                return `
                <div class="visual-track-card" data-track-card="${escapeHtml(track)}">
                  <div class="track-card-top">
                    <div class="track-icon-wrap">
                      ${getTrackVisualIcon(track)}
                    </div>
                    <span class="track-card-index">DOMAIN 0${i + 1}</span>
                  </div>
                  <div class="track-card-body">
                    <h3 class="track-card-name">${escapeHtml(track)}</h3>
                    <p class="track-focus-desc">${escapeHtml(meta.focus)}</p>
                    <div class="track-tech-pills">
                      ${meta.techs.map(tc => `<span class="tech-pill">${escapeHtml(tc)}</span>`).join('')}
                    </div>
                  </div>
                  <div class="track-card-footer">
                    <button type="button" class="btn-track-select" data-track="${escapeHtml(track)}">
                      <span>Select Track for Pass</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              `}).join('')}
            </div>
          </section>

          <!-- Chronological Schedule (Timeline with Day Filters) -->
          <section class="bento-card" aria-label="Full Event Schedule">
            <div class="card-header-row">
              <div>
                <h2 class="card-title">Chronological Programme Milestones</h2>
                <p class="card-subtext" style="margin-top:0.25rem;">Check-in, mentorship checkpoints, and code freeze ledger</p>
              </div>
              <span class="card-pill">${escapeHtml(event.type.toUpperCase())}</span>
            </div>
            <div class="schedule-filter-bar">
              <button type="button" class="sched-filter-btn active" data-day="all">All Milestones (14)</button>
              <button type="button" class="sched-filter-btn" data-day="Day 1">Day 1 Sprint</button>
              <button type="button" class="sched-filter-btn" data-day="Day 2">Day 2 Code Freeze & Jury</button>
            </div>
            <div class="timeline-container">
              ${scheduleItems.map(item => `
                <div class="timeline-row" data-day="${escapeHtml(item.day)}">
                  <div class="timeline-time-col">
                    <span class="timeline-day">${escapeHtml(item.day)}</span>
                    <span class="timeline-time">${escapeHtml(item.time)}</span>
                  </div>
                  <div class="timeline-content-col">
                    <strong class="timeline-label">${escapeHtml(item.label)}</strong>
                    <span class="timeline-note">${escapeHtml(item.note)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Prize & Merit Breakdown -->
          <section class="bento-card" aria-label="Prize Pool Breakdown">
            <div class="card-header-row">
              <h2 class="card-title">Prize Pool & Grants</h2>
              <span class="card-pill">Merit Recognition</span>
            </div>
            <div class="prize-titanium-card">
              <div class="card-chip-row">
                <svg class="emv-chip" width="38" height="28" viewBox="0 0 38 28" fill="none">
                  <rect width="38" height="28" rx="4" fill="#d4a373"/>
                  <path d="M12 0v28M26 0v28M0 14h38" stroke="#fbf9f5" stroke-width="1.2"/>
                </svg>
                <span class="card-org">${escapeHtml(event.name)}</span>
              </div>
              <div class="prize-main-sum">₹1,00,000</div>
              <div class="prize-currency-label">TOTAL ALLOCATED CASH POOL</div>
              <div class="tier-bars-wrap">
                <div class="tier-col">
                  <div class="tier-bar-bg"><div class="tier-fill gold" style="height:100%;"></div></div>
                  <span class="tier-pos">First Place</span>
                  <strong class="tier-amt">₹50,000</strong>
                </div>
                <div class="tier-col">
                  <div class="tier-bar-bg"><div class="tier-fill silver" style="height:60%;"></div></div>
                  <span class="tier-pos">Second Place</span>
                  <strong class="tier-amt">₹30,000</strong>
                </div>
                <div class="tier-col">
                  <div class="tier-bar-bg"><div class="tier-fill bronze" style="height:40%;"></div></div>
                  <span class="tier-pos">Third Place</span>
                  <strong class="tier-amt">₹20,000</strong>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQ Section (Interactive Accordion) -->
          <section class="bento-card" aria-label="Hackathon FAQ">
            <div class="card-header-row">
              <div>
                <h2 class="card-title">Hackathon Hacker FAQ</h2>
                <p class="card-subtext" style="margin-top:0.25rem;">Rules, originality requirements, and submission standards</p>
              </div>
              <span class="card-pill">4 Guidance Items</span>
            </div>
            <div class="faq-group">
              ${[
                { q: "Who is eligible to participate in HackMalabar 2026?", a: "All active undergraduate, postgraduate, and diploma engineering students from recognized collegiate institutions who have cleared the online screening round." },
                { q: "What are the rules regarding project code and originality?", a: "All project code must be developed fresh during the 24-hour sprint. Open-source libraries, APIs, and public frameworks are permitted, but proprietary pre-built applications will result in disqualification." },
                { q: "What deliverables are mandatory for jury evaluation?", a: "Every team must submit: 1. A public GitHub repository with open-source license, 2. A 2-minute demo video link, 3. A live deployment URL, and 4. A 5-slide pitch presentation." },
                { q: "What equipment should each hacker bring to the venue?", a: "Personal laptops, chargers, extension strips, original college student photo ID cards, and your digital or printed HackDesk Participant Pass." }
              ].map((faq, idx) => `
                <div class="faq-accordion-item ${idx === 0 ? 'active' : ''}">
                  <button type="button" class="faq-question-btn">
                    <span>${escapeHtml(faq.q)}</span>
                    <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div class="faq-answer-pane">
                    <div class="faq-answer-inner">${escapeHtml(faq.a)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Right Rail Column -->
        <aside class="bento-secondary-col">
          <!-- Poster Display Card -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Official Poster</h2>
              <span class="card-pill">A3 Print</span>
            </div>
            <div class="poster-angled-frame">
              <img src="${escapeHtml(event.poster)}" alt="Official event poster for ${escapeHtml(event.name)}" class="poster-display-img" id="hero-poster-img">
            </div>
            <div class="poster-download-group">
              <a href="${escapeHtml(event.poster)}" download="${event.slug}-poster.png" class="btn-apple-primary" style="width:100%; justify-content:center;">
                Download A3 Poster
              </a>
              <a href="#/e/${event.slug}/pass" class="btn-apple-secondary" style="width:100%; justify-content:center;">
                Claim Pass
              </a>
            </div>
          </div>

          <!-- Participation Flow Card -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Participation Flow</h2>
            </div>
            <p class="card-subtext" style="margin-bottom:1rem;">Complete roadmap from selection notice to final stage presentations:</p>
            <div class="dossier-steps-list">
              <a href="#/e/${event.slug}/pass" class="dossier-step-link">
                <span class="step-num">01</span>
                <span class="step-label">Participant Badge & Pass</span>
                <span class="step-arrow">→</span>
              </a>
              <a href="#/e/${event.slug}/chat" class="dossier-step-link">
                <span class="step-num">02</span>
                <span class="step-label">Organisers Channel</span>
                <span class="step-arrow">→</span>
              </a>
              <a href="#/e/${event.slug}/brief" class="dossier-step-link">
                <span class="step-num">03</span>
                <span class="step-label">Hackathon Guide & Rules</span>
                <span class="step-arrow">→</span>
              </a>
            </div>
          </div>

          <!-- Organizer Inquiries -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Hackathon Inquiries</h2>
            </div>
            <p class="card-subtext">Direct organizer support for shortlisted teams:</p>
            <div class="hotline-box">
              <div class="hotline-row">
                <span class="hotline-label">Lead Convener</span>
                <strong class="hotline-val">${escapeHtml(event.contactName)}</strong>
              </div>
              <div class="hotline-row">
                <span class="hotline-label">Official Email</span>
                <a href="mailto:${escapeHtml(event.contactEmail)}" class="hotline-val hotline-link">${escapeHtml(event.contactEmail)}</a>
              </div>
              <div class="hotline-row">
                <span class="hotline-label">Portal</span>
                <a href="${escapeHtml(event.site)}" target="_blank" rel="noopener" class="hotline-val hotline-link">${escapeHtml(event.site)}</a>
              </div>
            </div>
          </div>

          <!-- Committee Roster -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Organising Committee</h2>
            </div>
            <div class="committee-list">
              ${event.people.map(p => `
                <div class="committee-row">
                  <div class="committee-name">${escapeHtml(p.name)}</div>
                  <div class="committee-role">${escapeHtml(p.role)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Institutional Patronage -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Institutional Patronage</h2>
              <span class="card-pill">Verified</span>
            </div>
            <div class="partner-logos-strip">
              <div class="partner-cell">
                <strong class="partner-abbr">IEEE SB</strong>
                <span class="partner-full">NIT Calicut</span>
              </div>
              <div class="partner-cell">
                <strong class="partner-abbr">KSUM</strong>
                <span class="partner-full">Startup Mission</span>
              </div>
              <div class="partner-cell">
                <strong class="partner-abbr">GEC</strong>
                <span class="partner-full">Kozhikode</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  // =========================================================================
  // Screen 2: Participant Pass & Digital Badge
  // =========================================================================
  function renderPassScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const startDate = formatDateNatural(event.start);
    const p = state.participant;
    const selectedTrack = p.track || event.tracks[0];

    return `
      <section class="section-hero">
        <h1 class="page-title">Participant Pass & Digital Badge</h1>
        <p class="page-subhead">
          Generate your official hackathon accreditation badge with embedded verification QR code. Formatted for standard 100x140mm lanyard print layout.
        </p>
      </section>

      <div class="pass-split-layout">
        <!-- Badge Display Column -->
        <div class="pass-ticket-column">
          <canvas id="pass-render-canvas" style="display:none;"></canvas>

          <div class="apple-pass" id="pass-ticket-dom">
            <!-- Lanyard Hole -->
            <div class="lanyard-hole" aria-hidden="true">
              <span class="lanyard-ring"></span>
            </div>

            <div class="pass-header-strip">
              <div class="pass-type-badge">HACKATHON PASS</div>
              <h2 class="pass-event-title">${escapeHtml(event.name)}</h2>
              <div class="pass-event-meta">${escapeHtml(event.edition)} • ${escapeHtml(event.host)}</div>
            </div>

            <div class="pass-body-section">
              <div class="pass-user-strip">
                <div class="pass-avatar" id="pass-dom-avatar">
                  ${escapeHtml(p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK')}
                </div>
                <div>
                  <h3 class="pass-user-name" id="pass-dom-name">${escapeHtml(p.name)}</h3>
                  <div class="pass-user-college" id="pass-dom-college">${escapeHtml(p.college)}</div>
                  <div class="pass-user-id" id="pass-dom-id">ID: ${escapeHtml(p.regId)}</div>
                </div>
              </div>

              <div class="pass-details-grid">
                <div class="pass-field">
                  <span class="field-title">Reporting Time</span>
                  <strong class="field-value">${reportFormatted} IST</strong>
                </div>
                <div class="pass-field">
                  <span class="field-title">Date of Check-in</span>
                  <strong class="field-value">${startDate}</strong>
                </div>
                <div class="pass-field">
                  <span class="field-title">Venue Gate</span>
                  <strong class="field-value">Gate 1 (West Hill)</strong>
                </div>
                <div class="pass-field">
                  <span class="field-title">Assigned Track</span>
                  <strong class="field-value" id="pass-dom-track">${escapeHtml(selectedTrack)}</strong>
                </div>
              </div>

              <div class="pass-qr-row">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + window.location.pathname + '#/e/' + event.slug)}"
                  alt="QR Verification"
                  class="pass-qr-image"
                  onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22black%22/><text x=%2250%22 y=%2255%22 fill=%22white%22 text-anchor=%22middle%22 font-size=%2214%22>QR CODE</text></svg>'"
                >
                <div class="pass-qr-info">
                  <strong>Official Live Accreditation</strong>
                  <span>Scan to verify real-time schedule, pod assignment, and hackathon guide.</span>
                </div>
              </div>

              <div class="pass-legal-banner">
                Non-transferable • Must present original college student photo ID at Gate 1
              </div>

              <div class="pass-sign-row">
                <div>
                  <span class="sign-label">Authorized Signatory:</span><br>
                  <strong class="sign-val">${escapeHtml(event.contactName)}</strong> (${escapeHtml(event.people[0] ? event.people[0].role : 'Convener')})
                </div>
                <div style="text-align:right;">
                  <span class="sign-label">Organizer Email:</span><br>
                  <strong class="sign-val">${escapeHtml(event.contactEmail)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls Column -->
        <div class="pass-controls-column">
          <div class="bento-card">
            <h2 class="card-title">Participant Identity</h2>
            <form id="pass-form" onsubmit="return false;" class="pass-form-fields">
              <div class="input-block">
                <label for="pass-input-name">Full Name (As on College ID)</label>
                <input type="text" id="pass-input-name" class="apple-input" value="${escapeHtml(p.name)}" required>
              </div>

              <div class="input-block">
                <label for="pass-input-college">Institution / College Name</label>
                <input type="text" id="pass-input-college" class="apple-input" value="${escapeHtml(p.college)}" required>
              </div>

              <div class="input-block">
                <label for="pass-input-reg">Registration / Team Ref ID</label>
                <input type="text" id="pass-input-reg" class="apple-input" value="${escapeHtml(p.regId)}" required>
              </div>

              <div class="input-block">
                <label for="pass-select-track">Assigned Competency Track</label>
                <select id="pass-select-track" class="apple-input">
                  ${event.tracks.map(t => `<option value="${escapeHtml(t)}" ${t === selectedTrack ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
                </select>
              </div>

              <div class="pass-button-stack">
                <button type="button" id="btn-download-pass" class="btn-apple-primary" style="width:100%; justify-content:center;">
                  Download Pass as Image (PNG)
                </button>
                <button type="button" id="btn-print-pass" class="btn-apple-secondary" style="width:100%; justify-content:center;">
                  Print Clean Pass (100x140mm A4)
                </button>
                <a href="#/e/${event.slug}/brief" class="btn-apple-ghost" style="width:100%; justify-content:center;">
                  Proceed to Hackathon Guide
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Screen 3: Organisers Channel inside Phone Frame
  // =========================================================================
  function renderChatScreen(event) {
    const messages = generateChatMessages(event);
    const day1Messages = messages.filter(m => m.day === 1);
    const day2Messages = messages.filter(m => m.day === 2);

    return `
      <section class="section-hero">
        <div class="hero-actions-row">
          <div>
            <h1 class="page-title">Organisers Coordination Channel</h1>
            <p class="page-subhead">
              Live chronological developer updates covering API sandboxes, 1 Gbps LAN provisioning, mentorship checkpoints, and final code freeze.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-print-chat" class="btn-apple-secondary">Print Chat Transcript</button>
            <a href="#/e/${event.slug}/brief" class="btn-apple-primary">View Hackathon Guide</a>
          </div>
        </div>
      </section>

      <!-- Phone Shell -->
      <div class="phone-frame-wrapper">
        <div class="iphone-frame">
          <div class="iphone-notch">
            <span class="notch-speaker"></span>
            <span class="notch-camera"></span>
          </div>

          <div class="wa-chat-container">
            <!-- Channel Header -->
            <div class="wa-header">
              <div class="wa-header-left">
                <button type="button" class="wa-back-btn" aria-label="Back">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div class="wa-avatar-group">
                  <div class="wa-avatar">${escapeHtml(event.name[0])}</div>
                </div>
                <div class="wa-title-meta">
                  <h2 class="wa-group-name">${escapeHtml(event.name)} • Finalists</h2>
                  <span class="wa-status-text">Arjun, Fahad, Ananya, +142 finalists</span>
                </div>
              </div>
              <div class="wa-header-right">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </div>
            </div>

            <!-- Encryption Notice -->
            <div class="wa-encryption-pill">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Messages in this channel are verified by the HackDesk organizing desk.</span>
            </div>

            <!-- Messages Stream -->
            <div class="wa-messages-scroller" id="wa-scroller">
              <!-- Day 1 Divider -->
              <div class="wa-day-divider">
                <span>DAY 1 — CHECK-IN & SPRINT COMMENCES</span>
              </div>
              ${day1Messages.map(renderMessageBubble).join('')}

              <!-- Day 2 Divider -->
              <div class="wa-day-divider">
                <span>DAY 2 — CODE FREEZE & PRESENTATIONS</span>
              </div>
              ${day2Messages.map(renderMessageBubble).join('')}
            </div>

            <!-- Chat Bottom Strip -->
            <div class="wa-input-strip">
              <input type="text" id="wa-quick-input" placeholder="Channel active: post questions to mentors..." readonly value="Mentorship & Helpdesk: ${escapeHtml(event.contactEmail)}">
              <button type="button" class="wa-mic-btn" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMessageBubble(m) {
    const isOut = m.outgoing;
    return `
      <div class="wa-bubble-row ${isOut ? 'outgoing' : 'incoming'}">
        <div class="wa-bubble ${isOut ? 'bubble-out' : 'bubble-in'}">
          ${!isOut ? `<div class="wa-sender-label role-${escapeHtml(m.role)}">${escapeHtml(m.sender)}</div>` : ''}
          <div class="wa-message-body">${escapeHtml(m.text)}</div>
          <div class="wa-meta-row">
            <span class="wa-msg-time">${escapeHtml(m.time)}</span>
            ${isOut ? `
              <span class="wa-ticks">
                <svg width="15" height="11" viewBox="0 0 16 11" fill="none"><path d="M1 6l3.5 3.5L14 1" stroke="#d97757" stroke-width="2" stroke-linecap="round"/><path d="M5 6l3.5 3.5L15 1" stroke="#d97757" stroke-width="2" stroke-linecap="round"/></svg>
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Screen 4: macOS Sequoia Selection Confirmation Mail
  // =========================================================================
  function renderMailScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const p = state.participant;

    return `
      <section class="section-hero">
        <div class="hero-actions-row">
          <div>
            <h1 class="page-title">Selection Confirmation Mail</h1>
            <p class="page-subhead">
              Official shortlist correspondence presented in a macOS Sequoia mail window with security headers, confirmed milestones, and team accreditation credentials.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-print-mail" class="btn-apple-secondary">Print Letterhead (A4)</button>
            <button type="button" id="btn-copy-mail" class="btn-apple-ghost">Copy Email Body</button>
            <a href="#/e/${event.slug}/pass" class="btn-apple-primary">Open Pass</a>
          </div>
        </div>
      </section>

      <!-- macOS Window Shell -->
      <div class="macos-window-shell">
        <div class="macos-titlebar">
          <div class="traffic-lights">
            <span class="traffic-dot red"></span>
            <span class="traffic-dot yellow"></span>
            <span class="traffic-dot green"></span>
          </div>
          <div class="macos-window-title">Mail — ${escapeHtml(event.name)} Shortlist Notice</div>
          <div class="macos-search-box">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Search</span>
          </div>
        </div>

        <div class="mail-envelope">
          <div class="mail-toolbar">
            <div class="mail-toolbar-left">
              <span class="mail-tool-icon" title="Archive">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
              </span>
              <span class="mail-tool-icon" title="Star">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
            </div>
            <div class="mail-toolbar-right">
              <span class="mail-counter">Official Notice • Verified Sender</span>
            </div>
          </div>

          <div class="mail-subject-area">
            <h2 class="mail-subject">Official Selection Confirmation: Shortlisted for ${escapeHtml(event.name)} (${escapeHtml(event.edition)})</h2>
            <div class="mail-tags">
              <span class="mail-pill">Inbox</span>
              <span class="mail-pill pill-accent">Finalist Accreditation</span>
            </div>
          </div>

          <div class="mail-sender-row">
            <div class="mail-sender-meta">
              <div class="mail-avatar">${escapeHtml(event.contactName[0])}</div>
              <div>
                <div class="mail-sender-name">${escapeHtml(event.contactName)} • ${escapeHtml(event.host)}</div>
                <div class="mail-sender-email">&lt;${escapeHtml(event.contactEmail)}&gt;</div>
                <div class="mail-to-line">to me &lt;${escapeHtml(p.name.toLowerCase().replace(/\s+/g, '.'))}@cet.ac.in&gt;</div>
              </div>
            </div>
            <div class="mail-date">Nov 21, 2026, 4:15 PM</div>
          </div>

          <div class="mail-security-bar">
            <span>mailed-by: <strong>${escapeHtml(extractHostname(event.site))}</strong></span>
            <span>signed-by: <strong>${escapeHtml(extractHostname(event.site))}</strong></span>
            <span>security: <strong>TLS Standard Encryption</strong></span>
          </div>

          <div class="mail-body-content" id="gm-body-content">
            <p>Dear <strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.college)}),</p>

            <p>
              Congratulations! On behalf of the organising committee of <strong>${escapeHtml(event.name)} (${escapeHtml(event.edition)})</strong>, we are delighted to inform you that your team registration and technical abstract have been officially <strong>SHORTLISTED</strong> for the 24-hour physical hackathon.
            </p>

            <div class="mail-highlight-card">
              <h3 style="font-size:0.95rem; font-weight:700; color:#1f1e1b; margin-bottom:0.75rem;">Confirmed Programme Milestones</h3>
              <ul>
                <li><strong>Event:</strong> ${escapeHtml(event.name)} (${escapeHtml(event.edition)})</li>
                <li><strong>Host Body:</strong> ${escapeHtml(event.host)}</li>
                <li><strong>Supporting Partner:</strong> ${escapeHtml(event.support)}</li>
                <li><strong>Dates:</strong> ${datesFormatted}</li>
                <li><strong>Reporting Schedule:</strong> ${reportFormatted} IST on ${formatDateNatural(event.start)} (Code freeze ${formatTime(event.close)} IST)</li>
                <li><strong>Venue Address:</strong> ${escapeHtml(event.venue)}</li>
                <li><strong>Access Gate:</strong> Gate 1 (Main Entrance facing NH 66 bypass, West Hill)</li>
              </ul>
            </div>

            <div style="text-align:center; margin: 1.75rem 0;">
              <a href="#/e/${event.slug}/pass" class="btn-apple-primary" style="display:inline-flex;">
                Generate & Download Verified Participant Pass
              </a>
            </div>

            <p>
              <strong>Hackathon Finalist Instructions:</strong><br>
              Please produce your generated Participant Pass alongside your college student photo ID card at Gate 1 registration. Your assigned developer pod, 1 Gbps LAN ports, and welcome packet will be issued upon check-in.
            </p>

            <p>
              <strong>Hardware & API Sandboxes:</strong><br>
              24-hour continuous power and high-speed internet are provisioned for all pods. Every shortlisted team has been granted $200 in Claude API credits and sandbox endpoints for AI integrations.
            </p>

            <p style="margin-top:1.5rem;">
              Warm regards,<br>
              <strong>${escapeHtml(event.contactName)}</strong><br>
              Lead Convener, ${escapeHtml(event.name)}<br>
              ${escapeHtml(event.host)}<br>
              Email: ${escapeHtml(event.contactEmail)}<br>
              Web: <a href="${escapeHtml(event.site)}" target="_blank" rel="noopener">${escapeHtml(event.site)}</a>
            </p>
          </div>

          <div class="mail-footer-bar">
            <button type="button" class="btn-apple-ghost">Reply</button>
            <button type="button" class="btn-apple-ghost">Forward</button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Screen 5: Hackathon Guide & Submission Brief
  // =========================================================================
  function renderBriefScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const startDate = formatDateNatural(event.start);

    return `
      <section class="section-hero">
        <h1 class="page-title">Hackathon Guide & Submission Brief</h1>
        <p class="page-subhead">
          Official hacker handbook. Deliverable requirements, evaluation rubrics, code integrity standards, and presentation guidelines for competing teams.
        </p>
      </section>

      <div class="brief-layout">
        <!-- Submission Deliverables Card -->
        <div class="bento-card highlight-border">
          <div class="card-header-row">
            <h2 class="card-title">Mandatory Submission Deliverables</h2>
            <span class="card-pill">Final Code Freeze: Day 2, 01:30 PM</span>
          </div>
          <p class="card-subtext">Every team must submit the following 4 assets to their assigned GitHub Classroom repository before the deadline:</p>

          <div class="dossier-numbered-grid">
            <div class="dossier-num-cell">
              <span class="dossier-digit">01</span>
              <div>
                <strong>Public GitHub Repository with Open-Source License</strong>
                <span>Must include a well-structured README with architecture diagram, installation steps, and environment variable samples.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">02</span>
              <div>
                <strong>2-Minute Working Product Demo Video</strong>
                <span>Unlisted YouTube or Loom walkthrough showcasing core features, real-time user flow, and working technical implementation.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">03</span>
              <div>
                <strong>Live Staging / Deployment URL</strong>
                <span>Hosted on Vercel, Cloudflare, Railway, or accessible endpoint for hands-on jury inspection.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">04</span>
              <div>
                <strong>5-Slide Pitch Deck (PDF)</strong>
                <span>Clear breakdown of problem statement, solution novelty, technical architecture, addressable market, and team composition.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Evaluation Rubric & Scoring Weights -->
        <div class="scripts-two-col">
          <div class="bento-card">
            <h2 class="card-title">Judging Rubric & Scoring Weights</h2>
            <p class="card-subtext" style="margin-bottom:0.75rem;">Official evaluation breakdown used by industry judges:</p>
            <div class="rubric-bars-list">
              <div class="rubric-row">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">
                  <span>Innovation & Solution Novelty</span>
                  <span style="color:#d97757;">30%</span>
                </div>
                <div class="rubric-track"><div class="rubric-fill" style="width:30%;"></div></div>
              </div>
              <div class="rubric-row">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">
                  <span>Technical Execution & Architecture</span>
                  <span style="color:#d97757;">30%</span>
                </div>
                <div class="rubric-track"><div class="rubric-fill" style="width:30%;"></div></div>
              </div>
              <div class="rubric-row">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">
                  <span>User Experience & UI Polish</span>
                  <span style="color:#d97757;">20%</span>
                </div>
                <div class="rubric-track"><div class="rubric-fill" style="width:20%;"></div></div>
              </div>
              <div class="rubric-row">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">
                  <span>Real-World Feasibility & Impact</span>
                  <span style="color:#d97757;">20%</span>
                </div>
                <div class="rubric-track"><div class="rubric-fill" style="width:20%;"></div></div>
              </div>
            </div>
          </div>

          <div class="bento-card">
            <h2 class="card-title">Code Integrity & Originality Policy</h2>
            <p class="card-subtext" style="margin-bottom:0.75rem;">Fair play and open-source standards:</p>
            <blockquote class="script-quote">
              "All core business logic and models must be written fresh inside the 24-hour sprint window. Open-source libraries and public frameworks are welcomed, but proprietary pre-existing applications will be disqualified upon commit analysis."
            </blockquote>
          </div>
        </div>

        <!-- Stage Pitch Presentation Rules -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Stage Pitch Presentation Rules</h2>
            <span class="card-pill">Main Auditorium</span>
          </div>
          <div class="pitch-rules-grid">
            <div class="pitch-rule-cell">
              <strong>3-Minute Live Demo</strong>
              <p>Focus 80% of your time on live software demonstration over static slides.</p>
            </div>
            <div class="pitch-rule-cell">
              <strong>2-Minute Jury Q&A</strong>
              <p>Be prepared to explain database models, API limits, and edge-case handling.</p>
            </div>
            <div class="pitch-rule-cell">
              <strong>Backup Recording</strong>
              <p>Keep a local screen recording ready in case of unexpected network latency.</p>
            </div>
          </div>
        </div>

        <!-- Private Notes & Sprint Workspace -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Private Sprint Workspace & Notes</h2>
            <span class="card-pill">Saved in Browser</span>
          </div>
          <p class="card-subtext">Record team API keys, sandbox endpoints, repo links, and speaker talking points here.</p>
          <textarea id="private-notes-input" class="apple-textarea" placeholder="E.g., Assigned Pod: Table 14. GitHub Repo: https://github.com/myteam/hackmalabar-project. API Key: sk-ant-api03-... Speaker cue: Demo autonomous workflow at min 1:15.">${escapeHtml(state.privateNote)}</textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem;">
            <span id="note-save-status" style="font-size:0.8rem; color:#4e6e5d;"></span>
            <button type="button" id="btn-save-note" class="btn-apple-secondary">Save Private Note</button>
          </div>
        </div>

        <div class="card-actions-row">
          <button type="button" id="btn-brief-ics" class="btn-apple-ghost">Download .ics Calendar File</button>
          <button type="button" id="btn-brief-share" class="btn-apple-primary">Share Guide</button>
          <a href="#/e/${event.slug}/pass" class="btn-apple-secondary">Open Participant Pass</a>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Screen 6A: Admin Password Gate (Restricted to 'dumass-dev')
  // =========================================================================
  function renderAdminLockScreen() {
    return `
      <section class="admin-lock-wrapper" aria-label="Administrative Clearance Gate">
        <div class="admin-lock-card">
          <div class="admin-lock-icon-wrap" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 class="admin-lock-title">Admin Desk Clearance</h1>
          <p class="admin-lock-subhead">
            Administrative access is restricted. Enter your authorization key to post hackathons and edit records.
          </p>

          <form id="admin-lock-form" class="admin-lock-form" onsubmit="return false;">
            <div class="lock-input-wrap">
              <label for="admin-key-input" class="sr-only">Access Key</label>
              <input
                type="password"
                id="admin-key-input"
                class="apple-input lock-input"
                placeholder="Enter access key"
                autocomplete="current-password"
                required
              >
            </div>
            <div id="admin-lock-error" class="lock-error-msg" style="display:none;" role="alert"></div>
            <button type="submit" id="btn-admin-unlock" class="btn-apple-primary lock-submit-btn">
              <span>Authorize & Unlock</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </form>

          <div class="admin-lock-footer">
            <a href="#/" class="lock-back-link">← Return to Public Overview</a>
          </div>
        </div>
      </section>
    `;
  }

  // =========================================================================
  // Screen 6B: Admin Screen & Event Editor
  // =========================================================================
  function renderAdminScreen() {
    if (!isAdminAuthenticated()) {
      return renderAdminLockScreen();
    }

    const cur = state.currentEvent || state.events[0];

    return `
      <section class="section-hero">
        <div class="hero-actions-row">
          <div>
            <h1 class="page-title">Hackathon Desk & Editor</h1>
            <p class="page-subhead">
              Authorized administrative workspace. Post new hackathons, edit records in memory, and export updated events.json.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-admin-download-json" class="btn-apple-primary">Download events.json</button>
            <button type="button" id="btn-admin-reset-seeds" class="btn-apple-ghost">Reset to Seeds</button>
            <button type="button" id="btn-admin-lock" class="btn-apple-ghost" style="color:#d97757; border-color:rgba(217,119,87,0.3);">Lock & Exit Desk</button>
          </div>
        </div>
      </section>

      <div class="admin-layout">
        <!-- Records Roster -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Active Hackathons (${state.events.length})</h2>
          </div>
          <div class="admin-event-cards">
            ${state.events.map(ev => `
              <div class="admin-item-card ${cur && cur.slug === ev.slug ? 'active' : ''}" data-slug="${escapeHtml(ev.slug)}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <strong class="item-name">${escapeHtml(ev.name)}</strong>
                  <span class="card-pill">${escapeHtml(ev.type.toUpperCase())}</span>
                </div>
                <div class="item-sub">${escapeHtml(ev.edition)} • ${escapeHtml(ev.district)}</div>
                <div class="item-slug">${escapeHtml(ev.slug)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Full In-Memory Editor -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Edit Record: ${escapeHtml(cur.name)}</h2>
          </div>
          <form id="admin-editor-form" onsubmit="return false;">
            <div class="form-two-col">
              <div class="input-block">
                <label for="admin-slug">Slug (Unique ID)</label>
                <input type="text" id="admin-slug" class="apple-input" value="${escapeHtml(cur.slug)}" required>
              </div>

              <div class="input-block">
                <label for="admin-type">Type</label>
                <select id="admin-type" class="apple-input">
                  <option value="hackathon" ${cur.type === 'hackathon' ? 'selected' : ''}>hackathon</option>
                  <option value="workshop" ${cur.type === 'workshop' ? 'selected' : ''}>workshop</option>
                </select>
              </div>

              <div class="input-block full-width">
                <label for="admin-name">Hackathon Name</label>
                <input type="text" id="admin-name" class="apple-input" value="${escapeHtml(cur.name)}" required>
              </div>

              <div class="input-block">
                <label for="admin-edition">Edition</label>
                <input type="text" id="admin-edition" class="apple-input" value="${escapeHtml(cur.edition)}" required>
              </div>

              <div class="input-block">
                <label for="admin-status">Status</label>
                <select id="admin-status" class="apple-input">
                  <option value="upcoming" ${cur.status === 'upcoming' ? 'selected' : ''}>upcoming</option>
                  <option value="completed" ${cur.status === 'completed' ? 'selected' : ''}>completed</option>
                </select>
              </div>

              <div class="input-block">
                <label for="admin-host">Host Body</label>
                <input type="text" id="admin-host" class="apple-input" value="${escapeHtml(cur.host)}" required>
              </div>

              <div class="input-block">
                <label for="admin-support">Supporting Body</label>
                <input type="text" id="admin-support" class="apple-input" value="${escapeHtml(cur.support)}" required>
              </div>

              <div class="input-block full-width">
                <label for="admin-venue">Venue Address</label>
                <input type="text" id="admin-venue" class="apple-input" value="${escapeHtml(cur.venue)}" required>
              </div>

              <div class="input-block">
                <label for="admin-district">District</label>
                <input type="text" id="admin-district" class="apple-input" value="${escapeHtml(cur.district)}" required>
              </div>

              <div class="input-block">
                <label for="admin-maps">Maps Query</label>
                <input type="text" id="admin-maps" class="apple-input" value="${escapeHtml(cur.mapsQuery)}" required>
              </div>

              <div class="input-block">
                <label for="admin-start">Start Time (ISO)</label>
                <input type="text" id="admin-start" class="apple-input" value="${escapeHtml(cur.start)}" required>
              </div>

              <div class="input-block">
                <label for="admin-end">End Time (ISO)</label>
                <input type="text" id="admin-end" class="apple-input" value="${escapeHtml(cur.end)}" required>
              </div>

              <div class="input-block">
                <label for="admin-report">Check-in Time (ISO)</label>
                <input type="text" id="admin-report" class="apple-input" value="${escapeHtml(cur.report)}" required>
              </div>

              <div class="input-block">
                <label for="admin-close">Close Time (ISO)</label>
                <input type="text" id="admin-close" class="apple-input" value="${escapeHtml(cur.close)}" required>
              </div>

              <div class="input-block">
                <label for="admin-deadline">Registration Deadline (ISO)</label>
                <input type="text" id="admin-deadline" class="apple-input" value="${escapeHtml(cur.deadline)}" required>
              </div>

              <div class="input-block">
                <label for="admin-prize">Prize Pool Summary</label>
                <input type="text" id="admin-prize" class="apple-input" value="${escapeHtml(cur.prize)}" required>
              </div>

              <div class="input-block">
                <label for="admin-fee">Fee</label>
                <input type="text" id="admin-fee" class="apple-input" value="${escapeHtml(cur.fee)}" required>
              </div>

              <div class="input-block">
                <label for="admin-site">Site URL</label>
                <input type="text" id="admin-site" class="apple-input" value="${escapeHtml(cur.site)}" required>
              </div>

              <div class="input-block">
                <label for="admin-contact-name">Lead Convener</label>
                <input type="text" id="admin-contact-name" class="apple-input" value="${escapeHtml(cur.contactName)}" required>
              </div>

              <div class="input-block">
                <label for="admin-contact-email">Contact Email</label>
                <input type="email" id="admin-contact-email" class="apple-input" value="${escapeHtml(cur.contactEmail)}" required>
              </div>

              <div class="input-block full-width">
                <label for="admin-tracks">Tracks (One per line)</label>
                <textarea id="admin-tracks" class="apple-textarea" rows="4">${escapeHtml(cur.tracks.join('\n'))}</textarea>
              </div>

              <div class="input-block full-width">
                <label for="admin-note">Hackathon Description & Guidelines</label>
                <textarea id="admin-note" class="apple-textarea" rows="3">${escapeHtml(cur.note)}</textarea>
              </div>
            </div>

            <div class="card-actions-row" style="margin-top:1.5rem;">
              <button type="submit" id="btn-admin-save" class="btn-apple-primary">Save Changes in Memory</button>
              <button type="button" id="btn-admin-new" class="btn-apple-secondary">Add New Hackathon</button>
              <span id="admin-save-status" style="font-size:0.85rem; color:#4e6e5d; margin-left:0.5rem;"></span>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Router & Route Dispatcher
  // =========================================================================
  function handleRoute() {
    const rawHash = window.location.hash.slice(1);
    const hash = rawHash.startsWith('/') ? rawHash : '/' + rawHash;
    const parts = hash.split('/').filter(Boolean);

    let screen = 'public';
    let targetSlug = null;

    if (parts.length === 0 || parts[0] === '') {
      screen = 'public';
      targetSlug = state.events[0].slug;
    } else if (parts[0] === 'admin') {
      screen = 'admin';
    } else if (parts[0] === 'e') {
      targetSlug = parts[1];
      screen = parts[2] || 'public';
    }

    state.currentScreen = screen;

    if (targetSlug) {
      const found = state.events.find(ev => ev.slug === targetSlug);
      if (found) {
        state.currentEvent = found;
      } else {
        state.currentEvent = state.events[0];
      }
    } else if (!state.currentEvent) {
      state.currentEvent = state.events[0];
    }

    populateEventSwitcher();
    updateNavTabs(state.currentEvent ? state.currentEvent.slug : null, screen);
    updateFooter(state.currentEvent);

    const mount = document.getElementById('content-mount');
    if (!mount) return;

    if (screen === 'admin') {
      mount.innerHTML = renderAdminScreen();
      bindAdminEvents();
    } else if (screen === 'pass') {
      mount.innerHTML = renderPassScreen(state.currentEvent);
      bindPassEvents();
    } else if (screen === 'chat') {
      mount.innerHTML = renderChatScreen(state.currentEvent);
      bindChatEvents();
    } else if (screen === 'mail') {
      // Gracefully redirect legacy /mail URLs to main overview
      mount.innerHTML = renderPublicPage(state.currentEvent);
      bindPublicEvents();
    } else if (screen === 'brief') {
      mount.innerHTML = renderBriefScreen(state.currentEvent);
      bindBriefEvents();
    } else {
      mount.innerHTML = renderPublicPage(state.currentEvent);
      bindPublicEvents();
    }

    window.scrollTo(0, 0);
  }

  // Interactive 3D Perspective Tilt for Cards
  function setup3DTilt(element) {
    if (!element) return;
    element.style.transition = 'transform 0.1s ease-out';
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 6;
      const rotY = (x / (rect.width / 2)) * 6;
      element.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.4s ease-out';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  let countdownTimer = null;
  function startCountdown(targetIso) {
    if (countdownTimer) clearInterval(countdownTimer);
    const target = new Date(targetIso).getTime();

    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');
      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minsEl.textContent = pad(mins);
      secsEl.textContent = pad(secs);
    };

    update();
    countdownTimer = setInterval(update, 1000);
  }

  function bindPublicEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    setup3DTilt(document.getElementById('hero-interactive-card'));
    startCountdown(ev.start);

    // Dynamic Live Telemetry Stream
    const tickerEl = document.querySelector('.ticker-text');
    if (tickerEl) {
      const stream = [
        "142 Shortlisted Teams Verified • Gate 1 Check-in Ready (08:30 IST) • Dedicated Cloud Sandboxes Active",
        "1 Gbps Dedicated Campus Lease Line Provisioned Across All Hacking Pods • 24/7 Power Backup Active",
        "Claude 3.5 Sonnet & GPT-4o API Sandboxes Online • GitHub Classroom Repos Distributed",
        "₹1,00,000 Cash Grant Pool Vetted by KSUM Innovation Council & IEEE Student Branch NIT Calicut"
      ];
      let streamIdx = 0;
      if (window._telemetryInterval) clearInterval(window._telemetryInterval);
      window._telemetryInterval = setInterval(() => {
        streamIdx = (streamIdx + 1) % stream.length;
        tickerEl.style.opacity = '0';
        setTimeout(() => {
          tickerEl.textContent = stream[streamIdx];
          tickerEl.style.opacity = '1';
        }, 200);
      }, 4000);
    }

    // Dynamic Spotlight for All Bento & Track Cards
    document.querySelectorAll('.bento-card, .visual-track-card, .stat-ribbon-card, .prize-titanium-card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });

    // Interactive Schedule Day Filter
    const schedBtns = document.querySelectorAll('.sched-filter-btn');
    schedBtns.forEach(btn => {
      btn.onclick = () => {
        schedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetDay = btn.getAttribute('data-day');
        const rows = document.querySelectorAll('.timeline-row');
        rows.forEach(row => {
          const rowDay = row.getAttribute('data-day');
          if (targetDay === 'all' || rowDay === targetDay) {
            row.style.display = 'grid';
          } else {
            row.style.display = 'none';
          }
        });
        playFuturisticBlip(820);
      };
    });

    // Interactive Track Selection
    document.querySelectorAll('.btn-track-select').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const trackName = btn.getAttribute('data-track');
        state.participant.track = trackName;
        playFuturisticBlip(980);
        window.location.hash = `#/e/${ev.slug}/pass`;
      };
    });

    // Interactive FAQ Accordions
    document.querySelectorAll('.faq-accordion-item').forEach(item => {
      const trigger = item.querySelector('.faq-question-btn');
      if (trigger) {
        trigger.onclick = () => {
          const isOpen = item.classList.contains('active');
          document.querySelectorAll('.faq-accordion-item').forEach(i => i.classList.remove('active'));
          if (!isOpen) {
            item.classList.add('active');
            playFuturisticBlip(720);
          }
        };
      }
    });

    const btnIcs = document.getElementById('btn-hero-ics');
    if (btnIcs) btnIcs.onclick = () => {
      playFuturisticBlip(780);
      downloadICS(ev);
    };

    const btnShare = document.getElementById('btn-hero-share');
    if (btnShare) btnShare.onclick = () => {
      playFuturisticBlip(780);
      shareEventBrief(ev);
    };
  }

  function bindPassEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    setup3DTilt(document.getElementById('pass-ticket-dom'));

    const canvas = document.getElementById('pass-render-canvas');
    if (canvas) renderPassCanvas(canvas, ev, state.participant);

    const inputName = document.getElementById('pass-input-name');
    const inputCollege = document.getElementById('pass-input-college');
    const inputReg = document.getElementById('pass-input-reg');
    const selectTrack = document.getElementById('pass-select-track');

    const updateParticipant = () => {
      state.participant.name = inputName.value.trim() || 'Rahul Krishna';
      state.participant.college = inputCollege.value.trim() || 'College of Engineering Trivandrum';
      state.participant.regId = inputReg.value.trim() || 'HM-2026-7842';
      state.participant.track = selectTrack.value;

      const domAvatar = document.getElementById('pass-dom-avatar');
      const domName = document.getElementById('pass-dom-name');
      const domCollege = document.getElementById('pass-dom-college');
      const domId = document.getElementById('pass-dom-id');
      const domTrack = document.getElementById('pass-dom-track');

      if (domAvatar) domAvatar.textContent = state.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK';
      if (domName) domName.textContent = state.participant.name;
      if (domCollege) domCollege.textContent = state.participant.college;
      if (domId) domId.textContent = `ID: ${state.participant.regId}`;
      if (domTrack) domTrack.textContent = state.participant.track;

      if (canvas) renderPassCanvas(canvas, ev, state.participant);
    };

    [inputName, inputCollege, inputReg].forEach(inp => {
      if (inp) inp.addEventListener('input', updateParticipant);
    });
    if (selectTrack) selectTrack.addEventListener('change', updateParticipant);

    const btnDownload = document.getElementById('btn-download-pass');
    if (btnDownload && canvas) {
      btnDownload.onclick = () => {
        playFuturisticBlip(880);
        renderPassCanvas(canvas, ev, state.participant);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${ev.slug}-${state.participant.regId}-pass.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }

    const btnPrint = document.getElementById('btn-print-pass');
    if (btnPrint) {
      btnPrint.onclick = () => {
        playFuturisticBlip(880);
        window.print();
      };
    }
  }

  function bindChatEvents() {
    const scroller = document.getElementById('wa-scroller');
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight;
    }
    const btnPrint = document.getElementById('btn-print-chat');
    if (btnPrint) {
      btnPrint.onclick = () => {
        playFuturisticBlip(880);
        window.print();
      };
    }
  }

  function bindMailEvents() {
    const btnPrint = document.getElementById('btn-print-mail');
    if (btnPrint) {
      btnPrint.onclick = () => {
        playFuturisticBlip(880);
        window.print();
      };
    }

    const btnCopy = document.getElementById('btn-copy-mail');
    if (btnCopy) {
      btnCopy.onclick = async () => {
        playFuturisticBlip(780);
        const bodyEl = document.getElementById('gm-body-content');
        if (!bodyEl) return;
        try {
          await navigator.clipboard.writeText(bodyEl.innerText);
          btnCopy.textContent = 'Copied to Clipboard!';
          setTimeout(() => {
            btnCopy.textContent = 'Copy Email Body';
          }, 2500);
        } catch (err) {
          alert('Could not copy mail text: ' + err);
        }
      };
    }
  }

  function bindBriefEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    const notesInput = document.getElementById('private-notes-input');
    const saveBtn = document.getElementById('btn-save-note');
    const saveStatus = document.getElementById('note-save-status');

    if (saveBtn && notesInput) {
      saveBtn.onclick = () => {
        playFuturisticBlip(780);
        state.privateNote = notesInput.value;
        localStorage.setItem('hackdesk_private_note', state.privateNote);
        if (saveStatus) {
          saveStatus.textContent = 'Notes saved in browser!';
          setTimeout(() => {
            saveStatus.textContent = '';
          }, 2500);
        }
      };
    }

    const btnIcs = document.getElementById('btn-brief-ics');
    if (btnIcs) {
      btnIcs.onclick = () => {
        playFuturisticBlip(780);
        downloadICS(ev);
      };
    }

    const btnShare = document.getElementById('btn-brief-share');
    if (btnShare) {
      btnShare.onclick = () => {
        playFuturisticBlip(780);
        shareEventBrief(ev);
      };
    }
  }

  function bindAdminEvents() {
    // Lock screen authentication
    const lockForm = document.getElementById('admin-lock-form');
    if (lockForm) {
      lockForm.onsubmit = () => {
        const keyInput = document.getElementById('admin-key-input');
        const errDiv = document.getElementById('admin-lock-error');
        if (!keyInput) return;

        const val = keyInput.value.trim();
        if (val === 'dumass-dev') {
          playFuturisticBlip(920);
          setAdminAuthenticated(true);
          const mount = document.getElementById('content-mount');
          if (mount) {
            mount.innerHTML = renderAdminScreen();
            bindAdminEvents();
          }
          updateNavTabs(state.currentEvent ? state.currentEvent.slug : null, 'admin');
        } else {
          playFuturisticBlip(400);
          if (errDiv) {
            errDiv.style.display = 'block';
            errDiv.textContent = 'Authorization failed: Invalid clearance key.';
          }
          keyInput.value = '';
          keyInput.focus();
        }
      };
      return;
    }

    // Authenticated admin workspace
    const btnLock = document.getElementById('btn-admin-lock');
    if (btnLock) {
      btnLock.onclick = () => {
        playFuturisticBlip(600);
        setAdminAuthenticated(false);
        window.location.hash = '#/';
      };
    }

    // Record selection from roster
    document.querySelectorAll('.admin-item-card').forEach(card => {
      card.onclick = () => {
        const slug = card.getAttribute('data-slug');
        const found = state.events.find(ev => ev.slug === slug);
        if (found) {
          playFuturisticBlip(780);
          state.currentEvent = found;
          const mount = document.getElementById('content-mount');
          if (mount) {
            mount.innerHTML = renderAdminScreen();
            bindAdminEvents();
          }
        }
      };
    });

    // In-memory Save
    const form = document.getElementById('admin-editor-form');
    if (form) {
      form.onsubmit = () => {
        playFuturisticBlip(880);
        const cur = state.currentEvent || state.events[0];
        cur.slug = document.getElementById('admin-slug').value.trim();
        cur.type = document.getElementById('admin-type').value;
        cur.name = document.getElementById('admin-name').value.trim();
        cur.edition = document.getElementById('admin-edition').value.trim();
        cur.status = document.getElementById('admin-status').value;
        cur.host = document.getElementById('admin-host').value.trim();
        cur.support = document.getElementById('admin-support').value.trim();
        cur.venue = document.getElementById('admin-venue').value.trim();
        cur.district = document.getElementById('admin-district').value.trim();
        cur.mapsQuery = document.getElementById('admin-maps').value.trim();
        cur.start = document.getElementById('admin-start').value.trim();
        cur.end = document.getElementById('admin-end').value.trim();
        cur.report = document.getElementById('admin-report').value.trim();
        cur.close = document.getElementById('admin-close').value.trim();
        cur.deadline = document.getElementById('admin-deadline').value.trim();
        cur.prize = document.getElementById('admin-prize').value.trim();
        cur.fee = document.getElementById('admin-fee').value.trim();
        cur.site = document.getElementById('admin-site').value.trim();
        cur.contactName = document.getElementById('admin-contact-name').value.trim();
        cur.contactEmail = document.getElementById('admin-contact-email').value.trim();

        const tracksVal = document.getElementById('admin-tracks').value.trim();
        cur.tracks = tracksVal.split('\n').map(t => t.trim()).filter(Boolean);

        cur.note = document.getElementById('admin-note').value.trim();

        const statusEl = document.getElementById('admin-save-status');
        if (statusEl) {
          statusEl.textContent = 'Record updated in memory!';
          setTimeout(() => { statusEl.textContent = ''; }, 3000);
        }
        populateEventSwitcher();
      };
    }

    // New Event
    const btnNew = document.getElementById('btn-admin-new');
    if (btnNew) {
      btnNew.onclick = () => {
        playFuturisticBlip(920);
        const newSlug = 'hackathon-' + Date.now().toString(36);
        const newEvent = {
          slug: newSlug,
          type: "hackathon",
          name: "New Collegiate Hackathon",
          edition: "Edition 1",
          host: "Department of Computer Science",
          support: "Kerala Startup Mission (KSUM)",
          venue: "Main Campus Auditorium, Kerala",
          district: "Kozhikode",
          mapsQuery: "Campus Auditorium",
          start: new Date(Date.now() + 86400000 * 14).toISOString(),
          end: new Date(Date.now() + 86400000 * 15).toISOString(),
          report: new Date(Date.now() + 86400000 * 14).toISOString(),
          close: new Date(Date.now() + 86400000 * 15).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
          contactName: "Lead Organizer",
          contactEmail: "organizer@hackathon.dev",
          site: "https://hackdesk.dev",
          prize: "₹50,000 Cash Pool",
          fee: "Free for student teams",
          tracks: ["AI & Machine Learning", "Web3 & Decentralization", "Open Innovation"],
          people: [{ name: "Lead Organizer", role: "Convener" }],
          note: "Premier collegiate developer hackathon for innovative prototypes.",
          palette: { c1: "#d97757", c2: "#1f1e1b", bg: "#fbf9f5" },
          poster: "posters/hackmalabar-2026.png",
          status: "upcoming"
        };
        state.events.unshift(newEvent);
        state.currentEvent = newEvent;
        const mount = document.getElementById('content-mount');
        if (mount) {
          mount.innerHTML = renderAdminScreen();
          bindAdminEvents();
        }
        populateEventSwitcher();
      };
    }

    // Download JSON
    const btnDownJson = document.getElementById('btn-admin-download-json');
    if (btnDownJson) {
      btnDownJson.onclick = () => {
        playFuturisticBlip(780);
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.events, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = 'events.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }

    // Reset seeds
    const btnReset = document.getElementById('btn-admin-reset-seeds');
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm('Reset all records to factory seed data?')) {
          playFuturisticBlip(500);
          state.events = [...DEFAULT_EVENTS];
          state.currentEvent = state.events[0];
          const mount = document.getElementById('content-mount');
          if (mount) {
            mount.innerHTML = renderAdminScreen();
            bindAdminEvents();
          }
          populateEventSwitcher();
        }
      };
    }
  }

  // Global Print Trigger
  const globalPrintBtn = document.getElementById('btn-global-print');
  if (globalPrintBtn) {
    globalPrintBtn.onclick = () => window.print();
  }

  // Application Entry Point
  async function init() {
    const path = window.location.pathname;
    if (path.endsWith('/admin') || path.endsWith('/admin/')) {
      const cleanBase = path.replace(/\/admin\/?$/, '');
      window.location.replace((cleanBase || '/') + '#/admin');
      return;
    }

    const soundBtn = document.getElementById('btn-sound-toggle');
    const soundLabel = document.getElementById('sound-label');
    if (soundBtn && soundLabel) {
      soundBtn.onclick = () => {
        state.soundEnabled = !state.soundEnabled;
        soundLabel.textContent = state.soundEnabled ? 'Audio: ON' : 'Audio: OFF';
        soundBtn.classList.toggle('active', state.soundEnabled);
        if (state.soundEnabled) playFuturisticBlip(880);
      };
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
    await loadData();
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
