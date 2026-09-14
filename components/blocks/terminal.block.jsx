import terminal from '../../styles/blocks/terminal.module.scss'

/**
 * Decorative "code editor" card used to fill visual space next to
 * the Technical section's skill lists with something more on-brand
 * for a frontend dev than a static illustration.
 *
 * @returns {jsx} <Terminal />
 */
export default function Terminal() {
	return (
		<div className={terminal.window}>
			<div className={terminal.titleBar}>
				<span className={terminal.dots}>
					<span className={terminal.dotRed}></span>
					<span className={terminal.dotYellow}></span>
					<span className={terminal.dotGreen}></span>
				</span>
				<span className={terminal.fileName}>useOptionChain.ts</span>
			</div>
			<pre className={terminal.code}>
				<Line n={1}><C>{'// ~75% fewer renders under load'}</C></Line>
				<Line n={2}><K>export function</K> <F>useOptionChain</F>(<P>symbol</P>: <T>string</T>) {'{'}</Line>
				<Line n={3}>  <K>const</K> [rows, setRows] = useState&lt;<T>Row</T>[]&gt;([]);</Line>
				<Line n={4}></Line>
				<Line n={5}>  useEffect(() =&gt; {'{'}</Line>
				<Line n={6}>    <K>return</K> subscribe(symbol, (tick) =&gt; {'{'}</Line>
				<Line n={7}>      setRows(prev =&gt; virtualize(prev, tick));</Line>
				<Line n={8}>    {'}'});</Line>
				<Line n={9}>  {'}'}, [symbol]);</Line>
				<Line n={10}></Line>
				<Line n={11}>  <K>return</K> {'{'} rows, isAccessible: <B>true</B> {'}'};</Line>
				<Line n={12}>{'}'}<span className={terminal.cursor}></span></Line>
			</pre>
		</div>
	)
}

function Line({ n, children }) {
	return (
		<span className={terminal.line}>
			<span className={terminal.lineNumber}>{n}</span>
			<span className={terminal.lineContent}>{children}</span>
		</span>
	)
}

const K = ({ children }) => <span className={terminal.keyword}>{children}</span>
const F = ({ children }) => <span className={terminal.func}>{children}</span>
const T = ({ children }) => <span className={terminal.type}>{children}</span>
const P = ({ children }) => <span className={terminal.param}>{children}</span>
const C = ({ children }) => <span className={terminal.comment}>{children}</span>
const B = ({ children }) => <span className={terminal.boolean}>{children}</span>
