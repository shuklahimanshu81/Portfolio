import { useEffect, useRef, useState } from 'react'

import css from '../../styles/structure/cursor.module.scss'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .leaveSite'

/**
 * Custom cursor: a small dot that leads and a lagging ring that
 * eases toward it, growing over anything interactive. Disabled on
 * touch devices and when prefers-reduced-motion is set.
 *
 * @returns {jsx|null} <Cursor />
 */
export default function Cursor() {
	const [enabled, setEnabled] = useState(false)
	const dotRef = useRef()
	const ringRef = useRef()
	const [hovering, setHovering] = useState(false)

	useEffect(() => {
		const isTouch = window.matchMedia('(pointer: coarse)').matches
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		setEnabled(!isTouch && !reducedMotion)
	}, [])

	useEffect(() => {
		if (!enabled) return

		const ring = { x: 0, y: 0 }
		const dot = { x: 0, y: 0 }
		let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

		const onMove = (e) => {
			target = { x: e.clientX, y: e.clientY }
		}
		const onOver = (e) => {
			if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true)
		}
		const onOut = (e) => {
			if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false)
		}

		window.addEventListener('pointermove', onMove, { passive: true })
		window.addEventListener('pointerover', onOver, { passive: true })
		window.addEventListener('pointerout', onOut, { passive: true })

		let raf
		const tick = () => {
			dot.x += (target.x - dot.x) * 0.9
			dot.y += (target.y - dot.y) * 0.9
			ring.x += (target.x - ring.x) * 0.18
			ring.y += (target.y - ring.y) * 0.18

			if (dotRef.current) dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px)`
			if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`

			raf = requestAnimationFrame(tick)
		}
		raf = requestAnimationFrame(tick)

		return () => {
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('pointerover', onOver)
			window.removeEventListener('pointerout', onOut)
			cancelAnimationFrame(raf)
		}
	}, [enabled])

	if (!enabled) return null

	return (
		<>
			<div ref={dotRef} className={css.dot} />
			<div ref={ringRef} className={`${css.ring} ${hovering ? css.hovering : ''}`} />
		</>
	)
}
