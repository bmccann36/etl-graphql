const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client').ApolloClient;


const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});


module.exports = async function(query, variables) {
  return client.query({ query, variables });
};


