import Navbar from './navbar'
import Footer from './footer'
import SceneLayer from './scene-layer'
import SmoothScroll from './smooth-scroll'
import Cursor from './cursor'

export default function Layout({ children }) {
	return (
		<>
		<SmoothScroll />
		<Cursor />
		<SceneLayer />
		<Navbar />
		<main>{children}</main>
		<Footer />
		</>
	)
}