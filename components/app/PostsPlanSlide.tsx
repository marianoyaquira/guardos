"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, X } from "lucide-react";
import { MapStatusPill } from "@/components/app/MapStatusPill";
import { demoSessions, type PostId } from "@/data/demoSessions";
import { neededPosts } from "@/data/operationSetup";
import { useOperation } from "@/lib/operation-context";
import {
  buildWeekPlan,
  groupPlanByDay,
  postForPerson,
  type PlanSlot,
} from "@/lib/weekPlan";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

function dayStamp(dateKey: string) {
  return `${dateKey.slice(8)}/${dateKey.slice(5, 7)}`;
}

export function PostsPlanSlide() {
  const { t } = useI18n();
  const op = useOperation();
  const [selectedPost, setSelectedPost] = useState<PostId | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const posts = neededPosts(op.needs);
  const hours = demoSessions
    .filter((session) => op.needs.windows.includes(session.id))
    .map((session) => `${session.startTime}–${session.endTime}`)
    .join(" · ");
  const slots = useMemo(
    () => buildWeekPlan(op.needs, op.roster, op.overrides),
    [op.needs, op.roster, op.overrides],
  );
  const days = groupPlanByDay(slots);
  const nextSlot = slots.find((slot) => slot.open);

  if (!op.setupOpen) return null;

  const person = op.roster.find((row) => row.initials === selectedPerson);

  function selectPost(id: PostId) {
    setSelectedPost(id);
    setSelectedPerson(null);
  }

  function selectPerson(initials: string) {
    setSelectedPerson(initials);
    setSelectedPost(null);
  }

  return (
    <aside
      className={cn(
        "absolute inset-y-0 left-0 z-10 flex w-full max-w-[26rem] flex-col border-r border-[#E6EEF2] bg-white shadow-[16px_0_40px_rgb(7_27_51_/_0.1)]",
        op.setupFocus === "setup" && "hidden lg:flex",
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#E6EEF2] px-4 py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">{t.app.postsPlanTitle}</p>
          <p className="mt-1 text-xs text-navy/50">{t.app.postsPlanLead}</p>
        </div>
        <button
          type="button"
          onClick={op.closeSetup}
          className="grid h-9 w-9 place-items-center rounded-lg text-navy/50 hover:bg-[#F3F8FA] hover:text-navy"
          aria-label={t.header.closeMenu}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 border-b border-[#E6EEF2] px-3 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => op.focusSetup("posts")}
          className="rounded-lg bg-cyan px-3 py-1.5 text-xs font-semibold text-white"
        >
          {t.app.openPostsPlan}
        </button>
        <button
          type="button"
          onClick={() => op.focusSetup("setup")}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-navy/55 hover:bg-[#F3F8FA]"
        >
          {t.app.setupTitle}
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {!selectedPost && !selectedPerson && (
          <>
            <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
              {t.app.postsToCover} · {t.app.nextSevenDays}
            </p>
            {hours && (
              <p className="mt-1 text-[11px] text-navy/45">
                {t.app.operatingHours}: {hours}
              </p>
            )}
            <ul className="mt-2 space-y-1.5">
              {posts.map((id) => {
                const current = nextSlot?.assignments[id];
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => selectPost(id)}
                      className="flex w-full items-center gap-3 rounded-xl border border-[#E6EEF2] px-3 py-2.5 text-left hover:border-cyan/40"
                    >
                      {current ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={current.photo}
                          alt={current.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-navy/8 text-[10px] text-navy/35">
                          —
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-navy">
                          {postLabel(id, t)}
                        </span>
                        <span className="block text-[11px] text-navy/45">
                          {current
                            ? `${current.name} · ${t.app.timeOnThisPost} ${current.minutesOnPost} ${t.ui.minutes} · ${t.ui.nextSwap} ${current.nextSwap}`
                            : t.app.dayOff}
                        </span>
                      </span>
                      {current && <MapStatusPill status={current.status} compact />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
              {t.app.tabPeople}
            </p>
            <ul className="mt-2 space-y-1.5">
              {op.roster
                .filter((row) => row.available)
                .map((row) => {
                  const where = nextSlot
                    ? postForPerson(nextSlot, row.initials)
                    : null;
                  return (
                    <li key={row.id}>
                      <button
                        type="button"
                        onClick={() => selectPerson(row.initials)}
                        className="flex w-full items-center gap-3 rounded-xl border border-[#E6EEF2] px-3 py-2.5 text-left hover:border-cyan/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={row.photo}
                          alt={row.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-navy">
                            {row.name}
                          </span>
                          <span className="block text-[11px] text-navy/45">
                            {where ? postLabel(where, t) : t.app.offWater}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </>
        )}

        {selectedPost && (
          <section>
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-navy/55 hover:text-navy"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {t.app.planBack}
            </button>
            <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
              {t.app.nextOnPost}
            </p>
            <p className="mt-1 text-base font-semibold text-navy">
              {postLabel(selectedPost, t)}
            </p>
            <p className="mt-0.5 text-[11px] text-navy/45">
              {t.app.nextSevenDays}
              {hours ? ` · ${hours}` : ""}
            </p>
            <WeekTimeline
              days={days}
              renderSlot={(slot) => {
                const assignment = slot.assignments[selectedPost];
                if (!assignment) {
                  return <p className="text-xs text-navy/45">{t.app.offWater}</p>;
                }
                return (
                  <button
                    type="button"
                    onClick={() => selectPerson(assignment.initials)}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assignment.photo}
                      alt={assignment.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-navy">
                        {assignment.name}
                      </span>
                      <span className="block text-[11px] text-navy/45">
                        {slot.startTime}–{slot.endTime} · {t.app.timeOnThisPost}{" "}
                        {assignment.minutesOnPost} {t.ui.minutes} · {t.ui.nextSwap}{" "}
                        {assignment.nextSwap}
                      </span>
                    </span>
                    <MapStatusPill status={assignment.status} compact />
                  </button>
                );
              }}
            />
          </section>
        )}

        {selectedPerson && person && (
          <section>
            <button
              type="button"
              onClick={() => setSelectedPerson(null)}
              className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-navy/55 hover:text-navy"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {t.app.planBack}
            </button>
            <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
              {t.app.whereTheyWillBe}
            </p>
            <p className="mt-1 text-base font-semibold text-navy">{person.name}</p>
            <p className="mt-0.5 text-[11px] text-navy/45">{t.app.nextSevenDays}</p>
            <WeekTimeline
              days={days}
              renderSlot={(slot) => {
                const postId = postForPerson(slot, selectedPerson);
                const assignment = postId ? slot.assignments[postId] : null;
                if (!postId || !assignment) {
                  return (
                    <p className="text-xs text-navy/45">
                      {slot.startTime}–{slot.endTime} · {t.app.offWater}
                    </p>
                  );
                }
                return (
                  <button
                    type="button"
                    onClick={() => selectPost(postId)}
                    className="w-full text-left"
                  >
                    <p className="text-sm font-semibold text-navy">
                      {postLabel(postId, t)}
                    </p>
                    <p className="text-[11px] text-navy/45">
                      {slot.startTime}–{slot.endTime} · {assignment.minutesOnPost}{" "}
                      {t.ui.minutes} · {t.ui.nextSwap} {assignment.nextSwap}
                    </p>
                  </button>
                );
              }}
            />
          </section>
        )}
      </div>
    </aside>
  );
}

function WeekTimeline({
  days,
  renderSlot,
}: {
  days: ReturnType<typeof groupPlanByDay>;
  renderSlot: (slot: PlanSlot) => ReactNode;
}) {
  const { t } = useI18n();
  return (
    <ul className="mt-2 overflow-hidden rounded-2xl border border-[#E6EEF2]">
      {days.map((day) => (
        <li key={day.dateKey} className="border-b border-[#F0F4F7] last:border-b-0">
          <p className="bg-[#F7FAFC] px-3 py-1.5 text-[11px] font-semibold text-navy/55">
            {t.app.weekdays[day.weekday]} {dayStamp(day.dateKey)}
          </p>
          {!day.open ? (
            <p className="px-3 py-2.5 text-xs text-navy/45">{t.app.dayOff}</p>
          ) : (
            <ul className="divide-y divide-[#F0F4F7]">
              {day.slots.map((slot) => (
                <li key={`${slot.dateKey}-${slot.sessionId}`} className="px-3 py-2.5">
                  {renderSlot(slot)}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
