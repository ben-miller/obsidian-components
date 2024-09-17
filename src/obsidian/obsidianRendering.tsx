import React from 'react';
import { Root, createRoot } from "react-dom/client";
import InboxCountTable from "../components/containers/InboxCountTable";
import ApolloProvider from "../graphql/ApolloProvider";
import {fakeData} from "../models/fakeData";
import {ProgressTable} from "../components/presenters/ProgressTable/ProgressTable";
import {DayOfWeek} from "../components/containers/DayOfWeek";
import {MindAndBody} from "../components/containers/MindAndBody";
import {JobSearchProgress} from "../components/containers/JobSearchProgress";

const roots: Map<Element, Root> = new Map();

const RenderedComponent: React.FC<{ componentName: string, props?: any }> = ({ componentName, props }) => {
	switch (componentName) {
		/**
		 * Configured by GraphQL call.
		 */
		case 'InboxCountTable':
			return <InboxCountTable />;
		case 'DayOfWeek':
			return <DayOfWeek />
		case 'MindAndBody':
			return <MindAndBody />
		case 'JobSearchProgress':
			return <JobSearchProgress />

		/**
		 * Configured by YAML.
		 */
		case 'ProgressTable':
			return <ProgressTable title={props.title} data={props.data} cols={props.cols} />

		default:
			return <div>Unknown component: {componentName}</div>;
	}
};

export const renderComponent = (el: Element, componentName: string, props?: any) => {
	el.innerHTML = '';

	const container = document.createElement('div');
	el.appendChild(container);

	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<ApolloProvider>
				<RenderedComponent componentName={componentName} props={props}></RenderedComponent>
			</ApolloProvider>
		</React.StrictMode>
	);
	roots.set(container, root);
}

export const cleanupReactRoots = () => {
	roots.forEach((root) => root.unmount());
	roots.clear();
};
