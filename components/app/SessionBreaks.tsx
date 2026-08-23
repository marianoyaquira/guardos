import type { SessionBreak } from "@/data/demoSessions";

export function SessionBreaks({ breaks }: { breaks: SessionBreak[] }) {
  return (
    <section className="rounded-2xl border border-[#E6EEF2] bg-white p-4 shadow-[0_8px_24px_rgb(7_27_51_/_0.03)]">
      <h2 className="text-sm font-semibold text-navy">Intervalos da sessão</h2>
      {breaks.length === 0 ? (
        <p className="mt-3 text-sm text-navy/45">Nenhum intervalo nesta sessão.</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {breaks.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm text-navy/70">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: item.tone === "pause" ? "#3B82F6" : "#E67E22",
                }}
              />
              <span>
                {item.label} — {item.duration}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
