import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import css from '../../styles/structure/scene-layer.module.scss'

const Scene3D = dynamic(() => import('../blocks/hero.bg/scene3d'), { ssr: false })

/**
 * The site's persistent 3D backdrop — mounted once in Layout so it
 * sits fixed behind every page and reacts to scroll (see
 * lib/scroll-state.js) instead of being scoped to the hero. Falls
 * back to rendering nothing (just the flat page background) when
 * WebGL is unavailable or the user has prefers-reduced-motion set.
 *
 * @returns {jsx|null} <SceneLayer />
 */
export default function SceneLayer() {
	const [mode, setMode] = useState('off')

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
			setMode('off')
			return
		}

		const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
		setMode(lowPower ? 'low' : 'full')
	}, [])

	if (mode === 'off') return null

	return (
		<div className={css.layer}>
			<Scene3D lowPower={mode === 'low'} />
		</div>
	)
}
