"use client";

import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { defaultSessionId, demoSessions, mapPosts, people } from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";

export function TeamScreen() {
  const { t } = useI18n();
  const session = demoSessions.find((item) => item.id === defaultSessionId) ?? demoSessions[1];
  const onDuty = new Map(
    mapPosts.map((post) => [session.assignments[post.id].initials, post.id]),
  );

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navTeam} lead={t.app.teamLead} />
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Object.values(people).map((person) => {
          const postId = onDuty.get(person.initials);
          return (
            <li
              key={person.initials}
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
                  {person.initials} · {t.app.roleLifeguard}
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
