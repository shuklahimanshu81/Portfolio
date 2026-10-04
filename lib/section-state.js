/**
 * Shared, mutable "which section is open" state, mirroring
 * SectionContext (components/utils/section-context.jsx) into a
 * plain object the R3F scene can read every frame without crossing
 * React reconciler boundaries or causing re-renders. Same pattern
 * as lib/scroll-state.js.
 */
const sectionState = {
	active: null, // null | 'about' | 'technical' | 'career' | 'projects'
}

export default sectionState
