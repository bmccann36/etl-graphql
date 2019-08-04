
const { gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
module.exports = gql`
  type Query {
    hello: String
    patient(id: ID!): Patient
    provider(id: ID): Provider
  }
  
  type Patient {
    id: ID!
    name: String
    age: Int
    provider: Provider
  }
  
  type Provider {
    id: ID!
    name: String
  }
  
`;
