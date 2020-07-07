import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom"
import Homepage from "./pages/homepage"
import SummaryPage from "./pages/summary"
const Routes = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/dashboard">
						<Dashboards />
					</Route>
					<Route path="/">
						<Homepage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

function Dashboards() {
	let match = useRouteMatch()

	return (
		<div>
			{/* <h2>Claims Insurance 2020</h2>

			<ul>
				<li>
					<Link to={`${match.url}`}>Summary</Link>

					<Link to={`${match.url}/claims-cost-analysis`}>
						Claims Cost Analysis
					</Link>
					<Link to={`${match.url}/fraud-analysis`}>
						Fraud Analysis
					</Link>
				</li>
			</ul>
 */}
			<Switch>
				<Route path={`${match.path}/:topicId`}>
					<Topic />
				</Route>
				<Route path={match.path}>
					<SummaryPage />
				</Route>
			</Switch>
		</div>
	)
}

function Topic() {
	let { topicId } = useParams()
	return <h3>Requested dashboard ID: {topicId}</h3>
}
export default Routes
