"use client";

import dynamic from "next/dynamic";

const ModelCanvas = dynamic(() => import("@/components/three/ModelCanvas"), {
  ssr: false,
  loading: () => null,
});

/** Renders a future GLB model when configured, otherwise nothing. */
export function ProductModel({ url }: { url?: string }) {
  if (!url) return null;
  return (
    <div className="absolute inset-0 z-10" aria-hidden="true">
      <ModelCanvas url={url} />
    </div>
  );
}
