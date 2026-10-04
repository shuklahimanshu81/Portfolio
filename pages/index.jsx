import { AnimatePresence, m } from 'framer-motion'

import Hero 		from '../components/sections/index/hero'
import SectionPanel	from '../components/sections/index/section-panel'
import IntroReveal	from '../components/sections/index/intro-reveal'

import Color 		from '../components/utils/page.colors.util'
import Seo, { personJsonLd } from '../components/utils/seo.util'
import { useSection } from '../components/utils/section-context'

import colors 		from '../content/index/_colors.json'

//
export default function HomePage() {

	const { active } = useSection()

	return (
		<>
			<Seo
				title="Frontend Developer (SDE-2)"
				description="Himanshu Shukla — Frontend Developer (SDE-2) at INDmoney with 4+ years building high-performance React, Next.js, and Redux Toolkit applications for fintech platforms including INDstocks and SMC Easy Invest."
				path="/"
				jsonLd={personJsonLd}
			/>
			<Color colors={colors} />
			<AnimatePresence>
				{ !active && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Hero />
					</m.div>
				) }
			</AnimatePresence>
			<SectionPanel />
			<IntroReveal />
		</>
	);
}