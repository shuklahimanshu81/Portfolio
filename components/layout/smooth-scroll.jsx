import { useEffect } from 'react'
import Lenis from 'lenis'

import scrollState from '../../lib/scroll-state'

/**
 * Initializes Lenis smooth scroll for the whole app and keeps
 * `scrollState` (progress + velocity) updated every frame so the
 * persistent 3D layer can react to it. Renders nothing itself.
 *
 * @returns {null}
 */
export default function SmoothScroll() {
	useEffect(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (reducedMotion) return

		const lenis = new Lenis({
			duration: 1.1,
			smoothWheel: true,
		})

		lenis.on('scroll', ({ progress, velocity }) => {
			scrollState.progress = progress
			scrollState.velocity = velocity
		})

		let frame
		function raf(time) {
			lenis.raf(time)
			frame = requestAnimationFrame(raf)
		}
		frame = requestAnimationFrame(raf)

		return () => {
			cancelAnimationFrame(frame)
			lenis.destroy()
		}
	}, [])

	return null
}
