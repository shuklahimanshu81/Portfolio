// Core packages
import Image from 'next/image'

import Badges 		from '../../utils/badge.list.util'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Career scss
import career from '../../../styles/sections/index/career.module.scss'

/**
 * Section: Career
 *
 * @returns {jsx} <Career />
 */
export default function Career() {
	return (
		<Section classProp={`${career.section} borderBottom`}>
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Experience"
					preTitle="Career"
					subTitle="4+ years building high-performance frontends across fintech and marketplace platforms."
				/>
				<section className={career.area}>

					<article className={career.company}>
						<div className={career.companyContent}>
							<span className={career.companyHeader}>
								<h3>INDmoney</h3>
								<h4>SDE – 2 (Frontend)</h4>
								<h4>Feb 2026 – Present</h4>
								<h5>Gurugram, India</h5>
							</span>
							<p>
							INDmoney is a wealth-tech platform for investing, trading, and managing money in one place. I work on INDsocial and the trading terminal — building the interfaces traders use to track positions, read charts, and place orders in real time.
							</p>
						</div>
						<div className={career.companyAlt}></div>
					</article>

					<article className={career.companyPositions}>
						<div className={career.position}>
							<div className={career.positionContent}>
								<span className={career.positionHeader}>
									<h3>Key projects at INDmoney</h3>
								</span>
								<ul className={career.list}>
									<li>
										Built the web experience for INDsocial, a social platform where users share trades, live positions, and portfolios
										<span className={career.subList}><span className={career.bullet}></span>Implemented profile and post views with seamless deep-linking into the native app for transactional flows</span>
									</li>
									<li>
										Optimized real-time option-chain streaming through virtualization
										<span className={career.subList}><span className={career.bullet}></span>Cut rendered tick updates from ~200 to ~50 per cycle (~75% reduction), significantly lowering render load on the data-heavy options screen</span>
									</li>
									<li>
										Designed and shipped custom TradingView indicators (CPR, Auto VWAP, Smart Money Concepts)
										<span className={career.subList}><span className={career.bullet}></span>Converted Pine Script to JS and migrated rendering to native TradingView primitives to improve chart performance and reliability for live trading users</span>
									</li>
									<li>
										Shipped an AI pattern-detection toolbar button that renders chart patterns on the terminal in real time
										<span className={career.subList}><span className={career.bullet}></span>Consumes backend-detected historical pattern data to draw precise, deterministic overlays</span>
									</li>
									<li>
										Integrated Sentry for client-side error monitoring and logging
										<span className={career.subList}><span className={career.bullet}></span>Surfaced frontend errors that were previously invisible under the existing New Relic setup, significantly improving production debuggability</span>
									</li>
									<li>
										Championed accessibility across the platform
										<span className={career.subList}><span className={career.bullet}></span>Helped teammates on a11y best practices and established WCAG-aligned UI standards adopted team-wide</span>
									</li>
									<li>
										Worked on the trade screen for the US Stocks product
										<span className={career.subList}><span className={career.bullet}></span>Enabled users to place and manage US equity orders</span>
									</li>
								</ul>
								<Badges list={indmoney} block="stack" fullContainer="fullContainer"/>
							</div>
							<div className={career.positionAlt}></div>
						</div>
					</article>

					<article className={career.company}>
						<div className={career.companyContent}>
							<span className={career.companyHeader}>
								<h3>SMC Global</h3>
								<h4>Member of Technical Staff – 2 (Frontend)</h4>
								<h4>July 2024 – Feb 2026</h4>
								<h5>Delhi, India</h5>
							</span>
							<p>
							SMC Global is one of India&apos;s largest financial services companies. I led frontend ownership of smceasyinvest.com, a full-scale retail investment platform, and was recognized with the Velocity Masters Award for consistently delivering high-impact features within aggressive timelines.
							</p>
						</div>
						<div className={career.companyAlt}></div>
					</article>

					<article className={career.companyPositions}>
						<div className={career.position}>
							<div className={career.positionContent}>
								<span className={career.positionHeader}>
									<h3>Key projects at SMC Global</h3>
								</span>
								<ul className={career.list}>
									<li>
										Led frontend ownership of smceasyinvest.com, building core investment flows — mutual fund cart, SIP / lumpsum investments, redemptions, and scheme switching
										<span className={career.subList}><span className={career.bullet}></span>Enabled a full-scale retail investment platform launched from scratch within 6 months by a 3-developer team</span>
									</li>
									<li>
										Designed and delivered the NCD bond platform end-to-end in 3 days, taking complete UI/UX ownership without design support
										<span className={career.subList}><span className={career.bullet}></span>Implemented frontend optimizations (code-splitting, asset optimization, state efficiency) resulting in ~40% faster page loads across IPO, NCD, and Reports modules</span>
									</li>
								</ul>
								<Badges list={smc} block="stack" fullContainer="fullContainer"/>
							</div>
							<div className={career.positionAlt}></div>
						</div>
					</article>

					<article className={career.company}>
						<div className={career.companyContent}>
							<span className={career.companyHeader}>
								<h3>Algoworks</h3>
								<h4>Software Engineer</h4>
								<h4>Jan 2022 – June 2024</h4>
								<h5>Noida, India</h5>
							</span>
							<p>
							Algoworks is a software consulting firm building custom web applications for clients across industries. I built frontend modules for a services marketplace and several production web applications from the ground up.
							</p>
						</div>
						<div className={career.companyAlt}></div>
					</article>

					<article className={career.companyPositions}>
						<div className={career.position}>
							<div className={career.positionContent}>
								<span className={career.positionHeader}>
									<h3>Key projects at Algoworks</h3>
								</span>
								<ul className={career.list}>
									<li>
										Built key frontend modules for a marketplace platform enabling service listing, rentals, and purchases
										<span className={career.subList}><span className={career.bullet}></span>Implemented real-time chat (Twilio), authentication (AWS Cognito), and payments (Stripe) to support end-to-end user transactions</span>
									</li>
									<li>
										Developed multiple production web applications
										<span className={career.subList}><span className={career.bullet}></span>A voter-candidate management system with admin dashboards and Chart.js visualizations, and a subscription-based social platform supporting post creation and user management using Next.js and React</span>
									</li>
								</ul>
								<Badges list={algoworks} block="stack" fullContainer="fullContainer"/>
							</div>
							<div className={career.positionAlt}></div>
						</div>
					</article>

					<article className={career.company}>
						<div className={career.companyContent}>
							<span className={career.companyHeader}>
								<h3>IMS Engineering College, Ghaziabad</h3>
								<h4>Bachelor of Technology – Computer Science</h4>
								<h4>2018 – 2022</h4>
								<h5>Ghaziabad, India</h5>
							</span>
						</div>
						<div className={career.companyAlt}></div>
					</article>

				</section>
			</Container>
		</Section>
	)
}

const indmoney	= [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'typescript', 	name: 'TypeScript', 		type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'redux', 		name: 'Redux Toolkit', 	type: 'devicon' },
	{ key: 'sentry', 		name: 'Sentry', 			type: 'devicon' },
	{ key: 'wave-square', 	name: 'TradingView Charting Library', type: 'fas' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
]

const smc	= [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'redux', 		name: 'Redux Toolkit', 	type: 'devicon' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
]

const algoworks	= [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'amazonwebservices', name: 'AWS Cognito', 	type: 'devicon' },
	{ key: 'stripe', 		name: 'Stripe', 			type: 'fab' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
]
