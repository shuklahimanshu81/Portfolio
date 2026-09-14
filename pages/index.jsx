import Hero 		from '../components/sections/index/hero'
import Looking 		from '../components/sections/index/looking'
import About 		from '../components/sections/index/about'
import Technical 	from '../components/sections/index/technical'
import Career 		from '../components/sections/index/career'
import FeaturedProjects	from '../components/sections/projects/featured'

import Color 		from '../components/utils/page.colors.util'
import Seo, { personJsonLd } from '../components/utils/seo.util'

import colors 		from '../content/index/_colors.json'

//
export default function HomePage() {

	return (
		<>
			<Seo
				title="Frontend Developer (SDE-2)"
				description="Himanshu Shukla — Frontend Developer (SDE-2) at INDmoney with 4+ years building high-performance React, Next.js, and Redux Toolkit applications for fintech platforms including INDstocks and SMC Easy Invest."
				path="/"
				jsonLd={personJsonLd}
			/>
			<Color colors={colors} />
			<Hero />
			{/* <Looking /> */}
			<FeaturedProjects />
			<About />
			<Technical />
			<Career />
		</>
	);
}