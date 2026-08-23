import { en } from "./en";
import { pt } from "./pt";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };

export const locales: Locale[] = ["pt", "en"];

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? pt;
}

export function localePath(locale: Locale, hash = "") {
  const base = locale === "en" ? "/en" : "/";
  return hash ? `${base}${hash}` : base;
}
