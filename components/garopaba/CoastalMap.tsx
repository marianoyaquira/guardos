"use client";

import { useEffect } from "react";
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
}: {
  selectedBeachId: string | null;
  selectedPostId: string | null;
  onSelectBeach: (id: string) => void;
  onSelectPost: (id: string) => void;
}) {
  const op = useGaropaba();
  const selected = op.beaches.find((beach) => beach.id === selectedBeachId) ?? null;
  const showPosts = Boolean(selected);

  return (
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
              icon={beachIcon(beach.name, cover.present, cover.target, alert)}
              eventHandlers={{ click: () => onSelectBeach(beach.id) }}
              zIndexOffset={selectedBeachId === beach.id ? 400 : 0}
            />
          );
        })}
      {showPosts &&
        selected &&
        op.posts
          .filter((post) => post.beachId === selected.id && post.active)
          .map((post, index, list) => (
            <PostMarker
              key={post.id}
              beach={selected}
              post={post}
              index={index}
              total={list.length}
              selected={selectedPostId === post.id}
              onSelect={onSelectPost}
            />
          ))}
    </MapContainer>
  );
}

function PostMarker({
  beach,
  post,
  index,
  total,
  selected,
  onSelect,
}: {
  beach: Beach;
  post: Post;
  index: number;
  total: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const op = useGaropaba();
  const present = presentOnPost(op.assignments, post.id);
  const target = postTarget(post, op.staffingMode);
  const position = displayCoord(beach, post, index, total);
  return (
    <Marker
      position={position}
      icon={postIcon(post.code, present, target)}
      eventHandlers={{ click: () => onSelect(post.id) }}
      zIndexOffset={selected ? 500 : 200}
    />
  );
}
