import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InboxCountTable from "./containers/InboxCountTable";
import QuoteComponent from "./presenters/QuoteComponent/QuoteComponent";
import {DotChart} from "./presenters/DotChart/DotChart";
import {fakeData} from "../models/fakeData";
import {ProgressTable} from "./presenters/ProgressTable/ProgressTable";
import {WeeklyKPIsView} from "../views/WeeklyKPIsView";

const routes = [
	{ path: "/", name: "Inbox Counts", component: <InboxCountTable />, exact: true },
	{ path: "/quote", name: "Quote", component: <QuoteComponent {...fakeData.quotation} /> },
	{ path: "/progress", name: "Progress", component: <progress value={0.6} /> },
	{ path: "/dotchart", name: "Dot Chart", component: <DotChart title={"Dot Chart"} current={42} total={100} cols={10}/> },
	{ path: "/days_in_year", name: "Days in Year", component: <ProgressTable title="Dot count table" data={fakeData.mindAndBodyMetrics} cols={5} /> },
	{ path: "/progresss_table", name: "Progress Table", component: <ProgressTable title="Progress table" data={fakeData.mindAndBodyMetrics} cols={5} /> },
	{ path: "/weekly_kpis", name: "Weekly KPis", component: <WeeklyKPIsView /> },
];

const Navbar = () => (
	<nav style={{ padding: "1rem", background: "#f0f0f0" }}>
		{routes.map((route) => (
			<Link key={route.path} to={route.path} style={{ margin: "0 1rem" }}>
				{route.name}
			</Link>
		))}
	</nav>
);

function App() {
	return (
		<Router>
			<div>
				{/* Navbar */}
				<Navbar />

				{/* Routes */}
				<Routes>
					{routes.map((route) => (
						<Route key={route.path} path={route.path} element={route.component} />
					))}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
