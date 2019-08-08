const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { gql } = require('apollo-boost');
const ApolloClient = require('apollo-client').ApolloClient;


const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

const MY_QUERY = gql`
  query myQuery ($id: ID!) {
    patient(id: $id) {
      name
    }
  }
`;

client.query(
  {
    query: MY_QUERY,
    variables: {
      id: "1"
    }
  }
).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err)
  console.log('\n ERRR DETAIL BELOW \n');
  console.log(err.networkError.result);
});
