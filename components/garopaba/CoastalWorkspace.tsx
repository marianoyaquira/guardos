"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import {
  CalendarRange,
  ClipboardList,
  Boxes,
  LogOut,
  Map,
  MoreHorizontal,
  Settings,
  Shield,
  Sun,
  Users,
  Waves,
} from "lucide-react";
import { demoClock, demoDay } from "@/data/garopaba/seed";
import {
  beachCoverage,
  fatigueLevel,
  municipalityCoverage,
  openAlerts,
  presentOnPost,
  postTarget,
} from "@/lib/coastal/coverage";
import { useGaropaba } from "@/lib/garopaba-context";
import { cn } from "@/lib/cn";

const CoastalMap = dynamic(
  () => import("@/components/garopaba/CoastalMap").then((mod) => mod.CoastalMap),
  { ssr: false },
);

const views = [
  "mapa",
  "operacao",
  "escalas",
  "fadiga",
  "equipe",
  "ocorrencias",
  "estoque",
  "temporada",
  "config",
] as const;

type View = (typeof views)[number];

const labels: Record<View, string> = {
  mapa: "Mapa",
  operacao: "Operação",
  escalas: "Escalas",
  fadiga: "Fadiga",
  equipe: "Equipe",
  ocorrencias: "Ocorrências",
  estoque: "Inventário",
  temporada: "Temporada",
  config: "Configurações",
};

export function CoastalWorkspace() {
  const [view, setView] = useState<View>("mapa");
  const [moreOpen, setMoreOpen] = useState(false);
  const [beachId, setBeachId] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(null);

  function openView(next: View) {
    setView(next);
    setMoreOpen(false);
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-app-bg text-navy">
      <aside className="hidden h-screen w-[248px] shrink-0 flex-col border-r border-[#E6EEF2] bg-white lg:flex">
        <div className="px-5 pt-6 pb-5">
          <p className="text-[18px] font-semibold tracking-[0.14em] text-navy">
            GUARD<span className="text-cyan">OS</span>
          </p>
          <p className="mt-1 text-[10px] font-medium tracking-[0.12em] text-navy/40 uppercase">
            Garopaba · Operação Veraneio
          </p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {views.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => openView(id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium",
                view === id ? "bg-cyan text-white" : "text-navy/70 hover:bg-[#F3F8FA]",
              )}
            >
              <NavIcon id={id} />
              {labels[id]}
            </button>
          ))}
        </nav>
        <div className="border-t border-[#E6EEF2] p-4 text-xs text-navy/45">
          Demonstração · não é registro oficial
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0">
        <header className="border-b border-[#E6EEF2] bg-white px-4 py-3 lg:hidden">
          <p className="text-sm font-semibold tracking-[0.12em]">
            GUARD<span className="text-cyan">OS</span>
            <span className="ml-2 text-[10px] font-medium tracking-[0.1em] text-navy/40 uppercase">
              Garopaba
            </span>
          </p>
        </header>
        <div className="min-w-0 flex-1 overflow-y-auto p-3 md:p-4 lg:p-5">
          {view === "mapa" && (
            <MapView
              beachId={beachId}
              postId={postId}
              onBeach={(id) => {
                setBeachId(id);
                setPostId(null);
              }}
              onPost={setPostId}
            />
          )}
          {view === "operacao" && <OperationView />}
          {view === "escalas" && <PeopleView mode="escalas" />}
          {view === "fadiga" && <PeopleView mode="fadiga" />}
          {view === "equipe" && <PeopleView mode="equipe" />}
          {view === "ocorrencias" && <IncidentsView />}
          {view === "estoque" && <InventoryView />}
          {view === "temporada" && <SeasonView />}
          {view === "config" && <SettingsView />}
        </div>
      </div>

      {moreOpen && (
        <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 lg:hidden">
          <button
            type="button"
            className="fixed inset-0 bg-navy/30"
            onClick={() => setMoreOpen(false)}
          />
          <div className="relative mx-3 mb-2 overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
            {(["fadiga", "equipe", "ocorrencias", "estoque", "temporada", "config"] as View[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => openView(id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-navy/75"
                >
                  <NavIcon id={id} />
                  {labels[id]}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6EEF2] bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        <ul className="grid h-[4.25rem] grid-cols-4">
          {(["mapa", "operacao", "escalas"] as View[]).map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => openView(id)}
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                  view === id ? "text-cyan" : "text-navy/45",
                )}
              >
                <NavIcon id={id} />
                {labels[id]}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold text-navy/45"
            >
              <MoreHorizontal className="h-5 w-5" />
              Mais
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function NavIcon({ id }: { id: View }) {
  const Icon = {
    mapa: Map,
    operacao: Waves,
    escalas: CalendarRange,
    fadiga: Shield,
    equipe: Users,
    ocorrencias: ClipboardList,
    estoque: Boxes,
    temporada: Sun,
    config: Settings,
  }[id];
  return <Icon className="h-4 w-4" strokeWidth={1.8} />;
}

function DemoNote() {
  return (
    <p className="text-[11px] tracking-[0.04em] text-navy/35">
      Operação demonstrativa. Os registros não são oficiais.
    </p>
  );
}

function MapView({
  beachId,
  postId,
  onBeach,
  onPost,
}: {
  beachId: string | null;
  postId: string | null;
  onBeach: (id: string) => void;
  onPost: (id: string) => void;
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
  const post = op.posts.find((row) => row.id === postId) ?? null;
  const beach = op.beaches.find((row) => row.id === (post?.beachId ?? beachId)) ?? null;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-navy/40 uppercase">
          Guard OS · Garopaba
        </p>
        <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em]">
          Operação Veraneio · {op.season.defaultStartTime}–{op.season.defaultEndTime}
        </h1>
        <p className="mt-1 text-sm text-navy/50">
          {demoDay} · {demoClock} · {op.operationOpen ? "Operação aberta" : "Operação encerrada"}
        </p>
        <DemoNote />
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Kpi label="Guarda-vidas presentes" value={`${city.present} / ${city.target}`} />
        <Kpi label="Pontos cobertos" value={`${city.coveredPosts} / ${city.totalPosts}`} />
        <Kpi label="Cobertura" value={`${city.percent}%`} />
        <Kpi label="Alertas" value={String(alerts)} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-[min(68vh,640px)] overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
          <CoastalMap
            selectedBeachId={beachId}
            selectedPostId={postId}
            onSelectBeach={onBeach}
            onSelectPost={onPost}
          />
        </div>
        <aside className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
          {post && beach ? (
            <PostPanel postId={post.id} />
          ) : beach ? (
            <BeachPanel beachId={beach.id} onPost={onPost} />
          ) : (
            <p className="text-sm text-navy/50">
              Toque numa praia para ver os postos. Os pontos sem coordenada oficial
              aparecem ao redor do marco da praia — posição provisória e editável.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E6EEF2] bg-white px-3 py-3">
      <p className="text-[11px] text-navy/40">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function BeachPanel({
  beachId,
  onPost,
}: {
  beachId: string;
  onPost: (id: string) => void;
}) {
  const op = useGaropaba();
  const beach = op.beaches.find((row) => row.id === beachId);
  if (!beach) return null;
  const cover = beachCoverage(beach.id, op.posts, op.assignments, op.staffingMode);
  const posts = op.posts.filter((row) => row.beachId === beach.id && row.active);
  const incident = op.incidents.find(
    (item) => item.beachId === beach.id && item.status !== "encerrada",
  );
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
          Praia
        </p>
        <p className="text-lg font-semibold">{beach.name}</p>
        <p className="text-sm text-navy/50">
          {cover.present} / {cover.target} guarda-vidas · {cover.coveredPosts} /{" "}
          {cover.totalPosts} postos
        </p>
        {beach.anchorSource === "provisional" && (
          <p className="mt-1 text-[11px] text-navy/40">Marco geográfico provisório.</p>
        )}
      </div>
      {incident && (
        <p className="rounded-xl bg-[#FDECEC] px-3 py-2 text-xs font-semibold text-[#C24141]">
          Ocorrência ativa · {incident.type}
        </p>
      )}
      <ul className="space-y-1.5">
        {posts.map((post) => {
          const present = presentOnPost(op.assignments, post.id);
          const target = postTarget(post, op.staffingMode);
          return (
            <li key={post.id}>
              <button
                type="button"
                onClick={() => onPost(post.id)}
                className="flex w-full items-center justify-between rounded-xl border border-[#E6EEF2] px-3 py-2 text-left"
              >
                <span className="text-sm font-semibold">{post.code}</span>
                <span className="text-sm tabular text-navy/60">
                  {present} / {target}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Link
        href={`/app/garopaba/praias/${beach.slug}`}
        className="inline-flex text-sm font-semibold text-cyan"
      >
        Abrir praia
      </Link>
    </div>
  );
}

function PostPanel({ postId }: { postId: string }) {
  const op = useGaropaba();
  const post = op.posts.find((row) => row.id === postId);
  if (!post) return null;
  const beach = op.beaches.find((row) => row.id === post.beachId);
  const assigned = op.assignments.filter((row) => row.postId === post.id);
  const present = assigned.filter((row) => row.attendance === "presente");
  const target = postTarget(post, op.staffingMode);
  const chief = assigned
    .map((row) => op.people.find((person) => person.id === row.personId))
    .find((person) => person?.role === "chefe");
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
        {beach?.name} · {post.code}
      </p>
      <p className="text-lg font-semibold">{post.name}</p>
      <p className="text-sm text-navy/50">
        {present.length} / {target} presentes
        {present.length > target ? ` · +${present.length - target} apoio` : ""}
      </p>
      {post.latitude == null && (
        <p className="text-[11px] text-navy/40">
          Sem coordenada oficial do posto. Posição no mapa é provisória.
        </p>
      )}
      <p className="text-xs text-navy/50">
        Responsável: {chief?.name ?? "—"}
      </p>
      <ul className="space-y-2">
        {assigned.map((row) => {
          const person = op.people.find((item) => item.id === row.personId);
          if (!person) return null;
          return (
            <li key={row.id} className="flex items-center justify-between text-sm">
              <span>
                <span className="font-semibold">{person.name}</span>
                <span className="ml-2 text-[11px] text-navy/45">
                  {row.attendance}
                  {row.onBreak ? " · pausa" : ""}
                </span>
              </span>
              <span className="text-[11px] text-navy/40 tabular">
                {Math.floor(row.minutesOnDuty / 60)}h
                {String(row.minutesOnDuty % 60).padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function OperationView() {
  const op = useGaropaba();
  const city = municipalityCoverage(op.beaches, op.posts, op.assignments, op.staffingMode);
  const pending = op.beaches.filter((beach) => {
    const cover = beachCoverage(beach.id, op.posts, op.assignments, op.staffingMode);
    return cover.present < cover.target;
  });
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-[1.35rem] font-semibold">Abertura da operação</h1>
      <DemoNote />
      <p className="text-sm text-navy/55">
        {op.season.defaultStartTime}–{op.season.defaultEndTime} · modo{" "}
        {op.staffingMode === "reforco" ? "dotação reforçada" : "dotação-base"}
      </p>
      <ul className="divide-y divide-[#F0F4F7] overflow-hidden rounded-2xl border border-[#E6EEF2] bg-white">
        {op.beaches.map((beach) => {
          const cover = beachCoverage(beach.id, op.posts, op.assignments, op.staffingMode);
          const ok = cover.present >= cover.target;
          return (
            <li key={beach.id} className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold">{beach.name}</span>
              <span className={ok ? "text-[#1B7A4A]" : "text-[#C9862A]"}>
                {cover.present}/{cover.target} {ok ? "✓" : "⚠"}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-lg font-semibold">
        Total {city.present} / {city.target}
      </p>
      {pending.length > 0 && (
        <p className="text-sm font-semibold text-[#C9862A]">
          Resolver {pending.length} pendência{pending.length > 1 ? "s" : ""}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => op.setOperationOpen(true)}
          className="rounded-xl bg-cyan px-4 py-2.5 text-sm font-semibold text-white"
        >
          Abrir operação
        </button>
        <button
          type="button"
          onClick={() => op.setOperationOpen(false)}
          className="rounded-xl border border-[#E6EEF2] px-4 py-2.5 text-sm font-semibold"
        >
          Encerrar operação
        </button>
      </div>
    </div>
  );
}

function PeopleView({ mode }: { mode: "escalas" | "fadiga" | "equipe" }) {
  const op = useGaropaba();
  const [filter, setFilter] = useState("todos");
  const rows = op.assignments.filter((row) =>
    filter === "todos" ? true : row.beachId === filter,
  );
  const title =
    mode === "escalas" ? "Escalas" : mode === "fadiga" ? "Fadiga" : "Equipe";
  return (
    <div className="space-y-4">
      <h1 className="text-[1.35rem] font-semibold">{title}</h1>
      <DemoNote />
      <div className="flex flex-wrap gap-1.5">
        <FilterChip label="Todos" on={filter === "todos"} onClick={() => setFilter("todos")} />
        {op.beaches.map((beach) => (
          <FilterChip
            key={beach.id}
            label={beach.name}
            on={filter === beach.id}
            onClick={() => setFilter(beach.id)}
          />
        ))}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => {
          const person = op.people.find((item) => item.id === row.personId);
          const beach = op.beaches.find((item) => item.id === row.beachId);
          const post = op.posts.find((item) => item.id === row.postId);
          if (!person) return null;
          const fatigue = fatigueLevel(row, op.attentionMinutes, op.highMinutes);
          return (
            <li key={row.id} className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
              <p className="font-semibold">{person.name}</p>
              <p className="text-xs text-navy/45">
                {beach?.name} · {post?.code}
              </p>
              <p className="mt-1 text-xs text-navy/60">
                {row.attendance}
                {row.onBreak ? " · pausa" : " · em posto"} · {Math.floor(row.minutesOnDuty / 60)}h
                {String(row.minutesOnDuty % 60).padStart(2, "0")}
              </p>
              {mode === "fadiga" && (
                <p className="mt-2 text-[11px] font-semibold">
                  {fatigue === "OK" ? "OK" : fatigue === "ATENCAO" ? "Atenção" : "Alto"}
                </p>
              )}
              {mode === "escalas" && (
                <div className="mt-2 flex gap-1">
                  {(["presente", "atrasado", "ausente"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => op.setAttendance(person.id, status)}
                      className={cn(
                        "rounded-lg px-2 py-1 text-[10px] font-semibold",
                        row.attendance === status
                          ? "bg-cyan text-white"
                          : "bg-navy/5 text-navy/50",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
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

function IncidentsView() {
  const op = useGaropaba();
  const [type, setType] = useState("Prevenção");
  const [beachId, setBeachId] = useState(op.beaches[0]?.id ?? "");
  const posts = op.posts.filter((row) => row.beachId === beachId);
  const [postId, setPostId] = useState(posts[0]?.id ?? "");
  const [description, setDescription] = useState("");
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-[1.35rem] font-semibold">Ocorrências</h1>
      <DemoNote />
      <form
        className="space-y-3 rounded-2xl border border-[#E6EEF2] bg-white p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!description.trim()) return;
          op.addIncident({
            createdAt: new Date().toISOString(),
            beachId,
            postId,
            type,
            description: description.trim(),
            severity: "baixa",
            status: "aberta",
            peopleIds: [],
          });
          setDescription("");
        }}
      >
        <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
          Registro rápido
        </p>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          {["Prevenção", "Resgate", "Atendimento", "Criança perdida", "Água-viva / animal marinho", "Apoio", "Ocorrência diversa"].map(
            (item) => (
              <option key={item}>{item}</option>
            ),
          )}
        </select>
        <select
          value={beachId}
          onChange={(event) => {
            setBeachId(event.target.value);
            const next = op.posts.find((row) => row.beachId === event.target.value);
            setPostId(next?.id ?? "");
          }}
          className="w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          {op.beaches.map((beach) => (
            <option key={beach.id} value={beach.id}>
              {beach.name}
            </option>
          ))}
        </select>
        <select
          value={postId}
          onChange={(event) => setPostId(event.target.value)}
          className="w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          {op.posts
            .filter((row) => row.beachId === beachId)
            .map((post) => (
              <option key={post.id} value={post.id}>
                {post.code}
              </option>
            ))}
        </select>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="h-20 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-xl bg-cyan px-4 py-2.5 text-sm font-semibold text-white">
          Registrar
        </button>
      </form>
      <ul className="space-y-2">
        {op.incidents.map((item) => {
          const beach = op.beaches.find((row) => row.id === item.beachId);
          return (
            <li key={item.id} className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
              <p className="font-semibold">
                {item.type} · {beach?.name}
              </p>
              <p className="text-sm text-navy/55">{item.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {(["atendimento", "apoio", "encerrada"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => op.setIncidentStatus(item.id, status)}
                    className={cn(
                      "rounded-lg px-2 py-1 text-[10px] font-semibold",
                      item.status === status ? "bg-cyan text-white" : "bg-navy/5",
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function InventoryView() {
  const op = useGaropaba();
  return (
    <div className="space-y-4">
      <h1 className="text-[1.35rem] font-semibold">Inventário</h1>
      <DemoNote />
      <ul className="space-y-2">
        {op.inventory.map((item) => {
          const beach = op.beaches.find((row) => row.id === item.beachId);
          return (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-[#E6EEF2] bg-white px-4 py-3"
            >
              <span>
                <span className="block font-semibold">{item.name}</span>
                <span className="text-xs text-navy/45">
                  {beach?.name} · {item.category}
                </span>
              </span>
              <span className="text-xs font-semibold">{item.state}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SeasonView() {
  const op = useGaropaba();
  const city = municipalityCoverage(op.beaches, op.posts, op.assignments, op.staffingMode);
  const incidents = op.incidents.length;
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-[1.35rem] font-semibold">{op.season.name}</h1>
      <DemoNote />
      <p className="text-sm text-navy/50">
        {op.season.startsAt} → {op.season.endsAt}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Kpi label="Cobertura desta demo" value={`${city.percent}%`} />
        <Kpi label="Ocorrências na demo" value={String(incidents)} />
      </div>
      <p className="text-sm text-navy/50">
        Sem agregado histórico real ainda. Estes números vêm só do cenário de demonstração.
      </p>
    </div>
  );
}

function SettingsView() {
  const op = useGaropaba();
  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-[1.35rem] font-semibold">Configurações</h1>
      <DemoNote />
      <label className="block text-sm">
        Temporada
        <input
          value={op.season.name}
          onChange={(event) => op.updateSeason({ name: event.target.value })}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2"
        />
      </label>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm">
          Início
          <input
            type="date"
            value={op.season.startsAt}
            onChange={(event) => op.updateSeason({ startsAt: event.target.value })}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Fim
          <input
            type="date"
            value={op.season.endsAt}
            onChange={(event) => op.updateSeason({ endsAt: event.target.value })}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Abertura
          <input
            value={op.season.defaultStartTime}
            onChange={(event) => op.updateSeason({ defaultStartTime: event.target.value })}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Encerramento
          <input
            value={op.season.defaultEndTime}
            onChange={(event) => op.updateSeason({ defaultEndTime: event.target.value })}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2"
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => op.setStaffingMode("base")}
          className={cn(
            "rounded-xl px-3 py-2 text-xs font-semibold",
            op.staffingMode === "base" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Dotação-base
        </button>
        <button
          type="button"
          onClick={() => op.setStaffingMode("reforco")}
          className={cn(
            "rounded-xl px-3 py-2 text-xs font-semibold",
            op.staffingMode === "reforco" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Dotação reforçada
        </button>
      </div>
      <p className="text-xs text-navy/45">
        A reforçada usa o campo do posto. Nenhum número extra de sábado foi inventado:
        por agora reforço = base, até o supervisor editar.
      </p>
      <ul className="space-y-3">
        {op.posts.map((post) => {
          const beach = op.beaches.find((row) => row.id === post.beachId);
          return (
            <li key={post.id} className="rounded-2xl border border-[#E6EEF2] bg-white p-3">
              <p className="text-sm font-semibold">
                {beach?.name} · {post.code}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <label className="text-[11px] text-navy/45">
                  Base
                  <input
                    type="number"
                    min={0}
                    value={post.baseTarget}
                    onChange={(event) =>
                      op.updatePost(post.id, { baseTarget: Number(event.target.value) })
                    }
                    className="mt-1 w-full rounded-lg border border-[#E6EEF2] px-2 py-1.5 text-sm"
                  />
                </label>
                <label className="text-[11px] text-navy/45">
                  Reforço
                  <input
                    type="number"
                    min={0}
                    value={post.reinforcedTarget}
                    onChange={(event) =>
                      op.updatePost(post.id, {
                        reinforcedTarget: Number(event.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[#E6EEF2] px-2 py-1.5 text-sm"
                  />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <a href="/app" className="inline-flex items-center gap-2 text-sm text-navy/50">
        <LogOut className="h-4 w-4" />
        Voltar à operação wave-pool
      </a>
    </div>
  );
}

export function BeachDetail({ slug }: { slug: string }) {
  const op = useGaropaba();
  const beach = op.beaches.find((row) => row.slug === slug);
  if (!beach) return <p className="p-6">Praia não encontrada.</p>;
  const cover = beachCoverage(beach.id, op.posts, op.assignments, op.staffingMode);
  const posts = op.posts.filter((row) => row.beachId === beach.id);
  const people = op.assignments.filter((row) => row.beachId === beach.id);
  return (
    <div className="min-h-screen bg-app-bg p-4 text-navy md:p-6">
      <Link href="/app/garopaba" className="text-sm font-semibold text-cyan">
        ← Mapa
      </Link>
      <h1 className="mt-3 text-[1.5rem] font-semibold">Praia {beach.name}</h1>
      <p className="text-sm text-navy/50">
        {cover.present} / {cover.target} guarda-vidas · {cover.coveredPosts} /{" "}
        {cover.totalPosts} postos cobertos
      </p>
      <DemoNote />
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="rounded-2xl border border-[#E6EEF2] bg-white p-4">
            <p className="font-semibold">
              {post.code} · {presentOnPost(op.assignments, post.id)} /{" "}
              {postTarget(post, op.staffingMode)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {people
                .filter((row) => row.postId === post.id)
                .map((row) => {
                  const person = op.people.find((item) => item.id === row.personId);
                  return (
                    <select
                      key={row.id}
                      value={row.postId}
                      onChange={(event) => op.movePerson(row.personId, event.target.value)}
                      className="rounded-lg border border-[#E6EEF2] px-2 py-1 text-xs"
                    >
                      {posts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {person?.name} → {item.code}
                        </option>
                      ))}
                    </select>
                  );
                })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
