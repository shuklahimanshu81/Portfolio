// Core packages
import Image from 'next/image'

// Section structure
import Section from '../../structure/section';
import Container from '../../structure/container';

// Section general blocks
import SectionTitle from '../../blocks/section.title.block'
import SectionGridBg from '../../blocks/section.grid.block'

// Section specific blocks
import BadgesBlock from '../../blocks/about.badges.block'
import CopyBlock from '../../blocks/about.copy.block'

// Section scss
import about from '../../../styles/sections/index/about.module.scss';

/**
 * Section: About
 * An overview of yourself.
 * Highlight your top level attributes and disciplines.
 * 
 * @returns {jsx} <About />
 */
export default function About() {
	return (
		<Section classProp={about.section}>	
			<Container spacing={['verticalXXXLrg']}>
				<SectionTitle
					title="About Me"
					preTitle="Synopsis"
					subTitle="Frontend Developer (SDE-2) with 4+ years of experience building high-performance, scalable web applications."
				/>
				<section className={about.content}>
					<div className={about.image}>
						<Image src="/img/back.jpg" layout='fill' alt="Himanshu Shukla's development workspace" />
					</div>
					<div className={about.copy} >
						<CopyBlock
							title="How I work"
							containerClass={about.container}
							iconClass={about.icon}
							icon={[ 'fas', 'bolt' ]}
							copy="I own frontend modules end-to-end — from architecture and performance budgets down to the pixel-level UX details. At INDmoney I build the web experience for a social trading platform and optimize real-time option-chain streaming; at SMC Global I led the frontend for a retail investment platform built from scratch in 6 months. I care about clean code, measurable performance wins, and interfaces that are accessible by default. Outside of work, I enjoy running and cricket."
						/>
						<BadgesBlock
							title="What I focus on"
							containerClass={about.container}
							list={methods}
							fullContainer="fullContainer"
							block="methods"
							icon="fingerprint"
							copy="From cutting rendered tick updates by ~75% through virtualization to championing WCAG-aligned UI standards adopted team-wide, I care about the details that make software fast, reliable, and usable by everyone."
							//invertedColor="invertedColor"
							headerIcon={`${about.icon}`}
						/>
					</div>
				</section>
			</Container>
		</Section>
	)
}

const methods 	= [
	{ key: 'gauge-high', 		name: 'Performance Optimization', 	type: 'fas' },
	{ key: 'universal-access', 	name: 'Accessibility (WCAG/ARIA)', 	type: 'fas' },
	{ key: 'wave-square', 		name: 'Real-time Data & Streaming', 	type: 'fas' },
	{ key: 'layer-group', 		name: 'Clean Architecture', 		type: 'fas' },
]