const { gql } = require('apollo-boost');

module.exports = gql`
  query fetchAllFromDental($id: ID!) {
    dentalRecord(id: $id) {
      id
      toothCondition
      lastCheckUp
      patient {
        id
        name
        age
        provider{
          id
          name
        } 
      }
    }
  }
`;
