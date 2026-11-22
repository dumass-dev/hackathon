/**
 * Campus Proof Desk — Core Application Logic & Router
 * Zero external runtime dependencies • Hash Router • Canvas Generators
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
      palette: { c1: "#2997ff", c2: "#f5f5f7", bg: "#000000" },
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
      palette: { c1: "#f56300", c2: "#f5f5f7", bg: "#000000" },
      poster: "posters/build-kernel-kochi.png",
      status: "completed"
    }
  ];

  // Application State
  const state = {
    events: [...DEFAULT_EVENTS],
    currentEvent: null,
    currentScreen: 'public',
    participant: {
      name: 'Rahul Krishna',
      college: 'College of Engineering Trivandrum',
      regId: 'HM-2026-7842',
      track: ''
    },
    chatMessagesMap: {},
    privateNote: localStorage.getItem('cpd_private_note') || ''
  };

  // Preset schedules by event type
  const schedulePresets = {
    hackathon: [
      { day: 'Day 1', time: '08:00 AM', label: 'Gate Opens & Physical Verification', note: 'Gate 1, West Hill campus. Photo ID check and entry slip issue.' },
      { day: 'Day 1', time: '08:30 AM', label: 'Mandatory Reporting & Welcome Kit Desk', note: 'All shortlisted teams must sign the official attendance ledger.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Keynote & Problem Statements Unveiling', note: 'Briefing by IEEE mentors and domain jury members.' },
      { day: 'Day 1', time: '10:30 AM', label: 'Hacking Phase 1 Begins', note: 'Network connectivity and power station allotment.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Working Lunch & Architecture Checkpoint', note: 'Mentors review initial system architecture diagrams.' },
      { day: 'Day 1', time: '04:30 PM', label: 'Mentorship Round 1 (Technical Viability)', note: 'Industry mentors evaluate codebase repositories.' },
      { day: 'Day 1', time: '08:00 PM', label: 'Dinner & Progress Sync', note: 'Dining hall service. Rest zones open for outstation participants.' },
      { day: 'Day 1', time: '11:30 PM', label: 'Midnight Snack & Lightning Code Review', note: 'Night supervision and technical support desk active.' },
      { day: 'Day 2', time: '07:30 AM', label: 'Breakfast & Morning Sprint', note: 'Sprint toward code freeze.' },
      { day: 'Day 2', time: '11:00 AM', label: 'Mentorship Round 2 (Pitch Dry-Run)', note: 'Pitch rehearsals with presentation feedback.' },
      { day: 'Day 2', time: '01:30 PM', label: 'Code Freeze & Final Repository Submission', note: 'Commit hash locked. Working software evaluation required.' },
      { day: 'Day 2', time: '02:30 PM', label: 'Grand Stage Presentations & Jury Deliberation', note: 'Top finalist teams present in the main auditorium.' },
      { day: 'Day 2', time: '05:00 PM', label: 'Valedictory Ceremony & Prize Distribution', note: 'Announcement of winners and presentation of awards.' },
      { day: 'Day 2', time: '06:00 PM', label: 'Event Close & Academic Duty Certificate Desk', note: 'Official stamped duty certificates and hostel attendance slips issued.' }
    ],
    workshop: [
      { day: 'Day 1', time: '09:00 AM', label: 'Reporting & Workstation Allotment', note: 'Registration desk verification and lab system access.' },
      { day: 'Day 1', time: '09:30 AM', label: 'Architecture Overview & Source Walk', note: 'Foundational concepts and kernel internals walkthrough.' },
      { day: 'Day 1', time: '11:30 AM', label: 'Hands-on Module 1: Kernel Compilation', note: 'Building and booting minimal custom kernel images.' },
      { day: 'Day 1', time: '01:00 PM', label: 'Lunch Break & Technical Networking', note: 'Networking session with open-source contributors.' },
      { day: 'Day 1', time: '02:00 PM', label: 'Hands-on Module 2: Device Drivers', note: 'Writing character device drivers and interrupt handling.' },
      { day: 'Day 1', time: '05:00 PM', label: 'Day 1 Sign-off & Homework Sandbox', note: 'Verification of day 1 lab milestones.' },
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
        state.events = await res.json();
      }
    } catch (err) {
      console.error('Failed loading events.json, falling back to static seeds', err);
      state.events = [
        {
          slug: 'hackmalabar-2026',
          type: 'hackathon',
          name: 'HackMalabar 2026',
          edition: 'Edition 3',
          host: 'IEEE Student Branch NIT Calicut',
          support: 'Kerala Startup Mission (KSUM)',
          venue: 'Government Engineering College Kozhikode, West Hill, Kozhikode, Kerala 673005',
          district: 'Kozhikode',
          mapsQuery: 'Government Engineering College Kozhikode',
          start: '2026-11-27T08:30:00+05:30',
          end: '2026-11-28T18:00:00+05:30',
          report: '2026-11-27T08:30:00+05:30',
          close: '2026-11-28T18:00:00+05:30',
          deadline: '2026-11-24T23:59:00+05:30',
          contactName: 'Arjun V. Nair',
          contactPhone: '+91 94471 28392',
          contactEmail: 'convener.hackmalabar@gmail.com',
          site: 'https://hackmalabar.in',
          prize: '₹1,00,000 Cash Pool (First: ₹50,000 | Second: ₹30,000 | Third: ₹20,000)',
          fee: 'Free registration for shortlisted student teams',
          tracks: [
            'AI & Intelligent Automation',
            'Cybersecurity & Campus Privacy',
            'GovTech & Citizen Services',
            'FinTech & Financial Inclusion',
            'Open Innovation for Local Impact'
          ],
          people: [
            { name: 'Arjun V. Nair', role: 'Lead Convener (IEEE SB)' },
            { name: 'Dr. Sreela N.', role: 'Faculty Coordinator & HoD CSE' },
            { name: 'Fahad Mansoor', role: 'Logistics & Hostel NOC Lead' },
            { name: 'Ananya P.', role: 'Participant Support & Helpdesk' }
          ],
          note: 'Approved regional collegiate hackathon recognized by KSUM innovation council. Participant attendance certificates issued for academic duty leave and residential hostel attendance reconciliation.',
          palette: { c1: '#2997ff', c2: '#f5f5f7', bg: '#000000' },
          poster: 'posters/hackmalabar-2026.png',
          status: 'upcoming'
        }
      ];
    }
  }

  // Determine root event (next upcoming, or most recent)
  function resolveDefaultEvent() {
    if (!state.events || state.events.length === 0) return null;
    const now = new Date();
    // Sort upcoming events ascending
    const upcoming = state.events
      .filter(ev => ev.status === 'upcoming' || new Date(ev.start) >= now)
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    if (upcoming.length > 0) {
      return upcoming[0];
    }
    // Otherwise most recent completed event
    const sorted = [...state.events].sort((a, b) => new Date(b.start) - new Date(a.start));
    return sorted[0];
  }

  // Apply per-event palette custom properties
  function applyEventPalette(event) {
    const wrapper = document.getElementById('app-wrapper');
    if (!wrapper || !event || !event.palette) return;

    wrapper.style.setProperty('--c1', event.palette.c1);
    wrapper.style.setProperty('--c2', event.palette.c2);
    wrapper.style.setProperty('--bg', event.palette.bg);
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

  // Update navigation tabs hrefs
  function updateNavTabs(currentSlug, currentScreen) {
    const nav = document.getElementById('nav-tabs-container');
    if (!nav) return;

    const baseSlug = currentSlug || (state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026');

    nav.innerHTML = `
      <a href="#/e/${baseSlug}" class="tab-link ${currentScreen === 'public' ? 'active' : ''}" data-screen="public">🏛️ Public Page</a>
      <a href="#/e/${baseSlug}/pass" class="tab-link ${currentScreen === 'pass' ? 'active' : ''}" data-screen="pass">🎫 Participant Pass</a>
      <a href="#/e/${baseSlug}/chat" class="tab-link ${currentScreen === 'chat' ? 'active' : ''}" data-screen="chat">💬 Organisers Chat</a>
      <a href="#/e/${baseSlug}/mail" class="tab-link ${currentScreen === 'mail' ? 'active' : ''}" data-screen="mail">✉️ Selection Mail</a>
      <a href="#/e/${baseSlug}/brief" class="tab-link ${currentScreen === 'brief' ? 'active' : ''}" data-screen="brief">📋 Leave Brief</a>
      <a href="#/admin" class="tab-link ${currentScreen === 'admin' ? 'active' : ''}" data-screen="admin">⚙️ Event Desk</a>
    `;
  }

  // Update footer
  function updateFooter(event) {
    const mount = document.getElementById('footer-mount');
    if (!mount) return;

    if (!event) {
      mount.innerHTML = `<div class="footer-contact"><strong>Campus Proof Desk</strong> — Open Verified Event Engine.</div>`;
      return;
    }

    mount.innerHTML = `
      <div class="footer-contact">
        <p><strong>${escapeHtml(event.name)}</strong> (${escapeHtml(event.edition)})</p>
        <p>Host: ${escapeHtml(event.host)} • Supported by ${escapeHtml(event.support)}</p>
        <p>Convenor: <strong>${escapeHtml(event.contactName)}</strong> | Phone: <a href="tel:${escapeHtml(event.contactPhone.replace(/\s+/g, ''))}">${escapeHtml(event.contactPhone)}</a> | Email: <a href="mailto:${escapeHtml(event.contactEmail)}">${escapeHtml(event.contactEmail)}</a></p>
        <p>Official Portal: <a href="${escapeHtml(event.site)}" target="_blank" rel="noopener">${escapeHtml(event.site)}</a> | Registration Deadline: ${escapeHtml(event.deadline.slice(0, 10))} 23:59 IST</p>
      </div>
      <div>
        <p style="font-size:0.75rem; color:#64748b; margin-bottom: 0.35rem;">Campus Proof Desk • Zero runtime npm dependencies • Hash-routed</p>
        <a href="#/admin" class="btn btn-secondary" style="font-size:0.75rem; padding: 0.3rem 0.6rem; min-height: 28px;">Discreet Admin Desk</a>
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
      text: `Official Event Presence & Leave Brief: ${event.name} (${event.edition}) at ${event.venue}. Reporting: ${formatTime(event.report)} on ${event.start.slice(0, 10)}. Convenor: ${event.contactName} (${event.contactPhone}).`,
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

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareData.text}\nDirect Link: ${shareData.url}`);
      alert('Event presence and verification link copied to clipboard!');
    } catch (err) {
      alert(`Event URL: ${window.location.href}`);
    }
  }

  // =========================================================================
  // Canvas Generator: Participant Pass (400x560) — Apple Wallet Aesthetic
  // =========================================================================
  function renderPassCanvas(canvas, event, participant) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 400;
    const h = 560;

    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = '#d1d1d6';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Header bar
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(2, 2, w - 4, 96);

    // Accent line
    ctx.fillStyle = event.palette ? event.palette.c1 : '#2997ff';
    ctx.fillRect(2, 98, w - 4, 4);

    // Event Type pill badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(28, 25, 10, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.arc(120, 25, 10, (Math.PI * 3) / 2, Math.PI / 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.type.toUpperCase()} PASS`, 34, 29);

    // Event title & edition
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(event.name, 18, 58);
    ctx.fillStyle = '#8e8e93';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.edition} • ${event.host}`, 18, 78);

    // Participant Details Card
    ctx.fillStyle = '#f2f2f7';
    ctx.fillRect(16, 120, w - 32, 130);
    ctx.strokeStyle = '#e5e5ea';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 120, w - 32, 130);

    // Participant Initials Avatar
    ctx.fillStyle = '#1c1c1e';
    ctx.beginPath();
    ctx.arc(52, 165, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    const initials = participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK';
    ctx.fillText(initials, 52, 171);
    ctx.textAlign = 'left';

    // Name & College
    ctx.fillStyle = '#1c1c1e';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.name, 90, 155);
    ctx.fillStyle = '#636366';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(participant.college, 90, 175);
    ctx.fillStyle = '#8e8e93';
    ctx.font = '11px monospace';
    ctx.fillText(`ID: ${participant.regId}`, 90, 195);
    ctx.fillStyle = '#0071e3';
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Track: ${participant.track || event.tracks[0]}`, 90, 215);

    // Logistics & Venue Meta
    ctx.fillStyle = '#8e8e93';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('REPORTING TIME & DATE', 20, 275);
    ctx.fillStyle = '#1c1c1e';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${formatTime(event.report)} IST, ${formatDateNatural(event.start)}`, 20, 293);

    ctx.fillStyle = '#8e8e93';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('GATE NUMBER & VENUE', 20, 320);
    ctx.fillStyle = '#1c1c1e';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    const venueWords = event.venue.split(', ');
    ctx.fillText(`Gate 1 (Main Entrance), ${venueWords[0]}`, 20, 338);
    if (venueWords.length > 1) {
      ctx.fillText(venueWords.slice(1).join(', '), 20, 354);
    }

    // QR & Verification Box
    ctx.fillStyle = '#f2f2f7';
    ctx.fillRect(16, 380, w - 32, 90);
    ctx.strokeStyle = '#e5e5ea';
    ctx.strokeRect(16, 380, w - 32, 90);

    // QR pattern
    ctx.fillStyle = '#000000';
    ctx.fillRect(28, 390, 70, 70);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(32, 394, 62, 62);
    ctx.fillStyle = '#000000';
    for (let rx = 36; rx < 90; rx += 8) {
      for (let ry = 38; ry < 90; ry += 8) {
        if ((rx + ry) % 16 === 0 || (rx < 55 && ry < 55) || (rx > 70 && ry > 70)) {
          ctx.fillRect(rx, ry, 6, 6);
        }
      }
    }

    ctx.fillStyle = '#1c1c1e';
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('OFFICIAL LIVE VERIFICATION', 110, 408);
    ctx.fillStyle = '#636366';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('Scan to inspect real-time schedule,', 110, 426);
    ctx.fillText('hostel permission brief and NOC record.', 110, 442);
    ctx.fillStyle = '#0071e3';
    ctx.font = '600 10px monospace';
    ctx.fillText(`campusproofdesk.in/#/e/${event.slug}`, 110, 458);

    // Non-transferable Notice
    ctx.fillStyle = '#f2f2f7';
    ctx.fillRect(16, 485, w - 32, 24);
    ctx.fillStyle = '#636366';
    ctx.font = '600 9px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NON-TRANSFERABLE • MUST CARRY ORIGINAL INSTITUTION PHOTO ID', w / 2, 500);
    ctx.textAlign = 'left';

    // Signatory footer
    ctx.fillStyle = '#8e8e93';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Authorized by: ${event.contactName} (${event.people[0] ? event.people[0].role : 'Convener'})`, 20, 532);
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

    // Apple Obsidian Pure Black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Subtle header surface
    ctx.fillStyle = '#161617';
    ctx.fillRect(50, 40, w - 100, 75);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 40, w - 100, 75);

    ctx.fillStyle = '#a1a1a6';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${event.host.toUpperCase()}  •  SUPPORTED BY ${event.support.toUpperCase()}`, 75, 84);

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
  // VIEW RENDERERS
  // =========================================================================

  // Screen 1: Public Event Page
  function renderPublicPage(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const closeFormatted = formatTime(event.close);
    const scheduleItems = schedulePresets[event.type] || schedulePresets.hackathon;

    return `
      <section class="hero-card" aria-label="Event Overview">
        <div class="hero-badges">
          <span class="badge badge-type">${escapeHtml(event.type)}</span>
          <span class="badge badge-status ${event.status === 'completed' ? 'completed' : ''}">
            ${event.status === 'upcoming' ? '● Upcoming • Active Presence' : '✓ Completed Archive'}
          </span>
          <span class="badge" style="background:#1e293b; color:#cbd5e1;">${escapeHtml(event.edition)}</span>
        </div>

        <h2 class="hero-title">${escapeHtml(event.name)}</h2>
        <p class="hero-host-strip">
          Organised by <strong>${escapeHtml(event.host)}</strong> • Endorsed & Supported by <strong>${escapeHtml(event.support)}</strong>
        </p>

        <div class="hero-meta-grid">
          <div class="hero-meta-item">
            <span class="hero-meta-icon" aria-hidden="true">📅</span>
            <div>
              <div class="hero-meta-label">Dates</div>
              <div class="hero-meta-val">${datesFormatted}</div>
            </div>
          </div>
          <div class="hero-meta-item">
            <span class="hero-meta-icon" aria-hidden="true">⏰</span>
            <div>
              <div class="hero-meta-label">Reporting & Close</div>
              <div class="hero-meta-val">${reportFormatted} (Close: ${closeFormatted})</div>
            </div>
          </div>
          <div class="hero-meta-item">
            <span class="hero-meta-icon" aria-hidden="true">📍</span>
            <div>
              <div class="hero-meta-label">District & Venue</div>
              <div class="hero-meta-val">${escapeHtml(event.district)} (${escapeHtml(event.venue.split(',')[0])})</div>
            </div>
          </div>
          <div class="hero-meta-item">
            <span class="hero-meta-icon" aria-hidden="true">🏆</span>
            <div>
              <div class="hero-meta-label">Prize Pool / Merit</div>
              <div class="hero-meta-val">${escapeHtml(event.prize.split('(')[0].trim())}</div>
            </div>
          </div>
        </div>

        <div class="hero-cta-group">
          <a href="#/e/${event.slug}/pass" class="btn btn-primary">🎫 Generate Participant Pass</a>
          <a href="#/e/${event.slug}/brief" class="btn btn-accent">📋 Hostel Leave Brief</a>
          <a href="#/e/${event.slug}/chat" class="btn btn-secondary">💬 Organisers Chat</a>
          <button type="button" id="btn-hero-ics" class="btn btn-outline">📅 Add to Calendar (.ics)</button>
          <button type="button" id="btn-hero-share" class="btn btn-outline">🔗 Share Evidence</button>
        </div>
      </section>

      <div class="layout-split">
        <!-- Main Column -->
        <div class="main-column">
          <!-- About & Duty Leave Recognition -->
          <article class="content-card">
            <h3 class="content-card-title">
              <span>Institutional Scope & Duty Leave Notice</span>
              <span class="badge badge-status" style="font-size:0.7rem;">Official Verification</span>
            </h3>
            <div class="prose">
              <p>${escapeHtml(event.note)}</p>
              <p style="margin-top:0.75rem;">
                Hostel wardens, Resident Tutors (RTs), and Heads of Department (HODs) can cross-reference participant credentials using this dedicated presence desk. All sessions include strict biometric or physical roll attendance logs.
              </p>
            </div>
          </article>

          <!-- Competency Tracks -->
          <section class="content-card" aria-label="Official Competency Tracks">
            <h3 class="content-card-title">Official Competency Tracks</h3>
            <div class="tracks-grid">
              ${event.tracks.map((track, i) => `
                <div class="track-item">
                  <div class="track-number">Track 0${i + 1}</div>
                  <div class="track-title">${escapeHtml(track)}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Schedule Table -->
          <section class="content-card" aria-label="Full Event Schedule">
            <h3 class="content-card-title">
              <span>Full Chronological Schedule</span>
              <span style="font-size:0.8rem; font-weight:normal; color:#94a3b8;">Preset: ${escapeHtml(event.type.toUpperCase())}</span>
            </h3>
            <div class="schedule-table-wrap">
              <table class="schedule-table">
                <thead>
                  <tr>
                    <th scope="col" style="width: 15%;">Period</th>
                    <th scope="col" style="width: 20%;">Time (IST)</th>
                    <th scope="col">Session & Protocol Milestones</th>
                  </tr>
                </thead>
                <tbody>
                  ${scheduleItems.map(item => `
                    <tr>
                      <td style="font-weight:700; color:#94a3b8;">${escapeHtml(item.day)}</td>
                      <td class="schedule-time">${escapeHtml(item.time)}</td>
                      <td class="schedule-activity">
                        <strong>${escapeHtml(item.label)}</strong>
                        <span>${escapeHtml(item.note)}</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>

          <!-- Prize Breakdown -->
          <section class="content-card" aria-label="Prize Pool & Merit Breakdown">
            <h3 class="content-card-title">Prize Breakdown & Recognition</h3>
            <div class="prize-banner">
              <div class="prize-title">Total Cash Prize Pool</div>
              <div class="prize-desc"><strong>${escapeHtml(event.prize)}</strong></div>
              <div style="font-size:0.82rem; color:#cbd5e1; margin-top:0.5rem;">
                Registration Fee: <strong>${escapeHtml(event.fee)}</strong>. All verified participants receive IEEE SB accredited certificates of completion for academic repository credits.
              </div>
            </div>
          </section>

          <!-- Venue & Embedded Map -->
          <section class="content-card" aria-label="Venue and Location Map">
            <h3 class="content-card-title">Venue Location & Transit Access</h3>
            <p class="prose" style="margin-bottom:0.75rem;">
              <strong>${escapeHtml(event.venue)}</strong> (${escapeHtml(event.district)} District)
            </p>
            <div class="map-container">
              <iframe
                title="Map of ${escapeHtml(event.venue)}"
                src="https://maps.google.com/maps?q=${encodeURIComponent(event.mapsQuery)}&output=embed"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <span style="font-size:0.8rem; color:#94a3b8;">Reporting Gate: Gate 1 facing NH 66 bypass, West Hill.</span>
              <a href="https://maps.google.com/?q=${encodeURIComponent(event.venue)}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size:0.8rem; padding:0.35rem 0.75rem;">
                📍 Open in Google Maps
              </a>
            </div>
          </section>

          <!-- FAQ Accordion -->
          <section class="content-card" aria-label="Frequently Asked Questions">
            <h3 class="content-card-title">Hostel Leave & Participant FAQ</h3>
            <div class="faq-list">
              <div class="faq-item">
                <div class="faq-q">How do I prove my attendance to my hostel warden or Resident Tutor?</div>
                <div class="faq-a">Submit your official Participant Pass and Selection Mail, supported by the verbal script in our Leave Brief screen. Registration Desk 3 issues physical signed duty attendance endorsements before closing.</div>
              </div>
              <div class="faq-item">
                <div class="faq-q">What are the mandatory reporting and gate cutoff hours?</div>
                <div class="faq-a">Reporting begins at 08:00 AM on ${datesFormatted.split('–')[0].trim()} with mandatory attendance sign-in at ${reportFormatted} IST. Gate 1 closes strictly at ${closeFormatted} on the final day.</div>
              </div>
              <div class="faq-item">
                <div class="faq-q">Is overnight stay provided for outstation participants?</div>
                <div class="faq-a">Yes. Continuous overnight hacking and workshop labs are accommodated inside the air-conditioned auditorium with designated rest zones, mattresses, and secure supervision.</div>
              </div>
              <div class="faq-item">
                <div class="faq-q">What items must I bring for gate security clearance?</div>
                <div class="faq-a">You must carry your personal laptop, labeled extension power strip, original institutional photo ID card, and a printed or digital copy of your Participant Pass.</div>
              </div>
            </div>
          </section>

          <!-- Organising Committee -->
          <section class="content-card" aria-label="Organising Committee">
            <h3 class="content-card-title">Organising Committee & Duty NOC Authorities</h3>
            <div class="committee-grid">
              ${event.people.map(p => `
                <div class="committee-member">
                  <div class="committee-name">${escapeHtml(p.name)}</div>
                  <div class="committee-role">${escapeHtml(p.role)}</div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Right Rail -->
        <aside class="side-column">
          <!-- Poster Preview Card -->
          <div class="poster-card">
            <h3 class="content-card-title">Official Event Poster</h3>
            <img src="${escapeHtml(event.poster)}" alt="Official event poster for ${escapeHtml(event.name)}" class="poster-preview-img" id="hero-poster-img">
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <a href="${escapeHtml(event.poster)}" download="${event.slug}-poster.png" class="btn btn-primary" style="width:100%;">
                📥 Download A3 Poster (PNG)
              </a>
              <a href="#/e/${event.slug}/pass" class="btn btn-secondary" style="width:100%;">
                🎫 Create My Verified Pass
              </a>
            </div>
          </div>

          <!-- Leave Proof Dossier Quick Box -->
          <div class="proof-desk-box">
            <h3>📋 Hostel Leave Dossier Kit</h3>
            <p>Assemble and present your documentary evidence in this exact order to secure your hostel out-pass:</p>
            <div class="proof-links">
              <a href="#/e/${event.slug}/mail" class="proof-link-item">
                <span>1. Official Selection Mail</span>
                <span>✉️</span>
              </a>
              <a href="#/e/${event.slug}/pass" class="proof-link-item">
                <span>2. Participant Photo Pass</span>
                <span>🎫</span>
              </a>
              <a href="#/e/${event.slug}/chat" class="proof-link-item">
                <span>3. Organisers Group Chat</span>
                <span>💬</span>
              </a>
              <a href="#/e/${event.slug}/brief" class="proof-link-item">
                <span>4. Warden Leave Brief & Script</span>
                <span>📋</span>
              </a>
            </div>
          </div>

          <!-- Warden Verification Direct Card -->
          <div class="content-card" style="border-left: 3px solid #38bdf8;">
            <h4 style="font-size:0.95rem; color:#ffffff; margin-bottom:0.4rem;">Warden Phone Verification</h4>
            <p style="font-size:0.84rem; color:#94a3b8; margin-bottom:0.6rem;">
              If your hostel warden or RT requires verbal telephonic confirmation:
            </p>
            <div style="background:rgba(0,0,0,0.3); padding:0.6rem 0.8rem; border-radius:6px; font-size:0.85rem;">
              <div>Convenor: <strong>${escapeHtml(event.contactName)}</strong></div>
              <div>Direct: <a href="tel:${escapeHtml(event.contactPhone.replace(/\s+/g, ''))}"><strong>${escapeHtml(event.contactPhone)}</strong></a></div>
              <div>Desk: <a href="mailto:${escapeHtml(event.contactEmail)}">${escapeHtml(event.contactEmail)}</a></div>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  // Screen 2: Participant Pass Generator
  function renderPassScreen(event) {
    const reportFormatted = formatTime(event.report);
    const startDate = event.start.slice(0, 10);
    const p = state.participant;
    const selectedTrack = p.track || event.tracks[0];

    return `
      <div class="content-card" style="margin-bottom:1.25rem;">
        <h2 style="font-size:1.4rem; font-weight:800; color:#ffffff; margin-bottom:0.3rem;">
          Participant Pass Generator & 100x140mm Print Layout
        </h2>
        <p style="color:#94a3b8; font-size:0.9rem;">
          Enter your name and institution. The pass is rendered in real-time onto an HTML5 canvas and formatted for exact 100x140mm print compliance. Non-transferable with QR code deep-linking to this verified record.
        </p>
      </div>

      <div class="pass-screen-wrap">
        <!-- Controls Column -->
        <div class="pass-controls-col">
          <div class="content-card">
            <h3 class="content-card-title">Participant Identity Details</h3>
            <form id="pass-form" onsubmit="return false;" style="display:flex; flex-direction:column; gap:1rem;">
              <div class="form-group">
                <label for="pass-input-name">Full Name (As on College ID)</label>
                <input type="text" id="pass-input-name" class="form-control" value="${escapeHtml(p.name)}" required>
              </div>

              <div class="form-group">
                <label for="pass-input-college">Institution / College Name</label>
                <input type="text" id="pass-input-college" class="form-control" value="${escapeHtml(p.college)}" required>
              </div>

              <div class="form-group">
                <label for="pass-input-reg">Registration / Team Ref ID</label>
                <input type="text" id="pass-input-reg" class="form-control" value="${escapeHtml(p.regId)}" required>
              </div>

              <div class="form-group">
                <label for="pass-select-track">Assigned Track</label>
                <select id="pass-select-track" class="form-control">
                  ${event.tracks.map(t => `<option value="${escapeHtml(t)}" ${t === selectedTrack ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
                </select>
              </div>

              <div style="display:flex; flex-direction:column; gap:0.6rem; margin-top:0.5rem;">
                <button type="button" id="btn-download-pass" class="btn btn-primary" style="width:100%;">
                  📥 Download Pass as Image (PNG)
                </button>
                <button type="button" id="btn-print-pass" class="btn btn-accent" style="width:100%;">
                  🖨️ Print Pass (100x140mm Clean A4)
                </button>
                <a href="#/e/${event.slug}/brief" class="btn btn-secondary" style="width:100%;">
                  📋 Proceed to Leave Brief
                </a>
              </div>
            </form>
          </div>
        </div>

        <!-- Preview Column -->
        <div class="pass-preview-col">
          <div class="pass-card-container">
            <!-- Canvas for PNG Export -->
            <canvas id="pass-render-canvas" style="display:none;"></canvas>

            <!-- Printable HTML DOM Ticket -->
            <div class="pass-ticket" id="pass-ticket-dom">
              <div class="pass-header">
                <div class="pass-event-badge">${escapeHtml(event.type)} PASS</div>
                <div class="pass-event-name">${escapeHtml(event.name)}</div>
                <div class="pass-event-edition">${escapeHtml(event.edition)} • ${escapeHtml(event.host)}</div>
              </div>

              <div class="pass-body">
                <div class="pass-participant-row">
                  <div class="pass-avatar" id="pass-dom-avatar">
                    ${escapeHtml(p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'RK')}
                  </div>
                  <div class="pass-p-details">
                    <div class="pass-p-name" id="pass-dom-name">${escapeHtml(p.name)}</div>
                    <div class="pass-p-college" id="pass-dom-college">${escapeHtml(p.college)}</div>
                    <div class="pass-p-id" id="pass-dom-id">ID: ${escapeHtml(p.regId)}</div>
                  </div>
                </div>

                <div class="pass-meta-grid">
                  <div>
                    <div class="pass-meta-label">Reporting Time</div>
                    <div class="pass-meta-val">${reportFormatted} IST</div>
                  </div>
                  <div>
                    <div class="pass-meta-label">Date of Entry</div>
                    <div class="pass-meta-val">${formatDateNatural(event.start)}</div>
                  </div>
                  <div>
                    <div class="pass-meta-label">Gate Access</div>
                    <div class="pass-meta-val">Gate 1 (West Hill)</div>
                  </div>
                  <div>
                    <div class="pass-meta-label">Competency Track</div>
                    <div class="pass-meta-val" id="pass-dom-track">${escapeHtml(selectedTrack)}</div>
                  </div>
                </div>

                <div class="pass-qr-strip">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + window.location.pathname + '#/e/' + event.slug)}"
                    alt="QR Verification link for ${escapeHtml(event.name)}"
                    class="pass-qr-img"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22black%22/><text x=%2250%22 y=%2255%22 fill=%22white%22 text-anchor=%22middle%22 font-size=%2214%22>QR CODE</text></svg>'"
                  >
                  <div class="pass-qr-desc">
                    <strong>Official Live Verification</strong>
                    Scan to inspect real-time schedule, hostel permission brief and verified NOC records.
                  </div>
                </div>

                <div class="pass-disclaimer">
                  Non-transferable • Must present institutional photo ID at Gate 1
                </div>

                <div class="pass-footer-sign">
                  <div>
                    <span>Authorized Signatory:</span><br>
                    <span class="pass-sign-authority">${escapeHtml(event.contactName)}</span> (${escapeHtml(event.people[0] ? event.people[0].role : 'Convener')})
                  </div>
                  <div style="text-align:right;">
                    <span>Emergency NOC Desk:</span><br>
                    <span class="pass-sign-authority">${escapeHtml(event.contactPhone)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Screen 3: WhatsApp-Faithful Dark UI Organisers Chat
  function renderChatScreen(event) {
    const messages = generateChatMessages(event);
    const day1Messages = messages.filter(m => m.day === 1);
    const day2Messages = messages.filter(m => m.day === 2);

    return `
      <div class="content-card" style="margin-bottom:1.25rem;">
        <h2 style="font-size:1.4rem; font-weight:800; color:#ffffff; margin-bottom:0.3rem;">
          Official Organisers WhatsApp Coordination Chat
        </h2>
        <p style="color:#94a3b8; font-size:0.9rem;">
          WhatsApp-faithful dark UI in pure HTML/CSS. 20 real-time chronological messages spanning 2 days covering shortlist announcement, 08:30 AM reporting, Gate 1 directions, Malappuram transit connections, overnight stay rules, and original college ID requirements.
        </p>
        <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
          <button type="button" id="btn-print-chat" class="btn btn-secondary">🖨️ Print Chat Transcript</button>
          <a href="#/e/${event.slug}/mail" class="btn btn-primary">✉️ View Selection Mail</a>
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
          <div class="wa-header-icons" aria-hidden="true">
            <span>📹</span>
            <span>📞</span>
            <span>⋮</span>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div class="wa-messages-area" id="wa-messages-scroll">
          <!-- Encryption Banner -->
          <div class="wa-enc-banner">
            🔒 Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
          </div>

          <!-- Day 1 Divider -->
          <div class="wa-date-divider">
            <span class="wa-date-pill">21 NOVEMBER 2026</span>
          </div>

          ${day1Messages.map(msg => renderChatMessage(msg)).join('')}

          <!-- Day 2 Divider -->
          <div class="wa-date-divider">
            <span class="wa-date-pill">22 NOVEMBER 2026</span>
          </div>

          ${day2Messages.map(msg => renderChatMessage(msg)).join('')}
        </div>

        <!-- WhatsApp Input Strip -->
        <div class="wa-input-strip">
          <input type="text" id="wa-quick-input" placeholder="Message shortlisted teams and convener..." readonly value="Logistical helpdesk active: ${escapeHtml(event.contactPhone)}">
          <button type="button" class="btn btn-accent" style="padding:0.4rem 0.75rem; min-height:34px;" title="Send">
            ➤
          </button>
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

  // Screen 4: Selection Mail (Gmail-Faithful UI)
  function renderMailScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const startDate = event.start.slice(0, 10);
    const p = state.participant;

    return `
      <div class="content-card" style="margin-bottom:1.25rem;">
        <h2 style="font-size:1.4rem; font-weight:800; color:#ffffff; margin-bottom:0.3rem;">
          Official Selection & Shortlist Confirmation Mail
        </h2>
        <p style="color:#94a3b8; font-size:0.9rem;">
          Gmail-faithful desktop & mobile interface. Displays official shortlist credentials, security stamps, reporting schedule, venue instructions, and direct Participant Pass linkage for hostel submission.
        </p>
        <div style="display:flex; gap:0.5rem; margin-top:0.75rem; flex-wrap:wrap;">
          <button type="button" id="btn-print-mail" class="btn btn-secondary">🖨️ Print Clean Letterhead (A4)</button>
          <button type="button" id="btn-copy-mail" class="btn btn-outline">📋 Copy Email Body</button>
          <a href="#/e/${event.slug}/pass" class="btn btn-primary">🎫 Open Participant Pass</a>
        </div>
      </div>

      <div class="gm-container">
        <!-- Gmail Toolbar -->
        <div class="gm-toolbar">
          <div class="gm-toolbar-icons">
            <span title="Back">←</span>
            <span title="Archive">📥</span>
            <span title="Report spam">⚠️</span>
            <span title="Delete">🗑️</span>
            <span title="Mark unread">✉️</span>
            <span title="Snooze">⏱️</span>
            <span title="Add task">✓</span>
          </div>
          <div>
            <span style="font-size:0.8rem; color:#64748b;">1 of 12</span>
          </div>
        </div>

        <!-- Subject Header -->
        <div class="gm-subject-header">
          <h1 class="gm-subject-title">
            Official Selection Confirmation: Shortlisted for ${escapeHtml(event.name)} (${escapeHtml(event.edition)})
          </h1>
          <span class="gm-subject-tags">Inbox</span>
          <span class="gm-subject-tags" style="background:#e0f2fe; color:#0369a1;">Academic NOC</span>
        </div>

        <!-- Sender Row -->
        <div class="gm-sender-row">
          <div class="gm-sender-meta">
            <div class="gm-avatar" aria-hidden="true">${escapeHtml(event.contactName[0])}</div>
            <div>
              <div class="gm-sender-name">${escapeHtml(event.contactName)} • ${escapeHtml(event.host)}</div>
              <div class="gm-sender-email">&lt;${escapeHtml(event.contactEmail)}&gt;</div>
              <div class="gm-to-me">to me &lt;${escapeHtml(p.name.toLowerCase().replace(/\s+/g, '.'))}@cet.ac.in&gt;</div>
            </div>
          </div>
          <div class="gm-date">
            Nov 21, 2026, 4:15 PM (3 hours ago)
          </div>
        </div>

        <!-- Security stamps -->
        <div class="gm-security-details">
          <div>mailed-by: <strong>gmail.com</strong></div>
          <div>signed-by: <strong>${escapeHtml(extractHostname(event.site))}</strong></div>
          <div>security: <strong>Standard encryption (TLS)</strong></div>
        </div>

        <!-- Email Body -->
        <div class="gm-body" id="gm-body-content">
          <p>Dear <strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.college)}),</p>

          <p>
            Congratulations! On behalf of the organising committee of <strong>${escapeHtml(event.name)} (${escapeHtml(event.edition)})</strong>, we are delighted to inform you that your registration and project abstract have been officially <strong>SHORTLISTED</strong> for the physical programme.
          </p>

          <div class="gm-highlight-card">
            <h3 style="font-size:1rem; font-weight:700; color:#0f172a; margin-bottom:0.6rem;">Confirmed Programme Milestones:</h3>
            <ul>
              <li><strong>Event Title:</strong> ${escapeHtml(event.name)} (${escapeHtml(event.edition)})</li>
              <li><strong>Organising Body:</strong> ${escapeHtml(event.host)}</li>
              <li><strong>Institutional Support:</strong> ${escapeHtml(event.support)}</li>
              <li><strong>Dates:</strong> ${datesFormatted}</li>
              <li><strong>Reporting Schedule:</strong> ${reportFormatted} IST on ${formatDateNatural(event.start)} (Gate closes ${formatTime(event.close)} IST)</li>
              <li><strong>Venue Address:</strong> ${escapeHtml(event.venue)}</li>
              <li><strong>Access Gate:</strong> Gate 1 (Main Entrance facing NH 66 bypass, West Hill)</li>
            </ul>
          </div>

          <div class="gm-pass-btn-wrap">
            <a href="#/e/${event.slug}/pass" class="gm-pass-btn">
              Generate & Download Verified Participant Pass
            </a>
          </div>

          <p>
            <strong>Hostel & Academic Leave Instructions:</strong><br>
            Please produce a printed copy of this email along with your Participant Pass to your Head of Department (HOD) and Hostel Warden. Official institutional attendance and academic duty leave (OD) certificates will be countersigned and stamped at Desk 3 before programme conclusion.
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

        <!-- Gmail Reply Bar -->
        <div class="gm-reply-bar">
          <button type="button" class="btn btn-outline" style="color:#475569; border-color:#cbd5e1;">↩ Reply</button>
          <button type="button" class="btn btn-outline" style="color:#475569; border-color:#cbd5e1;">⤅ Forward</button>
        </div>
      </div>
    `;
  }

  // Screen 5: Leave Brief & Hostel Permission Dossier
  function renderBriefScreen(event) {
    const datesFormatted = formatDateRange(event.start, event.end);
    const reportFormatted = formatTime(event.report);
    const startDate = event.start.slice(0, 10);
    const p = state.participant;

    const verbalSentence = `Respected Warden / HOD, I have been officially shortlisted to represent our college at ${event.name} organised by ${event.host} and supported by ${event.support} at ${event.venue} from ${datesFormatted}; mandatory reporting is at ${reportFormatted} IST on ${formatDateNatural(event.start)}, and official duty attendance certificates will be countersigned and submitted upon my return.`;

    return `
      <div class="brief-container">
        <!-- Hero Box -->
        <div class="brief-hero-box">
          <h2 class="brief-hero-title">Hostel Leave Request & Warden Briefing Desk</h2>
          <p style="font-size:0.9rem; color:#cbd5e1;">
            Designed specifically for hostel residents. Gives you the exact sentence to recite to the Warden, phone scripts for parents and faculty, the precise order to present evidence, and instant download/share tools.
          </p>
        </div>

        <!-- The Exact Sentence to Say -->
        <div class="content-card" style="border-left: 4px solid #38bdf8;">
          <h3 style="font-size:1.1rem; color:#ffffff; margin-bottom:0.4rem;">
            🗣️ The Exact Sentence to Say to Warden / HOD
          </h3>
          <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.75rem;">
            Recite this verbatim when submitting your leave slip. It addresses institution, legitimacy, dates, reporting time, and proof of return in one breath:
          </p>

          <div class="verbal-sentence-box">
            <div class="verbal-sentence-text" id="verbal-sentence-target">
              "${verbalSentence}"
            </div>
          </div>

          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button type="button" id="btn-copy-sentence" class="btn btn-accent">
              📋 Copy Verbal Sentence
            </button>
            <button type="button" id="btn-print-brief" class="btn btn-secondary">
              🖨️ Print Leave Application Dossier
            </button>
          </div>
        </div>

        <!-- Phone Scripts -->
        <div class="script-grid">
          <div class="script-card">
            <h3>📞 Script 1: Student to Parent (Before Calling Warden)</h3>
            <p class="prose" style="font-size:0.85rem;">
              "Mom / Dad, our team from college got shortlisted for ${escapeHtml(event.name)} at ${escapeHtml(event.venue.split(',')[0])}. It is organised by ${escapeHtml(event.host)} with ${escapeHtml(event.support)}. The hostel warden will call to verify that you are aware of my travel from ${datesFormatted}. Please confirm that I have your permission to travel by bus."
            </p>
          </div>

          <div class="script-card">
            <h3>📞 Script 2: If Warden Calls Event Convener</h3>
            <p class="prose" style="font-size:0.85rem;">
              "Tell the warden they can directly call the Convener <strong>${escapeHtml(event.contactName)}</strong> at <strong>${escapeHtml(event.contactPhone)}</strong>. The convener's desk confirms that 24/7 faculty supervision and secure rest zones are arranged inside the campus for all verified participants."
            </p>
          </div>
        </div>

        <!-- Documentary Evidence Order -->
        <div class="content-card">
          <h3 class="content-card-title">Order to Present Documentary Evidence (Leave Dossier)</h3>
          <div class="dossier-checklist">
            <div class="dossier-step">
              <div class="dossier-step-num">1</div>
              <div class="dossier-step-content">
                <strong>Selection Confirmation Mail (Printed Copy)</strong>
                <span>Shows your name, official sender address, timestamp, and institutional shortlist announcement.</span>
              </div>
            </div>

            <div class="dossier-step">
              <div class="dossier-step-num">2</div>
              <div class="dossier-step-content">
                <strong>Participant Pass (100x140mm with QR Code)</strong>
                <span>Displays your registration ID, assigned track, Gate 1 reporting notice, and non-transferable photo ID warning.</span>
              </div>
            </div>

            <div class="dossier-step">
              <div class="dossier-step-num">3</div>
              <div class="dossier-step-content">
                <strong>Official Schedule & Track Brochure</strong>
                <span>Proves continuous academic schedule, mentor checkpoints, and absence of unmonitored free hours.</span>
              </div>
            </div>

            <div class="dossier-step">
              <div class="dossier-step-num">4</div>
              <div class="dossier-step-content">
                <strong>Organiser Coordination Chat & Convener Contact Card</strong>
                <span>Provides immediate emergency telephone numbers and transit bus guidance from neighbouring districts.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Private Note Field -->
        <div class="content-card">
          <h3 class="content-card-title">Private Hostel & Travel Notes (Saved on this Device)</h3>
          <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.5rem;">
            Record your hostel room number, out-pass serial number, bus departure ticket details, or roommate contact here. Automatically saved in your browser's private local storage.
          </p>
          <textarea id="private-notes-input" class="private-note-textarea" placeholder="E.g., Hostel Block B Room 304. Out-pass serial: CET-OP-4491. Parent phone: +91 94471 00000. Return KSRTC bus booked for 28 Nov 08:30 PM.">${escapeHtml(state.privateNote)}</textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem;">
            <span id="note-save-status" style="font-size:0.75rem; color:#34d399;"></span>
            <button type="button" id="btn-save-note" class="btn btn-secondary" style="font-size:0.8rem; padding:0.35rem 0.75rem;">
              💾 Save Private Note
            </button>
          </div>
        </div>

        <!-- Action Bar -->
        <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
          <button type="button" id="btn-brief-ics" class="btn btn-outline">📅 Download .ics Calendar File</button>
          <button type="button" id="btn-brief-share" class="btn btn-accent">🔗 Share Evidence via Web Share</button>
          <a href="#/e/${event.slug}/pass" class="btn btn-primary">🎫 Back to Pass</a>
        </div>
      </div>
    `;
  }

  // Screen 6: Admin Screen & Event Editor
  function renderAdminScreen() {
    const cur = state.currentEvent || state.events[0];

    return `
      <div class="admin-container">
        <div class="admin-header-strip">
          <div>
            <h2 style="font-size:1.4rem; font-weight:800; color:#ffffff;">Campus Proof Desk — Event Desk & Editor</h2>
            <p style="font-size:0.85rem; color:#94a3b8;">
              Edit events in memory, regenerate posters, download updated events.json, and import JSON directly.
            </p>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button type="button" id="btn-admin-download-json" class="btn btn-accent">📥 Download events.json</button>
            <button type="button" id="btn-admin-reset-seeds" class="btn btn-outline">↺ Reset to Seeds</button>
          </div>
        </div>

        <!-- Events List -->
        <div>
          <h3 style="font-size:1rem; color:#ffffff; margin-bottom:0.75rem;">Active Records (${state.events.length})</h3>
          <div class="admin-events-list">
            ${state.events.map(ev => `
              <div class="admin-event-card ${cur && cur.slug === ev.slug ? 'active' : ''}" data-slug="${escapeHtml(ev.slug)}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <strong style="color:#ffffff; font-size:0.95rem;">${escapeHtml(ev.name)}</strong>
                  <span class="badge badge-type" style="font-size:0.65rem;">${escapeHtml(ev.type)}</span>
                </div>
                <div style="font-size:0.8rem; color:#94a3b8; margin:0.3rem 0;">${escapeHtml(ev.edition)} • ${escapeHtml(ev.district)}</div>
                <div style="font-size:0.75rem; color:#64748b; font-family:var(--font-mono);">slug: ${escapeHtml(ev.slug)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Full In-Memory Editor -->
        <div class="content-card">
          <h3 class="content-card-title">Edit Record: ${escapeHtml(cur.name)}</h3>
          <form id="admin-editor-form" onsubmit="return false;">
            <div class="admin-form-grid">
              <div class="form-group">
                <label for="admin-slug">Slug (Unique ID)</label>
                <input type="text" id="admin-slug" class="form-control" value="${escapeHtml(cur.slug)}" required>
              </div>

              <div class="form-group">
                <label for="admin-type">Type</label>
                <select id="admin-type" class="form-control">
                  <option value="hackathon" ${cur.type === 'hackathon' ? 'selected' : ''}>hackathon</option>
                  <option value="workshop" ${cur.type === 'workshop' ? 'selected' : ''}>workshop</option>
                  <option value="class" ${cur.type === 'class' ? 'selected' : ''}>class</option>
                  <option value="fest" ${cur.type === 'fest' ? 'selected' : ''}>fest</option>
                  <option value="drive" ${cur.type === 'drive' ? 'selected' : ''}>drive</option>
                </select>
              </div>

              <div class="form-group form-col-span-2">
                <label for="admin-name">Event Name</label>
                <input type="text" id="admin-name" class="form-control" value="${escapeHtml(cur.name)}" required>
              </div>

              <div class="form-group">
                <label for="admin-edition">Edition</label>
                <input type="text" id="admin-edition" class="form-control" value="${escapeHtml(cur.edition)}" required>
              </div>

              <div class="form-group">
                <label for="admin-status">Status</label>
                <select id="admin-status" class="form-control">
                  <option value="upcoming" ${cur.status === 'upcoming' ? 'selected' : ''}>upcoming</option>
                  <option value="completed" ${cur.status === 'completed' ? 'selected' : ''}>completed</option>
                </select>
              </div>

              <div class="form-group">
                <label for="admin-host">Host Body</label>
                <input type="text" id="admin-host" class="form-control" value="${escapeHtml(cur.host)}" required>
              </div>

              <div class="form-group">
                <label for="admin-support">Supporting Body</label>
                <input type="text" id="admin-support" class="form-control" value="${escapeHtml(cur.support)}" required>
              </div>

              <div class="form-group form-col-span-2">
                <label for="admin-venue">Venue Address</label>
                <input type="text" id="admin-venue" class="form-control" value="${escapeHtml(cur.venue)}" required>
              </div>

              <div class="form-group">
                <label for="admin-district">District</label>
                <input type="text" id="admin-district" class="form-control" value="${escapeHtml(cur.district)}" required>
              </div>

              <div class="form-group">
                <label for="admin-maps">Maps Query</label>
                <input type="text" id="admin-maps" class="form-control" value="${escapeHtml(cur.mapsQuery)}" required>
              </div>

              <div class="form-group">
                <label for="admin-start">Start Time (ISO)</label>
                <input type="text" id="admin-start" class="form-control" value="${escapeHtml(cur.start)}" required>
              </div>

              <div class="form-group">
                <label for="admin-end">End Time (ISO)</label>
                <input type="text" id="admin-end" class="form-control" value="${escapeHtml(cur.end)}" required>
              </div>

              <div class="form-group">
                <label for="admin-report">Reporting Time (ISO)</label>
                <input type="text" id="admin-report" class="form-control" value="${escapeHtml(cur.report)}" required>
              </div>

              <div class="form-group">
                <label for="admin-close">Close Time (ISO)</label>
                <input type="text" id="admin-close" class="form-control" value="${escapeHtml(cur.close)}" required>
              </div>

              <div class="form-group">
                <label for="admin-deadline">Registration Deadline (ISO)</label>
                <input type="text" id="admin-deadline" class="form-control" value="${escapeHtml(cur.deadline)}" required>
              </div>

              <div class="form-group">
                <label for="admin-prize">Prize Pool Summary</label>
                <input type="text" id="admin-prize" class="form-control" value="${escapeHtml(cur.prize)}" required>
              </div>

              <div class="form-group">
                <label for="admin-fee">Fee</label>
                <input type="text" id="admin-fee" class="form-control" value="${escapeHtml(cur.fee)}" required>
              </div>

              <div class="form-group">
                <label for="admin-site">Site URL</label>
                <input type="text" id="admin-site" class="form-control" value="${escapeHtml(cur.site)}" required>
              </div>

              <div class="form-group">
                <label for="admin-contact-name">Contact Person</label>
                <input type="text" id="admin-contact-name" class="form-control" value="${escapeHtml(cur.contactName)}" required>
              </div>

              <div class="form-group">
                <label for="admin-contact-phone">Contact Phone</label>
                <input type="text" id="admin-contact-phone" class="form-control" value="${escapeHtml(cur.contactPhone)}" required>
              </div>

              <div class="form-group form-col-span-2">
                <label for="admin-contact-email">Contact Email</label>
                <input type="email" id="admin-contact-email" class="form-control" value="${escapeHtml(cur.contactEmail)}" required>
              </div>

              <div class="form-group form-col-span-2">
                <label for="admin-tracks">Tracks (One per line)</label>
                <textarea id="admin-tracks" class="form-control" rows="4">${escapeHtml(cur.tracks.join('\n'))}</textarea>
              </div>

              <div class="form-group form-col-span-2">
                <label for="admin-note">Academic Leave / Hostel Compliance Note</label>
                <textarea id="admin-note" class="form-control" rows="3">${escapeHtml(cur.note)}</textarea>
              </div>

              <div class="form-group">
                <label for="admin-palette-c1">Palette C1 (Primary Hex)</label>
                <input type="text" id="admin-palette-c1" class="form-control" value="${escapeHtml(cur.palette.c1)}">
              </div>

              <div class="form-group">
                <label for="admin-palette-c2">Palette C2 (Secondary Hex)</label>
                <input type="text" id="admin-palette-c2" class="form-control" value="${escapeHtml(cur.palette.c2)}">
              </div>

              <div class="form-group">
                <label for="admin-palette-bg">Palette BG (Background Hex)</label>
                <input type="text" id="admin-palette-bg" class="form-control" value="${escapeHtml(cur.palette.bg)}">
              </div>

              <div class="form-group">
                <label for="admin-poster">Poster File Path</label>
                <input type="text" id="admin-poster" class="form-control" value="${escapeHtml(cur.poster)}">
              </div>
            </div>

            <!-- Canvas for Regenerating Poster -->
            <canvas id="admin-poster-canvas" style="display:none;"></canvas>

            <div class="admin-actions-bar">
              <button type="button" id="btn-admin-save" class="btn btn-primary">💾 Save Changes (In-Memory & Storage)</button>
              <button type="button" id="btn-admin-regen-a3" class="btn btn-secondary">🖼️ Regenerate & Download A3 Poster (1240x1754)</button>
              <button type="button" id="btn-admin-regen-story" class="btn btn-secondary">📱 Regenerate & Download Story Poster (1080x1920)</button>
              <a href="#/e/${cur.slug}" class="btn btn-outline">👁️ Preview Public Page</a>
            </div>
          </form>
        </div>

        <!-- Paste-in JSON Import -->
        <div class="content-card">
          <h3 class="content-card-title">Paste-In JSON Import</h3>
          <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.75rem;">
            Paste an array of event objects or a single event object to immediately import into memory.
          </p>
          <textarea id="admin-paste-json" class="form-control" rows="5" placeholder='[ { "slug": "new-event", "name": "...", ... } ]'></textarea>
          <div style="margin-top:0.75rem;">
            <button type="button" id="btn-admin-import-json" class="btn btn-accent">📥 Validate & Import JSON</button>
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
    // Format: #/e/<slug>/<screen> or #/admin or #/
    if (hash.startsWith('#/admin')) {
      return { screen: 'admin', slug: null };
    }

    if (hash.startsWith('#/e/')) {
      const parts = hash.slice(4).split('/');
      const slug = parts[0];
      const screen = parts[1] || 'public';
      return { screen, slug };
    }

    // Default route
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

    // Apply per-event palette custom properties
    if (state.currentEvent) {
      applyEventPalette(state.currentEvent);
    }

    // Update navigation UI
    const activeSlug = state.currentEvent ? state.currentEvent.slug : 'hackmalabar-2026';
    updateEventSelector();
    updateNavTabs(activeSlug, screen);
    updateFooter(state.currentEvent);

    // Mount view content
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

    // Scroll to top
    window.scrollTo(0, 0);
  }

  // Event binders for Screen 1 (Public Page)
  function bindPublicEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    const btnIcs = document.getElementById('btn-hero-ics');
    if (btnIcs) {
      btnIcs.onclick = () => downloadICS(ev);
    }

    const btnShare = document.getElementById('btn-hero-share');
    if (btnShare) {
      btnShare.onclick = () => shareEventBrief(ev);
    }
  }

  // Event binders for Screen 2 (Pass)
  function bindPassEvents() {
    const ev = state.currentEvent;
    if (!ev) return;

    const canvas = document.getElementById('pass-render-canvas');
    if (canvas) {
      renderPassCanvas(canvas, ev, state.participant);
    }

    const inputName = document.getElementById('pass-input-name');
    const inputCollege = document.getElementById('pass-input-college');
    const inputReg = document.getElementById('pass-input-reg');
    const selectTrack = document.getElementById('pass-select-track');

    const updateParticipant = () => {
      state.participant.name = inputName.value.trim() || 'Rahul Krishna';
      state.participant.college = inputCollege.value.trim() || 'College of Engineering Trivandrum';
      state.participant.regId = inputReg.value.trim() || 'HM-2026-7842';
      state.participant.track = selectTrack.value;

      // Update DOM Ticket
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

      if (canvas) {
        renderPassCanvas(canvas, ev, state.participant);
      }
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
    if (btnPrint) {
      btnPrint.onclick = () => window.print();
    }
  }

  // Event binders for Screen 3 (Chat)
  function bindChatEvents() {
    const btnPrint = document.getElementById('btn-print-chat');
    if (btnPrint) {
      btnPrint.onclick = () => window.print();
    }
  }

  // Event binders for Screen 4 (Mail)
  function bindMailEvents() {
    const btnPrint = document.getElementById('btn-print-mail');
    if (btnPrint) {
      btnPrint.onclick = () => window.print();
    }

    const btnCopy = document.getElementById('btn-copy-mail');
    if (btnCopy) {
      btnCopy.onclick = () => {
        const bodyElem = document.getElementById('gm-body-content');
        if (bodyElem) {
          navigator.clipboard.writeText(bodyElem.innerText);
          alert('Email text copied to clipboard!');
        }
      };
    }
  }

  // Event binders for Screen 5 (Leave Brief)
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
          btnCopy.textContent = '✓ Copied Sentence!';
          setTimeout(() => {
            btnCopy.textContent = '📋 Copy Verbal Sentence';
          }, 2500);
        }
      };
    }

    const btnPrint = document.getElementById('btn-print-brief');
    if (btnPrint) {
      btnPrint.onclick = () => window.print();
    }

    const btnIcs = document.getElementById('btn-brief-ics');
    if (btnIcs) {
      btnIcs.onclick = () => downloadICS(ev);
    }

    const btnShare = document.getElementById('btn-brief-share');
    if (btnShare) {
      btnShare.onclick = () => shareEventBrief(ev);
    }

    const noteInput = document.getElementById('private-notes-input');
    const noteBtn = document.getElementById('btn-save-note');
    const noteStatus = document.getElementById('note-save-status');

    if (noteBtn && noteInput) {
      noteBtn.onclick = () => {
        state.privateNote = noteInput.value;
        localStorage.setItem('cpd_private_note', state.privateNote);
        if (noteStatus) {
          noteStatus.textContent = 'Note saved in localStorage!';
          setTimeout(() => { noteStatus.textContent = ''; }, 3000);
        }
      };
    }
  }

  // Event binders for Screen 6 (Admin)
  function bindAdminEvents() {
    const cur = state.currentEvent || state.events[0];
    const canvas = document.getElementById('admin-poster-canvas');

    // Switch event card
    document.querySelectorAll('.admin-event-card').forEach(card => {
      card.onclick = () => {
        const slug = card.getAttribute('data-slug');
        const found = state.events.find(ev => ev.slug === slug);
        if (found) {
          state.currentEvent = found;
          handleRoute();
        }
      };
    });

    // Save changes in memory & localStorage
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
        alert('Event updated in memory and localStorage!');
        handleRoute();
      };
    }

    // Regenerate A3 Poster
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

    // Regenerate Story Poster
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

    // Download updated events.json
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

    // Reset seeds
    const btnReset = document.getElementById('btn-admin-reset-seeds');
    if (btnReset) {
      btnReset.onclick = async () => {
        if (confirm('Reset all changes back to factory seed data?')) {
          localStorage.removeItem('cpd_events_json');
          await loadData();
          state.currentEvent = resolveDefaultEvent();
          handleRoute();
        }
      };
    }

    // Paste-in JSON Import
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
          alert('JSON successfully imported into memory and saved!');
          handleRoute();
        } catch (err) {
          alert('Invalid JSON: ' + err.message);
        }
      };
    }
  }

  // Global Print Button in Header
  const globalPrintBtn = document.getElementById('btn-global-print');
  if (globalPrintBtn) {
    globalPrintBtn.onclick = () => window.print();
  }

  // Application Entry Point
  async function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
    await loadData();
    handleRoute();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
