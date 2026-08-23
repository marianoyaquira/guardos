"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { defaultSessionId, demoSessions, mapPosts } from "@/data/demoSessions";
import { useAppNav } from "@/lib/app-nav";
import { useOperation } from "@/lib/operation-context";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";

export function TeamScreen() {
  const { t } = useI18n();
  const { roster, liveSession, openSetup } = useOperation();
  const openView = useAppNav();
  const session = liveSession(
    demoSessions.find((item) => item.id === defaultSessionId) ?? demoSessions[1],
  );
  const onDuty = new Map(
    mapPosts.map((post) => [session.assignments[post.id].initials, post.id]),
  );

  return (
    <div className="min-w-0 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <AppScreenHeader title={t.ui.navTeam} lead={t.app.teamLead} />
        <button
          type="button"
          onClick={() => {
            openSetup("people");
            openView("sessao");
          }}
          className="mt-1 shrink-0 rounded-xl bg-cyan px-3 py-2 text-xs font-semibold text-white"
        >
          {t.app.addPerson}
        </button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {roster.map((person) => {
          const postId = onDuty.get(person.initials);
          return (
            <li
              key={person.id}
              className="flex items-center gap-3 rounded-2xl border border-[#E6EEF2] bg-white p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={person.photo}
                alt={person.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-navy">{person.name}</p>
                <p className="text-xs text-navy/45">
                  {person.initials} ·{" "}
                  {person.role === "lead" ? t.app.roleLead : t.app.roleLifeguard}
                  {person.age ? ` · ${person.age}` : ""}
                </p>
                <p className="mt-1 text-xs text-navy/60">
                  {postId ? `${t.app.onPost} · ${postLabel(postId, t)}` : t.app.offWater}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
