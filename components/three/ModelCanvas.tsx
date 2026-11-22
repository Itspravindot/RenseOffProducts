"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, useGLTF } from "@react-three/drei";

function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.6} />;
}

/**
 * GLB-ready product stage. Only mounted when a product in lib/products.ts has
 * a `model` path. Until then the flat transparent product image is used.
 */
export default function ModelCanvas({ url }: { url: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5], fov: 35 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <directionalLight position={[-4, 2, -3]} intensity={0.7} />
      <Suspense fallback={null}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>
          <GLBModel url={url} />
        </Float>
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.28}
          scale={5}
          blur={2.6}
          far={3}
        />
      </Suspense>
    </Canvas>
  );
}
