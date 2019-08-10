const { gql } = require('apollo-boost');

module.exports = gql`
  query getPatientDetail($id: ID!){
    patient(id: $id){
      id
      name
      age
      provider{
        id
        name
      }
      dentalRecord{
        id
        toothCondition
        lastCheckUp
      }
    }
  }
`;
