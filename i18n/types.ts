export type Locale = "pt" | "en";

export type Dictionary = {
  meta: { title: string; description: string };
  brand: { tagline: string };
  nav: { href: string; label: string }[];
  header: { cta: string; tryApp: string; openMenu: string; closeMenu: string };
  lang: { pt: string; en: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    body: string;
    tracking: string;
    cta: string;
    secondary: string;
    imageAlt: string;
    signals: string[];
  };
  mockup: {
    operation: string;
    currentSession: string;
    postsCovered: string;
    fatigue: string;
    team: string;
  };
  problem: {
    title: string;
    items: { title: string; body: string }[];
    legalCallout: string;
  };
  product: { title: string; body: string };
  map: {
    kicker: string;
    title: string;
    body: string;
    selected: string;
    team: string;
    covered: string;
    breaks: string;
    pool: string;
    states: {
      history: { label: string; hint: string };
      live: { label: string; hint: string };
      next: { label: string; hint: string };
    };
    live: string;
    done: string;
    notes: Record<string, string>;
    rest: Record<string, string>;
  };
  tracking: {
    title: string;
    items: { title: string; body: string }[];
  };
  express: {
    kicker: string;
    title: string;
    body: string;
    steps: { title: string; body: string }[];
  };
  fatigue: {
    kicker: string;
    titleA: string;
    titleB: string;
    benefits: string[];
    exposure: string;
    threshold: string;
    zones: Record<string, string>;
    status: Record<string, string>;
  };
  fairness: {
    kicker: string;
    titleA: string;
    titleB: string;
    columns: string[];
    priority: { high: string; normal: string };
    prioritize: string;
    average: string;
    averageDetail: string;
    mobileMeta: string;
  };
  modules: {
    kicker: string;
    title: string;
    body: string;
    imageAlt: string;
    items: { title: string; body: string; weight: "primary" | "secondary" }[];
  };
  proof: {
    eyebrow: string;
    headline: string;
    body: string;
    imagePending: string;
    imageHint: string;
    awaiting: string;
    metrics: { id: string; label: string }[];
    quotePending: string;
    namePending: string;
  };
  pricing: {
    headline: string;
    note: string;
    plans: {
      id: string;
      label: string;
      price: string;
      cadence: string;
      featured?: boolean;
      items: string[];
    }[];
  };
  roadmap: {
    title: string;
    now: { label: string; items: string[] };
    later: { label: string; items: { id: string; title: string }[] };
  };
  cta: {
    title: string;
    steps: { title: string; body: string }[];
    button: string;
    tryApp: string;
    name: string;
    email: string;
    park: string;
    submit: string;
    sent: string;
    mailSubject: string;
    mailBody: string;
    imageAlt: string;
  };
  footer: { line: string };
  demo: string;
};
