import Head from 'next/head'

export const SITE_URL = 'https://shuklahim.netlify.app'
export const SITE_NAME = 'Himanshu Shukla'

const DEFAULT_KEYWORDS = [
	'Himanshu Shukla',
	'Himanshu Shukla frontend developer',
	'Himanshu Shukla SDE',
	'Himanshu Shukla INDmoney',
	'Himanshu Shukla portfolio',
	'Frontend Developer',
	'React Developer',
	'Next.js Developer',
	'SDE-2 Frontend',
	'INDmoney frontend engineer',
	'SMC Global frontend developer',
	'Algoworks software engineer',
	'JavaScript developer India',
	'TypeScript developer',
	'Web performance engineer',
]

/**
 * Per-page SEO head tags: title, description, keywords, canonical,
 * Open Graph, and Twitter card. Pass `jsonLd` (an object or array of
 * objects) to also emit structured data for that page.
 *
 * @returns {jsx} <Seo />
 */
export default function Seo({
	title,
	description,
	path = '/',
	keywords = [],
	image = '/img/preview.png',
	jsonLd,
}) {
	const url = `${SITE_URL}${path}`
	const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Frontend Developer (SDE-2)`
	const allKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])].join(', ')
	const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

	return (
		<Head>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={allKeywords} />
			<meta name="author" content={SITE_NAME} />
			<meta name="robots" content="index, follow" />
			<link rel="canonical" href={url} />

			{/* Open Graph */}
			<meta property="og:type" content="profile" />
			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={`${SITE_URL}${image}`} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={`${SITE_URL}${image}`} />

			{ jsonLdList.map((schema, i) => (
				<script
					key={i}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			)) }
		</Head>
	)
}

export const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Himanshu Shukla',
	alternateName: 'Himanshu Shukla FE',
	url: SITE_URL,
	image: `${SITE_URL}/img/preview.png`,
	jobTitle: 'Frontend Developer (SDE-2)',
	description: 'Frontend Developer (SDE-2) with 4+ years of experience building high-performance, scalable web applications with React, Next.js, and Redux Toolkit.',
	email: 'mailto:himanshu2361999@gmail.com',
	worksFor: {
		'@type': 'Organization',
		name: 'INDmoney',
	},
	alumniOf: {
		'@type': 'CollegeOrUniversity',
		name: 'IMS Engineering College, Ghaziabad',
	},
	sameAs: [
		'https://www.linkedin.com/in/himanshu-shukla-fe/',
		'https://github.com/shuklahimanshu81',
	],
	knowsAbout: [
		'React',
		'Next.js',
		'Redux Toolkit',
		'TypeScript',
		'JavaScript',
		'Pine Script',
		'Web Performance Optimization',
		'Accessibility (WCAG/ARIA)',
		'Real-time trading interfaces',
	],
}
