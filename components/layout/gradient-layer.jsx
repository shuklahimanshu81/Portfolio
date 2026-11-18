import css from '../../styles/structure/gradient-layer.module.scss'

/**
 * The site's persistent animated background — a single WebGL mesh
 * gradient (see components/utils/theme.util.jsx, which owns the
 * actual Gradient() instance and re-initializes it on theme/route
 * change) fixed behind every page so glass surfaces throughout the
 * site have real color underneath them to refract. Previously this
 * canvas only lived inside the footer; mounting it once here makes
 * it continuous across the whole page.
 *
 * @returns {jsx} <GradientLayer />
 */
export default function GradientLayer() {
	return (
		<div className={css.layer}>
			<canvas id="gradient-canvas" className={css.canvas} data-transition-in></canvas>
		</div>
	)
}
