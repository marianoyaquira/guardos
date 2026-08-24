import { portraitFor } from "@/data/garopaba/photos";
import type {
  Assignment,
  Beach,
  Incident,
  InventoryItem,
  Lifeguard,
  Post,
  Season,
} from "@/data/garopaba/types";

export const demoDay = "2027-01-15";
export const demoClock = "10:32";

export const seedSeason: Season = {
  id: "veraneio-2026-27",
  name: "Temporada 2026/27",
  startsAt: "2026-12-15",
  endsAt: "2027-03-15",
  defaultStartTime: "08:00",
  defaultEndTime: "18:00",
  active: true,
};

export const seedBeaches: Beach[] = [
  {
    id: "gamboa",
    name: "Gamboa",
    slug: "gamboa",
    latitude: -27.958889,
    longitude: -48.625556,
    displayOrder: 1,
    active: true,
    anchorSource: "documented",
  },
  {
    id: "siriu",
    name: "Siriú",
    slug: "siriu",
    latitude: -27.975278,
    longitude: -48.628889,
    displayOrder: 2,
    active: true,
    anchorSource: "documented",
  },
  {
    id: "centro",
    name: "Garopaba / Centro",
    slug: "garopaba",
    latitude: -28.006376,
    longitude: -48.618394,
    displayOrder: 3,
    active: true,
    anchorSource: "provisional",
  },
  {
    id: "vigia",
    name: "Vigia",
    slug: "vigia",
    latitude: -28.021925,
    longitude: -48.613146,
    displayOrder: 4,
    active: true,
    anchorSource: "provisional",
  },
  {
    id: "silveira",
    name: "Silveira",
    slug: "silveira",
    latitude: -28.037473,
    longitude: -48.607898,
    displayOrder: 5,
    active: true,
    anchorSource: "documented",
  },
  {
    id: "ferrugem",
    name: "Ferrugem",
    slug: "ferrugem",
    latitude: -28.07539,
    longitude: -48.62667,
    displayOrder: 6,
    active: true,
    anchorSource: "documented",
  },
  {
    id: "barra",
    name: "Barra",
    slug: "barra",
    latitude: -28.090056,
    longitude: -48.631946,
    displayOrder: 7,
    active: true,
    anchorSource: "provisional",
  },
  {
    id: "ouvidor",
    name: "Ouvidor",
    slug: "ouvidor",
    latitude: -28.104722,
    longitude: -48.637222,
    displayOrder: 8,
    active: true,
    anchorSource: "documented",
  },
];

export const seedPosts: Post[] = [
  post("g-g01", "gamboa", "G01", "Posto G01", 3),
  post("g-g02", "gamboa", "G02", "Posto G02", 2),
  post("s-s01", "siriu", "S01", "Posto S01", 3),
  post("s-s02", "siriu", "S02", "Posto S02", 2),
  post("c-c01", "centro", "C01", "Posto C01", 5),
  post("c-c02", "centro", "C02", "Posto C02", 3),
  post("c-c03", "centro", "C03", "Posto C03", 3),
  post("c-c04", "centro", "C04", "Posto C04", 2),
  post("c-c05", "centro", "C05", "Posto C05", 1),
  post("v-v01", "vigia", "V01", "Posto V01", 2),
  post("sv-sv01", "silveira", "SV01", "Posto SV01", 4),
  post("sv-sv02", "silveira", "SV02", "Posto SV02", 2),
  post("sv-sv03", "silveira", "SV03", "Posto SV03", 2),
  post("f-f01", "ferrugem", "F01", "Posto F01", 5),
  post("f-f02", "ferrugem", "F02", "Posto F02", 3),
  post("f-f03", "ferrugem", "F03", "Posto F03", 3),
  post("b-b01", "barra", "B01", "Posto B01", 3),
  post("b-b02", "barra", "B02", "Posto B02", 2),
  post("o-o01", "ouvidor", "O01", "Posto O01", 3),
  post("o-o02", "ouvidor", "O02", "Posto O02", 2),
  post("o-o03", "ouvidor", "O03", "Posto O03", 1),
  post("o-cab", "ouvidor", "O-CAB", "Cabine O-CAB", 1, "cabine"),
];

function post(
  id: string,
  beachId: string,
  code: string,
  name: string,
  baseTarget: number,
  type: Post["type"] = "posto",
): Post {
  return {
    id,
    beachId,
    code,
    name,
    type,
    latitude: null,
    longitude: null,
    baseTarget,
    reinforcedTarget: baseTarget,
    active: true,
  };
}

const firstNames = [
  "João", "Marcos", "Ana", "Lucas", "Beatriz", "Rafael", "Camila", "Pedro",
  "Juliana", "Thiago", "Larissa", "Felipe", "Mariana", "Bruno", "Aline",
  "Diego", "Patrícia", "Gustavo", "Renata", "André", "Carolina", "Eduardo",
  "Fernanda", "Henrique", "Isabela", "Leandro", "Natália", "Otávio", "Priscila",
  "Rodrigo", "Sabrina", "Vitor", "Tatiana", "Caio", "Daniela", "Igor",
];

const lastNames = [
  "Pereira", "Silva", "Costa", "Oliveira", "Souza", "Lima", "Alves", "Rocha",
  "Martins", "Fernandes", "Gomes", "Ribeiro", "Carvalho", "Araújo", "Mendes",
  "Nunes", "Barbosa", "Teixeira",
];

function buildPeopleAndAssignments() {
  const people: Lifeguard[] = [];
  const assignments: Assignment[] = [];
  let index = 0;
  let womanIndex = 0;
  let manIndex = 0;

  for (const row of seedPosts) {
    for (let slot = 0; slot < row.baseTarget; slot += 1) {
      const first = firstNames[index % firstNames.length];
      const last = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
      const name = `${first} ${last}`;
      const initials = `${first[0]}${last[0]}`.toUpperCase();
      const id = `gv-${String(index + 1).padStart(2, "0")}`;
      const woman = [
        "Ana", "Beatriz", "Camila", "Juliana", "Larissa", "Mariana", "Aline",
        "Patrícia", "Renata", "Carolina", "Fernanda", "Isabela", "Natália",
        "Priscila", "Sabrina", "Tatiana", "Daniela",
      ].includes(first);
      people.push({
        id,
        name,
        initials: people.some((person) => person.initials === initials)
          ? `${initials}${index}`
          : initials,
        photo: portraitFor(first, woman ? womanIndex++ : manIndex++),
        role: slot === 0 && row.baseTarget >= 3 ? "chefe" : "guarda-vidas",
        qualification: "Guarda-vidas",
        demo: true,
      });

      const missing =
        (row.id === "s-s02" && slot === 1) || (row.id === "f-f02" && slot === 2);
      const onBreak = row.id === "c-c02" && slot === 1;
      const minutesOnDuty = row.id === "f-f01" && slot === 0 ? 250 : 140 + (index % 40);

      assignments.push({
        id: `as-${id}`,
        personId: id,
        beachId: row.beachId,
        postId: row.id,
        startTime: "08:00",
        endTime: "18:00",
        attendance: missing ? "ausente" : "presente",
        onBreak,
        minutesOnDuty: missing ? 0 : minutesOnDuty,
        minutesOnPost: missing ? 0 : 80 + (index % 30),
        minutesWithoutBreak: missing ? 0 : onBreak ? 0 : 70 + (index % 50),
        notes: "",
      });
      index += 1;
    }
  }

  return { people, assignments };
}

const generated = buildPeopleAndAssignments();
export const seedPeople = generated.people;
export const seedAssignments = generated.assignments;

export const seedIncidents: Incident[] = [
  {
    id: "inc-01",
    createdAt: `${demoDay}T10:18:00`,
    beachId: "ferrugem",
    postId: "f-f02",
    type: "Prevenção",
    description: "Apoio a banhistas em corrente de retorno próximo ao F02.",
    severity: "media",
    status: "atendimento",
    peopleIds: seedAssignments
      .filter((row) => row.postId === "f-f01" && row.attendance === "presente")
      .slice(0, 2)
      .map((row) => row.personId),
    demo: true,
  },
];

export const seedInventory: InventoryItem[] = seedBeaches.flatMap((beach) => [
  {
    id: `inv-${beach.id}-radio`,
    name: "Rádio",
    category: "Comunicação",
    beachId: beach.id,
    postId: null,
    quantity: 1,
    state: beach.id === "siriu" ? "ATENCAO" : "OK",
    demo: true,
  },
  {
    id: `inv-${beach.id}-rescue`,
    name: "Tubo de resgate",
    category: "Resgate",
    beachId: beach.id,
    postId: null,
    quantity: 1,
    state: "OK",
    demo: true,
  },
]);

export const incidentTypes = [
  "Prevenção",
  "Resgate",
  "Atendimento",
  "Criança perdida",
  "Água-viva / animal marinho",
  "Apoio",
  "Ocorrência diversa",
];
