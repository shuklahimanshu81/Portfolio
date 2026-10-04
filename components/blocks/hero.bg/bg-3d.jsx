import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import HeroBgFallback from './bg-color-1'
import hero from '../../../styles/sections/index/hero.module.scss'

const Scene3D = dynamic(() => import('./scene3d'), { ssr: false })

/**
 * Full-screen 3D hero takeover. Falls back to the flat gradient
 * background (bg-color-1) when WebGL isn't available or the user
 * has requested reduced motion — this check only runs client-side,
 * so the fallback is also what's rendered during SSR/first paint.
 *
 * @returns {jsx} <HeroBg3D />
 */
export default function HeroBg3D() {
	const [mode, setMode] = useState('fallback')

	useEffect(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		let hasWebGL = false
		try {
			const canvas = document.createElement('canvas')
			hasWebGL = !!(
				window.WebGLRenderingContext &&
				(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
			)
		} catch (e) {
			hasWebGL = false
		}

		if (!hasWebGL || reducedMotion) {
			setMode('fallback')
			return
		}

		const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
		setMode(lowPower ? 'low' : 'full')
	}, [])

	if (mode === 'fallback') return <HeroBgFallback />

	return (
		<div className={hero.scene3d}>
			<Scene3D lowPower={mode === 'low'} />
		</div>
	)
}
