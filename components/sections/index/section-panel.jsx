import { useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'

import { useSection } from '../../utils/section-context'

import About from './about'
import Technical from './technical'
import Career from './career'
import FeaturedProjects from '../projects/featured'

import Icon from '../../utils/icon.util'

import css from '../../../styles/structure/section-panel.module.scss'

const CONTENT = {
	about: About,
	technical: Technical,
	career: Career,
	projects: FeaturedProjects,
}

/**
 * The click-triggered overlay that replaces scrolling: opening a
 * nav item mounts the matching section here instead of revealing
 * it further down the page.
 *
 * @returns {jsx} <SectionPanel />
 */
export default function SectionPanel() {
	const { active, closeSection } = useSection()

	useEffect(() => {
		if (!active) return
		const onKey = (e) => { if (e.key === 'Escape') closeSection() }
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [active, closeSection])

	const Content = active ? CONTENT[active] : null

	return (
		<AnimatePresence>
			{ Content && (
				<m.div
					className={css.panel}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 24 }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
				>
					<button className={css.close} onClick={closeSection} aria-label="Close">
						<Icon icon={['fas', 'xmark']} />
						<span>Back</span>
					</button>
					<div className={css.scroll}>
						<Content />
					</div>
				</m.div>
			) }
		</AnimatePresence>
	)
}
