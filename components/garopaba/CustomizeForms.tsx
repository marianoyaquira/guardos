"use client";

import { useState } from "react";
import { useGaropaba } from "@/lib/garopaba-context";
import { cn } from "@/lib/cn";

function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function AddPersonForm({ className }: { className?: string }) {
  const op = useGaropaba();
  const [name, setName] = useState("");
  const [role, setRole] = useState<"guarda-vidas" | "chefe">("guarda-vidas");
  const [photo, setPhoto] = useState("");
  const [postId, setPostId] = useState(op.posts[0]?.id ?? "");

  return (
    <form
      className={cn("space-y-3 rounded-2xl border border-[#E6EEF2] bg-white p-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        op.addPerson({ name, role, photo, postId: postId || undefined });
        setName("");
        setPhoto("");
        setRole("guarda-vidas");
      }}
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
        Adicionar guarda-vidas
      </p>
      <label className="block text-xs text-navy/45">
        Nome
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm text-navy"
          required
        />
      </label>
      <label className="block text-xs text-navy/45">
        Foto
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-xs"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) setPhoto(await readPhoto(file));
          }}
        />
      </label>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" className="h-14 w-14 rounded-full object-cover" />
      ) : null}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRole("guarda-vidas")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold",
            role === "guarda-vidas" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Guarda-vidas
        </button>
        <button
          type="button"
          onClick={() => setRole("chefe")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold",
            role === "chefe" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Chefe
        </button>
      </div>
      <label className="block text-xs text-navy/45">
        Posto inicial
        <select
          value={postId}
          onChange={(event) => setPostId(event.target.value)}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          <option value="">Sem posto ainda</option>
          {op.posts.map((post) => {
            const beach = op.beaches.find((row) => row.id === post.beachId);
            return (
              <option key={post.id} value={post.id}>
                {beach?.name} · {post.code}
              </option>
            );
          })}
        </select>
      </label>
      <button type="submit" className="w-full rounded-xl bg-cyan py-2.5 text-sm font-semibold text-white">
        Adicionar pessoa
      </button>
    </form>
  );
}

export function AddPostForm({ className }: { className?: string }) {
  const op = useGaropaba();
  const [beachId, setBeachId] = useState(op.beaches[0]?.id ?? "");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<"posto" | "cabine">("posto");
  const [baseTarget, setBaseTarget] = useState("2");

  return (
    <form
      className={cn("space-y-3 rounded-2xl border border-[#E6EEF2] bg-white p-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!code.trim() || !beachId) return;
        op.addPost({
          beachId,
          code,
          name,
          type,
          baseTarget: Number(baseTarget) || 0,
        });
        setCode("");
        setName("");
        setBaseTarget("2");
      }}
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
        Adicionar posto / torre
      </p>
      <label className="block text-xs text-navy/45">
        Praia
        <select
          value={beachId}
          onChange={(event) => setBeachId(event.target.value)}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          {op.beaches.map((beach) => (
            <option key={beach.id} value={beach.id}>
              {beach.name}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block text-xs text-navy/45">
          Código
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="V02"
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="block text-xs text-navy/45">
          Dotação
          <input
            type="number"
            min={0}
            value={baseTarget}
            onChange={(event) => setBaseTarget(event.target.value)}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
          />
        </label>
      </div>
      <label className="block text-xs text-navy/45">
        Nome
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Torre Vigia 2"
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("posto")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold",
            type === "posto" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Posto / torre
        </button>
        <button
          type="button"
          onClick={() => setType("cabine")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold",
            type === "cabine" ? "bg-cyan text-white" : "border border-[#E6EEF2]",
          )}
        >
          Cabine
        </button>
      </div>
      <button type="submit" className="w-full rounded-xl bg-cyan py-2.5 text-sm font-semibold text-white">
        Adicionar posto
      </button>
      <p className="text-[11px] text-navy/40">
        O novo posto aparece no mapa na linha da costa. Arraste-o para o sítio certo.
      </p>
    </form>
  );
}

export function AddInventoryForm({ className }: { className?: string }) {
  const op = useGaropaba();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Resgate");
  const [beachId, setBeachId] = useState(op.beaches[0]?.id ?? "");
  const [postId, setPostId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [state, setState] = useState<"OK" | "ATENCAO" | "AUSENTE" | "MANUTENCAO">("OK");

  return (
    <form
      className={cn("space-y-3 rounded-2xl border border-[#E6EEF2] bg-white p-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !beachId) return;
        op.addInventoryItem({
          name,
          category,
          beachId,
          postId: postId || null,
          quantity: Number(quantity) || 0,
          state,
        });
        setName("");
        setQuantity("1");
      }}
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-navy/40 uppercase">
        Adicionar item
      </p>
      <label className="block text-xs text-navy/45">
        Item
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Prancha, rádio, cone…"
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
          required
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block text-xs text-navy/45">
          Categoria
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-xs text-navy/45">
          Quantidade
          <input
            type="number"
            min={0}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
          />
        </label>
      </div>
      <label className="block text-xs text-navy/45">
        Praia
        <select
          value={beachId}
          onChange={(event) => {
            setBeachId(event.target.value);
            setPostId("");
          }}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          {op.beaches.map((beach) => (
            <option key={beach.id} value={beach.id}>
              {beach.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-navy/45">
        Posto
        <select
          value={postId}
          onChange={(event) => setPostId(event.target.value)}
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          <option value="">Toda a praia</option>
          {op.posts
            .filter((post) => post.beachId === beachId)
            .map((post) => (
              <option key={post.id} value={post.id}>
                {post.code}
              </option>
            ))}
        </select>
      </label>
      <label className="block text-xs text-navy/45">
        Estado
        <select
          value={state}
          onChange={(event) =>
            setState(event.target.value as "OK" | "ATENCAO" | "AUSENTE" | "MANUTENCAO")
          }
          className="mt-1 w-full rounded-xl border border-[#E6EEF2] px-3 py-2 text-sm"
        >
          <option value="OK">OK</option>
          <option value="ATENCAO">Atenção</option>
          <option value="AUSENTE">Ausente</option>
          <option value="MANUTENCAO">Manutenção</option>
        </select>
      </label>
      <button type="submit" className="w-full rounded-xl bg-cyan py-2.5 text-sm font-semibold text-white">
        Adicionar ao inventário
      </button>
    </form>
  );
}
