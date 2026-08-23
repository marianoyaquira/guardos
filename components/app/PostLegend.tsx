export function PostLegend() {
  return (
    <div className="absolute bottom-3 left-3 z-20 rounded-xl border border-[#E6EEF2] bg-white/95 px-3 py-2.5 shadow-[0_8px_20px_rgb(7_27_51_/_0.06)] backdrop-blur-sm">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-navy/40">
        POSTOS
      </p>
      <ul className="mt-1.5 space-y-1 text-[11px] text-navy/70">
        <li>CT — Torre de Controle</li>
        <li>PIER — Pier</li>
        <li>01–07 — Posições de borda</li>
        <li>LOBBY — Lobby</li>
      </ul>
    </div>
  );
}
