"use client";

import { useState } from "react";
import { AppScreenHeader } from "@/components/app/AppScreenHeader";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import { defaultSessionId, demoSessions, mapPosts } from "@/data/demoSessions";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

export function RostersScreen() {
  const { t } = useI18n();
  const [sessionId, setSessionId] = useState(defaultSessionId);
  const session = demoSessions.find((item) => item.id === sessionId) ?? demoSessions[1];

  return (
    <div className="min-w-0 space-y-5">
      <AppScreenHeader title={t.ui.navRosters} lead={t.app.rostersLead} />

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {demoSessions.map((item) => {
          const active = item.id === session.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSessionId(item.id)}
              className={cn(
                "min-w-[7.5rem] rounded-xl border px-3 py-2.5 text-left",
                active
                  ? "border-cyan bg-cyan text-white"
                  : "border-[#E6EEF2] bg-white text-navy hover:border-cyan/40",
              )}
            >
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase">
                {item.startTime}–{item.endTime}
              </p>
              <p className="mt-1 text-sm font-medium">{item.team}</p>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E6EEF2] text-[10px] tracking-[0.08em] text-navy/35 uppercase">
                <th className="px-4 py-3 font-medium">{t.app.post}</th>
                <th className="px-4 py-3 font-medium">{t.ui.lifeguard}</th>
                <th className="px-4 py-3 font-medium">{t.ui.timeOnPost}</th>
                <th className="px-4 py-3 font-medium">{t.ui.nextSwap}</th>
                <th className="px-4 py-3 font-medium">{t.ui.status}</th>
              </tr>
            </thead>
            <tbody>
              {mapPosts.map((post) => {
                const assignment = session.assignments[post.id];
                return (
                  <tr key={post.id} className="border-t border-[#F0F4F7]">
                    <td className="px-4 py-3 font-medium text-navy">
                      {postLabel(post.id, t)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={assignment.photo}
                          alt={assignment.name}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        {assignment.name}
                      </span>
                    </td>
                    <td className="tabular px-4 py-3 text-navy/65">
                      {assignment.minutesOnPost} {t.ui.minutes}
                    </td>
                    <td className="tabular px-4 py-3 text-navy/65">{assignment.nextSwap}</td>
                    <td className="px-4 py-3">
                      <MapStatusPill status={assignment.status} compact />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
