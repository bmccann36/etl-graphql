const logger = require('../utils/getLogger')('mainLambdaHandler');
const { AttributeValue } = require('dynamodb-data-types');
const { graphql } = require('graphql')
const typeDefs = require('../graphQlServer/typeDefs')
const resolvers = require('../graphQlServer/resolvers')
const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-boost');


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


module.exports = async (event) => {
    try {
        const pendingBatch = [];
        event.Records.map(record => {
            pendingBatch.push(handleItem(record));
        });
        const aggrResultsArr = await Promise.all(pendingBatch);
        // await pushSqsBatch(aggrResultsArr);
    } catch (err) {
        console.warn(err)
    }
}


function handleItem(rawRowEvt) {
    const itemAttributes = AttributeValue.unwrap(rawRowEvt.dynamodb.NewImage);
    const patientId = itemAttributes.id;
    const query = `
    query {
        patient(id: "1"){
            id
            name
            age
          }
    }
    `
    graphql(schema, query).then(console.log)


}