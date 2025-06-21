'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text, 
  Float, 
  Stars, 
  PerspectiveCamera, 
  OrbitControls,
  Trail,
  useTexture,
  MeshDistortMaterial,
  useCursor
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

interface Scene3DProps {
  className?: string;
}

// Enhanced particle system with color variation
function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#ff6b6b'),
      new THREE.Color('#4ecdc4'),
      new THREE.Color('#ffd93d'),
      new THREE.Color('#ffffff')
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    mesh.current.rotation.y = Math.cos(time * 0.075) * 0.1;
    mesh.current.position.y = Math.sin(time * 0.1) * 0.2;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
          normalized={false}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          itemSize={3}
          normalized={true}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive floating cube with distortion and trail
function FloatingCube({ 
  position, 
  color = '#ff6b6b', 
  hoverColor = '#ffd93d',
  trailColor = '#ffffff'
}: { 
  position: [number, number, number]; 
  color?: string; 
  hoverColor?: string;
  trailColor?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    mesh.current.rotation.y = Math.cos(time * 0.5) * 0.2;
    mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
  });

  return (
    <group>
      <Trail
        width={2}
        length={8}
        color={new THREE.Color(trailColor)}
        attenuation={(t) => t * t}
      >
        <mesh
          ref={mesh}
          position={position}
          scale={clicked ? 1.5 : hovered ? 1.2 : 1}
          onClick={() => setClicked(!clicked)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color={hovered ? hoverColor : color}
            metalness={0.5}
            roughness={0.2}
            emissive={hovered ? hoverColor : color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            distort={hovered ? 0.4 : 0.2}
            speed={hovered ? 4 : 2}
          />
        </mesh>
      </Trail>
    </group>
  );
}

// Helper function to create spring config
const springConfig = { mass: 1, tension: 280, friction: 60 };

// Enhanced animated ring with spring animations
function AnimatedRing({ 
  position, 
  color = '#ff6b6b',
  scale = 1,
  rotationSpeed = 1
}: { 
  position: [number, number, number]; 
  color?: string;
  scale?: number;
  rotationSpeed?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { scale: springScale } = useSpring({
    scale: hovered ? scale * 1.3 : scale,
    config: springConfig
  });

  const { rotation } = useSpring({
    rotation: hovered ? [Math.PI * 0.5, Math.PI * 0.5, 0] as [number, number, number] : [0, 0, 0] as [number, number, number],
    config: springConfig
  });

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.2;
    ringRef.current.rotation.y = Math.cos(time * rotationSpeed) * 0.2;
  });

  return (
    <animated.mesh
      ref={ringRef}
      position={position}
      scale={springScale}
      rotation={rotation as unknown as [number, number, number]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ringGeometry args={[1, 1.5, 32]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={hovered ? 0.8 : 0.4}
        side={THREE.DoubleSide}
        distort={hovered ? 0.4 : 0.1}
        speed={hovered ? 4 : 1}
        metalness={hovered ? 0.8 : 0.2}
        roughness={hovered ? 0.2 : 0.8}
      />
    </animated.mesh>
  );
}

// Enhanced floating orb with spring animations
function FloatingOrb({ 
  position, 
  color = '#4ecdc4',
  trailColor = '#ffffff'
}: { 
  position: [number, number, number]; 
  color?: string;
  trailColor?: string;
}) {
  const orbRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { scale } = useSpring({
    scale: hovered ? 1.4 : 1,
    config: springConfig
  });

  const { position: springPosition } = useSpring({
    position: hovered ? [position[0], position[1] + 0.5, position[2]] as [number, number, number] : position,
    config: springConfig
  });

  const { rotation } = useSpring({
    rotation: hovered ? [Math.PI * 0.5, Math.PI * 0.5, 0] as [number, number, number] : [0, 0, 0] as [number, number, number],
    config: springConfig
  });

  useFrame((state) => {
    if (!orbRef.current) return;
    const time = state.clock.getElapsedTime();
    orbRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    orbRef.current.rotation.y = Math.cos(time * 0.5) * 0.2;
  });

  return (
    <group>
      <Trail
        width={hovered ? 4 : 2}
        length={hovered ? 12 : 8}
        color={new THREE.Color(trailColor)}
        attenuation={(t: number) => t * t}
      >
        <animated.mesh
          ref={orbRef}
          position={springPosition as unknown as [number, number, number]}
          scale={scale}
          rotation={rotation as unknown as [number, number, number]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            metalness={hovered ? 0.8 : 0.2}
            roughness={hovered ? 0.2 : 0.8}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            distort={hovered ? 0.4 : 0.2}
            speed={hovered ? 4 : 2}
          />
        </animated.mesh>
      </Trail>
    </group>
  );
}

// Enhanced animated torus with spring animations
function AnimatedTorus({ 
  position, 
  color = '#ffd93d',
  scale = 1
}: { 
  position: [number, number, number]; 
  color?: string;
  scale?: number;
}) {
  const torusRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { scale: springScale } = useSpring({
    scale: hovered ? scale * 1.3 : scale,
    config: springConfig
  });

  const { rotation } = useSpring({
    rotation: hovered ? [Math.PI * 0.5, Math.PI * 0.5, 0] as [number, number, number] : [0, 0, 0] as [number, number, number],
    config: springConfig
  });

  useFrame((state) => {
    if (!torusRef.current) return;
    const time = state.clock.getElapsedTime();
    torusRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    torusRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
  });

  return (
    <animated.mesh
      ref={torusRef}
      position={position}
      scale={springScale}
      rotation={rotation as unknown as [number, number, number]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={hovered ? 0.8 : 0.4}
        side={THREE.DoubleSide}
        distort={hovered ? 0.4 : 0.1}
        speed={hovered ? 4 : 1}
        metalness={hovered ? 0.8 : 0.2}
        roughness={hovered ? 0.2 : 0.8}
      />
    </animated.mesh>
  );
}

// Enhanced floating text with spring animations
function FloatingText({ 
  text, 
  position, 
  scale = 1, 
  color = '#ffffff',
  hoverColor = '#ffd93d',
  waveSpeed = 1
}: { 
  text: string; 
  position: [number, number, number]; 
  scale?: number; 
  color?: string;
  hoverColor?: string;
  waveSpeed?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef<THREE.Group>(null);
  const [texture] = useTexture(['/textures/noise.png']);
  useCursor(hovered);

  const { scale: springScale } = useSpring({
    scale: hovered ? scale * 1.2 : scale,
    config: springConfig
  });

  const { position: springPosition } = useSpring({
    position: hovered ? [position[0], position[1] + 0.5, position[2]] as [number, number, number] : position,
    config: springConfig
  });

  const { rotation } = useSpring({
    rotation: hovered ? [Math.PI * 0.5, Math.PI * 0.5, 0] as [number, number, number] : [0, 0, 0] as [number, number, number],
    config: springConfig
  });

  useFrame((state) => {
    if (!textRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Wave effect on individual characters
    textRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        const waveOffset = index * 0.5;
        child.position.y = Math.sin(time * waveSpeed + waveOffset) * (hovered ? 0.2 : 0.1);
        child.position.x = Math.cos(time * waveSpeed + waveOffset) * (hovered ? 0.1 : 0.05);
        child.rotation.z = Math.sin(time * waveSpeed + waveOffset) * (hovered ? 0.2 : 0.1);
      }
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <animated.group
        ref={textRef}
        position={springPosition as unknown as [number, number, number]}
        rotation={rotation as unknown as [number, number, number]}
        scale={springScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={1}
          color={hovered ? hoverColor : color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={hovered ? 0.04 : 0.02}
          outlineColor="#000000"
          material-toneMapped={false}
          material-map={texture}
        >
          {text}
        </Text>
      </animated.group>
    </Float>
  );
}

// Animated background with gradient and noise
function GradientBackground() {
  const { viewport } = useThree();
  const gradientTexture = useRef<THREE.Texture | null>(null);
  const noiseTexture = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    // Create gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) return;

    const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);

    const gradientTex = new THREE.CanvasTexture(canvas);
    gradientTex.wrapS = gradientTex.wrapT = THREE.RepeatWrapping;
    gradientTexture.current = gradientTex;

    // Create noise texture
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const noiseContext = noiseCanvas.getContext('2d');
    if (!noiseContext) return;

    for (let i = 0; i < 256; i++) {
      for (let j = 0; j < 256; j++) {
        const value = Math.random() * 255;
        noiseContext.fillStyle = `rgb(${value},${value},${value})`;
        noiseContext.fillRect(i, j, 1, 1);
      }
    }

    const noiseTex = new THREE.CanvasTexture(noiseCanvas);
    noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
    noiseTexture.current = noiseTex;
  }, []);

  useFrame((state) => {
    if (!gradientTexture.current || !noiseTexture.current) return;
    const time = state.clock.getElapsedTime();
    gradientTexture.current.offset.x = Math.sin(time * 0.1) * 0.1;
    gradientTexture.current.offset.y = Math.cos(time * 0.1) * 0.1;
    noiseTexture.current.offset.x = time * 0.1;
    noiseTexture.current.offset.y = time * 0.1;
  });

  return (
    <mesh position={[0, 0, -10]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <meshBasicMaterial>
        {gradientTexture.current && (
          <primitive object={gradientTexture.current} attach="map" />
        )}
        {noiseTexture.current && (
          <primitive object={noiseTexture.current} attach="alphaMap" />
        )}
      </meshBasicMaterial>
    </mesh>
  );
}

// Main scene component
export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <div className="w-full h-[60vh] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <hemisphereLight
          intensity={0.5}
          groundColor={new THREE.Color('#0f3460')}
          color={new THREE.Color('#ffffff')}
        />

        {/* Background elements */}
        <GradientBackground />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Particles count={2000} />

        {/* Main content group */}
        <group ref={groupRef}>
          {/* Floating text elements with wave animation */}
          <FloatingText
            text="Mohtashim Nawaz"
            position={[0, 2, 0]}
            scale={1.5}
            color="#ffffff"
            hoverColor="#ffd93d"
            waveSpeed={1.2}
          />
          <FloatingText
            text="Full Stack Developer"
            position={[0, 0.5, 0]}
            scale={0.8}
            color="#ffd93d"
            hoverColor="#ff6b6b"
            waveSpeed={1.5}
          />
          <FloatingText
            text="Web3 & Blockchain"
            position={[0, -0.5, 0]}
            scale={0.8}
            color="#ff6b6b"
            hoverColor="#4ecdc4"
            waveSpeed={1.8}
          />

          {/* Interactive elements */}
          <FloatingCube position={[-3, -2, 0]} color="#ff6b6b" trailColor="#ff6b6b" />
          <FloatingCube position={[3, -2, 0]} color="#4ecdc4" trailColor="#4ecdc4" />
          <FloatingCube position={[0, -3, 0]} color="#ffd93d" trailColor="#ffd93d" />
          
          {/* New interactive elements */}
          <AnimatedRing position={[-2, 1, 0]} color="#ff6b6b" scale={0.8} rotationSpeed={1.2} />
          <AnimatedRing position={[2, 1, 0]} color="#4ecdc4" scale={0.8} rotationSpeed={0.8} />
          <FloatingOrb position={[-1, -1, 0]} color="#ffd93d" trailColor="#ffd93d" />
          <FloatingOrb position={[1, -1, 0]} color="#ff6b6b" trailColor="#ff6b6b" />
          <AnimatedTorus position={[0, 1, 0]} color="#4ecdc4" scale={0.6} />
        </group>

        {/* Enhanced post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.LARGE}
            blendFunction={BlendFunction.SCREEN}
          />
          <Noise opacity={0.02} />
          <ChromaticAberration
            offset={[0.002, 0.002]}
            blendFunction={BlendFunction.NORMAL}
          />
          <Vignette
            darkness={0.5}
            offset={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
        </EffectComposer>
      </Canvas>

      {/* Enhanced overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none opacity-80" />
    </div>
  );
}

export const Scene3D = ({ className = '' }: Scene3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-[500px] ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } }
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Background elements */}
        <GradientBackground />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Particles count={2000} />

        {/* Main content group */}
        <Scene />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}; 