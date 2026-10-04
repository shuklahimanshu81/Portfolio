import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

const SECTIONS = ['about', 'technical', 'career', 'projects']

const Ctx = createContext({
	active: null,
	openSection: () => {},
	closeSection: () => {},
})

/**
 * Tracks which homepage section panel (if any) is open. Mounted at
 * the app level so both the Navbar and the homepage can read/set it.
 *
 * @returns {jsx} <SectionProvider>
 */
export function SectionProvider({ children }) {
	const router = useRouter()
	const [active, setActive] = useState(null)

	// Initialize from the URL hash so a shared link opens straight
	// into that section, and keep the hash in sync afterwards.
	useEffect(() => {
		const fromHash = window.location.hash.replace('#', '')
		if (SECTIONS.includes(fromHash)) setActive(fromHash)
	}, [])

	const openSection = useCallback((key) => {
		if (!SECTIONS.includes(key)) return
		const go = () => {
			setActive(key)
			window.history.replaceState(null, '', `/#${key}`)
		}
		if (router.pathname !== '/') {
			router.push('/').then(go)
		} else {
			go()
		}
	}, [router])

	const closeSection = useCallback(() => {
		setActive(null)
		window.history.replaceState(null, '', '/')
	}, [])

	return (
		<Ctx.Provider value={{ active, openSection, closeSection }}>
			{children}
		</Ctx.Provider>
	)
}

export function useSection() {
	return useContext(Ctx)
}
