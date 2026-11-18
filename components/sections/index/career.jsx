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
							INDmoney is a wealth-tech platform for investing, trading, and managing money in one place. I work on INDsocial and the trading terminal — building the interfaces traders use to track positions, read charts, and place orders in real time. 384 pull requests shipped and counting, across three production repositories serving 20,000+ weekly chart users.
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
										Built and shipped ~28 custom TradingView indicators into the shared indicators-lab package, wired across the desktop terminal and mobile app charts
										<span className={career.metric}>28 indicators · 2,875 weekly users on the top one</span>
										<span className={career.subList}><span className={career.bullet}></span>Top indicator &ldquo;Trendikaterr&rdquo; reached 2,875 weekly users — 14.4% of all chart users</span>
									</li>
									<li>
										Architected Creator Studio v2, a chart-authoring tool with 17 shape types and a registry
										<span className={career.subList}><span className={career.bullet}></span>Let creators publish new indicators without custom builds, replacing a one-off process with a reusable system</span>
									</li>
									<li>
										Virtualized both option chains so only visible strikes render and subscribe to live WebSocket prices
										<span className={career.metric}>10× growth · 18.8K → 198K opens/mo</span>
										<span className={career.subList}><span className={career.bullet}></span>Option chain opens grew 10× (18,858 → 197,977/month) between January and October</span>
									</li>
									<li>
										Built order slicing in Flash for orders placed above the exchange freeze limit
										<span className={career.metric}>50,735 sliced orders · 517 users in 17 days</span>
									</li>
									<li>
										Built position fallback refresh for missed socket updates and a TradingView worker crash guard
										<span className={career.metric}>93,763 refreshes/week · 15,024 crashes absorbed</span>
										<span className={career.subList}><span className={career.bullet}></span>Fixed ~13,400 stale screens/day for 5,320 users/week; the crash guard stopped a bug that previously froze every chart on the page</span>
									</li>
									<li>
										Extended DIY (Pine) indicators from Flash-only to every TradingView terminal via worker-mode execution
										<span className={career.metric}>17,193 users in 2 weeks · 44% faster</span>
										<span className={career.subList}><span className={career.bullet}></span>Reached 17,193 users in two weeks with zero main-thread blocking; cut DIY load blocking 44% (3,184 → 1,775 ms)</span>
									</li>
									<li>
										Reworked F&amp;O onboarding with unified state and toolbar CTAs
										<span className={career.metric}>2.7× growth · ~1,900 → ~5,000 clickers/mo</span>
										<span className={career.subList}><span className={career.bullet}></span>Also shipped an AI pattern-detection toolbar button, the US Stocks trade screen, commodity/MCX onboarding, and 10+ regulatory pages</span>
									</li>
									<li>
										Integrated Sentry (payment + auth coverage) and CubeAPM jank telemetry, and championed accessibility across the platform
										<span className={career.metric}>9 PRs · became the team&apos;s WCAG standard</span>
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
	{ key: 'code', 			name: 'Pine Script', 		type: 'fas' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'redux', 		name: 'Redux Toolkit', 	type: 'devicon' },
	{ key: 'wave-square', 	name: 'TradingView Charting Library', type: 'fas' },
	{ key: 'sentry', 		name: 'Sentry', 			type: 'devicon' },
	{ key: 'cube', 			name: 'CubeAPM', 			type: 'fas' },
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
