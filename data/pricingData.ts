export const pricingData = {
  headline: "Um plano simples, por unidade.",
  note: "Valores de referência para uma unidade operacional padrão. Proposta final ajustada ao escopo do parque.",
  plans: [
    {
      id: "implantacao",
      label: "Implantação",
      price: "US$ 6.500",
      cadence: "pagamento único",
      items: [
        "Mapeamento da piscina de ondas",
        "Configuração dos postos",
        "Importação da equipe",
        "Treinamento da supervisão",
      ],
    },
    {
      id: "anuidade",
      label: "Anuidade",
      price: "US$ 3.400",
      cadence: "por ano · por unidade",
      featured: true,
      items: [
        "Rodízio ilimitado",
        "Painel de Fadiga",
        "Ranking de Justiça",
        "Suporte técnico",
        "Atualizações do produto",
        "Sem limite de guarda-vidas cadastrados",
        "Onboarding assistido",
      ],
    },
  ],
} as const;
