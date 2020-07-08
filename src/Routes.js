import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	useParams,
} from "react-router-dom"
import Homepage from "./pages/homepage"
import SummaryPage from "./pages/summary"
import NavBar from "./components/navBar"

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
			<NavBar />
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
