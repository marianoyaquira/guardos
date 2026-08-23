export type ProofMetric = {
  id: string;
  value: string | null;
  label: string;
};

export const proofData = {
  eyebrow: "Prova real",
  headline: "GuardOS já opera no Surfland Brasil.",
  body: "Garopaba/SC — o mesmo sistema apresentado aqui roda a operação diária de guarda-vidas.",
  imageSrc: null as string | null,
  imageAlt: "Fotografia operacional da Surfland Brasil — a substituir",
  metrics: [
    {
      id: "months",
      value: null,
      label: "meses em operação contínua",
    },
    {
      id: "guards",
      value: null,
      label: "guarda-vidas gerenciados",
    },
    {
      id: "rotations",
      value: null,
      label: "rodízios gerados por dia",
    },
  ] satisfies ProofMetric[],
  testimonial: {
    quote: null as string | null,
    name: null as string | null,
    role: null as string | null,
    organization: "Surfland Brasil",
  },
};
