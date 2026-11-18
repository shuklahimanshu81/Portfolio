// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'
import Terminal from '../../blocks/terminal.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss'


export default function Technical() {
	return (
		<Section classProp={`${about.section} borderBottom`}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="Technical"
					preTitle="Hardskills"
					subTitle="4+ years building high-performance, scalable frontends — from real-time trading UIs to retail investment platforms."
				/>
				<section className={`${about.content} ${about.container}`}>
					<div className={about.copy}>
						<CopyBlock
							title="Languages & Practices"
							icon={[ 'fas', 'code-branch' ]}
							copy="TypeScript, JavaScript, and Pine Script are my daily drivers, backed by real-time rendering at scale, monorepo architecture, and a strong focus on accessibility (WCAG / ARIA) and web performance optimization."
							iconClass={about.icon}
							containerClass={about.container}
						/>
						<BadgesBlock
							title="Core stack"
							copy="React, Next.js, Redux Toolkit, and WebSockets power everything I ship — from mutual fund cart flows to real-time option-chain streaming and TradingView charting."
							list={software}
							block="software"
							fullContainer="fullContainer"
							icon="laptop-code"
							containerClass={about.container}
							headerIcon={about.icon}
						/>
						<BadgesBlock
							title="Tools & platforms"
							copy="Node.js and Express round out the backend side, backed by the tooling and observability stack behind testing, monitoring, and shipping production-grade frontends at scale."
							list={tech}
							block="tech"
							fullContainer="fullContainer"
							icon="server"
							containerClass={about.container}
							headerIcon={about.icon}
						/>
					</div>
					<div className={`${about.image} ${about.terminalColumn}`}>
						<Terminal />
					</div>
				</section>
			</Container>

		</Section>
	)
}

const software = [
	{ key: 'javascript', 	name: 'JavaScript', 		type: 'devicon' },
	{ key: 'typescript', 	name: 'TypeScript', 		type: 'devicon' },
	{ key: 'code', 			name: 'Pine Script', 		type: 'fas' },
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'redux', 		name: 'Redux Toolkit', 	type: 'devicon' },
	{ key: 'box', 			name: 'Zustand', 			type: 'fas' },
	{ key: 'rotate', 		name: 'SWR', 				type: 'fas' },
	{ key: 'tailwindcss', 	name: 'Tailwind CSS', 		type: 'devicon' },
	{ key: 'html5', 		name: 'HTML5', 				type: 'devicon' },
	{ key: 'css3', 			name: 'CSS3', 				type: 'devicon' },
	{ key: 'wave-square', 	name: 'WebSockets', 		type: 'fas' },
]

const tech	= [
	{ key: 'nodejs', 		name: 'Node.js', 			type: 'devicon' },
	{ key: 'pnpm', 			name: 'pnpm', 				type: 'devicon' },
	{ key: 'gauge-high', 	name: 'Turborepo', 			type: 'fas' },
	{ key: 'webpack', 		name: 'Webpack', 			type: 'devicon' },
	{ key: 'vite', 			name: 'Vite', 				type: 'devicon' },
	{ key: 'jest', 			name: 'Jest', 				type: 'devicon' },
	{ key: 'vitest', 		name: 'Vitest', 			type: 'devicon' },
	{ key: 'sentry', 		name: 'Sentry', 			type: 'devicon' },
	{ key: 'chart-line', 	name: 'New Relic', 			type: 'fas' },
	{ key: 'cube', 			name: 'CubeAPM', 			type: 'fas' },
	{ key: 'chart-pie', 	name: 'Mixpanel', 			type: 'fas' },
	{ key: 'wave-square', 	name: 'TradingView Charting Library', type: 'fas' },
	{ key: 'githubactions', name: 'GitHub Actions', 	type: 'devicon' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
	{ key: 'github', 		name: 'GitHub', 			type: 'devicon' },
	{ key: 'amazonwebservices', name: 'AWS', 			type: 'devicon' },
]