import { useState, useEffect } from 'react'

import Container from '../structure/container'
import Icon from '../utils/icon.util'

import css from '../../styles/structure/footer.module.scss'

import content from '../../content/footer.json'
import settings from '../../content/_settings.json'

import resume from "../../public/img/preview.png"
export default function Footer() {
	
	const [gitHubInfo, setGitHubInfo] = useState({
		stars: null,
		forks: null,
	});

	useEffect(() => {
		fetch( settings.portfolio.repo_api )
			.then(response => response.json())
			.then(json => {
				const { stargazers_count, forks_count } = json;
				setGitHubInfo({
					stars: stargazers_count,
					forks: forks_count,
				});
			})
		.catch(e => console.error(e));
	}, []);
	
	return (
		<footer className={css.container} style={{height:"100vh", display:'flex',alignItems:'center', justifyContent:'center'}}>
			<Container spacing={['verticalXXLrg', 'bottomLrg']}>
				<section className={css.sections}>
					<ul className={css.links}>
						<li><h4>Links</h4></li>
						{
						content.links.map( ({ person, link, note }, index) => {
							return (
								<li key={index}>
									<a href={link} target='_self' rel="noreferrer">{person} <i className={`fa-solid fa-arrow-up-right-from-square`}></i></a>
									<p>{note}</p>
								</li>
							)
						})
						}
					</ul>
					<ul className={css.social}>
						<li><h4>Social</h4></li>
						<li className={css.socialList}>
							{
							content.social.map( ({ url, icon }, index) => {
								return (
									<a  key={index} href={url} rel="noreferrer" target="_blank"><i className={`fa-brands fa-${icon}`}></i></a>
								)
							})
							}
						</li>
					</ul>
				</section>
			</Container>
			<canvas id="gradient-canvas" className={''} data-transition-in ></canvas>
		</footer>
	)
}
