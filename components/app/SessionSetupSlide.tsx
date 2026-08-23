"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { defaultSessionId, demoSessions, type PostId } from "@/data/demoSessions";
import {
  basePostIds,
  extraPostIds,
  neededPosts,
  weekdays,
} from "@/data/operationSetup";
import { PostsPlanSlide } from "@/components/app/PostsPlanSlide";
import { fillAssignments } from "@/lib/fillSession";
import { useOperation, type SetupTab } from "@/lib/operation-context";
import { postLabel } from "@/lib/localizeDemo";
import { useI18n } from "@/lib/i18n-context";
import { cn } from "@/lib/cn";

function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function SessionSetupSlide() {
  const { t } = useI18n();
  const op = useOperation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState<"lifeguard" | "lead">("lifeguard");
  const [windowId, setWindowId] = useState(defaultSessionId);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!op.setupOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") op.closeSetup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [op]);

  if (!op.setupOpen) return null;

  const session =
    demoSessions.find((item) => item.id === windowId) ?? demoSessions[1];
  const needed = neededPosts(op.needs);
  const preview = fillAssignments(session, op.roster, needed);
  const available = op.roster.filter((person) => person.available);
  const tabs: SetupTab[] = ["posts", "people", "needs", "fill"];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:left-[248px]">
      <div className="flex items-start justify-between gap-3 border-b border-[#E6EEF2] px-4 py-4 md:px-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">{t.app.setupTitle}</p>
          <p className="mt-1 text-xs text-navy/50">
            {op.setupTab === "posts" ? t.app.postsPlanLead : t.app.setupLead}
          </p>
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

      <div className="flex flex-wrap gap-1 border-b border-[#E6EEF2] px-3 py-2 md:px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => op.openSetup(tab)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold",
              op.setupTab === tab
                ? "bg-cyan text-white"
                : "text-navy/55 hover:bg-[#F3F8FA] hover:text-navy",
            )}
          >
            {tab === "posts"
              ? t.app.postsToCover
              : tab === "people"
                ? t.app.tabPeople
                : tab === "needs"
                  ? t.app.tabNeeds
                  : t.app.tabFill}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6">
        {op.setupTab === "posts" && <PostsPlanSlide />}

          {op.setupTab === "people" && (
            <div className="grid max-w-5xl gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
              <form
                className="space-y-3 rounded-2xl border border-[#E6EEF2] p-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!name.trim()) return;
                  op.addPerson({
                    name: name.trim(),
                    age: age ? Number(age) : undefined,
                    photo,
                    role,
                  });
                  setName("");
                  setAge("");
                  setPhoto("");
                  setRole("lifeguard");
                }}
              >
                <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                  {t.app.addPerson}
                </p>
                <label className="block">
                  <span className="text-[11px] text-navy/45">{t.app.fieldName}</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm text-navy outline-none focus:border-cyan"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-navy/45">{t.app.fieldAge}</span>
                  <input
                    type="number"
                    min={16}
                    max={80}
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm text-navy outline-none focus:border-cyan"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-navy/45">{t.app.fieldPhoto}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full text-xs text-navy/60"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setPhoto(await readPhoto(file));
                    }}
                  />
                </label>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : null}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("lifeguard")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold",
                      role === "lifeguard"
                        ? "bg-cyan text-white"
                        : "border border-[#E6EEF2] text-navy/60",
                    )}
                  >
                    {t.app.roleLifeguard}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("lead")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold",
                      role === "lead"
                        ? "bg-cyan text-white"
                        : "border border-[#E6EEF2] text-navy/60",
                    )}
                  >
                    {t.app.roleLead}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan py-2.5 text-sm font-semibold text-white"
                >
                  {t.app.addPerson}
                </button>
              </form>

              <ul className="space-y-2">
                {op.roster.map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center gap-3 rounded-2xl border border-[#E6EEF2] px-3 py-2.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-navy/45">
                        {person.initials} ·{" "}
                        {person.role === "lead" ? t.app.roleLead : t.app.roleLifeguard}{" "}
                        · {person.age ?? t.app.ageUnset}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        op.updatePerson(person.id, { available: !person.available })
                      }
                      className={cn(
                        "rounded-lg px-2 py-1 text-[10px] font-semibold",
                        person.available
                          ? "bg-[#E8F6EE] text-[#1B7A4A]"
                          : "bg-navy/8 text-navy/40",
                      )}
                    >
                      {t.app.available}
                    </button>
                    {!person.seeded && (
                      <button
                        type="button"
                        onClick={() => op.removePerson(person.id)}
                        className="text-[10px] font-semibold text-[#C24141]"
                      >
                        {t.app.removePerson}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {op.setupTab === "needs" && (
            <div className="space-y-5">
              <section>
                <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                  {t.app.basePosts}
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {basePostIds.map((id) => (
                    <NeedChip
                      key={id}
                      id={id}
                      on={op.needs.requiredPosts.includes(id)}
                      onToggle={() => op.toggleRequired(id)}
                    />
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                  {t.app.extraPosts}
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {extraPostIds.map((id) => (
                    <NeedChip
                      key={id}
                      id={id}
                      on={op.needs.extraPosts.includes(id)}
                      onToggle={() => op.toggleExtra(id)}
                    />
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                  {t.app.operatingDays}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {weekdays.map((day) => {
                    const on = op.needs.days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => op.toggleDay(day)}
                        className={cn(
                          "rounded-lg px-2.5 py-1.5 text-xs font-semibold",
                          on
                            ? "bg-cyan text-white"
                            : "border border-[#E6EEF2] text-navy/55",
                        )}
                      >
                        {t.app.weekdays[day]}
                      </button>
                    );
                  })}
                </div>
              </section>
              <section>
                <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                  {t.app.operatingHours}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {demoSessions.map((item) => {
                    const on = op.needs.windows.includes(item.id);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => op.toggleWindow(item.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm",
                            on
                              ? "border-cyan bg-cyan/8 text-navy"
                              : "border-[#E6EEF2] text-navy/45",
                          )}
                        >
                          <span className="tabular font-semibold">
                            {item.startTime}–{item.endTime}
                          </span>
                          <span className="text-xs">{item.team}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          )}

          {op.setupTab === "fill" && (
            <div className="space-y-4">
              <p className="text-xs text-navy/50">{t.app.fillHint}</p>
              <p className="text-sm text-navy">
                {t.app.neededCount.replace("{n}", String(needed.length))} ·{" "}
                {t.app.peopleCount.replace("{n}", String(available.length))}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {demoSessions
                  .filter((item) => op.needs.windows.includes(item.id))
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setWindowId(item.id);
                        setFilled(false);
                      }}
                      className={cn(
                        "shrink-0 rounded-xl border px-3 py-2 text-left",
                        windowId === item.id
                          ? "border-cyan bg-cyan text-white"
                          : "border-[#E6EEF2] bg-white text-navy",
                      )}
                    >
                      <span className="block text-[11px] font-semibold">
                        {item.startTime}–{item.endTime}
                      </span>
                    </button>
                  ))}
              </div>
              <ul className="divide-y divide-[#F0F4F7] overflow-hidden rounded-2xl border border-[#E6EEF2]">
                {needed.map((id) => {
                  const assignment = preview[id];
                  return (
                    <li key={id} className="flex items-center gap-3 px-3 py-2.5">
                      {assignment ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={assignment.photo}
                          alt={assignment.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-navy/8 text-[10px] text-navy/40">
                          —
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-navy">
                          {postLabel(id, t)}
                        </span>
                        <span className="block text-[11px] text-navy/45">
                          {assignment?.name ?? "—"}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => {
                  op.applyFill(windowId);
                  setFilled(true);
                }}
                className="w-full rounded-xl bg-cyan py-2.5 text-sm font-semibold text-white"
              >
                {t.app.applyFill}
              </button>
              {filled && (
                <p className="text-center text-xs text-[#1B7A4A]">{t.app.sessionFilled}</p>
              )}
            </div>
          )}
        </div>
    </div>
  );
}

function NeedChip({
  id,
  on,
  onToggle,
}: {
  id: PostId;
  on: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold",
          on ? "border-cyan bg-cyan/8 text-navy" : "border-[#E6EEF2] text-navy/40",
        )}
      >
        {postLabel(id, t)}
      </button>
    </li>
  );
}
