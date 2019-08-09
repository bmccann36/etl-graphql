const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client').ApolloClient;

let endpoint;
if (process.env.DEV_NAME) {
  endpoint = process.env.GQL_LOCAL_URL;
} else {
  endpoint = process.env.GRAPHQL_DOMAIN + '/' + process.env.STAGE + '/graphql';
}

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
console.log(endpoint);

const client = new ApolloClient({
  link: createHttpLink({
    uri: endpoint,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});


module.exports = async function (query, variables) {
  return client.query({ query, variables });
};


