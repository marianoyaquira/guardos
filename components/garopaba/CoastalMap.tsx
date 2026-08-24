"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  beachCoverage,
  displayCoord,
  presentOnPost,
  postStatus,
  postTarget,
} from "@/lib/coastal/coverage";
import { useGaropaba } from "@/lib/garopaba-context";
import type { Beach, Post } from "@/data/garopaba/types";

function FlyTo({
  beach,
}: {
  beach: Beach | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (beach) map.flyTo([beach.latitude, beach.longitude], 14, { duration: 0.6 });
    else map.flyTo([-28.03, -48.62], 11, { duration: 0.5 });
  }, [beach, map]);
  return null;
}

function InvalidateSize({ tick }: { tick: boolean }) {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 80);
    return () => window.clearTimeout(id);
  }, [map, tick]);
  return null;
}

function ZoomWatch({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const update = () => onZoom(map.getZoom());
    update();
    map.on("zoomend", update);
    return () => {
      map.off("zoomend", update);
    };
  }, [map, onZoom]);
  return null;
}

function beachIcon(name: string, present: number, target: number, alert: boolean) {
  const status = postStatus(present, target);
  const tone =
    status === "ok"
      ? "#1B7A4A"
      : status === "watch"
        ? "#C9862A"
        : status === "critical"
          ? "#C24141"
          : "#8A93A0";
  return L.divIcon({
    className: "g-marker",
    iconSize: [128, 56],
    iconAnchor: [64, 56],
    html: `<div style="min-width:7.5rem;border-radius:12px;background:#fff;border:1px solid #E6EEF2;box-shadow:0 8px 20px rgb(7 27 51 / 0.08);padding:6px 8px;font-family:inherit">
      <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:.08em;color:#0C2744">${name.toUpperCase()}${alert ? " · ⚠" : ""}</p>
      <p style="margin:2px 0 0;font-size:13px;font-weight:700;color:${tone}">${present} / ${target}</p>
    </div>`,
  });
}

function postIcon(code: string, present: number, target: number) {
  const status = postStatus(present, target);
  const tone =
    status === "ok" ? "#1B7A4A" : status === "watch" ? "#C9862A" : "#C24141";
  return L.divIcon({
    className: "g-marker",
    iconSize: [72, 44],
    iconAnchor: [36, 44],
    html: `<div style="border-radius:10px;background:#fff;border:1px solid #E6EEF2;padding:5px 7px;text-align:center;box-shadow:0 6px 16px rgb(7 27 51 / 0.08)">
      <p style="margin:0;font-size:10px;font-weight:700;color:#0C2744">${code}</p>
      <p style="margin:0;font-size:12px;font-weight:700;color:${tone}">${present}/${target}</p>
    </div>`,
  });
}

export function CoastalMap({
  selectedBeachId,
  selectedPostId,
  onSelectBeach,
  onSelectPost,
  layoutTick = false,
}: {
  selectedBeachId: string | null;
  selectedPostId: string | null;
  onSelectBeach: (id: string) => void;
  onSelectPost: (id: string) => void;
  layoutTick?: boolean;
}) {
  const op = useGaropaba();
  const [zoom, setZoom] = useState(11);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);
  const selected = op.beaches.find((beach) => beach.id === selectedBeachId) ?? null;
  const showPosts = zoom >= 13 || Boolean(selected);

  function remember(label: string) {
    setSavedLabel(label);
    window.setTimeout(() => setSavedLabel(null), 2200);
  }

  return (
    <div className="relative h-full min-h-[420px] w-full">
    <MapContainer
      center={[-28.03, -48.62]}
      zoom={11}
      className="h-full min-h-[420px] w-full rounded-2xl"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <InvalidateSize tick={layoutTick} />
      <ZoomWatch onZoom={setZoom} />
      <FlyTo beach={selected} />
      {op.beaches
        .filter((beach) => beach.active)
        .map((beach) => {
          const cover = beachCoverage(
            beach.id,
            op.posts,
            op.assignments,
            op.staffingMode,
          );
          const alert = op.incidents.some(
            (item) => item.beachId === beach.id && item.status !== "encerrada",
          );
          return (
            <Marker
              key={beach.id}
              position={[beach.latitude, beach.longitude]}
              draggable
              icon={beachIcon(beach.name, cover.present, cover.target, alert)}
              eventHandlers={{
                click: () => onSelectBeach(beach.id),
                dragend: (event) => {
                  const { lat, lng } = event.target.getLatLng();
                  op.updateBeach(beach.id, { latitude: lat, longitude: lng });
                  remember(`${beach.name} gravada`);
                },
              }}
              zIndexOffset={selectedBeachId === beach.id ? 400 : 0}
            />
          );
        })}
      {showPosts &&
        op.beaches
          .filter((beach) => beach.active && (!selected || beach.id === selected.id))
          .flatMap((beach) => {
            const list = op.posts.filter((post) => post.beachId === beach.id && post.active);
            return list.map((post, index) => (
              <PostMarker
                key={post.id}
                beach={beach}
                post={post}
                index={index}
                total={list.length}
                selected={selectedPostId === post.id}
                onSelect={onSelectPost}
                onPinned={() => remember(`${post.code} gravado`)}
              />
            ));
          })}
    </MapContainer>
      {savedLabel && (
        <p className="pointer-events-none absolute bottom-3 left-1/2 z-[500] -translate-x-1/2 rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
          Posição ancorada · {savedLabel}
        </p>
      )}
    </div>
  );
}

function PostMarker({
  beach,
  post,
  index,
  total,
  selected,
  onSelect,
  onPinned,
}: {
  beach: Beach;
  post: Post;
  index: number;
  total: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onPinned: () => void;
}) {
  const op = useGaropaba();
  const present = presentOnPost(op.assignments, post.id);
  const target = postTarget(post, op.staffingMode);
  const position = displayCoord(beach, post, index, total, op.beaches);
  return (
    <Marker
      position={position}
      draggable
      icon={postIcon(post.code, present, target)}
      eventHandlers={{
        click: () => onSelect(post.id),
        dragend: (event) => {
          const { lat, lng } = event.target.getLatLng();
          op.updatePost(post.id, { latitude: lat, longitude: lng });
          onPinned();
        },
      }}
      zIndexOffset={selected ? 500 : 200}
    />
  );
}
