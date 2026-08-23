import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "GuardOS — The lifeguard operating system",
    description:
      "A platform to build, automate, and audit aquatic-safety rotations. Already operating at Surfland Brasil — Garopaba/SC.",
  },
  brand: { tagline: "The lifeguard operating system" },
  nav: [
    { href: "#solucao", label: "Solution" },
    { href: "#recursos", label: "Features" },
    { href: "#prova", label: "Proof" },
    { href: "#investimento", label: "Investment" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#contato", label: "Contact" },
  ],
  header: {
    cta: "Book a demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  lang: { pt: "PT", en: "EN" },
  hero: {
    eyebrow: "Already operating at Surfland Brasil — Garopaba/SC",
    titleA: "The lifeguard",
    titleB: "operating system.",
    body: "Automate rotations, monitor fatigue, and keep every post covered — with an auditable record of the full operation.",
    tracking:
      "Know exactly where every lifeguard is — now, in history, and on the next roster.",
    cta: "Book a demo",
    secondary: "See how it works",
    imageAlt: "Lifeguard observing a wave pool in operation",
    signals: [
      "Rotation",
      "Fatigue",
      "Fairness",
      "Rosters",
      "Governance",
      "Tracking",
    ],
  },
  mockup: {
    operation: "GuardOS · Operations",
    currentSession: "Current session",
    postsCovered: "Posts covered",
    fatigue: "Fatigue panel",
    team: "Team A",
  },
  problem: {
    title: "Safety run on improvisation does not scale.",
    items: [
      {
        title: "Unmonitored fatigue",
        body: "Excessive time on high-demand posts with no exposure tracking.",
      },
      {
        title: "Manual rosters and gaps",
        body: "Spreadsheets and paper consume hours and leave coverage holes.",
      },
      {
        title: "Rotation seen as unfair",
        body: "Without objective data, the team questions who always draws the hardest posts.",
      },
      {
        title: "Legal exposure without records",
        body: "Without a history of roster and fatigue, the operation loses traceability.",
      },
    ],
    legalCallout: "Auditable history of position and shift",
  },
  product: {
    title: "See GuardOS in action",
    body: "Four layers of the same operation — map, automation, fatigue, and fairness — the way a supervisor sees the shift.",
  },
  map: {
    kicker: "01 · Visual Rotation Map",
    title: "See the full operation. Not a spreadsheet.",
    body: "Every post, the team, and each session of the day.",
    selected: "Selected session",
    team: "Team",
    covered: "Posts covered",
    breaks: "Breaks",
    pool: "Wave pool",
    states: {
      history: { label: "History", hint: "Completed session" },
      live: { label: "Now", hint: "Session in progress" },
      next: { label: "Next", hint: "Already rostered" },
    },
    live: "Live",
    done: "Done",
    notes: {
      "1": "Opening · 09:00 break",
      "2": "Staggered breaks",
      "3": "Back from lunch",
    },
    rest: { Intervalo: "Break", Almoço: "Lunch" },
  },
  tracking: {
    title: "Where every lifeguard is. At any moment.",
    items: [
      {
        title: "History",
        body: "Every placement is recorded — auditable, session by session.",
      },
      {
        title: "Now",
        body: "See in real time who is on which post, without asking over the radio.",
      },
      {
        title: "Next",
        body: "The next rotation is already defined and visible before it starts.",
      },
    ],
  },
  express: {
    kicker: "02 · Express Rotation",
    title: "Minutes, not hours.",
    body: "The supervisor enters the team. GuardOS builds the rotation.",
    steps: [
      {
        title: "Enter the team",
        body: "Number of lifeguards, leads, and shift time.",
      },
      {
        title: "Generate the roster",
        body: "The algorithm assigns posts automatically.",
      },
      {
        title: "Rotation ready",
        body: "Posts, breaks, and lunch already balanced.",
      },
      {
        title: "Publish",
        body: "The supervisor reviews and puts the shift live.",
      },
    ],
  },
  fatigue: {
    kicker: "03 · Fatigue Control Panel",
    titleA: "Fatigue stops being a feeling.",
    titleB: "It becomes operational data.",
    benefits: [
      "tracks accumulated exposure",
      "alerts before fatigue becomes a scene risk",
      "keeps an auditable history",
    ],
    exposure: "Exposure by post",
    threshold: "Attention threshold · 3h00",
    zones: {
      reef: "Reef",
      piscina: "Pool",
      pier: "Pier",
      controle: "Control",
      lobby: "Lobby",
    },
    status: { OK: "OK", ATENÇÃO: "WATCH", ALTO: "HIGH" },
  },
  fairness: {
    kicker: "04 · Fairness Ranking",
    titleA: "Equity measured.",
    titleB: "Not promised.",
    columns: ["#", "Lifeguard", "Shifts", "% Lead", "Rotation index", "Priority"],
    priority: { high: "HIGH", normal: "NORMAL" },
    prioritize: "Prioritize next rotation",
    average: "Team average",
    averageDetail: "shifts · {n}% as lead",
    mobileMeta: "{shifts} shifts · {guide}% lead",
  },
  modules: {
    kicker: "Platform",
    title: "A complete platform for your operation.",
    body: "This software exists because there are people in the water.",
    imageAlt: "Surfer riding a wave inside a wave-pool operation",
    items: [
      {
        title: "Rosters & Multi-teams",
        body: "Weekly calendar, organized by team and operating unit.",
        weight: "primary",
      },
      {
        title: "Operational reports",
        body: "Look up and export position history, plus rotation, fatigue, and fairness.",
        weight: "primary",
      },
      {
        title: "Supervision panel",
        body: "Dedicated login, with read vs. edit modes by role.",
        weight: "primary",
      },
      {
        title: "Freelancers",
        body: "A bench of on-call professionals for demand peaks.",
        weight: "secondary",
      },
      {
        title: "Team / Roster",
        body: "A central register of every lifeguard and lead.",
        weight: "secondary",
      },
      {
        title: "Inventory control",
        body: "Safety and rescue equipment by unit.",
        weight: "secondary",
      },
    ],
  },
  proof: {
    eyebrow: "Real-world proof",
    headline: "GuardOS already runs at Surfland Brasil.",
    body: "Garopaba/SC — the same system shown here runs the daily lifeguard operation.",
    imagePending: "Operational photograph",
    imageHint: "Real Surfland Brasil photograph — to be replaced when available.",
    awaiting: "Awaiting real data",
    metrics: [
      { id: "months", label: "months in continuous operation" },
      { id: "guards", label: "lifeguards managed" },
      { id: "rotations", label: "rotations generated per day" },
    ],
    quotePending: "Leadership testimonial",
    namePending: "Name / role",
  },
  pricing: {
    headline: "A simple plan, per unit.",
    note: "Reference pricing for a standard operating unit. Final proposal adjusted to the park’s scope.",
    plans: [
      {
        id: "implantacao",
        label: "Implementation",
        price: "US$ 6,500",
        cadence: "one-time",
        items: [
          "Wave-pool mapping",
          "Post configuration",
          "Team import",
          "Supervisor training",
        ],
      },
      {
        id: "anuidade",
        label: "Annual license",
        price: "US$ 3,400",
        cadence: "per year · per unit",
        featured: true,
        items: [
          "Unlimited rotations",
          "Fatigue Panel",
          "Fairness Ranking",
          "Full position and roster history",
          "Technical support",
          "Product updates",
          "No cap on registered lifeguards",
          "Assisted onboarding",
        ],
      },
    ],
  },
  roadmap: {
    title: "Traction + roadmap",
    now: {
      label: "Now",
      items: [
        "GuardOS v133",
        "Live operation at Surfland Brasil",
        "Multi-team and multi-unit architecture",
      ],
    },
    later: {
      label: "Next",
      items: [
        { id: "01", title: "Mobile app for lifeguards" },
        { id: "02", title: "Real-time fatigue alerts" },
        { id: "03", title: "Payroll and HR integrations" },
        { id: "04", title: "Other aquatic-safety operations" },
      ],
    },
  },
  cta: {
    title: "From demo to operations.",
    steps: [
      {
        title: "Live demonstration",
        body: "See GuardOS running with a real operation.",
      },
      {
        title: "Operational diagnostic",
        body: "Mapping of posts, shifts, rules, and team composition.",
      },
      {
        title: "Pilot + implementation",
        body: "Configuration and validation before the operation goes live.",
      },
    ],
    button: "Book a demo",
    name: "Name",
    email: "Email",
    park: "Park / unit",
    submit: "Send demo request",
    sent: "Opening your email…",
    mailSubject: "Book a GuardOS demo",
    mailBody: "Name: {name}\nEmail: {email}\nPark / unit: {park}",
    imageAlt: "A wave running in a wave-pool operation",
  },
  footer: {
    line: "Raising the standard of safety in wave pools.",
  },
  demo: "Illustrative data based on the product’s real logic.",
};
