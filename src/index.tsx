import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ApolloProvider from "./graphql/ApolloProvider";
import App from "./components/App";

// Create a root container in the DOM
const rootElement = document.getElementById('root') as HTMLElement;

// Create a root ReactDOM instance
ReactDOM.createRoot(rootElement);
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
	<React.StrictMode>
		<ApolloProvider>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
