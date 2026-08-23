export const site = {
  name: "GuardOS",
  tagline: "Sistema operacional do guarda-vidas",
  description:
    "Uma plataforma para montar, automatizar e auditar o rodízio de segurança aquática.",
  contact: {
    name: "",
    email: "contato@guardos.com.br",
    phone: "",
    website: "",
  },
  ctaHref: "#contato",
  demoHref: "#solucao",
} as const;

export const nav = [
  { href: "#solucao", label: "Solução" },
  { href: "#recursos", label: "Recursos" },
  { href: "#prova", label: "Prova real" },
  { href: "#investimento", label: "Investimento" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contato", label: "Contato" },
] as const;
