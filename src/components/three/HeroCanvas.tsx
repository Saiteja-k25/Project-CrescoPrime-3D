import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Environment, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Group } from "three";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

function ChargingBull() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/charging-bull.glb");
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Clone scene and enhance materials once to prevent memory leaks and heavy lag
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.metalness = 0.85;
          mesh.material.roughness = 0.2;
          mesh.material.envMapIntensity = 1.5;
          mesh.material.needsUpdate = true;
          // Enable transparency for scroll fade out
          mesh.material.transparent = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Track mouse for subtle reactive rotation
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const targetState = useRef({ x: 0, y: 0, scale: 1 });

  const updateTargets = () => {
    const isMobileDevice = window.innerWidth < 1024;
    // Base scale slightly increased (e.g. 1.1 -> 1.2)
    targetState.current = {
      x: isMobileDevice ? 0 : 1.2,
      y: isMobileDevice ? -0.7 : -0.3,
      scale: isMobileDevice ? 0.75 : 1.25,
    };
  };

  // Animate in on load and add dramatic parallax on scroll
  useEffect(() => {
    if (!groupRef.current) return;

    updateTargets();

    // Initial position: running in from far right and slightly back
    gsap.set(groupRef.current.position, { x: 8, y: -0.5, z: -3 });
    gsap.set(groupRef.current.rotation, { y: -Math.PI * 0.4 });
    gsap.set(groupRef.current.scale, { x: 0.8, y: 0.8, z: 0.8 });

    let tl: gsap.core.Timeline;

    const startEntrance = () => {
      // Entrance animation
      tl = gsap.timeline();
      tl.to(groupRef.current!.position, {
        x: targetState.current.x,
        y: targetState.current.y,
        z: 0,
        duration: 2.5,
        ease: "power3.out",
      })
        .to(
          groupRef.current!.rotation,
          {
            y: -Math.PI * 0.15,
            duration: 2.5,
            ease: "power3.out",
          },
          0
        )
        .to(
          groupRef.current!.scale,
          {
            x: targetState.current.scale,
            y: targetState.current.scale,
            z: targetState.current.scale,
            duration: 2.5,
            ease: "power3.out",
          },
          0
        );
    };

    const handleResize = () => {
      updateTargets();
      // If entrance is finished, smoothly animate to new responsive position
      if (tl && tl.progress() === 1) {
        gsap.to(groupRef.current!.position, {
          x: targetState.current.x,
          y: targetState.current.y,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(groupRef.current!.scale, {
          x: targetState.current.scale,
          y: targetState.current.scale,
          z: targetState.current.scale,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    // If session has already fired app-ready, trigger immediately.
    // Otherwise wait for the event. (Quick fix for navigating back to home)
    if (sessionStorage.getItem("app-ready-fired") === "true") {
      setTimeout(startEntrance, 100);
    } else {
      window.addEventListener("app-ready", startEntrance);
    }
    
    window.addEventListener("resize", handleResize);

    // Parallax effect on scroll: come forward, move up, and fade out canvas
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    scrollTl.to(
      groupRef.current.position,
      {
        y: targetState.current.y + 2.0, // move up relative to target
        z: 4, // come forward
        ease: "power1.inOut",
      },
      0
    );

    return () => {
      window.removeEventListener("app-ready", startEntrance);
      window.removeEventListener("resize", handleResize);
      if (tl) tl.kill();
      scrollTl.kill();
    };
  }, []);

  // Animate rotation frame-by-frame with mouse reactivity
  useFrame((state) => {
    if (!groupRef.current) return;

    // Subtle idle animation
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.02 +
      mouseRef.current.y * 0.03;

    // Subtle mouse-follow on Y
    groupRef.current.rotation.y +=
      ((-Math.PI * 0.15 + mouseRef.current.x * 0.08) -
        groupRef.current.rotation.y) *
      0.02;
  });

  // Responsive scale based on viewport
  const scale = viewport.width < 6 ? 0.7 : 1;

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
        <primitive object={clonedScene} />
      </Float>
    </group>
  );
}

function Particles() {
  const count = 80;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        {/* @ts-ignore */}
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#2A9D8F"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald border-t-transparent" />
        <p className="mt-4 whitespace-nowrap font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-emerald drop-shadow-[0_0_10px_rgba(42,157,143,0.5)]">
          Initializing Engine...
        </p>
      </div>
    </Html>
  );
}

export function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const glRef = useRef<any>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      // Let React Three Fiber handle its own disposal to prevent Context Lost crashes
      if (glRef.current) {
        glRef.current = null;
      }
    };
  }, []);

  return (
    <div id="hero-canvas-wrapper" className="hero-canvas-wrap pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 38 }}
        dpr={1}
        gl={{ alpha: true, powerPreference: "default" }}
        className="!absolute inset-0 h-full w-full"
        onCreated={({ gl }) => {
          glRef.current = gl;
        }}
      >
        <Suspense fallback={<SceneFallback />}>
          {/* Lighting */}
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-3, -1, 3]} intensity={0.8} color="#C9A84C" />
          <pointLight position={[0, -2, 0]} intensity={0.3} color="#2A9D8F" />
          <spotLight
            position={[0, 5, 2]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.8}
            color="#FFFFFF"
          />

          {/* 3D Bull */}
          <ChargingBull />

          {/* Floating particles */}
          {!isMobile && <Particles />}

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.5}
              intensity={0.6}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/charging-bull.glb");
