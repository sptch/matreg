import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphqlUrl = 'https://speckle.xyz/graphql';

export const client = new ApolloClient({
  ssrMode: true,
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});
