import { useEffect, useRef, useState } from 'react'

import css from '../../../styles/sections/index/intro-reveal.module.scss'

/**
 * A one-shot, scripted beat that plays over the real hero on first
 * visit: the page opens as a parody of a genuinely terrible old
 * website, then one click tears it apart, cuts to static, runs a
 * fake terminal rebuild log, and dismisses itself to reveal the
 * real page underneath (already mounted the whole time, just
 * covered). Plays once per browser session, skips itself entirely
 * under prefers-reduced-motion, and can be skipped at any point.
 *
 * @returns {jsx|null} <IntroReveal />
 */

const LOG_LINES = [
	{ t: '$ npm run fix' },
	{ t: 'reading package.json… found 1 developer, 0 designers' },
	{ t: 'detecting framework: <table> layouts (1998 edition)', cls: 'w' },
	{ t: 'npm uninstall comic-sans marquee blink visitor-counter' },
	{ t: 'npm WARN deprecated rainbow-divider.gif', cls: 'w' },
	{ t: 'resolving 47 merge conflicts with good taste' },
	{ t: 'optimizing option chain… ~75% fewer re-renders', cls: 'c' },
	{ t: 'profiling IPO/NCD pages… ~40% faster loads', cls: 'c' },
	{ t: 'deleting <marquee>, <blink>, 3 autoplay gifs' },
	{ t: 'restoring kerning, line-height, will to live' },
	{ t: 'linting palette… #FF00FF removed (sorry, magenta)', cls: 'w' },
	{ t: 'running tests… personality.test.js' },
	{ t: 'personality.test.js ✓ passed', cls: 'ok' },
	{ t: 'bundling confidence.js (0 dependencies)' },
	{ t: 'deploying to production — tested it in my head, shipping anyway' },
	{ t: "build complete. 0 bugs (that I'm telling you about).", cls: 'ok' },
]

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function IntroReveal() {
	const [ready, setReady] = useState(false)
	const [phase, setPhase] = useState('ugly') // ugly | glitching | static | terminal | terminal-out | done
	const [counter, setCounter] = useState(4213)
	const [logShown, setLogShown] = useState([])
	const [progress, setProgress] = useState(0)

	const cancelledRef = useRef(false)
	const canvasRef = useRef(null)
	const staticRafRef = useRef(null)

	useEffect(() => {
		// Reset on every (re-)mount, not just on first mount: React 18
		// Strict Mode double-invokes effects in dev (mount -> cleanup ->
		// mount again), and without this the cleanup below would poison
		// the ref before the user ever gets to click anything.
		cancelledRef.current = false

		let reducedMotion = false
		let alreadyPlayed = false
		try {
			reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			alreadyPlayed = sessionStorage.getItem('introPlayed') === '1'
		} catch (e) {}

		if (reducedMotion || alreadyPlayed) {
			setPhase('done')
		} else {
			setReady(true)
		}

		return () => { cancelledRef.current = true }
	}, [])

	useEffect(() => {
		if (phase !== 'ugly') return
		const id = setInterval(() => {
			setCounter((c) => c + Math.floor(Math.random() * 3) + 1)
		}, 2200)
		return () => clearInterval(id)
	}, [phase])

	function markPlayed() {
		try { sessionStorage.setItem('introPlayed', '1') } catch (e) {}
	}

	function drawStaticFrame() {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		const w = canvas.width, h = canvas.height
		const img = ctx.createImageData(w, h)
		for (let i = 0; i < img.data.length; i += 4) {
			const v = Math.random() * 255
			img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255
		}
		ctx.putImageData(img, 0, 0)
		staticRafRef.current = requestAnimationFrame(drawStaticFrame)
	}

	async function runSequence() {
		setPhase('glitching')
		await delay(320)
		if (cancelledRef.current) return

		setPhase('static')
		drawStaticFrame()
		await delay(260)
		if (cancelledRef.current) return
		cancelAnimationFrame(staticRafRef.current)

		setPhase('terminal')
		setLogShown([])
		setProgress(0)
		for (let i = 0; i < LOG_LINES.length; i++) {
			if (cancelledRef.current) return
			const next = LOG_LINES[i]
			setLogShown((prev) => [...prev, next])
			setProgress(Math.round(((i + 1) / LOG_LINES.length) * 100))
			await delay(i < 2 ? 220 : 70 + Math.random() * 110)
		}
		await delay(350)
		if (cancelledRef.current) return

		setPhase('terminal-out')
		await delay(300)
		if (cancelledRef.current) return

		markPlayed()
		setPhase('done')
	}

	function skip() {
		cancelledRef.current = true
		if (staticRafRef.current) cancelAnimationFrame(staticRafRef.current)
		markPlayed()
		setPhase('done')
	}

	if (!ready || phase === 'done') return null

	return (
		<div className={css.stage}>
			{(phase === 'ugly' || phase === 'glitching') && (
				<div className={`${css.ugly} ${phase === 'glitching' ? css.glitchOut : ''}`}>
					<div className={css.uglyWrap}>
						<h1 className={css.rainbow}>🚧 WELCOME TO MY PORTFOLIO!!! 🚧</h1>
						<div className={css.uglySub}>( best viewed at 1024x768 · optimized for Internet Explorer )</div>
						<div className={css.marquee}>
							<div className={css.marqueeTrack}>
								<span>⭐ UNDER CONSTRUCTION SINCE 2003 ⭐ PLEASE SIGN MY GUESTBOOK ⭐ AVAILABLE FOR HIRE ⭐ THANKS FOR VISITING ⭐</span>
								<span>⭐ UNDER CONSTRUCTION SINCE 2003 ⭐ PLEASE SIGN MY GUESTBOOK ⭐ AVAILABLE FOR HIRE ⭐ THANKS FOR VISITING ⭐</span>
							</div>
						</div>
						<div className={css.navrow}>
							<span className={css.oldBtn}>Home</span>
							<span className={css.oldBtn}>About Me</span>
							<span className={css.oldBtn}>My Linx</span>
							<span className={css.oldBtn}>Guestbook</span>
							<span className={css.oldBtn}>Webring</span>
						</div>
						<div className={css.photo}>IMG_headshot_FINAL_v3_actualfinal.jpg<br />(broken link)</div>
						<div className={css.badgebar}>
							<span className={css.blink}>★NEW!★</span>
							<span className={css.spin}>🌐</span>
							<span className={css.counter}>YOU ARE VISITOR # {String(counter).padStart(6, '0')}</span>
						</div>
						<div>
							<button className={css.fixBtn} onClick={runSequence}>⚠ THIS IS NOT IT. (click to fix)</button>
						</div>
						<footer className={css.uglyFooter}>© 2003 Himanshu Shukla · Made with FrontPage · Hosted on a Dell in my closet</footer>
					</div>
				</div>
			)}

			{phase === 'static' && (
				<div className={css.staticLayer}>
					<canvas ref={canvasRef} width={160} height={90} />
				</div>
			)}

			{(phase === 'terminal' || phase === 'terminal-out') && (
				<div className={`${css.terminal} ${phase === 'terminal-out' ? css.glitchOut : ''}`}>
					<div className={css.termWrap}>
						<div className={css.termHead}>rebuild session — localhost</div>
						<div className={css.log}>
							{logShown.map((line, i) => (
								<div key={i} className={line.cls ? css[line.cls] : undefined}>{line.t}</div>
							))}
						</div>
						<div className={css.progressRow}>
							<span>rebuilding</span>
							<div className={css.progressTrack}>
								<div className={css.progressFill} style={{ width: `${progress}%` }} />
							</div>
							<span>{progress}%</span>
						</div>
					</div>
				</div>
			)}

			<button className={css.skip} onClick={skip}>skip intro →</button>
		</div>
	)
}
