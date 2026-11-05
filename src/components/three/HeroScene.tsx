import { Suspense, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function TorusGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
      const s = hovered ? 1.08 : 1;
      meshRef.current.scale.lerp({ x: s, y: s, z: s } as THREE.Vector3, 0.05);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color="#d4a843"
        roughness={0.3}
        metalness={0.7}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4a6fa5" />
      <TorusGeometry />
    </>
  );
}

function Fallback() {
  return (
    <div className="hero-fallback">
      <div className="hero-fallback__shape" />
    </div>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();
  const [webGLFailed, setWebGLFailed] = useState(false);

  const handleError = useCallback(() => {
    setWebGLFailed(true);
  }, []);

  if (reduced || webGLFailed) {
    return <Fallback />;
  }

  return (
    <Suspense fallback={<Fallback />}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          if (!gl) handleError();
        }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </Suspense>
  );
}
