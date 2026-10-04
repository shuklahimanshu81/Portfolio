import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, Line, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import scrollState from '../../../lib/scroll-state'

// The "market" scene travels through these waypoints as the page
// scrolls — hero -> about/technical -> career -> projects/footer —
// so it reads as flying deeper into the cityscape, not a static
// hero background.
const WAYPOINTS = [
	{ progress: 0,    position: [4.6, -0.6, -4],  scale: 0.9 },
	{ progress: 0.22, position: [1.2, -3.2, -9],  scale: 0.92 },
	{ progress: 0.5,  position: [-1.4, -5.4, -17], scale: 0.82 },
	{ progress: 0.78, position: [1.8, -7.6, -25], scale: 0.72 },
	{ progress: 1,    position: [0, -9.5, -33],   scale: 0.62 },
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

// Cheap deterministic hash so the "market data" looks the same
// every load instead of reshuffling on each render.
function hashRandom(seed) {
	const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
	return x - Math.floor(x)
}

const UP_COLOR = '#2dd4bf'
const DOWN_COLOR = '#fb7185'

/**
 * Full-page WebGL backdrop: a glowing data-grid floor, a
 * procedurally generated candlestick skyline (green/red like a
 * real ticker), and a price line weaving through it. Scroll drives
 * a flythrough of the whole scene — see WAYPOINTS. Mounted
 * client-only by layout/scene-layer.jsx, which also owns the
 * WebGL-support / reduced-motion fallback.
 *
 * @param {boolean} lowPower reduce bar/particle counts and disable bloom
 * @returns {jsx} <Scene3D />
 */
export default function Scene3D({ lowPower = false }) {
	const cols = lowPower ? 7 : 11
	const rows = lowPower ? 10 : 16

	return (
		<Canvas
			dpr={[1, lowPower ? 1.25 : 1.8]}
			camera={{ position: [0, 0, 6.5], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
		>
			<ambientLight intensity={0.5} />
			<fog attach="fog" args={['#05070a', 10, 34]} />

			<ParallaxRig>
				<ScrollRig>
					<GridFloor cols={cols} rows={rows} />
					<Candlesticks cols={cols} rows={rows} />
					<PriceLine cols={cols} rows={rows} />
				</ScrollRig>
			</ParallaxRig>

			<Sparkles
				count={lowPower ? 50 : 140}
				scale={[16, 10, 30]}
				size={1.1}
				speed={0.2}
				opacity={0.4}
				color="#bae6fd"
			/>

			{ !lowPower && (
				<EffectComposer>
					<Bloom
						intensity={1.1}
						luminanceThreshold={0.2}
						luminanceSmoothing={0.35}
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
 * through to the page content underneath.
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
		const targetY = pointer.current.x * 0.25
		const targetX = pointer.current.y * -0.08
		group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 2, 1)
		group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 2, 1)
	})

	return <group ref={group}>{children}</group>
}

/**
 * Moves the cityscape along WAYPOINTS as the page scrolls, so it
 * reads as the camera flying deeper into the market the further
 * you scroll through the site. Rotation speed also reacts to
 * scroll velocity — scroll fast and the city spins up a little,
 * like a burst of trading volume.
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

		const velocityBoost = Math.min(Math.abs(scrollState.velocity) * 0.004, 0.25)
		group.current.rotation.y += delta * velocityBoost
	})

	return <group ref={group}>{children}</group>
}

const SPACING = 1.15

function GridFloor({ cols, rows }) {
	const width = cols * SPACING + 4
	const depth = rows * SPACING + 10
	return (
		<gridHelper
			args={[Math.max(width, depth), 36, '#2dd4bf', '#0f2a2a']}
			position={[0, 0, -depth / 2 + SPACING]}
		/>
	)
}

function Candlesticks({ cols, rows }) {
	const bars = useMemo(() => {
		const arr = []
		for (let r = 0; r < rows; r++) {
			let prevHeight = 1
			for (let c = 0; c < cols; c++) {
				const seed = r * 97 + c * 13
				const n = hashRandom(seed)
				const spike = hashRandom(seed + 500) > 0.9 ? hashRandom(seed + 900) * 2.2 : 0
				const height = 0.35 + n * 2 + spike
				const up = height >= prevHeight
				prevHeight = height
				arr.push({
					position: [(c - (cols - 1) / 2) * SPACING, height / 2, -r * SPACING],
					height,
					color: up ? UP_COLOR : DOWN_COLOR,
				})
			}
		}
		return arr
	}, [cols, rows])

	return (
		<Instances limit={bars.length} range={bars.length}>
			<boxGeometry args={[0.46, 1, 0.46]} />
			<meshBasicMaterial toneMapped={false} />
			{ bars.map((b, i) => (
				<Instance key={i} position={b.position} scale={[1, b.height, 1]} color={b.color} />
			)) }
		</Instances>
	)
}

function PriceLine({ cols, rows }) {
	const points = useMemo(() => {
		const pts = []
		const steps = 48
		for (let i = 0; i <= steps; i++) {
			const t = i / steps
			const x = Math.sin(t * 6) * cols * 0.18
			const y = 2.4 + Math.sin(t * 9) * 0.5 + Math.sin(t * 3.3) * 0.9
			const z = -t * (rows - 1) * SPACING
			pts.push([x, y, z])
		}
		return pts
	}, [cols, rows])

	return <Line points={points} color="#7dd3fc" lineWidth={2} toneMapped={false} />
}
