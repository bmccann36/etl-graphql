
const { gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
module.exports = gql`
  type Query {
    hello: String
    patient(id: ID!): Patient
    provider(id: ID!): Provider
    dentalRecord(id: ID!): DentalRecord
  }
  
  type Patient {
    id: ID!
    name: String
    age: Int
    provider: Provider
    dentalRecord: DentalRecord
  }
  
  type Provider {
    id: ID!
    name: String
  }
  
  type DentalRecord{
    id: ID!
    toothCondition: String
    lastCheckUp: String
    patient: Patient
  }
  
`;
