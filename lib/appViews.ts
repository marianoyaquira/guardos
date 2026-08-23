export const appViews = [
  "mapa",
  "escalas",
  "fadiga",
  "equipe",
  "relatorios",
  "estoque",
  "config",
] as const;

export type AppView = (typeof appViews)[number];

export function isAppView(value: string): value is AppView {
  return (appViews as readonly string[]).includes(value);
}
