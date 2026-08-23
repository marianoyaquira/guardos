import type { Dictionary } from "@/i18n";
import type { DemoSession, PostId } from "@/data/demoSessions";

export function teamLabel(team: string, t: Dictionary) {
  return team.includes("B") ? t.ui.teamB : t.ui.teamA;
}

export function sessionLabel(session: DemoSession, t: Dictionary) {
  const n = session.id.replace(/\D/g, "") || session.label;
  return t.ui.sessionLabel.replace("{n}", n);
}

export function postLabel(id: PostId | string, t: Dictionary) {
  return t.ui.postLabels[id] ?? id;
}

export function breakLabel(label: string, t: Dictionary) {
  const key = label.toLowerCase();
  if (key.includes("almo") || key.includes("lunch")) return t.ui.lunch;
  if (key.includes("pausa") || key.includes("break") || key.includes("intervalo")) {
    return t.ui.break;
  }
  return label;
}
