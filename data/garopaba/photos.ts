export const manPortraits = [
  "m10", "m12", "m14", "m15", "m18", "m20", "m22", "m25", "m28", "m30",
  "m32", "m34", "m36", "m38", "m40", "m42", "m44", "m46", "m48", "m51",
  "m53", "m55", "m57", "m60", "m62", "m64", "m66", "m68", "m70", "m72",
  "m75", "m77", "m80", "m82", "m85", "m88", "m90", "m91",
].map((id) => `/guardos/avatars/garopaba/${id}.jpg`);

export const womanPortraits = [
  "w11", "w13", "w16", "w17", "w19", "w21", "w23", "w26", "w29", "w31",
  "w33", "w35", "w37", "w39", "w41", "w43", "w45", "w47", "w50", "w52",
  "w54", "w56", "w58", "w61",
].map((id) => `/guardos/avatars/garopaba/${id}.jpg`);

const womanFirstNames = new Set([
  "Ana",
  "Beatriz",
  "Camila",
  "Juliana",
  "Larissa",
  "Mariana",
  "Aline",
  "Patrícia",
  "Renata",
  "Carolina",
  "Fernanda",
  "Isabela",
  "Natália",
  "Priscila",
  "Sabrina",
  "Tatiana",
  "Daniela",
]);

export function portraitFor(firstName: string, genderIndex: number) {
  const pool = womanFirstNames.has(firstName) ? womanPortraits : manPortraits;
  return pool[genderIndex % pool.length];
}

export const beachPhotos: Record<string, string> = {
  gamboa: "/guardos/beaches/gamboa.jpg",
  siriu: "/guardos/beaches/siriu.jpg",
  centro: "/guardos/beaches/centro.jpg",
  vigia: "/guardos/beaches/vigia.jpg",
  silveira: "/guardos/beaches/silveira.jpg",
  ferrugem: "/guardos/beaches/ferrugem.jpg",
  barra: "/guardos/beaches/barra.jpg",
  ouvidor: "/guardos/beaches/ouvidor.jpg",
};

export function beachPhoto(beachId: string) {
  return beachPhotos[beachId] ?? "/guardos/beaches/centro.jpg";
}

/** Real Garopaba beach photos from Wikimedia Commons (CC). Not official CBMSC post catalogs. */
export const beachPhotoCredit =
  "Fotos das praias: Wikimedia Commons. Os edifícios oficiais dos postos estão no Instagram do CBMSC Garopaba — ainda sem ficheiro libertado para a app.";
