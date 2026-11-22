"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DustPoints() {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = 46;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = Math.sin(i * 12.9898) * 4.6;
      array[i * 3 + 1] = Math.cos(i * 7.233) * 2.4;
      array[i * 3 + 2] = Math.sin(i * 3.711) * 1.6;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.014;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4B6A54"
          size={0.028}
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/** Very light decorative WebGL dust — never used to fake a product model. */
export default function DustCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.4]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <DustPoints />
    </Canvas>
  );
}
