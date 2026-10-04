import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import scrollState from '../../../lib/scroll-state'

// Waypoints the scene travels between as the whole page scrolls,
// roughly: hero -> about/technical -> career -> projects/footer.
const WAYPOINTS = [
	{ progress: 0,    position: [3.9, 0.1, -1.5], scale: 1 },
	{ progress: 0.22, position: [2.6, -2.1, -4],  scale: 0.75 },
	{ progress: 0.5,  position: [-2.8, 1.4, -5.5], scale: 0.6 },
	{ progress: 0.78, position: [2.2, 2.6, -6],   scale: 0.55 },
	{ progress: 1,    position: [0, -0.5, -7.5],  scale: 0.45 },
]

function sampleWaypoints(progress) {
	for (let i = 0; i < WAYPOINTS.length - 1; i++) {
		const a = WAYPOINTS[i]
		const b = WAYPOINTS[i + 1]
		if (progress >= a.progress && progress <= b.progress) {
			const span = b.progress - a.progress || 1
			const t = (progress - a.progress) / span
			return {
				position: [
					a.position[0] + (b.position[0] - a.position[0]) * t,
					a.position[1] + (b.position[1] - a.position[1]) * t,
					a.position[2] + (b.position[2] - a.position[2]) * t,
				],
				scale: a.scale + (b.scale - a.scale) * t,
			}
		}
	}
	const last = WAYPOINTS[WAYPOINTS.length - 1]
	return { position: last.position, scale: last.scale }
}

/**
 * Full-screen WebGL hero scene: a distorted glowing core with
 * tech-accent nodes orbiting it, set in a soft particle field.
 * Mounted client-only by hero.bg/index.jsx, which also owns the
 * WebGL-support / reduced-motion fallback.
 *
 * @param {boolean} lowPower reduce particle/node counts and disable bloom
 * @returns {jsx} <Scene3D />
 */
export default function Scene3D({ lowPower = false }) {
	return (
		<Canvas
			dpr={[1, lowPower ? 1.25 : 1.8]}
			camera={{ position: [0, 0, 6.5], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
		>
			<ambientLight intensity={0.4} />
			<pointLight position={[4, 3, 5]} intensity={40} color="#5eead4" />
			<pointLight position={[-5, -3, -4]} intensity={30} color="#38bdf8" />

			<ParallaxRig>
				<ScrollRig>
					<Core />
					<OrbitNodes count={lowPower ? 4 : 7} />
				</ScrollRig>
			</ParallaxRig>

			<Sparkles
				count={lowPower ? 60 : 160}
				scale={[12, 8, 6]}
				size={1.4}
				speed={0.25}
				opacity={0.5}
				color="#7dd3fc"
			/>

			{ !lowPower && (
				<EffectComposer>
					<Bloom
						intensity={0.9}
						luminanceThreshold={0.15}
						luminanceSmoothing={0.4}
						mipmapBlur
					/>
				</EffectComposer>
			) }
		</Canvas>
	)
}

/**
 * Wraps the main scene group and gently tilts it toward the
 * pointer position — tracked on window, not the canvas, so the
 * canvas itself can stay pointer-events:none and let clicks
 * through to the hero buttons underneath.
 */
function ParallaxRig({ children }) {
	const group = useRef()
	const pointer = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const onMove = (e) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
			pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
		}
		window.addEventListener('pointermove', onMove, { passive: true })
		return () => window.removeEventListener('pointermove', onMove)
	}, [])

	useFrame((state, delta) => {
		if (!group.current) return
		const targetY = pointer.current.x * 0.35
		const targetX = pointer.current.y * -0.2
		group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 2, 1)
		group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2, 1)
	})

	return <group ref={group}>{children}</group>
}

/**
 * Moves the core + orbit nodes group along WAYPOINTS as the page
 * scrolls, so the scene reads as one continuous object traveling
 * through the site rather than static hero decoration.
 */
function ScrollRig({ children }) {
	const group = useRef()
	const current = useRef({ position: [...WAYPOINTS[0].position], scale: WAYPOINTS[0].scale })

	useFrame((state, delta) => {
		if (!group.current) return
		const target = sampleWaypoints(scrollState.progress)
		const ease = Math.min(delta * 1.5, 1)

		for (let i = 0; i < 3; i++) {
			current.current.position[i] += (target.position[i] - current.current.position[i]) * ease
		}
		current.current.scale += (target.scale - current.current.scale) * ease

		group.current.position.set(...current.current.position)
		group.current.scale.setScalar(current.current.scale)
	})

	return <group ref={group}>{children}</group>
}

function Core() {
	const mesh = useRef()

	useFrame((state, delta) => {
		if (!mesh.current) return
		const velocityBoost = Math.min(Math.abs(scrollState.velocity) * 0.015, 0.6)
		mesh.current.rotation.x += delta * (0.08 + velocityBoost)
		mesh.current.rotation.y += delta * (0.12 + velocityBoost)
	})

	return (
		<mesh ref={mesh}>
			<icosahedronGeometry args={[1.05, 12]} />
			<MeshDistortMaterial
				color="#0ea5b7"
				emissive="#38bdf8"
				emissiveIntensity={0.7}
				roughness={0.15}
				metalness={0.4}
				distort={0.4}
				speed={1.4}
			/>
		</mesh>
	)
}

const NODE_COLORS = ['#5eead4', '#38bdf8', '#a78bfa', '#22d3ee', '#6ee7b7', '#f472b6', '#facc15']

function OrbitNodes({ count }) {
	const nodes = useMemo(() => {
		return Array.from({ length: count }, (_, i) => ({
			radius: 1.7 + (i % 3) * 0.3,
			speed: 0.15 + (i % 4) * 0.07,
			offset: (i / count) * Math.PI * 2,
			tilt: (i % 2 === 0 ? 1 : -1) * (0.3 + (i % 3) * 0.15),
			size: 0.08 + (i % 3) * 0.03,
			color: NODE_COLORS[i % NODE_COLORS.length],
		}))
	}, [count])

	return (
		<>
			{ nodes.map((n, i) => (
				<OrbitNode key={i} {...n} />
			)) }
		</>
	)
}

function OrbitNode({ radius, speed, offset, tilt, size, color }) {
	const ref = useRef()

	useFrame((state) => {
		if (!ref.current) return
		const t = state.clock.elapsedTime * speed + offset
		ref.current.position.set(
			Math.cos(t) * radius,
			Math.sin(t * 0.6) * radius * tilt,
			Math.sin(t) * radius
		)
	})

	return (
		<mesh ref={ref}>
			<sphereGeometry args={[size, 16, 16]} />
			<meshStandardMaterial
				color={color}
				emissive={color}
				emissiveIntensity={1.6}
				toneMapped={false}
			/>
		</mesh>
	)
}
