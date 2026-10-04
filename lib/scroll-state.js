/**
 * Shared, mutable scroll state updated by the Lenis smooth-scroll
 * instance (see components/layout/smooth-scroll.jsx) and read every
 * frame by the persistent 3D scene layer. Plain module-level object
 * instead of React context/state on purpose — both consumers run
 * on rAF-driven loops and re-rendering React for this would be pure
 * overhead with no visual benefit.
 */
const scrollState = {
	progress: 0, // 0..1 of total scrollable height
	velocity: 0, // signed, roughly px/frame
}

export default scrollState
