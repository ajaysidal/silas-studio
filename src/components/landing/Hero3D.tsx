"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, OrbitControls, Stars, useGLTF } from "@react-three/drei"
import * as THREE from "three"

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null)
  const [particles, setParticles] = useState<THREE.BufferGeometry>()
  const [count, setCount] = useState(3000)

  useEffect(() => {
    // Reduce particle count on smaller screens or low-memory devices
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory < 4
    const isMobile = window.innerWidth < 768
    const baseCount = 3000
    let newCount = baseCount
    if (isLowEnd || isMobile) {
      newCount = Math.floor(baseCount * 0.5) // 1500
    }
    setCount(newCount)
  }, [])

  useEffect(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.2
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.4
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 0.6
      } else {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.4
        colors[i * 3 + 2] = 0.8
      }

      sizes[i] = Math.random() * 2 + 0.5

      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3))
    setParticles(geometry)
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !particles) return

    const positions = particles.attributes.position.array as Float32Array
    const velocities = particles.attributes.velocity.array as Float32Array
    const count = positions.length / 3

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]

      const dist = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      )

      if (dist > 25) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const radius = 5 + Math.random() * 5

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
      }
    }

    particles.attributes.position.needsUpdate = true

    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001
      pointsRef.current.rotation.x += 0.00005
    }
  })

  if (!particles) return null

  return (
    <points ref={pointsRef} geometry={particles}>
      <pointsMaterial
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingCodeBlocks() {
  const groupRef = useRef<THREE.Group>(null)
  const blocksRef = useRef<THREE.Mesh[]>([])
  const [initialized, setInitialized] = useState(false)

  // Determine block count based on device
  useEffect(() => {
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory < 4
    const isMobile = window.innerWidth < 768
    if (isLowEnd || isMobile) {
      setInitialized(false) // reset to recalculate with new count
    }
  }, [])

  useEffect(() => {
    if (initialized || !groupRef.current) return

    // Calculate block count based on device
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory < 4
    const isMobile = window.innerWidth < 768
    let blockCount = 12
    if (isLowEnd || isMobile) {
      blockCount = 6 // reduce by half
    }

    const geometries: THREE.BoxGeometry[] = []
    const materials: THREE.MeshPhysicalMaterial[] = []

    for (let i = 0; i < blockCount; i++) {
      const w = 0.8 + Math.random() * 1.2
      const h = 0.4 + Math.random() * 0.8
      const d = 0.15
      geometries.push(new THREE.BoxGeometry(w, h, d))

      const hue = (i / blockCount) * 360
      const color = new THREE.Color().setHSL(hue / 360, 0.7, 0.5)
      materials.push(
        new THREE.MeshPhysicalMaterial({
          color,
          transparent: true,
          opacity: 0.15,
          transmission: 0.3,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide,
        })
      )
    }

    const meshes = geometries.map((geo, i) => new THREE.Mesh(geo, materials[i]))
    meshes.forEach((mesh, i) => {
      const radius = 8 + Math.random() * 6
      const theta = (i / blockCount) * Math.PI * 2 + Math.random() * 0.5
      const phi = Math.PI / 2 + (Math.random() - 0.5) * 1.2

      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) - 2,
        radius * Math.cos(phi)
      )
      mesh.rotation.set(
        Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.3
      )
      mesh.userData = {
        initialTheta: theta,
        initialPhi: phi,
        radius,
        speed: 0.05 + Math.random() * 0.1,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.001,
          y: (Math.random() - 0.5) * 0.001,
          z: (Math.random() - 0.5) * 0.001,
        },
      }
      groupRef.current!.add(mesh)
      blocksRef.current.push(mesh)
    })

    setInitialized(true)

    return () => {
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
    }
  }, [initialized]) // Note: we also need to re-run when blockCount changes, but we reset initialized above.

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += 0.00015

    blocksRef.current.forEach((mesh) => {
      const data = mesh.userData
      data.initialTheta += data.speed * 0.001
      data.initialPhi += Math.sin(clock.getElapsedTime() * data.speed) * 0.0005

      mesh.position.x =
        data.radius * Math.sin(data.initialPhi) * Math.cos(data.initialTheta)
      mesh.position.y =
        data.radius * Math.sin(data.initialPhi) * Math.sin(data.initialTheta) - 2
      mesh.position.z = data.radius * Math.cos(data.initialPhi)

      mesh.rotation.x += data.rotationSpeed.x
      mesh.rotation.y += data.rotationSpeed.y
      mesh.rotation.z += data.rotationSpeed.z

      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + data.initialTheta) * 0.05
      mesh.scale.setScalar(scale)
    })
  })

  return <group ref={groupRef} />
}

function Hero3DCanvas() {
  const [isLowEndOrMobile, setLowEndOrMobile] = useState(false);

  useEffect(() => {
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory < 4;
    const isMobile = window.innerWidth < 768;
    setLowEndOrMobile(isLowEnd || isMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50 }}
      style={{ width: "100%", height: "100%", outline: "none" }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 10, 50]} />

      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#ffffff"
      />
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.8}
        color="#4da3ff"
      />
      <pointLight position={[0, 5, 10]} intensity={2} color="#00d4aa" distance={30} decay={2} />
      <pointLight position={[0, -5, -10]} intensity={1.5} color="#a855f7" distance={30} decay={2} />

      <Stars radius={100} depth={50} count={isLowEndOrMobile ? 500 : 2000} factor={4} saturation={0} fade={true} />

      <ParticleSystem />
      <FloatingCodeBlocks />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={18}
        maxDistance={25}
      />
    </Canvas>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-[#0a0a0f]" />}>
        <Hero3DCanvas />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40" />
    </div>
  )
}

export function Hero3DBackground() {
  return <Hero3D />
}