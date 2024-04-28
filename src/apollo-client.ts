import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // TODO: Get from env
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default client;
