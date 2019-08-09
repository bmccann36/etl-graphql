const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
// const { InMemoryCache } = require('apollo-cache-inmemory');
const ApolloClient = require('apollo-client').ApolloClient;

let endpoint;
if (process.env.INVOKE_AS_LOCAL == true) {
  endpoint = process.env.GQL_LOCAL_URL;
} else {
  endpoint = process.env.GRAPHQL_DOMAIN + '/' + process.env.STAGE + '/graphql';
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: endpoint,
    fetch: fetch,
  }),
  // cache: new InMemoryCache(),
});


module.exports = async function (query, variables) {
  return client.query({ query, variables });
};


