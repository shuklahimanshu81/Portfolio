import Navbar from './navbar'
import Footer from './footer'
import SmoothScroll from './smooth-scroll'
import Cursor from './cursor'

export default function Layout({ children }) {
	return (
		<>
		<SmoothScroll />
		<Cursor />
		<Navbar />
		<main>{children}</main>
		<Footer />
		</>
	)
}