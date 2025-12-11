'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useCursor, Trail, Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Create circular particle texture
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// Particle system for background effects
function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const circleTexture = useMemo(() => createCircleTexture(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = THREE.MathUtils.lerp(2, 20, Math.random());
      const position = new THREE.Vector3(
        Math.cos(t) * r,
        Math.sin(t) * r,
        (Math.random() - 0.5) * 10
      );
      temp.push(position);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 15;
      light.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.5) * 15;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={30} intensity={2} color="#ffffff" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(particles.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
            args={[new Float32Array(particles.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          map={circleTexture}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// Interactive sphere with trail effect
function TechSphere({ position, text, color, onClick }: { 
  position: [number, number, number], 
  text: string, 
  color: string,
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [targetPosition] = useState(new THREE.Vector3(...position));
  const [currentPosition] = useState(new THREE.Vector3(...position));
  const [trailVisible, setTrailVisible] = useState(false);
  
  useCursor(hovered);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    // Smooth position animation with spring effect
    currentPosition.lerp(targetPosition, 0.1);
    groupRef.current.position.copy(currentPosition);

    // Dynamic rotation based on state
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.3;
    
    if (hovered) {
      // Enhanced hover animation
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      setTrailVisible(true);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      setTrailVisible(false);
    }

    if (clicked) {
      // Enhanced click animation
      meshRef.current.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.1);
      groupRef.current.position.y = Math.sin(time * 5) * 0.2;
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <group ref={groupRef}>
      {trailVisible && (
        <Trail
          width={2}
          length={8}
          color={new THREE.Color(color)}
          attenuation={(t) => t * t}
        >
          <mesh ref={meshRef}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial 
              color={hovered ? '#ffffff' : color}
              metalness={0.5}
              roughness={0.2}
              emissive={hovered ? color : '#000000'}
              emissiveIntensity={hovered ? 0.8 : 0}
            />
          </mesh>
        </Trail>
      )}
      {!trailVisible && (
        <mesh 
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : color}
            metalness={0.5}
            roughness={0.2}
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.8 : 0}
          />
        </mesh>
      )}
      <Text
        position={[0, 0, 1.4]}
        fontSize={0.6}
        color={hovered ? '#ffffff' : 'white'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.12}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
}

// Dynamic camera with smooth transitions
function CameraController() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const [cameraPath] = useState(() => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.sin(t) * 8,
        Math.cos(t) * 3,
        15 + Math.sin(t * 2) * 2
      ));
    }
    return points;
  });
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const index = Math.floor((time * 0.2) % cameraPath.length);
    const nextIndex = (index + 1) % cameraPath.length;
    const progress = (time * 0.2) % 1;
    
    camera.position.lerpVectors(
      cameraPath[index],
      cameraPath[nextIndex],
      progress
    );
    camera.lookAt(target.current);
  });

  return null;
}

// Enhanced scene with dynamic effects
function Scene() {
  const [activeCube, setActiveCube] = useState<string | null>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      lightRef.current.position.x = Math.sin(time * 0.5) * 15;
      lightRef.current.position.y = Math.cos(time * 0.5) * 15;
      lightRef.current.intensity = activeCube ? 2 : 1;
      lightRef.current.color.setHSL(time * 0.1, 0.5, 0.5);
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 30]} />
      <ambientLight intensity={0.4} />
      <pointLight ref={lightRef} position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Particles count={2000} />
      
      <TechSphere 
        position={[-4, 0, 0]} 
        text="Rust" 
        color="#DEA584" 
        onClick={() => setActiveCube(activeCube === 'Rust' ? null : 'Rust')} 
      />
      <TechSphere 
        position={[0, 0, 0]} 
        text="Solana" 
        color="#14F195" 
        onClick={() => setActiveCube(activeCube === 'Solana' ? null : 'Solana')} 
      />
      <TechSphere 
        position={[4, 0, 0]} 
        text="Web3" 
        color="#9945FF" 
        onClick={() => setActiveCube(activeCube === 'Web3' ? null : 'Web3')} 
      />
      <Preload all />
    </>
  );
}

// Main component with performance optimizations
export default function Scene3D() {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#000000',
      }}
    >
      <Canvas
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          toneMapping: THREE.LinearToneMapping
        }}
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1);
        }}
      >
        <Scene />
        <CameraController />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 