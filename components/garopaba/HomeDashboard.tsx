"use client";

import { CalendarRange, Map, Shield, Waves } from "lucide-react";
import { beachPhoto, beachPhotoCredit } from "@/data/garopaba/photos";
import { demoClock, demoDay } from "@/data/garopaba/seed";
import {
  beachCoverage,
  municipalityCoverage,
  openAlerts,
} from "@/lib/coastal/coverage";
import { useGaropaba } from "@/lib/garopaba-context";
import { cn } from "@/lib/cn";

export function HomeDashboard({
  onOpenMap,
  onOpenRosters,
  onOpenOperation,
  onOpenFatigue,
}: {
  onOpenMap: (beachId?: string) => void;
  onOpenRosters: () => void;
  onOpenOperation: () => void;
  onOpenFatigue: () => void;
}) {
  const op = useGaropaba();
  const city = municipalityCoverage(op.beaches, op.posts, op.assignments, op.staffingMode);
  const alerts = openAlerts(
    op.beaches,
    op.posts,
    op.assignments,
    op.incidents,
    op.staffingMode,
    op.attentionMinutes,
    op.highMinutes,
  );
  const openIncidents = op.incidents.filter((item) => item.status !== "encerrada");
  const shortBeaches = op.beaches.filter((beach) => {
    const cover = beachCoverage(beach.id, op.posts, op.assignments, op.staffingMode);
    return cover.present < cover.target;
  });
  const hero = beachPhoto("ferrugem");

  return (
    <div className="min-w-0 max-w-full space-y-5">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-[#1A3A4A] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero}
          alt="Praia da Ferrugem, Garopaba"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071b33] via-[#0c2744]/70 to-[#F4A261]/25" />
        <div className="relative px-5 py-8 sm:px-7 sm:py-10">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F6E7C1] uppercase">
            Costa de Garopaba · Operação Veraneio
          </p>
          <h1 className="mt-2 max-w-lg text-[1.85rem] leading-tight font-semibold tracking-[-0.04em] sm:text-[2.15rem]">
            Um verão, oito praias, um comando.
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/80">
            {op.season.name} · {op.season.defaultStartTime}–{op.season.defaultEndTime} ·{" "}
            {demoDay} · {demoClock}
          </p>
          <p
            className={cn(
              "mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold",
              op.operationOpen
                ? "bg-[#F4A261] text-[#3B2410]"
                : "bg-white/15 text-white",
            )}
          >
            {op.operationOpen ? "Operação aberta" : "Operação encerrada"}
          </p>
        </div>
      </section>

      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <DashKpi
          label="Guarda-vidas"
          value={`${city.present} / ${city.target}`}
          tone={city.present >= city.target ? "ok" : "warm"}
        />
        <DashKpi
          label="Postos cobertos"
          value={`${city.coveredPosts} / ${city.totalPosts}`}
          tone={city.coveredPosts >= city.totalPosts ? "ok" : "warm"}
        />
        <DashKpi label="Cobertura" value={`${city.percent}%`} tone="sea" />
        <DashKpi
          label="Alertas"
          value={String(alerts)}
          tone={alerts > 0 ? "alert" : "ok"}
        />
      </ul>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#C9862A] uppercase">
              Norte → sul
            </p>
            <h2 className="text-lg font-semibold tracking-[-0.03em] text-navy">
              As praias desta manhã
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenMap()}
            className="text-xs font-semibold text-cyan"
          >
            Abrir mapa
          </button>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {op.beaches
            .filter((beach) => beach.active)
            .map((beach) => {
              const cover = beachCoverage(
                beach.id,
                op.posts,
                op.assignments,
                op.staffingMode,
              );
              const ok = cover.present >= cover.target;
              return (
                <li key={beach.id} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onOpenMap(beach.id)}
                    className="w-full overflow-hidden rounded-2xl border border-[#E8D9C4] bg-white text-left shadow-[0_8px_20px_rgb(120_80_30_/_0.06)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={beachPhoto(beach.id)}
                      alt={`Praia ${beach.name}`}
                      className="h-24 w-full object-cover"
                    />
                    <span className="block px-3 py-2.5">
                      <span className="block truncate text-sm font-semibold text-navy">
                        {beach.name}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-[11px] font-semibold",
                          ok ? "text-[#1B7A4A]" : "text-[#C9862A]",
                        )}
                      >
                        {cover.present} / {cover.target}
                        {ok ? " · coberta" : " · pendente"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
        <p className="mt-2 max-w-full text-[11px] break-words text-navy/35">
          {beachPhotoCredit}
        </p>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#E8D9C4] bg-[#FFF8EE] p-4">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#C9862A] uppercase">
            Onde falta gente
          </p>
          {shortBeaches.length === 0 ? (
            <p className="mt-2 text-sm text-navy/60">Nenhuma praia abaixo da dotação nesta demo.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {shortBeaches.map((beach) => {
                const cover = beachCoverage(
                  beach.id,
                  op.posts,
                  op.assignments,
                  op.staffingMode,
                );
                return (
                  <li key={beach.id}>
                    <button
                      type="button"
                      onClick={() => onOpenMap(beach.id)}
                      className="flex w-full items-center justify-between text-left text-sm"
                    >
                      <span className="font-semibold text-navy">{beach.name}</span>
                      <span className="tabular text-[#C9862A]">
                        {cover.present}/{cover.target}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </article>
        <article className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
            Ocorrências abertas
          </p>
          {openIncidents.length === 0 ? (
            <p className="mt-2 text-sm text-navy/60">Nenhuma ocorrência aberta nesta demo.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {openIncidents.map((item) => {
                const beach = op.beaches.find((row) => row.id === item.beachId);
                return (
                  <li key={item.id} className="text-sm">
                    <span className="font-semibold text-navy">{item.type}</span>
                    <span className="text-navy/50"> · {beach?.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </article>
      </div>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Quick
          icon={Map}
          label="Mapa da costa"
          onClick={() => onOpenMap()}
        />
        <Quick icon={Waves} label="Abrir operação" onClick={onOpenOperation} />
        <Quick icon={CalendarRange} label="Escalas" onClick={onOpenRosters} />
        <Quick icon={Shield} label="Fadiga" onClick={onOpenFatigue} />
      </section>
    </div>
  );
}

function DashKpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "warm" | "sea" | "alert";
}) {
  return (
    <li
      className={cn(
        "rounded-2xl border px-3 py-3",
        tone === "ok" && "border-[#CDE8D8] bg-[#F3FBF6]",
        tone === "warm" && "border-[#F0D7B0] bg-[#FFF8EE]",
        tone === "sea" && "border-[#C7E4EA] bg-[#F3FAFB]",
        tone === "alert" && "border-[#F3C8C8] bg-[#FFF6F6]",
      )}
    >
      <p className="text-[11px] text-navy/40">{label}</p>
      <p className="tabular mt-1 text-xl font-semibold tracking-[-0.03em] text-navy">
        {value}
      </p>
    </li>
  );
}

function Quick({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Map;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-0 items-center gap-2 rounded-2xl border border-[#E8D9C4] bg-white px-3 py-3 text-left text-sm leading-snug font-semibold text-navy"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#C9862A]" strokeWidth={1.8} />
      <span className="min-w-0">{label}</span>
    </button>
  );
}
