import Navbar from './navbar'
import Footer from './footer'
import SmoothScroll from './smooth-scroll'
import Cursor from './cursor'
import GradientLayer from './gradient-layer'

export default function Layout({ children }) {
	return (
		<>
		<GradientLayer />
		<SmoothScroll />
		<Cursor />
		<Navbar />
		<main>{children}</main>
		<Footer />
		</>
	)
}