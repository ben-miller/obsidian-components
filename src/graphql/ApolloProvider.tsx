import React, {ReactNode} from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
    createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache'
        }
    }
});

interface ApolloProviderProps {
    children: ReactNode;
}

const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
    return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
