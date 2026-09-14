import { useEffect } from 'react'
import { m, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'

import Badges 		from '../../utils/badge.list.util'
import Icon 		from '../../utils/icon.util'

import css 			from '../../../styles/sections/projects/featured.module.scss'

export default function FeaturedProject({ content }, index) {

	const { project, tagline, url, live, descriptionTitle, description, stack, stats } = content

	const controls = useAnimation();
	const { ref, inView  } = useInView({
		"threshold": 0.25,
		"triggerOnce": false
	})

	useEffect( () => {
		if ( inView ) {	controls.start("visible") }
		if ( !inView ) { controls.start("hidden") }
	}, [ controls, inView ] )

	return (
		<m.a
			key={index}
			href={url}
			target="_blank"
			rel="noreferrer"
			className={css.project}
			//framer-motion
			ref={ref}
			variants={container}
			initial={[ "rest", "hidden" ]}
			whileHover="hover"
			animate={controls} >

			<div className={css.details}>
				<div className={css.projectHeader}>
					<div className={css.header}>
						<h3 className="highlight">{project}</h3>
						{ live && (
							<span className={css.liveBadge}>
								<span className={css.liveDot}></span>
								Live product
							</span>
						) }
					</div>
					{ tagline && <p className={css.tagline}>{tagline}</p> }
					<div className={css.description}>
						<p><strong>{descriptionTitle}</strong> {description}</p>
					</div>
					<div className={css.stackContainer}>
						<Badges list={stack} block="stack" fullContainer={false} color={false} />
					</div>
					<m.div variants={''} className={css.viewProject}>
						Visit site <Icon icon={[ 'fas', 'arrow-right-to-bracket' ]} />
					</m.div>
				</div>
			</div>

			<div className={css.statsPanel}>
				{ stats?.map( ({ value, label }, i) => (
					<m.div key={i} className={css.stat} variants={item}>
						<span className={css.statValue}>{value}</span>
						<span className={css.statLabel}>{label}</span>
					</m.div>
				)) }
			</div>
		</m.a>
	)
}

const container = {
	hidden: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.0625
		}
	},
	visible: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.15,
		}
	},
	rest: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	},
	hover: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	}
}

const item = {
	hidden: {
		y: 30,
		opacity: 0,
		transition: {
			type: "tween",
			ease: "easeIn",
			duration: .35,
		}
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: .5,
		}
	},
}
