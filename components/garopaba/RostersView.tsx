"use client";

import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { beachPhoto, beachPhotoCredit } from "@/data/garopaba/photos";
import { demoDay } from "@/data/garopaba/seed";
import { useGaropaba } from "@/lib/garopaba-context";
import {
  dayNumber,
  monthKey,
  personSeason,
  postSeason,
  seasonDateKeys,
  seasonMonths,
  weekdayLabel,
} from "@/lib/coastal/seasonPlan";
import { cn } from "@/lib/cn";

export function RostersView() {
  const op = useGaropaba();
  const keys = useMemo(() => seasonDateKeys(op.season), [op.season]);
  const months = useMemo(() => seasonMonths(keys), [keys]);
  const [month, setMonth] = useState(monthKey(demoDay));
  const [dateKey, setDateKey] = useState(demoDay);
  const [personId, setPersonId] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(null);
  const [beachFilter, setBeachFilter] = useState("todos");

  const days = keys.filter((key) => monthKey(key) === month);
  const rows = op
    .dayAssignments(dateKey)
    .filter((row) => (beachFilter === "todos" ? true : row.beachId === beachFilter));
  const person = op.people.find((row) => row.id === personId) ?? null;
  const post = op.posts.find((row) => row.id === postId) ?? null;
  const postBeach = post ? op.beaches.find((row) => row.id === post.beachId) : null;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[1.35rem] font-semibold tracking-[-0.03em]">Escalas</h1>
        <p className="mt-1 text-sm text-navy/55">
          {op.season.name} · {op.season.startsAt} → {op.season.endsAt}. Plano
          demonstrativo — não é escala oficial.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {months.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setMonth(item.key);
              const first = keys.find((key) => monthKey(key) === item.key);
              if (first) setDateKey(first);
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
              month === item.key ? "bg-cyan text-white" : "border border-[#E6EEF2] text-navy/60",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((key) => {
          const on = key === dateKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setDateKey(key);
                setPersonId(null);
                setPostId(null);
              }}
              className={cn(
                "min-w-0 rounded-xl border px-1 py-2 text-center",
                on
                  ? "border-cyan bg-cyan text-white"
                  : key === demoDay
                    ? "border-cyan/40 bg-white text-navy"
                    : "border-[#E6EEF2] bg-white text-navy/70",
              )}
            >
              <span className="block text-[10px] font-semibold uppercase">
                {weekdayLabel(key)}
              </span>
              <span className="block text-sm font-semibold">{dayNumber(key)}</span>
            </button>
          );
        })}
      </div>

      {!person && !post && (
        <>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              label="Todas"
              on={beachFilter === "todos"}
              onClick={() => setBeachFilter("todos")}
            />
            {op.beaches.map((beach) => (
              <FilterChip
                key={beach.id}
                label={beach.name}
                on={beachFilter === beach.id}
                onClick={() => setBeachFilter(beach.id)}
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                Pessoas · {dateKey}
              </p>
              <ul className="mt-2 space-y-1.5">
                {rows.map((row) => {
                  const who = op.people.find((item) => item.id === row.personId);
                  const beach = op.beaches.find((item) => item.id === row.beachId);
                  const place = op.posts.find((item) => item.id === row.postId);
                  if (!who) return null;
                  return (
                    <li key={row.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setPersonId(who.id);
                          setPostId(null);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl border border-[#E6EEF2] bg-white px-3 py-2.5 text-left hover:border-cyan/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={who.photo}
                          alt={who.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{who.name}</span>
                          <span className="block text-[11px] text-navy/45">
                            {beach?.name} · {place?.code} · {row.attendance}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                Postos · {dateKey}
              </p>
              <ul className="mt-2 space-y-1.5">
                {op.posts
                  .filter((item) => item.active)
                  .filter((item) =>
                    beachFilter === "todos" ? true : item.beachId === beachFilter,
                  )
                  .map((item) => {
                    const beach = op.beaches.find((row) => row.id === item.beachId);
                    const crew = rows.filter((row) => row.postId === item.id);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setPostId(item.id);
                            setPersonId(null);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl border border-[#E6EEF2] bg-white px-3 py-2.5 text-left hover:border-cyan/40"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={beachPhoto(item.beachId)}
                            alt=""
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {item.code} · {beach?.name}
                            </span>
                            <span className="block text-[11px] text-navy/45">
                              {crew.length} na escala deste dia
                            </span>
                          </span>
                          <span className="flex -space-x-2">
                            {crew.slice(0, 3).map((row) => {
                              const who = op.people.find((person) => person.id === row.personId);
                              if (!who) return null;
                              return (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  key={row.id}
                                  src={who.photo}
                                  alt={who.name}
                                  className="h-7 w-7 rounded-full border border-white object-cover"
                                />
                              );
                            })}
                          </span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </section>
          </div>
        </>
      )}

      {person && (
        <section>
          <BackButton
            onClick={() => setPersonId(null)}
          />
          <div className="mt-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.photo}
              alt={person.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
                Onde fica na temporada
              </p>
              <p className="text-lg font-semibold">{person.name}</p>
              <p className="text-xs text-navy/45">
                {person.role === "chefe" ? "Chefe de posto" : "Guarda-vidas"}
              </p>
            </div>
          </div>
          <SeasonGrid
            days={days}
            selected={dateKey}
            onSelect={setDateKey}
            cells={personSeason(
              person.id,
              days,
              op.posts,
              op.people,
              op.assignments,
              op.dayPatches,
            ).map((item) => ({
              dateKey: item.dateKey,
              title: item.row?.attendance === "folga" ? "Folga" : (item.post?.code ?? "—"),
              detail: item.row?.attendance ?? "",
            }))}
          />
        </section>
      )}

      {post && postBeach && (
        <section>
          <BackButton onClick={() => setPostId(null)} />
          <div className="relative mt-2 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beachPhoto(postBeach.id)}
              alt={`Praia ${postBeach.name}`}
              className="h-40 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-4 py-3 text-white">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase opacity-80">
                Quem cobre na temporada
              </p>
              <p className="text-lg font-semibold">
                {post.code} · {postBeach.name}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-navy/40">{beachPhotoCredit}</p>
          <SeasonGrid
            days={days}
            selected={dateKey}
            onSelect={setDateKey}
            cells={postSeason(
              post.id,
              days,
              op.posts,
              op.people,
              op.beaches,
              op.assignments,
              op.dayPatches,
            ).map((item) => ({
              dateKey: item.dateKey,
              title:
                item.people.length > 0
                  ? item.people.map((who) => who.initials).join(" · ")
                  : "Sem escala",
              detail: `${item.people.length} GV`,
              photos: item.people.map((who) => who.photo),
            }))}
          />
        </section>
      )}

      {!person && !post && (
        <DayManage
          dateKey={dateKey}
          rows={rows}
        />
      )}
    </div>
  );
}

function DayManage({
  dateKey,
  rows,
}: {
  dateKey: string;
  rows: ReturnType<ReturnType<typeof useGaropaba>["dayAssignments"]>;
}) {
  const op = useGaropaba();
  return (
    <div className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
        Gerir este dia
      </p>
      <ul className="mt-2 divide-y divide-[#F0F4F7]">
        {rows.slice(0, 12).map((row) => {
          const who = op.people.find((item) => item.id === row.personId);
          if (!who) return null;
          return (
            <li key={row.id} className="flex flex-wrap items-center gap-2 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={who.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
              <span className="min-w-[8rem] flex-1 text-sm font-semibold">{who.name}</span>
              <select
                value={row.postId}
                onChange={(event) => op.movePersonOnDay(dateKey, who.id, event.target.value)}
                className="rounded-lg border border-[#E6EEF2] px-2 py-1 text-xs"
              >
                {op.posts
                  .filter((post) => post.beachId === row.beachId)
                  .map((post) => (
                    <option key={post.id} value={post.id}>
                      {post.code}
                    </option>
                  ))}
              </select>
              {(["presente", "atrasado", "ausente", "folga"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => op.setDayAttendance(dateKey, who.id, status)}
                  className={cn(
                    "rounded-lg px-2 py-1 text-[10px] font-semibold",
                    row.attendance === status ? "bg-cyan text-white" : "bg-navy/5 text-navy/50",
                  )}
                >
                  {status}
                </button>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SeasonGrid({
  days,
  cells,
  selected,
  onSelect,
}: {
  days: string[];
  selected: string;
  onSelect: (key: string) => void;
  cells: { dateKey: string; title: string; detail: string; photos?: string[] }[];
}) {
  return (
    <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {days.map((key) => {
        const cell = cells.find((item) => item.dateKey === key);
        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                "h-full w-full rounded-xl border px-2 py-2 text-left",
                selected === key
                  ? "border-cyan bg-cyan/8"
                  : "border-[#E6EEF2] bg-white",
              )}
            >
              <p className="text-[10px] font-semibold text-navy/40 uppercase">
                {weekdayLabel(key)} {dayNumber(key)}
              </p>
              <p className="mt-1 text-sm font-semibold text-navy">{cell?.title ?? "—"}</p>
              {cell?.photos && cell.photos.length > 0 && (
                <span className="mt-1 flex -space-x-1.5">
                  {cell.photos.slice(0, 3).map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-6 w-6 rounded-full border border-white object-cover"
                    />
                  ))}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold text-navy/55 hover:text-navy"
    >
      <ChevronLeft className="h-3.5 w-3.5" />
      Voltar às escalas
    </button>
  );
}

function FilterChip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-2.5 py-1.5 text-xs font-semibold",
        on ? "bg-cyan text-white" : "border border-[#E6EEF2] text-navy/55",
      )}
    >
      {label}
    </button>
  );
}
