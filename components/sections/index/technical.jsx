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
							copy="JavaScript, TypeScript, and Pine Script are my daily drivers, backed by a strong focus on accessibility (WCAG / ARIA) and web performance optimization — the two practices I keep coming back to on every project."
							iconClass={about.icon}
							containerClass={about.container}
						/>
						<BadgesBlock
							title="Core stack"
							copy="React, Next.js, and Redux Toolkit power everything I ship — from mutual fund cart flows to real-time option-chain streaming."
							list={software}
							block="software"
							fullContainer="fullContainer"
							icon="laptop-code"
							containerClass={about.container}
							headerIcon={about.icon}
						/>
						<BadgesBlock
							title="Tools & platforms"
							copy="The libraries and tooling I rely on for testing, monitoring, and shipping production-grade frontends."
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
	{ key: 'react', 		name: 'React', 				type: 'devicon' },
	{ key: 'nextjs', 		name: 'Next.js', 			type: 'devicon' },
	{ key: 'redux', 		name: 'Redux Toolkit', 	type: 'devicon' },
	{ key: 'html5', 		name: 'HTML5', 				type: 'devicon' },
	{ key: 'css3', 			name: 'CSS3', 				type: 'devicon' },
	{ key: 'wave-square', 	name: 'WebSockets', 		type: 'fas' },
]

const tech	= [
	{ key: 'webpack', 		name: 'Webpack', 			type: 'devicon' },
	{ key: 'babel', 		name: 'Babel', 				type: 'devicon' },
	{ key: 'jest', 			name: 'Jest & Enzyme', 		type: 'devicon' },
	{ key: 'sentry', 		name: 'Sentry', 			type: 'devicon' },
	{ key: 'chart-line', 	name: 'New Relic', 			type: 'fas' },
	{ key: 'wave-square', 	name: 'TradingView Charting Library', type: 'fas' },
	{ key: 'git', 			name: 'Git', 				type: 'devicon' },
	{ key: 'github', 		name: 'GitHub', 			type: 'devicon' },
	{ key: 'jira', 			name: 'Jira', 				type: 'devicon' },
	{ key: 'amazonwebservices', name: 'AWS', 			type: 'devicon' },
]