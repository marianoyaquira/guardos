export const site = {
  name: "GuardOS",
  tagline: "The Guard Operational System",
  domain: "theguardos.com",
  description:
    "Uma plataforma para montar, automatizar e auditar o rodízio de segurança aquática.",
  url: "https://theguardos.com",
  contact: {
    name: "",
    email: "info@theguardos.com",
    phone: "",
    website: "",
  },
  ctaHref: "#contato",
  demoHref: "#solucao",
  appHref: "/app",
} as const;

export const nav = [
  { href: "#solucao", label: "Operação" },
  { href: "#recursos", label: "Plataforma" },
  { href: "#prova", label: "Surfland" },
  { href: "#contato", label: "Contato" },
] as const;
