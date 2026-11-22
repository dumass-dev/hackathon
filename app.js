/**
 * Campus Proof Desk — Core Application Logic & Router
 * Zero runtime npm dependencies • Apple & Awwwards Design System
 */

(function () {
  'use strict';

  // Built-in Seed Events for Zero-Latency First Render
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
      start: "2026-11-27T08:30:00+05:30",
      end: "2026-11-28T18:00:00+05:30",
      report: "2026-11-27T08:30:00+05:30",
      close: "2026-11-28T18:00:00+05:30",
      deadline: "2026-11-24T23:59:00+05:30",
      contactName: "Arjun V. Nair",
      contactPhone: "+91 94471 28392",
      contactEmail: "convener.hackmalabar@gmail.com",
      site: "https://hackmalabar.in",
      prize: "₹1,00,000 Cash Pool (First: ₹50,000 | Second: ₹30,000 | Third: ₹20,000)",
      fee: "Free registration for shortlisted student teams",
      tracks: [
        "AI & Intelligent Automation",
        "Cybersecurity & Campus Privacy",
        "GovTech & Citizen Services",
        "FinTech & Financial Inclusion",
        "Open Innovation for Local Impact"
      ],
      people: [
        { name: "Arjun V. Nair", role: "Lead Convener (IEEE SB)" },
        { name: "Dr. Sreela N.", role: "Faculty Coordinator & HoD CSE" },
        { name: "Fahad Mansoor", role: "Logistics & Hostel NOC Lead" },
        { name: "Ananya P.", role: "Participant Support & Helpdesk" }
      ],
      note: "Approved regional collegiate hackathon recognized by KSUM innovation council. Participant attendance certificates issued for academic duty leave and residential hostel attendance reconciliation.",
      palette: { c1: "#d97757", c2: "#faf7f2", bg: "#141312" },
      poster: "posters/hackmalabar-2026.png",
      status: "upcoming"
    },
    {
      slug: "build-kernel-kochi",
      type: "workshop",
      name: "Hands-on Linux Kernel & Systems Workshop",
      edition: "Autumn 2026",
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
      contactPhone: "+91 98460 31824",
      contactEmail: "fosscell.cusat@gmail.com",
      site: "https://fosscell.cusat.ac.in/kernel-workshop",
      prize: "Certificates of Commendation & Hardware Toolkits",
      fee: "₹250 subsidized kit fee",
      tracks: [
        "Kernel Architecture & Device Driver Fundamentals",
        "eBPF Tracing & Runtime Observability",
        "Embedded Linux Board Bringup"
      ],
      people: [
        { name: "Nivin George", role: "Staff Advisor (CUSAT FOSS Cell)" },
        { name: "Prof. K. R. Suresh", role: "Director, School of Engineering" },
        { name: "Reshma Balan", role: "Student Coordinator" }
      ],
      note: "Intensive systems engineering workshop. Authorized for institutional academic duty leave and laboratory attendance waiver.",
      palette: { c1: "#d4a373", c2: "#faf7f2", bg: "#141312" },
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
    privateNote: localStorage.getItem('cpd_private_note') || ''
  };

  // Web Audio Synthetic Sound FX (Zero External Files, Pure High-Tech Audio Feedback)
  let audioCtx = null;
  function playFuturisticBlip(freq = 880, duration = 0.035) {
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
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
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
      techs: ["PyTorch", "LLMs", "Vision AI", "Agentic Systems"],
      focus: "Autonomous agent workflows, multimodal edge reasoning, and collegiate document intelligence."
    },
    "Cybersecurity & Campus Privacy": {
      techs: ["Zero-Trust", "eBPF Tracing", "Cryptographic Auth", "Network Forensics"],
      focus: "Hardened institutional privacy, intrusion telemetry, and verifiable digital credentials."
    },
    "GovTech & Citizen Services": {
      techs: ["Public Digital Goods", "DigiLocker", "Aadhaar Auth", "Accessible UI"],
      focus: "Citizen services modernization, transparent public registries, and localized governance."
    },
    "FinTech & Financial Inclusion": {
      techs: ["UPI Rails", "Fraud Guard", "Smart Contracts", "Micro-Credit"],
      focus: "Campus transaction transparency, decentralized student aid, and automated escrow."
    },
    "Open Innovation for Local Impact": {
      techs: ["Civic IoT", "Renewable Energy", "Disaster Alert", "Edge Computing"],
      focus: "Monsoon flood warning telemetry, renewable micro-grid metrics, and community crisis response."
    }
  };

  // Preset schedules by event type
  const schedulePresets = {
    hackathon: [
      { day: 'Day 1', time: '08:00 AM', label: 'Gate Clearance & Physical Verification', note: 'Gate 1, West Hill campus. Photo ID verification and physical entry tokens.' },
      { day: 'Day 1', time: '08:30 AM', label: 'Mandatory Reporting & Welcome Kit Allocation', note: 'All shortlisted teams sign the official physical attendance ledger.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Keynote & Problem Statements Unveiling', note: 'Briefing by IEEE mentors, faculty advisors, and industry jury members.' },
      { day: 'Day 1', time: '10:30 AM', label: 'Hacking Phase 1 Commences', note: 'Dedicated high-speed connectivity and power workstations allotted.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Working Lunch & Architecture Review', note: 'Mentors evaluate team architecture schematics and repo structure.' },
      { day: 'Day 1', time: '04:30 PM', label: 'Mentorship Checkpoint 1 (Technical Viability)', note: 'Industry mentors inspect codebase commits and viability metrics.' },
      { day: 'Day 1', time: '08:00 PM', label: 'Dinner & Logistics Progress Sync', note: 'Dining service. Designated rest zones open for outstation participants.' },
      { day: 'Day 1', time: '11:30 PM', label: 'Midnight Refreshment & Lightning Code Review', note: 'Night technical support and 24/7 campus security desk active.' },
      { day: 'Day 2', time: '07:30 AM', label: 'Breakfast & Morning Sprint', note: 'Final sprint toward software freeze.' },
      { day: 'Day 2', time: '11:00 AM', label: 'Mentorship Checkpoint 2 (Pitch Dry-Run)', note: 'Rehearsals with presentation and demo feedback.' },
      { day: 'Day 2', time: '01:30 PM', label: 'Code Freeze & Final Repository Submission', note: 'Commit hash locked. Working software evaluation required.' },
      { day: 'Day 2', time: '02:30 PM', label: 'Stage Presentations & Jury Deliberation', note: 'Top finalist teams present in the main campus auditorium.' },
      { day: 'Day 2', time: '05:00 PM', label: 'Valedictory Ceremony & Prize Distribution', note: 'Announcement of winners and presentation of awards.' },
      { day: 'Day 2', time: '06:00 PM', label: 'Programme Close & Academic Duty Certificate Desk', note: 'Official stamped duty certificates and hostel attendance slips issued.' }
    ],
    workshop: [
      { day: 'Day 1', time: '09:00 AM', label: 'Reporting & Workstation Allotment', note: 'Registration desk verification and lab system access.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Architecture Overview & Source Walk', note: 'Foundational concepts and kernel internals walkthrough.' },
      { day: 'Day 1', time: '11:30 AM', label: 'Hands-on Module 1: Kernel Compilation', note: 'Building and booting minimal custom kernel images.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Lunch Break & Technical Networking', note: 'Networking session with open-source contributors.' },
      { day: 'Day 1', time: '02:00 PM', label: 'Hands-on Module 2: Device Drivers', note: 'Writing character device drivers and interrupt handling.' },
      { day: 'Day 1', time: '05:00 PM', label: 'Day 1 Sign-off & Lab Milestone Verification', note: 'Verification of day 1 lab milestones.' },
      { day: 'Day 2', time: '09:00 AM', label: 'Check-in & System Diagnostics', note: 'Review of overnight build logs and questions.' },
      { day: 'Day 2', time: '09:30 AM', label: 'Hands-on Module 3: eBPF & Observability', note: 'Kernel tracing, kprobes, and live metric instrumentation.' },
      { day: 'Day 2', time: '01:00 PM', label: 'Lunch Break', note: 'Campus cafeteria service.' },
      { day: 'Day 2', time: '02:00 PM', label: 'Hardware Bring-up & Real-world Debugging', note: 'Debugging hardware faults and kernel oops logs.' },
      { day: 'Day 2', time: '04:30 PM', label: 'Certificate Distribution & Valedictory', note: 'Presentation of course completion credentials.' },
      { day: 'Day 2', time: '05:00 PM', label: 'Workshop Close & Duty Certificate Stamping', note: 'Official academic leave verification documents countersigned.' }
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

  // Helper: natural spoken date (e.g. 27 Nov 2026)
  function formatDateNatural(isoString) {
    const d = new Date(isoString);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Helper: format time in IST
  function formatTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // Helper: extract hostname for email security headers
  function extractHostname(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return 'campusproofdesk.in';
    }
  }

  // Helper: escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Load Seed Data
  async function loadData() {
    try {
      const localCustom = localStorage.getItem('cpd_events_json');
      if (localCustom) {
        state.events = JSON.parse(localCustom);
      } else {
        const res = await fetch('data/events.json');
        if (res.ok) {
          state.events = await res.json();
        }
      }
    } catch (err) {
      console.warn('Syncing with default seed events array', err);
    }
  }

  // Determine root event (next upcoming, or most recent)
  function resolveDefaultEvent() {
    if (!state.events || state.events.length === 0) return null;
    const now = new Date();
    const upcoming = state.events
      .filter(ev => ev.status === 'upcoming' || new Date(ev.start) >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    if (upcoming.length > 0) {
      return upcoming[0];
    }
    const sorted = [...state.events].sort((a, b) => new Date(b.start) - new Date(a.start));
    return sorted[0];
  }

  // Update top event switcher dropdown
  function updateEventSelector() {
    const selector = document.getElementById('event-selector');
    if (!selector) return;

    selector.innerHTML = state.events.map(ev => {
      const isSelected = state.currentEvent && state.currentEvent.slug === ev.slug ? 'selected' : '';
      const tag = ev.status === 'upcoming' ? ' (Upcoming)' : ' (Past)';
      return `<option value="${ev.slug}" ${isSelected}>${escapeHtml(ev.name)}${tag}</option>`;
    }).join('');

    selector.onchange = (e) => {
      const chosenSlug = e.target.value;
      const targetScreen = state.currentScreen === 'admin' ? 'public' : state.currentScreen;
      window.location.hash = targetScreen === 'public' ? `#/e/${chosenSlug}` : `#/e/${chosenSlug}/${targetScreen}`;
    };
  }

  // Admin clearance state helper (password: dumass-dev)
  function isAdminAuthenticated() {
    return sessionStorage.getItem('cpd_admin_authenticated') === 'true';
  }

  function setAdminAuthenticated(val) {
    if (val) {
      sessionStorage.setItem('cpd_admin_authenticated', 'true');
    } else {
      sessionStorage.removeItem('cpd_admin_authenticated');
    }
  }

  // Update navigation tabs hrefs (hides Event Desk from public visitors)
  function updateNavTabs(currentSlug, currentScreen) {
    const nav = document.getElementById('nav-tabs-container');
    if (!nav) return;

    const baseSlug = currentSlug || (state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026');
    const adminLink = (currentScreen === 'admin' && isAdminAuthenticated())
      ? `<a href="#/admin" class="sub-link active" data-screen="admin">Event Desk</a>`
      : '';

    nav.innerHTML = `
      <a href="#/e/${baseSlug}" class="sub-link ${currentScreen === 'public' ? 'active' : ''}" data-screen="public">Overview</a>
      <a href="#/e/${baseSlug}/pass" class="sub-link ${currentScreen === 'pass' ? 'active' : ''}" data-screen="pass">Participant Pass</a>
      <a href="#/e/${baseSlug}/chat" class="sub-link ${currentScreen === 'chat' ? 'active' : ''}" data-screen="chat">Organisers Chat</a>
      <a href="#/e/${baseSlug}/mail" class="sub-link ${currentScreen === 'mail' ? 'active' : ''}" data-screen="mail">Selection Mail</a>
      <a href="#/e/${baseSlug}/brief" class="sub-link ${currentScreen === 'brief' ? 'active' : ''}" data-screen="brief">Leave Brief</a>
      ${adminLink}
    `;
  }

  // Update footer (no admin traces in public view)
  function updateFooter(event) {
    const mount = document.getElementById('footer-mount');
    if (!mount) return;

    if (!event) {
      mount.innerHTML = `<div class="footer-meta">Campus Proof Desk — Verified Event Infrastructure.</div>`;
      return;
    }

    mount.innerHTML = `
      <div class="footer-left">
        <div class="footer-brand">${escapeHtml(event.name)} (${escapeHtml(event.edition)})</div>
        <div class="footer-host">Organised by ${escapeHtml(event.host)} • Endorsed by ${escapeHtml(event.support)}</div>
        <div class="footer-contacts">
          <span>Convenor: <strong>${escapeHtml(event.contactName)}</strong></span>
          <span>Phone: <a href="tel:${escapeHtml(event.contactPhone.replace(/\s+/g, ''))}">${escapeHtml(event.contactPhone)}</a></span>
          <span>Email: <a href="mailto:${escapeHtml(event.contactEmail)}">${escapeHtml(event.contactEmail)}</a></span>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-links">
          <a href="${escapeHtml(event.site)}" target="_blank" rel="noopener">Official Portal</a>
          <span class="dot-sep">•</span>
          <a href="#/e/${event.slug}/pass">Pass Engine</a>
        </div>
        <div class="footer-note">Campus Proof Desk • Zero Build Step • Client Hash Router</div>
      </div>
    `;
  }

  // Generate WhatsApp Chat Messages from Event Record
  function generateChatMessages(event) {
    if (state.chatMessagesMap[event.slug]) {
      return state.chatMessagesMap[event.slug];
    }

    const convener = event.contactName;
    const phone = event.contactPhone;
    const venue = event.venue;
    const reportTime = formatTime(event.report);
    const startDate = formatDateNatural(event.start);
    const logisticsLead = event.people.find(p => p.role.toLowerCase().includes('logistics')) || { name: 'Fahad Mansoor' };
    const helpdeskLead = event.people.find(p => p.role.toLowerCase().includes('helpdesk') || p.role.toLowerCase().includes('support')) || { name: 'Ananya P.' };

    const messages = [
      // Day 1
      { id: 1, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '10:15 AM', text: `Welcome everyone to the official shortlisted teams coordinate group for ${event.name} (${event.edition})! Hearty congratulations on clearing the screening round.` },
      { id: 2, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '10:16 AM', text: `This group is strictly for logistical coordination, reporting protocol, hostel gate permissions, and duty leave reconciliation.` },
      { id: 3, day: 1, sender: logisticsLead.name, role: 'fahad', outgoing: false, time: '10:20 AM', text: `Quick update regarding reporting: Venue is ${venue}. Reporting desk opens at 08:00 AM on ${startDate}. Mandatory reporting deadline is ${reportTime} IST sharp.` },
      { id: 4, day: 1, sender: logisticsLead.name, role: 'fahad', outgoing: false, time: '10:22 AM', text: `Please ensure your team enters strictly through Gate 1 (Main Entrance facing the West Hill bypass). Security desks have been pre-briefed with the official shortlist.` },
      { id: 5, day: 1, sender: 'Kiran Dev (CET Team 4)', role: 'student', outgoing: true, time: '10:30 AM', text: `Sir, our team is arriving by KSRTC bus from Malappuram / Thrissur. What is the easiest transit connection to reach the campus on time?` },
      { id: 6, day: 1, sender: logisticsLead.name, role: 'fahad', outgoing: false, time: '10:33 AM', text: `From Kozhikode KSRTC Central Stand (Mavoor Road), the campus is exactly 4.8 km. You can board City Bus Route 14 towards Elathur/West Hill, or take a pre-paid auto directly to GEC West Hill. First morning service departs Malappuram at 05:45 AM, reaching well before 07:30 AM.` },
      { id: 7, day: 1, sender: 'Sneha R. (TKM College)', role: 'student', outgoing: false, time: '11:05 AM', text: `Is overnight stay permitted inside the venue? Our residential hostel warden in Kollam requires a clear confirmation before approving our out-station leave.` },
      { id: 8, day: 1, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '11:08 AM', text: `Yes, absolutely Sneha! ${event.name} is a 24-hour continuous programme with complete overnight facilities. Mattresses, pillows, charging points, and rest areas are arranged in the air-conditioned campus seminar hall.` },
      { id: 9, day: 1, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '11:10 AM', text: `For female participants, a dedicated rest lounge with keycard access and 24/7 campus security supervision is arranged right adjacent to the auditorium.` },
      { id: 10, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '11:45 AM', text: `Important checklist of items every participant must carry: 1. Personal laptop & chargers, 2. Labeled spike buster / extension strip, 3. Original College Photo ID card, 4. Printed or digital copy of your Participant Pass generated from this desk.` },
      { id: 11, day: 1, sender: 'Abhinav K. (GEC Thrissur)', role: 'student', outgoing: false, time: '12:15 PM', text: `Will the organisers provide signed duty leave (OD) forms for our college attendance?` },
      { id: 12, day: 1, sender: convener, role: 'arjun', outgoing: false, time: '12:18 PM', text: `Yes! Every participant will be issued an official physical certificate of participation and academic duty leave endorsement bearing the IEEE Student Branch and KSUM seals at Registration Desk 3 before event close.` },
      
      // Day 2
      { id: 13, day: 2, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '09:00 AM', text: `Good morning everyone! A gentle reminder that your individual Participant Passes are now live on the Campus Proof Desk.` },
      { id: 14, day: 2, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '09:02 AM', text: `Please visit the Pass generator tab, verify your name and college details, and keep the pass saved on your phone.` },
      { id: 15, day: 2, sender: 'Rohit Menon (NSS Palakkad)', role: 'student', outgoing: false, time: '09:40 AM', text: `Our hostel resident tutor is asking for a direct phone confirmation from the convener. Can we share the convener contact?` },
      { id: 16, day: 2, sender: convener, role: 'arjun', outgoing: false, time: '09:45 AM', text: `Certainly. Wardens and HODs may reach me directly at ${phone} between 09:00 AM and 08:00 PM for verification. You can also show them the Leave Brief tab with the official phone script.` },
      { id: 17, day: 2, sender: logisticsLead.name, role: 'fahad', outgoing: false, time: '11:30 AM', text: `Wi-Fi credentials and high-speed LAN patch cables will be handed out during morning kit distribution. High-speed 1 Gbps lease line is provisioned across all hacking zones.` },
      { id: 18, day: 2, sender: 'Rahul Krishna (CET)', role: 'student', outgoing: true, time: '02:15 PM', text: `Thank you Arjun sir and team, our hostel out-pass was cleared immediately after showing the Leave Brief and Selection Mail!` },
      { id: 19, day: 2, sender: convener, role: 'arjun', outgoing: false, time: '02:20 PM', text: `Glad to hear that Rahul! Safe travels to Kozhikode. See you all at Gate 1 on ${startDate} at ${reportTime}!` },
      { id: 20, day: 2, sender: helpdeskLead.name, role: 'ananya', outgoing: false, time: '04:00 PM', text: `For any last-minute emergency route queries, helpdesk team can be contacted via email at ${event.contactEmail}. Safe journey!` }
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
      'PRODID:-//Campus Proof Desk//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.slug}-2026@campusproofdesk.in`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(s)}`,
      `DTEND:${toICSDate(e)}`,
      `SUMMARY:${event.name} (${event.edition})`,
      `DESCRIPTION:${event.name} presented by ${event.host} and supported by ${event.support}. Mandatory reporting: ${formatTime(event.report)} at ${event.venue}. Contact: ${event.contactName} (${event.contactPhone}).`,
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
      title: `${event.name} — Campus Proof Desk`,
      text: `Official Event Presence & Leave Brief: ${event.name} (${event.edition}) at ${event.venue}. Reporting: ${formatTime(event.report)} on ${formatDateNatural(event.start)}. Convenor: ${event.contactName} (${event.contactPhone}).`,
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
      alert('Event presence and verification link copied to clipboard.');
    } catch (err) {
      alert(`Event URL: ${window.location.href}`);
    }
  }

  // =========================================================================
  // Canvas Generator: Participant Pass (400x560) — Apple Wallet Badge
  // =========================================================================
  function renderPassCanvas(canvas, event, participant) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 400;
    const h = 560;

    canvas.width = w;
    canvas.height = h;

    // Obsidian background
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, w, h);

    // Subtle hairline outer border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // Lanyard punch hole slot at top
    ctx.fillStyle = '#000000';
    ctx.fillRect(160, 10, 80, 8);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeRect(160, 10, 80, 8);

    // Header strip
    ctx.fillStyle = '#161617';
    ctx.fillRect(3, 26, w - 6, 85);

    // Type badge pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(20, 36, 120, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.type.toUpperCase()} PASS`, 28, 51);

    // Event title & edition
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 19px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.name, 20, 82);
    ctx.fillStyle = '#86868b';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.edition} • ${event.host}`, 20, 100);

    // Participant Details Card
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(16, 125, w - 32, 130);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 125, w - 32, 130);

    // Participant Monogram
    ctx.fillStyle = '#2c2c2e';
    ctx.beginPath();
    ctx.arc(52, 168, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    const initials = participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK';
    ctx.fillText(initials, 52, 174);
    ctx.textAlign = 'left';

    // Name & College
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.name, 90, 160);
    ctx.fillStyle = '#a1a1a6';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.college, 90, 180);
    ctx.fillStyle = '#86868b';
    ctx.font = '11px monospace';
    ctx.fillText(`ID: ${participant.regId}`, 90, 200);
    ctx.fillStyle = '#2997ff';
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Track: ${participant.track || event.tracks[0]}`, 90, 220);

    // Logistics & Venue Meta
    ctx.fillStyle = '#86868b';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('REPORTING TIME & DATE', 20, 280);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${formatTime(event.report)} IST, ${formatDateNatural(event.start)}`, 20, 298);

    ctx.fillStyle = '#86868b';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('GATE NUMBER & VENUE', 20, 325);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    const venueWords = event.venue.split(', ');
    ctx.fillText(`Gate 1 (Main Entrance), ${venueWords[0]}`, 20, 343);
    if (venueWords.length > 1) {
      ctx.fillText(venueWords.slice(1).join(', '), 20, 359);
    }

    // QR Verification Block
    ctx.fillStyle = '#161617';
    ctx.fillRect(16, 385, w - 32, 90);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(16, 385, w - 32, 90);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(28, 395, 70, 70);
    ctx.fillStyle = '#000000';
    for (let rx = 36; rx < 90; rx += 8) {
      for (let ry = 403; ry < 455; ry += 8) {
        if ((rx + ry) % 16 === 0 || (rx < 55 && ry < 420) || (rx > 70 && ry > 435)) {
          ctx.fillRect(rx, ry, 6, 6);
        }
      }
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('LIVE VERIFICATION', 110, 412);
    ctx.fillStyle = '#86868b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scan to inspect real-time schedule,', 110, 430);
    ctx.fillText('hostel permission brief and NOC records.', 110, 446);
    ctx.fillStyle = '#2997ff';
    ctx.font = '600 10px monospace';
    ctx.fillText(`campusproofdesk.in/#/e/${event.slug}`, 110, 462);

    // Non-transferable Notice
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(16, 488, w - 32, 24);
    ctx.fillStyle = '#a1a1a6';
    ctx.font = '600 9px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NON-TRANSFERABLE • ORIGINAL COLLEGE PHOTO ID REQUIRED', w / 2, 503);
    ctx.textAlign = 'left';

    // Signatory footer
    ctx.fillStyle = '#86868b';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Authorized: ${event.contactName} (${event.people[0] ? event.people[0].role : 'Convener'})`, 20, 532);
    ctx.fillText(`Emergency NOC Desk: ${event.contactPhone}`, 20, 546);
  }

  // =========================================================================
  // Canvas Generator: High-Res Poster (A3 1240x1754 and Story 1080x1920)
  // Apple Editorial Design Aesthetic
  // =========================================================================
  function renderPosterCanvas(canvas, event, format) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isStory = format === 'story';
    const w = isStory ? 1080 : 1240;
    const h = isStory ? 1920 : 1754;

    canvas.width = w;
    canvas.height = h;

    // Obsidian Pure Black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Header panel
    ctx.fillStyle = '#161617';
    ctx.fillRect(50, 45, w - 100, 75);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 45, w - 100, 75);

    ctx.fillStyle = '#a1a1a6';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.host.toUpperCase()}  •  SUPPORTED BY ${event.support.toUpperCase()}`, 75, 88);

    // Event type badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(50, 145, 280, 50);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeRect(50, 145, 280, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.type.toUpperCase()}  |  ${event.edition.toUpperCase()}`, 70, 178);

    // Event Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 62px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.name, 50, 265);

    // Date & Venue Card
    ctx.fillStyle = '#161617';
    ctx.fillRect(50, 320, w - 100, 170);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 320, w - 100, 170);

    ctx.fillStyle = '#30d158';
    ctx.font = '700 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`DATES: ${formatDateRange(event.start, event.end).toUpperCase()}`, 80, 365);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`REPORTING: ${formatTime(event.report)} IST  |  GATE CLOSES: ${formatTime(event.close)} IST`, 80, 410);
    ctx.fillStyle = '#a1a1a6';
    ctx.font = '22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`VENUE: ${event.venue}`, 80, 455);

    // Prize Banner
    ctx.fillStyle = '#1d1d1f';
    ctx.fillRect(50, 520, w - 100, 100);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(50, 520, w - 100, 100);

    ctx.fillStyle = '#86868b';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('PRIZE POOL & MERIT RECOGNITION', 80, 555);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 30px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.prize, 80, 595);

    // Competency Tracks
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('OFFICIAL COMPETENCY TRACKS', 50, 665);

    let yOffset = 705;
    event.tracks.forEach((track, i) => {
      ctx.fillStyle = '#161617';
      ctx.fillRect(50, yOffset, w - 100, 52);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(50, yOffset, w - 100, 52);

      ctx.fillStyle = '#2997ff';
      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`0${i + 1}`, 75, yOffset + 34);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(track, 125, yOffset + 35);
      yOffset += 68;
    });

    // Academic & Hostel NOC Card
    ctx.fillStyle = '#161617';
    ctx.fillRect(50, yOffset + 20, w - 100, 160);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, yOffset + 20, w - 100, 160);

    ctx.fillStyle = '#30d158';
    ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('ACADEMIC DUTY LEAVE & RESIDENTIAL HOSTEL COMPLIANCE', 75, yOffset + 60);
    ctx.fillStyle = '#a1a1a6';
    ctx.font = '19px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.note, 75, yOffset + 98);
    ctx.fillStyle = '#f5f5f7';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Registration Deadline: ${formatDateNatural(event.deadline)} 23:59 IST  •  Fee: ${event.fee}`, 75, yOffset + 140);

    // Committee & Contact
    const commY = yOffset + 220;
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('ORGANISING COMMITTEE & CONTACT', 50, commY);

    ctx.fillStyle = '#86868b';
    ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
    const committeeStr = event.people.map(p => `${p.name} (${p.role})`).join('   |   ');
    ctx.fillText(committeeStr, 50, commY + 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Convenor: ${event.contactName}  •  Phone: ${event.contactPhone}  •  Email: ${event.contactEmail}`, 50, commY + 76);

    // Bottom Footer & QR Block
    const footY = h - 180;
    ctx.fillStyle = '#161617';
    ctx.fillRect(50, footY, w - 260, 130);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, footY, w - 260, 130);

    ctx.fillStyle = '#2997ff';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`OFFICIAL PROOF DESK: ${event.site}`, 75, footY + 40);
    ctx.fillStyle = '#86868b';
    ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scan QR code for direct live verification, duty pass, and leave brief.', 75, footY + 75);
    ctx.fillStyle = '#636366';
    ctx.font = '16px monospace';
    ctx.fillText('CAMPUS PROOF DESK • HASH-ROUTER VERIFIED EVENT PRESENCE', 75, footY + 105);

    // QR Box
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(w - 180, footY, 130, 130);

    ctx.fillStyle = '#000000';
    for (let qx = w - 165; qx < w - 65; qx += 12) {
      for (let qy = footY + 15; qy < footY + 115; qy += 12) {
        if ((qx + qy) % 24 === 0 || (qx < w - 130 && qy < footY + 50) || (qx > w - 100 && qy > footY + 80)) {
          ctx.fillRect(qx, qy, 8, 8);
        }
      }
    }
  }

  // =========================================================================
  // VIEW RENDERERS (APPLE / AWWWARDS EDITORIAL)
  // Helper: Visual track vector graphics
  function getTrackVisualIcon(trackName) {
    const t = trackName.toLowerCase();
    if (t.includes('ai') || t.includes('intelligent') || t.includes('automation')) {
      return `
        <svg class="track-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="8" stroke="#2997ff" stroke-width="2.5" fill="rgba(41, 151, 255, 0.15)"/>
          <circle cx="14" cy="18" r="5" stroke="#ffffff" stroke-width="2"/>
          <circle cx="50" cy="18" r="5" stroke="#ffffff" stroke-width="2"/>
          <circle cx="14" cy="46" r="5" stroke="#ffffff" stroke-width="2"/>
          <circle cx="50" cy="46" r="5" stroke="#ffffff" stroke-width="2"/>
          <line x1="18" y1="21" x2="26" y2="28" stroke="rgba(255,255,255,0.4)" stroke-width="1.8" stroke-dasharray="2 2"/>
          <line x1="46" y1="21" x2="38" y2="28" stroke="rgba(255,255,255,0.4)" stroke-width="1.8" stroke-dasharray="2 2"/>
          <line x1="18" y1="43" x2="26" y2="36" stroke="rgba(255,255,255,0.4)" stroke-width="1.8" stroke-dasharray="2 2"/>
          <line x1="46" y1="43" x2="38" y2="36" stroke="rgba(255,255,255,0.4)" stroke-width="1.8" stroke-dasharray="2 2"/>
        </svg>
      `;
    } else if (t.includes('web3') || t.includes('decentralized') || t.includes('blockchain')) {
      return `
        <svg class="track-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6L54 18V46L32 58L10 46V18L32 6Z" stroke="#30d158" stroke-width="2.5" fill="rgba(48, 209, 88, 0.1)"/>
          <path d="M32 6V32M54 46L32 32M10 46L32 32" stroke="#30d158" stroke-width="2"/>
          <circle cx="32" cy="32" r="4" fill="#ffffff"/>
        </svg>
      `;
    } else if (t.includes('iot') || t.includes('mobility') || t.includes('hardware') || t.includes('smart')) {
      return `
        <svg class="track-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="18" width="28" height="28" rx="6" stroke="#ff9f0a" stroke-width="2.5" fill="rgba(255, 159, 10, 0.12)"/>
          <rect x="26" y="26" width="12" height="12" rx="2" fill="#ff9f0a"/>
          <line x1="24" y1="10" x2="24" y2="18" stroke="#ffffff" stroke-width="2"/>
          <line x1="32" y1="10" x2="32" y2="18" stroke="#ffffff" stroke-width="2"/>
          <line x1="40" y1="10" x2="40" y2="18" stroke="#ffffff" stroke-width="2"/>
          <line x1="24" y1="46" x2="24" y2="54" stroke="#ffffff" stroke-width="2"/>
          <line x1="32" y1="46" x2="32" y2="54" stroke="#ffffff" stroke-width="2"/>
          <line x1="40" y1="46" x2="40" y2="54" stroke="#ffffff" stroke-width="2"/>
          <line x1="10" y1="28" x2="18" y2="28" stroke="#ffffff" stroke-width="2"/>
          <line x1="10" y1="36" x2="18" y2="36" stroke="#ffffff" stroke-width="2"/>
          <line x1="46" y1="28" x2="54" y2="28" stroke="#ffffff" stroke-width="2"/>
          <line x1="46" y1="36" x2="54" y2="36" stroke="#ffffff" stroke-width="2"/>
        </svg>
      `;
    } else if (t.includes('health') || t.includes('bio') || t.includes('diagnostics')) {
      return `
        <svg class="track-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="24" stroke="#ff375f" stroke-width="2" fill="rgba(255, 55, 95, 0.08)"/>
          <path d="M16 32H25L29 20L35 44L39 28L43 32H48" stroke="#ff375f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      return `
        <svg class="track-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22" stroke="#64d2ff" stroke-width="2.5" fill="rgba(100, 210, 255, 0.1)"/>
          <path d="M32 16V48M16 32H48" stroke="#64d2ff" stroke-width="2"/>
          <circle cx="32" cy="32" r="10" stroke="#ffffff" stroke-width="1.8"/>
        </svg>
      `;
    }
  }

  // =========================================================================
  // Screen 1: Public Event Page (Apple Hero Showcase & Bento System)
  // =========================================================================
  function renderPublicPage(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const closeFormatted = formatTime(event.close);
    const scheduleItems = schedulePresets[event.type] || schedulePresets.hackathon;

    return `
      <!-- Ambient Apple Lighting Spotlight -->
      <div class="hero-ambient-spotlight" aria-hidden="true"></div>

      <section class="hero-section" aria-label="Event Overview">
        <!-- Hackathon Live Telemetry Banner -->
        <div class="hackathon-live-ticker">
          <span class="ticker-beacon" aria-hidden="true"></span>
          <span class="ticker-tag">LIVE TELEMETRY</span>
          <span class="ticker-text">142 Shortlisted Teams Verified • Gate 1 Sign-in Desk Ready (08:30 IST) • Biometric Attendance Sync Active</span>
        </div>

        <div class="hero-split-grid">
          <!-- Left Column: Typography, Countdown HUD & Key Metrics -->
          <div class="hero-copy-col">
            <div class="hero-eyebrow">
              <span class="eyebrow-host">${escapeHtml(event.host.toUpperCase())}</span>
              <span class="eyebrow-sep">/</span>
              <span class="eyebrow-edition">${escapeHtml(event.edition.toUpperCase())}</span>
              <span class="status-indicator">
                <span class="status-dot"></span>
                ${event.status === 'upcoming' ? 'Active Presence' : 'Archived'}
              </span>
            </div>

            <h1 class="hero-headline">${escapeHtml(event.name)}</h1>
            <p class="hero-subhead">
              A collegiate innovation programme endorsed and supported by <strong>${escapeHtml(event.support)}</strong>. Complete cross-consistent documentation for participant accreditation, physical gate permissions, and residential hostel leave clearance.
            </p>

            <!-- Hackathon Live HUD Countdown -->
            <div class="hackathon-countdown-hud">
              <div class="countdown-hud-header">
                <span class="countdown-pulse-icon" aria-hidden="true"></span>
                <span class="countdown-hud-title">EVENT COMMENCEMENT COUNTDOWN</span>
              </div>
              <div class="countdown-blocks-grid">
                <div class="cd-digit-block"><span class="cd-num" id="cd-days">--</span><span class="cd-unit">DAYS</span></div>
                <span class="cd-colon">:</span>
                <div class="cd-digit-block"><span class="cd-num" id="cd-hours">--</span><span class="cd-unit">HOURS</span></div>
                <span class="cd-colon">:</span>
                <div class="cd-digit-block"><span class="cd-num" id="cd-mins">--</span><span class="cd-unit">MINS</span></div>
                <span class="cd-colon">:</span>
                <div class="cd-digit-block"><span class="cd-num" id="cd-secs">--</span><span class="cd-unit">SECS</span></div>
              </div>
            </div>

            <!-- Hackathon Keynote Stats Ribbon -->
            <div class="hackathon-stats-ribbon">
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
                <span class="ribbon-val">100% NOC</span>
                <span class="ribbon-title">Hostel Leave Approval</span>
                <span class="ribbon-sub">Academic Duty Stamped</span>
              </div>
            </div>

            <!-- Apple-Style Key Metrics Strip -->
            <div class="metrics-grid">
              <div class="metric-cell">
                <div class="metric-value">${datesFormatted.split('–')[0].trim()} – ${datesFormatted.split('–')[1] ? datesFormatted.split('–')[1].trim() : ''}</div>
                <div class="metric-label">Programme Dates</div>
              </div>
              <div class="metric-cell">
                <div class="metric-value">${reportFormatted}</div>
                <div class="metric-label">Mandatory Gate 1 Report (Close: ${closeFormatted})</div>
              </div>
              <div class="metric-cell">
                <div class="metric-value">${escapeHtml(event.district)}</div>
                <div class="metric-label">${escapeHtml(event.venue.split(',')[0])}</div>
              </div>
              <div class="metric-cell">
                <div class="metric-value">${escapeHtml(event.prize.split('(')[0].trim())}</div>
                <div class="metric-label">Cash Pool & Grants</div>
              </div>
            </div>

            <div class="hero-cta-bar">
              <a href="#/e/${event.slug}/pass" class="btn-apple-primary">
                <span>Get Participant Pass</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="#/e/${event.slug}/brief" class="btn-apple-secondary">
                <span>Hostel Leave Brief</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="#/e/${event.slug}/chat" class="btn-apple-tertiary">
                <span>Organisers Chat</span>
              </a>
              <button type="button" id="btn-hero-ics" class="btn-apple-ghost">
                <span>Add to Calendar (.ics)</span>
              </button>
              <button type="button" id="btn-hero-share" class="btn-apple-ghost">
                <span>Share Link</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Visual Apple Device & 3D Pass Showcase -->
          <div class="hero-device-col">
            <div class="device-stage" id="hero-device-stage">
              <!-- Floating Pill Badges around device -->
              <div class="floating-chip chip-top-right">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Biometric Gate NOC Active</span>
              </div>
              <div class="floating-chip chip-bottom-left">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2997ff" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>24h Continuous Hacking</span>
              </div>

              <!-- iPhone 16 Pro Showcase Frame -->
              <div class="iphone-pro-mockup" id="hero-interactive-card">
                <div class="iphone-bezel">
                  <div class="iphone-screen">
                    <!-- iOS Status Bar -->
                    <div class="ios-status-bar">
                      <span class="ios-time">9:41</span>
                      <div class="dynamic-island">
                        <span class="island-lens"></span>
                        <span class="island-sensor"></span>
                      </div>
                      <div class="ios-icons">
                        <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
                        <div class="ios-battery"><span class="battery-level"></span></div>
                      </div>
                    </div>

                    <!-- Apple Wallet Ticket Preview Inside Phone -->
                    <div class="wallet-pass-preview">
                      <div class="wallet-header">
                        <span class="wallet-logo-badge">${escapeHtml(event.name.split(' ')[0])}</span>
                        <span class="wallet-tag">VERIFIED PASS</span>
                      </div>

                      <div class="wallet-title">${escapeHtml(event.name)}</div>
                      <div class="wallet-sub">${escapeHtml(event.edition)} • ${escapeHtml(event.host)}</div>

                      <div class="wallet-user-card">
                        <div class="wallet-avatar">RK</div>
                        <div>
                          <div class="wallet-name">Rahul Krishna</div>
                          <div class="wallet-college">College of Engineering Trivandrum</div>
                          <div class="wallet-id">HM-2026-7842</div>
                        </div>
                      </div>

                      <div class="wallet-meta-grid">
                        <div>
                          <span class="wm-label">GATE ACCESS</span>
                          <strong class="wm-val">Gate 1 (West Hill)</strong>
                        </div>
                        <div>
                          <span class="wm-label">REPORT TIME</span>
                          <strong class="wm-val">${reportFormatted} IST</strong>
                        </div>
                      </div>

                      <div class="wallet-qr-box">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.origin + window.location.pathname + '#/e/' + event.slug)}" alt="QR Verification" class="wallet-qr-img">
                        <div class="wallet-barcode-strip">
                          <span class="barcode-line w2"></span><span class="barcode-line w1"></span><span class="barcode-line w3"></span>
                          <span class="barcode-line w1"></span><span class="barcode-line w2"></span><span class="barcode-line w4"></span>
                          <span class="barcode-line w1"></span><span class="barcode-line w3"></span><span class="barcode-line w2"></span>
                          <span class="barcode-line w1"></span><span class="barcode-line w4"></span><span class="barcode-line w2"></span>
                        </div>
                      </div>

                      <div class="wallet-footer">
                        <span>NON-TRANSFERABLE • ORIGINAL COLLEGE PHOTO ID</span>
                      </div>
                    </div>

                    <!-- iOS Home Bar -->
                    <div class="ios-home-bar"></div>
                  </div>
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
                <h2 class="card-title">Institutional Accreditation & Duty Leave</h2>
              </div>
              <span class="card-pill">Official Verification</span>
            </div>
            <p class="card-text">${escapeHtml(event.note)}</p>
            <p class="card-subtext">
              Wardens, Resident Tutors (RTs), and Heads of Department can cross-reference participant credentials using this verified desk. Physical attendance slips and official duty leave certificates are stamped and issued at Registration Desk 3 before event close.
            </p>
            <div class="security-stamp-bar">
              <div class="stamp-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>IEEE Student Branch NOC Protocol</span>
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

          <!-- Chronological Schedule (Laser Timeline with Day Filters) -->
          <section class="bento-card" aria-label="Full Event Schedule">
            <div class="card-header-row">
              <div>
                <h2 class="card-title">Chronological Programme Milestones</h2>
                <p class="card-subtext" style="margin-top:0.25rem;">Gate clearances, mentorship reviews, and code freeze ledger</p>
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

          <!-- Prize & Merit Breakdown (Apple Card Titanium Visual) -->
          <section class="bento-card" aria-label="Prize Pool Breakdown">
            <div class="card-header-row">
              <h2 class="card-title">Prize Pool & Financial Grants</h2>
              <span class="card-pill">Merit Recognition</span>
            </div>
            <div class="prize-titanium-card">
              <div class="card-chip-row">
                <svg class="emv-chip" width="38" height="28" viewBox="0 0 38 28" fill="none">
                  <rect width="38" height="28" rx="4" fill="url(#chip-grad)"/>
                  <rect x="2" y="2" width="34" height="24" rx="2" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                  <line x1="12" y1="2" x2="12" y2="26" stroke="rgba(255,255,255,0.4)"/>
                  <line x1="26" y1="2" x2="26" y2="26" stroke="rgba(255,255,255,0.4)"/>
                  <line x1="2" y1="14" x2="36" y2="14" stroke="rgba(255,255,255,0.4)"/>
                  <defs>
                    <linearGradient id="chip-grad" x1="0" y1="0" x2="38" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#ffd700"/>
                      <stop offset="1" stop-color="#b8860b"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span class="card-chip-label">GRANT ALLOCATION</span>
              </div>
              <div class="prize-big-number">${escapeHtml(event.prize.split('(')[0].trim())}</div>
              <div class="prize-tier-bars">
                <div class="tier-bar-row">
                  <span class="tier-name">1st Prize</span>
                  <div class="tier-progress"><div class="tier-fill gold" style="width: 50%;"></div></div>
                  <span class="tier-amt">₹50,000</span>
                </div>
                <div class="tier-bar-row">
                  <span class="tier-name">2nd Prize</span>
                  <div class="tier-progress"><div class="tier-fill silver" style="width: 30%;"></div></div>
                  <span class="tier-amt">₹30,000</span>
                </div>
                <div class="tier-bar-row">
                  <span class="tier-name">3rd Prize</span>
                  <div class="tier-progress"><div class="tier-fill bronze" style="width: 20%;"></div></div>
                  <span class="tier-amt">₹20,000</span>
                </div>
              </div>
              <div class="fee-text">Registration Fee: <strong>${escapeHtml(event.fee)}</strong>. All shortlisted participants receive accredited participation certificates for academic credit reconciliation.</div>
            </div>
          </section>

          <!-- Venue & Transit Directions -->
          <section class="bento-card" aria-label="Venue and Transit Directions">
            <div class="card-header-row">
              <h2 class="card-title">Venue Location & Transit Route</h2>
              <a href="https://maps.google.com/?q=${encodeURIComponent(event.venue)}" target="_blank" rel="noopener" class="card-action-link">
                <span>Open in Maps</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <div class="venue-address-bar">
              <strong>${escapeHtml(event.venue)}</strong> (${escapeHtml(event.district)} District)
            </div>
            <div class="map-frame">
              <iframe
                title="Map for ${escapeHtml(event.venue)}"
                src="https://maps.google.com/maps?q=${encodeURIComponent(event.mapsQuery)}&output=embed"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <p class="transit-note">
              <strong>KSRTC Transit Guidance:</strong> Arriving from Malappuram or Thrissur via KSRTC bus, the campus is 4.8 km from Kozhikode KSRTC Central Stand. Board City Bus Route 14 or take a pre-paid auto directly to GEC West Hill. First morning service from Malappuram departs 05:45 AM.
            </p>
          </section>

          <!-- FAQ Section (Interactive Accordion) -->
          <section class="bento-card" aria-label="Hostel Leave & Participant FAQ">
            <div class="card-header-row">
              <div>
                <h2 class="card-title">Hostel Leave & Participant FAQ</h2>
                <p class="card-subtext" style="margin-top:0.25rem;">Guidelines for warden verification, out-passes, and overnight rest</p>
              </div>
              <span class="card-pill">4 Guidance Items</span>
            </div>
            <div class="faq-group">
              ${[
                { q: "How do I verify my attendance to my hostel warden or Resident Tutor?", a: "Submit your generated Participant Pass alongside your Selection Confirmation Mail. Our Leave Brief screen gives you the exact verbal sentence to recite. Physical countersigned duty slips are stamped at Registration Desk 3 before closing." },
                { q: "What are the mandatory reporting hours and gate access rules?", a: `Gate 1 opens at 08:00 AM on ${datesFormatted.split('–')[0].trim()} with mandatory physical sign-in at ${reportFormatted} IST sharp. Gate 1 closes at ${closeFormatted} on the final day.` },
                { q: "Is overnight stay permitted for outstation participants?", a: "Yes. Continuous 24-hour overnight hacking is hosted inside the air-conditioned campus seminar hall with dedicated rest zones and mattresses. Female participants have a separate rest lounge with 24/7 security supervision." },
                { q: "What items are mandatory for entry clearance?", a: "Personal laptops, labeled spike busters/extension strips, original college photo ID cards, and your printed or digital Participant Pass." }
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
              <h2 class="card-title">Event Poster</h2>
              <span class="card-pill">1240x1754 A3</span>
            </div>
            <div class="poster-angled-frame">
              <img src="${escapeHtml(event.poster)}" alt="Official event poster for ${escapeHtml(event.name)}" class="poster-display-img" id="hero-poster-img">
            </div>
            <div class="poster-download-group">
              <a href="${escapeHtml(event.poster)}" download="${event.slug}-poster.png" class="btn-apple-primary" style="width:100%; justify-content:center;">
                Download A3 Poster
              </a>
              <a href="#/e/${event.slug}/pass" class="btn-apple-secondary" style="width:100%; justify-content:center;">
                Generate Pass
              </a>
            </div>
          </div>

          <!-- Leave Proof Dossier Flow Card -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Leave Dossier Kit</h2>
            </div>
            <p class="card-subtext" style="margin-bottom:1rem;">Present documentary evidence in this exact order to secure your hostel out-pass without delay:</p>
            <div class="dossier-steps-list">
              <a href="#/e/${event.slug}/mail" class="dossier-step-link">
                <span class="step-num">01</span>
                <span class="step-label">Selection Confirmation Mail</span>
                <span class="step-arrow">→</span>
              </a>
              <a href="#/e/${event.slug}/pass" class="dossier-step-link">
                <span class="step-num">02</span>
                <span class="step-label">Participant Photo Pass</span>
                <span class="step-arrow">→</span>
              </a>
              <a href="#/e/${event.slug}/chat" class="dossier-step-link">
                <span class="step-num">03</span>
                <span class="step-label">Organisers WhatsApp Chat</span>
                <span class="step-arrow">→</span>
              </a>
              <a href="#/e/${event.slug}/brief" class="dossier-step-link">
                <span class="step-num">04</span>
                <span class="step-label">Warden Verbal Brief & Script</span>
                <span class="step-arrow">→</span>
              </a>
            </div>
          </div>

          <!-- Warden Direct Hotline -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Warden Phone Hotline</h2>
            </div>
            <p class="card-subtext">If your hostel warden or Head of Department requires immediate telephone confirmation:</p>
            <div class="hotline-box">
              <div class="hotline-row">
                <span class="hotline-label">Lead Convenor</span>
                <strong class="hotline-val">${escapeHtml(event.contactName)}</strong>
              </div>
              <div class="hotline-row">
                <span class="hotline-label">Telephone</span>
                <a href="tel:${escapeHtml(event.contactPhone.replace(/\s+/g, ''))}" class="hotline-val hotline-link">${escapeHtml(event.contactPhone)}</a>
              </div>
              <div class="hotline-row">
                <span class="hotline-label">Helpdesk</span>
                <a href="mailto:${escapeHtml(event.contactEmail)}" class="hotline-val hotline-link">${escapeHtml(event.contactEmail)}</a>
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

          <!-- Institutional Accreditation & Partners -->
          <div class="bento-card">
            <div class="card-header-row">
              <h2 class="card-title">Institutional Patronage</h2>
              <span class="card-pill">Verified</span>
            </div>
            <div class="partner-logos-strip">
              <div class="partner-cell">
                <strong class="partner-abbr">IEEE SB</strong>
                <span class="partner-org">NIT Calicut</span>
                <span class="partner-role">Technical Patron</span>
              </div>
              <div class="partner-cell">
                <strong class="partner-abbr">KSUM</strong>
                <span class="partner-org">Govt. of Kerala</span>
                <span class="partner-role">Innovation Grant</span>
              </div>
              <div class="partner-cell">
                <strong class="partner-abbr">GEC</strong>
                <span class="partner-org">Kozhikode</span>
                <span class="partner-role">Campus Host</span>
              </div>
              <div class="partner-cell">
                <strong class="partner-abbr">ICFOSS</strong>
                <span class="partner-org">Kerala FOSS</span>
                <span class="partner-role">Ecosystem Partner</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  // Screen 2: Participant Pass Generator
  function renderPassScreen(event) {
    const reportFormatted = formatTime(event.report);
    const startDate = formatDateNatural(event.start);
    const p = state.participant;
    const selectedTrack = p.track || event.tracks[0];

    return `
      <section class="section-hero">
        <h1 class="page-title">Participant Pass</h1>
        <p class="page-subhead">
          Generate your official participant credential with embedded QR verification. Formatted for standard 100x140mm print layout on A4 paper.
        </p>
      </section>

      <div class="pass-layout">
        <!-- Badge Preview Column with Lanyard Clip & 3D Interactive Card -->
        <div class="pass-preview-column">
          <!-- Physical Lanyard Strap Mockup -->
          <div class="lanyard-strap" aria-hidden="true">
            <div class="lanyard-fabric"></div>
            <div class="lanyard-metal-clip"></div>
          </div>

          <canvas id="pass-render-canvas" style="display:none;"></canvas>

          <!-- Apple Wallet Style Pass Ticket with 3D Tilt -->
          <div class="apple-pass" id="pass-ticket-dom">
            <!-- Lanyard Punch Hole Slot -->
            <div class="pass-lanyard-slot" aria-hidden="true"></div>

            <div class="pass-header-strip">
              <div class="pass-type-chip">${escapeHtml(event.type.toUpperCase())} PASS</div>
              <div class="pass-title">${escapeHtml(event.name)}</div>
              <div class="pass-edition">${escapeHtml(event.edition)} • ${escapeHtml(event.host)}</div>
            </div>

            <div class="pass-body-section">
              <div class="pass-user-strip">
                <div class="pass-user-avatar" id="pass-dom-avatar">
                  ${escapeHtml(p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK')}
                </div>
                <div class="pass-user-meta">
                  <div class="pass-user-name" id="pass-dom-name">${escapeHtml(p.name)}</div>
                  <div class="pass-user-college" id="pass-dom-college">${escapeHtml(p.college)}</div>
                  <div class="pass-user-id" id="pass-dom-id">ID: ${escapeHtml(p.regId)}</div>
                </div>
              </div>

              <div class="pass-grid-fields">
                <div class="pass-field">
                  <span class="field-title">Reporting Time</span>
                  <strong class="field-value">${reportFormatted} IST</strong>
                </div>
                <div class="pass-field">
                  <span class="field-title">Date of Entry</span>
                  <strong class="field-value">${startDate}</strong>
                </div>
                <div class="pass-field">
                  <span class="field-title">Gate Access</span>
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
                  <strong>Official Live Verification</strong>
                  <span>Scan to verify real-time schedule, hostel clearance brief, and official duty NOC records.</span>
                </div>
              </div>

              <div class="pass-legal-banner">
                Non-transferable • Must present original institution photo ID at Gate 1
              </div>

              <div class="pass-sign-row">
                <div>
                  <span class="sign-label">Authorized Signatory:</span><br>
                  <strong class="sign-val">${escapeHtml(event.contactName)}</strong> (${escapeHtml(event.people[0] ? event.people[0].role : 'Convener')})
                </div>
                <div style="text-align:right;">
                  <span class="sign-label">Emergency Desk:</span><br>
                  <strong class="sign-val">${escapeHtml(event.contactPhone)}</strong>
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
                  Proceed to Leave Brief
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // Screen 3: WhatsApp-Faithful Dark UI inside iPhone 16 Pro Frame
  function renderChatScreen(event) {
    const messages = generateChatMessages(event);
    const day1Messages = messages.filter(m => m.day === 1);
    const day2Messages = messages.filter(m => m.day === 2);

    return `
      <section class="section-hero">
        <div class="hero-actions-row">
          <div>
            <h1 class="page-title">Organisers WhatsApp Coordination</h1>
            <p class="page-subhead">
              WhatsApp-faithful dark UI presented within an authentic Apple iPhone frame. 20 real-time chronological messages spanning 2 days covering shortlist release, Gate 1 reporting, transit, overnight stay rules, and college ID requirements.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-print-chat" class="btn-apple-secondary">Print Chat Transcript</button>
            <a href="#/e/${event.slug}/mail" class="btn-apple-primary">View Selection Mail</a>
          </div>
        </div>
      </section>

      <div class="phone-frame-outer">
        <div class="iphone-hardware-chassis">
          <!-- iOS Status Bar & Dynamic Island -->
          <div class="ios-status-bar">
            <span class="ios-time">9:41</span>
            <div class="dynamic-island">
              <span class="island-lens"></span>
              <span class="island-sensor"></span>
            </div>
            <div class="ios-icons">
              <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
              <div class="ios-battery"><span class="battery-level"></span></div>
            </div>
          </div>

          <div class="wa-chat-container">
            <!-- WhatsApp Top Bar -->
            <div class="wa-header-bar">
              <div class="wa-header-profile">
                <div class="wa-group-avatar">HM</div>
                <div>
                  <div class="wa-group-title">${escapeHtml(event.name)} (Official Shortlisted Teams)</div>
                  <div class="wa-group-subs">${escapeHtml(event.people.map(p => p.name).join(', '))}</div>
                </div>
              </div>
              <div class="wa-header-actions" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
              </div>
            </div>

            <!-- Chat Area -->
            <div class="wa-messages-area" id="wa-messages-scroll">
              <div class="wa-enc-banner">
                Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
              </div>

              <div class="wa-date-divider">
                <span class="wa-date-pill">21 NOVEMBER 2026</span>
              </div>

              ${day1Messages.map(msg => renderChatMessage(msg)).join('')}

              <div class="wa-date-divider">
                <span class="wa-date-pill">22 NOVEMBER 2026</span>
              </div>

              ${day2Messages.map(msg => renderChatMessage(msg)).join('')}
            </div>

            <!-- Chat Input Bar -->
            <div class="wa-input-strip">
              <input type="text" id="wa-quick-input" placeholder="Message shortlisted teams and convener..." readonly value="Logistical helpdesk active: ${escapeHtml(event.contactPhone)}">
              <button type="button" class="wa-send-btn" title="Send" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>

          <!-- Bottom Home Indicator -->
          <div class="ios-home-bar"></div>
        </div>
      </div>
    `;
  }

  function renderChatMessage(msg) {
    const isOut = msg.outgoing;
    let senderClass = 'wa-sender-arjun';
    if (msg.role === 'fahad') senderClass = 'wa-sender-fahad';
    else if (msg.role === 'ananya') senderClass = 'wa-sender-ananya';
    else if (msg.role === 'student') senderClass = 'wa-sender-student';

    return `
      <div class="wa-msg ${isOut ? 'outgoing' : 'incoming'}">
        ${!isOut ? `<span class="wa-sender-name ${senderClass}">${escapeHtml(msg.sender)}</span>` : ''}
        <div class="wa-msg-text">${escapeHtml(msg.text)}</div>
        <div class="wa-msg-meta">
          <span>${escapeHtml(msg.time)}</span>
          ${isOut ? '<span class="wa-tick">✓✓</span>' : ''}
        </div>
      </div>
    `;
  }

  // Screen 4: Selection Mail inside macOS Sequoia Window
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
              Official shortlist correspondence presented in an Apple macOS Sequoia window with security headers, confirmed milestones, gate access, and direct pass credentials for hostel submission.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-print-mail" class="btn-apple-secondary">Print Letterhead (A4)</button>
            <button type="button" id="btn-copy-mail" class="btn-apple-ghost">Copy Email Body</button>
            <a href="#/e/${event.slug}/pass" class="btn-apple-primary">Open Pass</a>
          </div>
        </div>
      </section>

      <!-- macOS Window Mockup -->
      <div class="macos-window-shell">
        <div class="macos-titlebar">
          <div class="traffic-lights">
            <span class="traffic-dot red"></span>
            <span class="traffic-dot yellow"></span>
            <span class="traffic-dot green"></span>
          </div>
          <div class="macos-window-title">Mail — ${escapeHtml(event.name)} Selection Notice</div>
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
              <span class="mail-tool-icon" title="Spam">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </span>
              <span class="mail-tool-icon" title="Delete">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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
              <span class="mail-pill pill-accent">Academic Leave Endorsement</span>
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
            <span>mailed-by: <strong>gmail.com</strong></span>
            <span>signed-by: <strong>${escapeHtml(extractHostname(event.site))}</strong></span>
            <span>security: <strong>TLS Standard Encryption</strong></span>
          </div>

          <div class="mail-body-content" id="gm-body-content">
            <p>Dear <strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.college)}),</p>

            <p>
              Congratulations! On behalf of the organising committee of <strong>${escapeHtml(event.name)} (${escapeHtml(event.edition)})</strong>, we are delighted to inform you that your registration and project abstract have been officially <strong>SHORTLISTED</strong> for the physical programme.
            </p>

            <div class="mail-highlight-card">
              <h3 style="font-size:0.95rem; font-weight:700; color:#1d1d1f; margin-bottom:0.75rem;">Confirmed Programme Milestones</h3>
              <ul>
                <li><strong>Event:</strong> ${escapeHtml(event.name)} (${escapeHtml(event.edition)})</li>
                <li><strong>Host Body:</strong> ${escapeHtml(event.host)}</li>
                <li><strong>Supporting Body:</strong> ${escapeHtml(event.support)}</li>
                <li><strong>Dates:</strong> ${datesFormatted}</li>
                <li><strong>Reporting Schedule:</strong> ${reportFormatted} IST on ${formatDateNatural(event.start)} (Gate closes ${formatTime(event.close)} IST)</li>
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
              <strong>Hostel & Academic Leave Instructions:</strong><br>
              Please produce a printed copy of this email along with your Participant Pass to your Head of Department (HOD) and Hostel Warden. Official institutional attendance and academic duty leave (OD) certificates will be countersigned and stamped at Registration Desk 3 before programme conclusion.
            </p>

            <p>
              <strong>Accommodation & Kit:</strong><br>
              24-hour overnight hacking and rest facilities are arranged within the venue for all verified outstation participants. Please ensure your team carries personal laptops, labeled power extension strips, and original college photo IDs.
            </p>

            <p style="margin-top:1.5rem;">
              Warm regards,<br>
              <strong>${escapeHtml(event.contactName)}</strong><br>
              Lead Convener, ${escapeHtml(event.name)}<br>
              ${escapeHtml(event.host)}<br>
              Phone: ${escapeHtml(event.contactPhone)} | Email: ${escapeHtml(event.contactEmail)}<br>
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

  // Screen 5: Leave Brief & Hostel Permission Dossier
  function renderBriefScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const startDate = formatDateNatural(event.start);
    const p = state.participant;

    const verbalSentence = `Respected Warden / HOD, I have been officially shortlisted to represent our college at ${event.name} organised by ${event.host} and supported by ${event.support} at ${event.venue} from ${datesFormatted}; mandatory reporting is at ${reportFormatted} IST on ${startDate}, and official duty attendance certificates will be countersigned and submitted upon my return.`;

    return `
      <section class="section-hero">
        <h1 class="page-title">Hostel Leave Brief</h1>
        <p class="page-subhead">
          Designed specifically for resident students. Formats your pitch, phone scripts for parents and faculty, and structures documentary evidence to clear your hostel out-pass.
        </p>
      </section>

      <div class="brief-layout">
        <!-- Exact Sentence to Say -->
        <div class="bento-card highlight-border">
          <div class="card-header-row">
            <h2 class="card-title">The Exact Sentence to Say to Warden / HOD</h2>
            <span class="card-pill">Verbatim Script</span>
          </div>
          <p class="card-subtext">Recite this verbatim when submitting your leave slip. It addresses institution, legitimacy, dates, reporting time, and proof of return in one breath:</p>

          <div class="verbal-box">
            <blockquote class="verbal-quote" id="verbal-sentence-target">
              "${verbalSentence}"
            </blockquote>
          </div>

          <div class="card-actions-row">
            <button type="button" id="btn-copy-sentence" class="btn-apple-primary">
              Copy Verbal Sentence
            </button>
            <button type="button" id="btn-print-brief" class="btn-apple-secondary">
              Print Leave Dossier (A4)
            </button>
          </div>
        </div>

        <!-- Phone Scripts Grid -->
        <div class="scripts-two-col">
          <div class="bento-card">
            <h2 class="card-title">Phone Script: Student to Parent</h2>
            <p class="card-subtext" style="margin-bottom:0.75rem;">Brief your parent before they call the warden:</p>
            <blockquote class="script-quote">
              "Mom / Dad, our team from college got shortlisted for ${escapeHtml(event.name)} at ${escapeHtml(event.venue.split(',')[0])}. It is organised by ${escapeHtml(event.host)} with ${escapeHtml(event.support)}. The hostel warden will call to verify that you are aware of my travel from ${datesFormatted}. Please confirm that I have your permission to travel by bus."
            </blockquote>
          </div>

          <div class="bento-card">
            <h2 class="card-title">Phone Script: If Warden Calls Convener</h2>
            <p class="card-subtext" style="margin-bottom:0.75rem;">Give this direct telephone brief to the hostel desk:</p>
            <blockquote class="script-quote">
              "Tell the warden they can directly call the Convener <strong>${escapeHtml(event.contactName)}</strong> at <strong>${escapeHtml(event.contactPhone)}</strong>. The convener's desk confirms that 24/7 faculty supervision and secure rest zones are arranged inside the campus for all verified participants."
            </blockquote>
          </div>
        </div>

        <!-- Dossier Order -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Order to Present Documentary Evidence</h2>
          </div>
          <div class="dossier-numbered-grid">
            <div class="dossier-num-cell">
              <span class="dossier-digit">01</span>
              <div>
                <strong>Selection Confirmation Mail (Printout)</strong>
                <span>Shows candidate name, official sender address, timestamp, and institutional shortlist announcement.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">02</span>
              <div>
                <strong>Participant Pass (100x140mm with QR Code)</strong>
                <span>Displays registration ID, assigned track, Gate 1 reporting notice, and non-transferable photo ID warning.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">03</span>
              <div>
                <strong>Official Schedule & Track Brochure</strong>
                <span>Proves continuous academic schedule, mentor checkpoints, and absence of unmonitored free hours.</span>
              </div>
            </div>
            <div class="dossier-num-cell">
              <span class="dossier-digit">04</span>
              <div>
                <strong>Organisers Chat & Convener Contact Card</strong>
                <span>Provides immediate emergency telephone numbers and transit bus guidance from neighbouring districts.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Private Notes -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Private Travel & Room Notes</h2>
            <span class="card-pill">Saved in Browser</span>
          </div>
          <p class="card-subtext">Record your hostel room number, out-pass serial number, bus departure ticket details, or roommate contact here.</p>
          <textarea id="private-notes-input" class="apple-textarea" placeholder="E.g., Hostel Block B Room 304. Out-pass serial: CET-OP-4491. Parent phone: +91 94471 00000. Return KSRTC bus booked for 28 Nov 08:30 PM.">${escapeHtml(state.privateNote)}</textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem;">
            <span id="note-save-status" style="font-size:0.8rem; color:#30d158;"></span>
            <button type="button" id="btn-save-note" class="btn-apple-secondary">Save Private Note</button>
          </div>
        </div>

        <div class="card-actions-row">
          <button type="button" id="btn-brief-ics" class="btn-apple-ghost">Download .ics Calendar File</button>
          <button type="button" id="btn-brief-share" class="btn-apple-primary">Share Evidence via Web Share</button>
          <a href="#/e/${event.slug}/pass" class="btn-apple-secondary">Back to Pass</a>
        </div>
      </div>
    `;
  }

  // Screen 6A: Admin Password Gate (Restricted to 'dumass-dev')
  function renderAdminLockScreen() {
    return `
      <section class="admin-lock-wrapper" aria-label="Administrative Clearance Gate">
        <div class="admin-lock-card">
          <div class="admin-lock-icon-wrap" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2997ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h1 class="admin-lock-title">Event Desk Clearance</h1>
          <p class="admin-lock-subhead">
            Administrative access is restricted. Enter your authorization key to access event controls and editor.
          </p>

          <form id="admin-lock-form" class="admin-lock-form" onsubmit="return false;">
            <div class="lock-field-group">
              <label for="admin-key-input" class="sr-only">Access Key</label>
              <input
                type="password"
                id="admin-key-input"
                class="apple-input lock-key-input"
                placeholder="Enter access key"
                autocomplete="current-password"
                required
              />
            </div>
            <div id="admin-lock-error" class="lock-error-msg" style="display:none;" role="alert"></div>
            <button type="submit" id="btn-admin-unlock" class="btn-apple-primary lock-submit-btn">
              <span>Authorize & Unlock</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div class="admin-lock-footer">
            <a href="#/" class="lock-return-link">← Return to Public Overview</a>
          </div>
        </div>
      </section>
    `;
  }

  // Screen 6B: Admin Screen & Event Editor
  function renderAdminScreen() {
    if (!isAdminAuthenticated()) {
      return renderAdminLockScreen();
    }

    const cur = state.currentEvent || state.events[0];

    return `
      <section class="section-hero">
        <div class="hero-actions-row">
          <div>
            <h1 class="page-title">Event Desk & Editor</h1>
            <p class="page-subhead">
              Authorized administrative workspace. Edit events in memory, regenerate posters, and download updated assets.
            </p>
          </div>
          <div class="action-buttons-wrap">
            <button type="button" id="btn-admin-download-json" class="btn-apple-primary">Download events.json</button>
            <button type="button" id="btn-admin-reset-seeds" class="btn-apple-ghost">Reset to Seeds</button>
            <button type="button" id="btn-admin-lock" class="btn-apple-ghost" style="color:#ff453a; border-color:rgba(255,69,58,0.3);">Lock & Exit Desk</button>
          </div>
        </div>
      </section>

      <div class="admin-layout">
        <!-- Records Roster -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Active Records (${state.events.length})</h2>
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
                  <option value="class" ${cur.type === 'class' ? 'selected' : ''}>class</option>
                  <option value="fest" ${cur.type === 'fest' ? 'selected' : ''}>fest</option>
                  <option value="drive" ${cur.type === 'drive' ? 'selected' : ''}>drive</option>
                </select>
              </div>

              <div class="input-block full-width">
                <label for="admin-name">Event Name</label>
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
                <label for="admin-report">Reporting Time (ISO)</label>
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
                <label for="admin-contact-name">Contact Person</label>
                <input type="text" id="admin-contact-name" class="apple-input" value="${escapeHtml(cur.contactName)}" required>
              </div>

              <div class="input-block">
                <label for="admin-contact-phone">Contact Phone</label>
                <input type="text" id="admin-contact-phone" class="apple-input" value="${escapeHtml(cur.contactPhone)}" required>
              </div>

              <div class="input-block full-width">
                <label for="admin-contact-email">Contact Email</label>
                <input type="email" id="admin-contact-email" class="apple-input" value="${escapeHtml(cur.contactEmail)}" required>
              </div>

              <div class="input-block full-width">
                <label for="admin-tracks">Tracks (One per line)</label>
                <textarea id="admin-tracks" class="apple-textarea" rows="4">${escapeHtml(cur.tracks.join('\n'))}</textarea>
              </div>

              <div class="input-block full-width">
                <label for="admin-note">Academic Leave / Hostel Compliance Note</label>
                <textarea id="admin-note" class="apple-textarea" rows="3">${escapeHtml(cur.note)}</textarea>
              </div>

              <div class="input-block">
                <label for="admin-palette-c1">Palette C1 (Primary Hex)</label>
                <input type="text" id="admin-palette-c1" class="apple-input" value="${escapeHtml(cur.palette.c1)}">
              </div>

              <div class="input-block">
                <label for="admin-palette-c2">Palette C2 (Secondary Hex)</label>
                <input type="text" id="admin-palette-c2" class="apple-input" value="${escapeHtml(cur.palette.c2)}">
              </div>

              <div class="input-block">
                <label for="admin-palette-bg">Palette BG (Background Hex)</label>
                <input type="text" id="admin-palette-bg" class="apple-input" value="${escapeHtml(cur.palette.bg)}">
              </div>

              <div class="input-block">
                <label for="admin-poster">Poster File Path</label>
                <input type="text" id="admin-poster" class="apple-input" value="${escapeHtml(cur.poster)}">
              </div>
            </div>

            <canvas id="admin-poster-canvas" style="display:none;"></canvas>

            <div class="card-actions-row" style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.08);">
              <button type="button" id="btn-admin-save" class="btn-apple-primary">Save Changes</button>
              <button type="button" id="btn-admin-regen-a3" class="btn-apple-secondary">Download A3 Poster (1240x1754)</button>
              <button type="button" id="btn-admin-regen-story" class="btn-apple-ghost">Download Story Poster (1080x1920)</button>
              <a href="#/e/${cur.slug}" class="btn-apple-ghost">Preview Live</a>
            </div>
          </form>
        </div>

        <!-- Paste-in JSON Import -->
        <div class="bento-card">
          <div class="card-header-row">
            <h2 class="card-title">Paste-In JSON Import</h2>
          </div>
          <p class="card-subtext">Paste an array of event objects or a single event record to immediately import into memory.</p>
          <textarea id="admin-paste-json" class="apple-textarea" rows="5" placeholder='[ { "slug": "new-event", "name": "...", ... } ]'></textarea>
          <div style="margin-top:1rem;">
            <button type="button" id="btn-admin-import-json" class="btn-apple-secondary">Validate & Import JSON</button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // ROUTER & NAVIGATION
  // =========================================================================

  function parseRoute() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#/admin')) {
      return { screen: 'admin', slug: null };
    }

    if (hash.startsWith('#/e/')) {
      const parts = hash.slice(4).split('/');
      const slug = parts[0];
      const screen = parts[1] || 'public';
      return { screen, slug };
    }

    return { screen: 'public', slug: null };
  }

  function handleRoute() {
    const { screen, slug } = parseRoute();

    if (slug) {
      const found = state.events.find(ev => ev.slug === slug);
      if (found) {
        state.currentEvent = found;
      } else {
        state.currentEvent = resolveDefaultEvent();
      }
    } else {
      if (!state.currentEvent) {
        state.currentEvent = resolveDefaultEvent();
      }
    }

    state.currentScreen = screen;

    const activeSlug = state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026';
    updateEventSelector();
    updateNavTabs(activeSlug, screen);
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
      mount.innerHTML = renderMailScreen(state.currentEvent);
      bindMailEvents();
    } else if (screen === 'brief') {
      mount.innerHTML = renderBriefScreen(state.currentEvent);
      bindBriefEvents();
    } else {
      mount.innerHTML = renderPublicPage(state.currentEvent);
      bindPublicEvents();
    }

    window.scrollTo(0, 0);
  }

  // Interactive 3D Perspective Tilt for Apple Cards & Devices
  function setup3DTilt(element) {
    if (!element) return;
    element.style.transition = 'transform 0.1s ease-out';
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 8;
      const rotY = (x / (rect.width / 2)) * 8;
      element.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.5s ease-out';
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
        "142 Shortlisted Teams Verified • Gate 1 Sign-in Desk Ready (08:30 IST) • Biometric Attendance Sync Active",
        "1 Gbps Dedicated Campus Lease Line Provisioned Across All Hacking Zones • 24/7 Power Backup Active",
        "Hostel Out-Pass Protocol Approved by Resident Tutors • Verified Convener Hotline Online",
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
        playFuturisticBlip(920);
      };
    });

    // Interactive Competency Track Selection
    document.querySelectorAll('.btn-track-select').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const trackName = btn.getAttribute('data-track');
        state.participant.track = trackName;
        playFuturisticBlip(1080);
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
            playFuturisticBlip(750);
          }
        };
      }
    });

    const btnIcs = document.getElementById('btn-hero-ics');
    if (btnIcs) btnIcs.onclick = () => {
      playFuturisticBlip(880);
      downloadICS(ev);
    };

    const btnShare = document.getElementById('btn-hero-share');
    if (btnShare) btnShare.onclick = () => {
      playFuturisticBlip(880);
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

    if (inputName) inputName.oninput = updateParticipant;
    if (inputCollege) inputCollege.oninput = updateParticipant;
    if (inputReg) inputReg.oninput = updateParticipant;
    if (selectTrack) selectTrack.onchange = updateParticipant;

    const btnDownload = document.getElementById('btn-download-pass');
    if (btnDownload && canvas) {
      btnDownload.onclick = () => {
        renderPassCanvas(canvas, ev, state.participant);
        const link = document.createElement('a');
        link.download = `${ev.slug}-pass-${state.participant.regId}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }

    const btnPrint = document.getElementById('btn-print-pass');
    if (btnPrint) btnPrint.onclick = () => window.print();
  }

  function bindChatEvents() {
    const btnPrint = document.getElementById('btn-print-chat');
    if (btnPrint) btnPrint.onclick = () => window.print();
  }

  function bindMailEvents() {
    const btnPrint = document.getElementById('btn-print-mail');
    if (btnPrint) btnPrint.onclick = () => window.print();

    const btnCopy = document.getElementById('btn-copy-mail');
    if (btnCopy) {
      btnCopy.onclick = () => {
        const bodyElem = document.getElementById('gm-body-content');
        if (bodyElem) {
          navigator.clipboard.writeText(bodyElem.innerText);
          alert('Email text copied to clipboard.');
        }
      };
    }
  }

  function bindBriefEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    const btnCopy = document.getElementById('btn-copy-sentence');
    if (btnCopy) {
      btnCopy.onclick = () => {
        const textElem = document.getElementById('verbal-sentence-target');
        if (textElem) {
          const text = textElem.innerText.replace(/^"|"$/g, '').trim();
          navigator.clipboard.writeText(text);
          btnCopy.textContent = 'Copied to Clipboard';
          setTimeout(() => {
            btnCopy.textContent = 'Copy Verbal Sentence';
          }, 2500);
        }
      };
    }

    const btnPrint = document.getElementById('btn-print-brief');
    if (btnPrint) btnPrint.onclick = () => window.print();

    const btnIcs = document.getElementById('btn-brief-ics');
    if (btnIcs) btnIcs.onclick = () => downloadICS(ev);

    const btnShare = document.getElementById('btn-brief-share');
    if (btnShare) btnShare.onclick = () => shareEventBrief(ev);

    const noteInput = document.getElementById('private-notes-input');
    const noteBtn = document.getElementById('btn-save-note');
    const noteStatus = document.getElementById('note-save-status');

    if (noteBtn && noteInput) {
      noteBtn.onclick = () => {
        state.privateNote = noteInput.value;
        localStorage.setItem('cpd_private_note', state.privateNote);
        if (noteStatus) {
          noteStatus.textContent = 'Saved in local storage';
          setTimeout(() => { noteStatus.textContent = ''; }, 3000);
        }
      };
    }
  }

  function bindAdminEvents() {
    if (!isAdminAuthenticated()) {
      const form = document.getElementById('admin-lock-form');
      const input = document.getElementById('admin-key-input');
      const errorBox = document.getElementById('admin-lock-error');

      const attemptUnlock = () => {
        const val = input ? input.value.trim() : '';
        if (val === 'dumass-dev') {
          setAdminAuthenticated(true);
          const activeSlug = state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026';
          updateNavTabs(activeSlug, 'admin');
          handleRoute();
        } else {
          if (errorBox) {
            errorBox.textContent = 'Invalid authorization key. Access denied.';
            errorBox.style.display = 'block';
            const card = document.querySelector('.admin-lock-card');
            if (card) {
              card.classList.remove('shake-anim');
              void card.offsetWidth;
              card.classList.add('shake-anim');
            }
          }
          if (input) {
            input.value = '';
            input.focus();
          }
        }
      };

      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          attemptUnlock();
        };
      }
      return;
    }

    const btnLock = document.getElementById('btn-admin-lock');
    if (btnLock) {
      btnLock.onclick = () => {
        setAdminAuthenticated(false);
        const activeSlug = state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026';
        updateNavTabs(activeSlug, 'public');
        window.location.hash = `#/e/${activeSlug}`;
      };
    }

    const cur = state.currentEvent || state.events[0];
    const canvas = document.getElementById('admin-poster-canvas');

    document.querySelectorAll('.admin-item-card').forEach(card => {
      card.onclick = () => {
        const slug = card.getAttribute('data-slug');
        const found = state.events.find(ev => ev.slug === slug);
        if (found) {
          state.currentEvent = found;
          handleRoute();
        }
      };
    });

    const btnSave = document.getElementById('btn-admin-save');
    if (btnSave && cur) {
      btnSave.onclick = () => {
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
        cur.contactPhone = document.getElementById('admin-contact-phone').value.trim();
        cur.contactEmail = document.getElementById('admin-contact-email').value.trim();
        cur.note = document.getElementById('admin-note').value.trim();
        cur.tracks = document.getElementById('admin-tracks').value.split('\n').map(t => t.trim()).filter(Boolean);
        cur.palette.c1 = document.getElementById('admin-palette-c1').value.trim();
        cur.palette.c2 = document.getElementById('admin-palette-c2').value.trim();
        cur.palette.bg = document.getElementById('admin-palette-bg').value.trim();
        cur.poster = document.getElementById('admin-poster').value.trim();

        localStorage.setItem('cpd_events_json', JSON.stringify(state.events, null, 2));
        alert('Event updated in memory and localStorage.');
        handleRoute();
      };
    }

    const btnA3 = document.getElementById('btn-admin-regen-a3');
    if (btnA3 && canvas && cur) {
      btnA3.onclick = () => {
        renderPosterCanvas(canvas, cur, 'a3');
        const link = document.createElement('a');
        link.download = `${cur.slug}-a3-poster.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }

    const btnStory = document.getElementById('btn-admin-regen-story');
    if (btnStory && canvas && cur) {
      btnStory.onclick = () => {
        renderPosterCanvas(canvas, cur, 'story');
        const link = document.createElement('a');
        link.download = `${cur.slug}-story-poster.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }

    const btnDownloadJson = document.getElementById('btn-admin-download-json');
    if (btnDownloadJson) {
      btnDownloadJson.onclick = () => {
        const jsonStr = JSON.stringify(state.events, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const link = document.createElement('a');
        link.download = 'events.json';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      };
    }

    const btnReset = document.getElementById('btn-admin-reset-seeds');
    if (btnReset) {
      btnReset.onclick = async () => {
        if (confirm('Reset all changes back to initial seed data?')) {
          localStorage.removeItem('cpd_events_json');
          state.events = [...DEFAULT_EVENTS];
          state.currentEvent = resolveDefaultEvent();
          handleRoute();
        }
      };
    }

    const btnImport = document.getElementById('btn-admin-import-json');
    const pasteInput = document.getElementById('admin-paste-json');
    if (btnImport && pasteInput) {
      btnImport.onclick = () => {
        try {
          const raw = pasteInput.value.trim();
          if (!raw) return;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            state.events = parsed;
          } else if (typeof parsed === 'object') {
            state.events = [parsed];
          }
          localStorage.setItem('cpd_events_json', JSON.stringify(state.events, null, 2));
          state.currentEvent = state.events[0];
          alert('JSON successfully imported into memory.');
          handleRoute();
        } catch (err) {
          alert('Invalid JSON: ' + err.message);
        }
      };
    }
  }

  const globalPrintBtn = document.getElementById('btn-global-print');
  if (globalPrintBtn) {
    globalPrintBtn.onclick = () => window.print();
  }

  // Interactive Ambient Background Particles & Dynamic Cursor Glow
  function initCyberParticles() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(45, Math.floor(window.innerWidth / 28));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(217, 119, 87, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(217, 119, 87, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    window.addEventListener('pointermove', (e) => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });
  }

  // Application Entry Point
  async function init() {
    const path = window.location.pathname;
    if (path.endsWith('/admin') || path.endsWith('/admin/')) {
      const cleanBase = path.replace(/\/admin\/?$/, '');
      window.location.replace((cleanBase || '/') + '#/admin');
      return;
    }

    initCyberParticles();
    initCursorGlow();

    const soundBtn = document.getElementById('btn-sound-toggle');
    const soundLabel = document.getElementById('sound-label');
    if (soundBtn && soundLabel) {
      soundBtn.onclick = () => {
        state.soundEnabled = !state.soundEnabled;
        soundLabel.textContent = state.soundEnabled ? 'Audio: ON' : 'Audio: OFF';
        soundBtn.classList.toggle('active', state.soundEnabled);
        if (state.soundEnabled) playFuturisticBlip(1040);
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
