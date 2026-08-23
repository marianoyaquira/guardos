import type { Dictionary } from "./types";

export const pt: Dictionary = {
  meta: {
    title: "GuardOS — O sistema operacional do guarda-vidas",
    description:
      "Uma plataforma para montar, automatizar e auditar o rodízio de segurança aquática. Já em operação no Surfland Brasil — Garopaba/SC.",
  },
  brand: { tagline: "Sistema operacional do guarda-vidas" },
  nav: [
    { href: "#solucao", label: "Solução" },
    { href: "#recursos", label: "Recursos" },
    { href: "#prova", label: "Prova real" },
    { href: "#investimento", label: "Investimento" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#contato", label: "Contato" },
  ],
  header: {
    cta: "Agendar demonstração",
    tryApp: "Testar o app",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  lang: { pt: "PT", en: "EN" },
  hero: {
    eyebrow: "Já em operação no Surfland Brasil — Garopaba/SC",
    titleA: "O sistema operacional",
    titleB: "do guarda-vidas.",
    body: "Automatize rodízios, monitore fadiga e mantenha cada posto coberto — com dados auditáveis de toda a operação.",
    tracking:
      "Saiba exatamente onde está cada guarda-vidas — agora, no histórico e na escala futura.",
    cta: "Agendar demonstração",
    secondary: "Testar o app",
    imageAlt: "Guarda-vidas observando uma piscina de ondas em operação",
    signals: [
      "Rodízio",
      "Fadiga",
      "Equidade",
      "Escalas",
      "Governança",
      "Rastreamento",
    ],
  },
  mockup: {
    operation: "GuardOS · Operação",
    currentSession: "Sessão atual",
    postsCovered: "Postos cobertos",
    fatigue: "Painel de fadiga",
    team: "Equipe A",
  },
  problem: {
    title: "Segurança operada no improviso não escala.",
    items: [
      {
        title: "Fadiga não monitorada",
        body: "Tempo excessivo em postos de alta exigência sem acompanhamento.",
      },
      {
        title: "Escalas manuais e falhas",
        body: "Planilhas e papel consomem tempo e facilitam furos de cobertura.",
      },
      {
        title: "Rotatividade percebida como injusta",
        body: "Sem dados objetivos, surgem questionamentos sobre quem ocupa os postos mais pesados.",
      },
      {
        title: "Exposição jurídica sem registro",
        body: "Sem histórico de escala e fadiga, a operação perde rastreabilidade.",
      },
    ],
    legalCallout: "Histórico auditável de posição e turno",
  },
  product: {
    title: "Veja o GuardOS em ação",
    body: "Quatro camadas da mesma operação — mapa, automação, fadiga e equidade — como o supervisor enxerga o turno.",
  },
  map: {
    kicker: "01 · Mapa de Rodízio Visual",
    title: "Veja toda a operação. Não uma planilha.",
    body: "Todos os postos, a equipe e cada sessão do dia.",
    selected: "Sessão selecionada",
    team: "Equipe",
    covered: "Postos cobertos",
    breaks: "Intervalos",
    pool: "Piscina de ondas",
    states: {
      history: { label: "Histórico", hint: "Sessão concluída" },
      live: { label: "Agora", hint: "Sessão em andamento" },
      next: { label: "Próxima", hint: "Já escalada" },
    },
    live: "Ao vivo",
    done: "Concluído",
    notes: {
      "1": "Abertura · café 09:00",
      "2": "Intervalos escalonados",
      "3": "Retorno do almoço",
    },
    rest: { Intervalo: "Intervalo", Almoço: "Almoço" },
  },
  tracking: {
    title: "Onde está cada guarda-vidas. A qualquer momento.",
    items: [
      {
        title: "Histórico",
        body: "Todo posicionamento fica registrado — auditável, sessão por sessão.",
      },
      {
        title: "Agora",
        body: "Veja em tempo real quem está em qual posto, sem precisar perguntar no rádio.",
      },
      {
        title: "Futuro",
        body: "O próximo rodízio já está definido e visível antes de começar.",
      },
    ],
  },
  express: {
    kicker: "02 · Rodízio Express",
    title: "Minutos, não horas.",
    body: "O supervisor informa a equipe. O GuardOS monta o rodízio.",
    steps: [
      {
        title: "Informe a equipe",
        body: "Nº de guarda-vidas, guias e horário do turno.",
      },
      {
        title: "Gerar escala",
        body: "O algoritmo distribui automaticamente os postos.",
      },
      {
        title: "Rodízio pronto",
        body: "Postos, pausas e almoço balanceados.",
      },
      {
        title: "Publicar",
        body: "Supervisor revisa e coloca o turno em operação.",
      },
    ],
  },
  fatigue: {
    kicker: "03 · Painel de Controle de Fadiga",
    titleA: "Fadiga deixa de ser percepção.",
    titleB: "Vira dado operacional.",
    benefits: [
      "acompanha exposição acumulada",
      "alerta antes que fadiga vire risco",
      "mantém histórico auditável",
    ],
    exposure: "Exposição por posto",
    threshold: "Limiar de atenção · 3h00",
    zones: {
      reef: "Reef",
      piscina: "Piscina",
      pier: "Pier",
      controle: "Controle",
      lobby: "Lobby",
    },
    status: { OK: "OK", ATENÇÃO: "ATENÇÃO", ALTO: "ALTO" },
  },
  fairness: {
    kicker: "04 · Ranking de Justiça",
    titleA: "Equidade mensurada.",
    titleB: "Não prometida.",
    columns: [
      "#",
      "Guarda-vidas",
      "Turnos",
      "% Guia",
      "Índice de rotação",
      "Prioridade",
    ],
    priority: { high: "ALTA", normal: "NORMAL" },
    prioritize: "Priorizar próximo rodízio",
    average: "Média da equipe",
    averageDetail: "turnos · {n}% como guia",
    mobileMeta: "{shifts} turnos · {guide}% guia",
  },
  modules: {
    kicker: "Plataforma",
    title: "Uma plataforma completa para sua operação.",
    body: "Esse software existe porque há pessoas dentro da água.",
    imageAlt: "Surfista em uma onda dentro de uma operação de piscina de ondas",
    items: [
      {
        title: "Escalas & Multi-Equipes",
        body: "Calendário por semana, organizado por time e unidade operacional.",
        weight: "primary",
      },
      {
        title: "Relatórios Operacionais",
        body: "Consulta e exportação do histórico de posição, além de rodízio, fadiga e rotatividade.",
        weight: "primary",
      },
      {
        title: "Painel de Supervisão",
        body: "Login dedicado, com modo leitura e edição por perfil.",
        weight: "primary",
      },
      {
        title: "Freelancers",
        body: "Banco de profissionais avulsos para picos de demanda.",
        weight: "secondary",
      },
      {
        title: "Equipe / Roster",
        body: "Cadastro central de todos os guarda-vidas e guias.",
        weight: "secondary",
      },
      {
        title: "Controle de Estoque",
        body: "Equipamentos de segurança e resgate por unidade.",
        weight: "secondary",
      },
    ],
  },
  proof: {
    eyebrow: "Prova real",
    headline: "GuardOS já opera no Surfland Brasil.",
    body: "Garopaba/SC — o mesmo sistema apresentado aqui roda a operação diária de guarda-vidas.",
    imagePending: "Fotografia operacional",
    imageHint: "Fotografia real da Surfland Brasil — a substituir quando disponível.",
    awaiting: "Aguardando dado real",
    metrics: [
      { id: "months", label: "meses em operação contínua" },
      { id: "guards", label: "guarda-vidas gerenciados" },
      { id: "rotations", label: "rodízios gerados por dia" },
    ],
    quotePending: "Depoimento da liderança",
    namePending: "Nome / cargo",
  },
  pricing: {
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
          "Histórico completo de posição e escala",
          "Suporte técnico",
          "Atualizações do produto",
          "Sem limite de guarda-vidas cadastrados",
          "Onboarding assistido",
        ],
      },
    ],
  },
  roadmap: {
    title: "Tração + roadmap",
    now: {
      label: "Agora",
      items: [
        "GuardOS v133",
        "Operação real na Surfland Brasil",
        "Arquitetura multi-equipes e multi-unidades",
      ],
    },
    later: {
      label: "Depois",
      items: [
        { id: "01", title: "App mobile para guarda-vidas" },
        { id: "02", title: "Alertas de fadiga em tempo real" },
        { id: "03", title: "Integrações com folha e RH" },
        { id: "04", title: "Outras operações de segurança aquática" },
      ],
    },
  },
  cta: {
    title: "Da demonstração à operação.",
    steps: [
      {
        title: "Demonstração ao vivo",
        body: "Veja GuardOS funcionando com uma operação real.",
      },
      {
        title: "Diagnóstico operacional",
        body: "Mapeamento de postos, turnos, regras e composição da equipe.",
      },
      {
        title: "Piloto + implantação",
        body: "Configuração e validação da operação antes da entrada definitiva.",
      },
    ],
    button: "Agendar demonstração",
    tryApp: "Testar o app",
    name: "Nome",
    email: "E-mail",
    park: "Parque / unidade",
    submit: "Enviar pedido de demonstração",
    sent: "Abrindo seu e-mail…",
    mailSubject: "Agendar demonstração — GuardOS",
    mailBody: "Nome: {name}\nE-mail: {email}\nParque / unidade: {park}",
    imageAlt: "Onda em operação numa piscina de ondas",
  },
  footer: {
    line: "Elevando o padrão de segurança em piscinas de ondas.",
  },
  demo: "Dados ilustrativos com base na lógica real do produto.",
};
