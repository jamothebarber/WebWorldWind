"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<React.ComponentRef<typeof MeshDistortMaterial>>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }
    const material = materialRef.current as unknown as { distort: number } | null;
    if (material) {
      material.distort = 0.38 + Math.sin(t * 0.9) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[1.6, 128, 128]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#4a3bb8"
          emissive="#150f3d"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          distort={0.4}
          speed={1.6}
        />
      </Sphere>
    </group>
  );
}

function Particles() {
  const count = 140;
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8b7cff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export function VoiceOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <pointLight position={[3.5, 3, 4.5]} intensity={55} color="#a599ff" />
        <pointLight position={[-4, -2.5, -2]} intensity={28} color="#4fd1ff" />
        <pointLight position={[0, -3.5, 3]} intensity={14} color="#ffffff" />
        <Orb />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
