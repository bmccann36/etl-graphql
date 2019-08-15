const logger = require('../utils/getLogger')('mainLambdaHandler');
const { AttributeValue } = require('dynamodb-data-types');
const { graphql } = require('graphql');
const typeDefs = require('../graphQlServer/typeDefs');
const resolvers = require('../graphQlServer/resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-boost');


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


module.exports = async (event) => {
    try {
        console.log(event);
        const pendingBatch = [];
        event.Records.map(record => {
            pendingBatch.push(handleItem(record));
        });
        const aggrResultsArr = await Promise.all(pendingBatch);
        // await pushSqsBatch(aggrResultsArr);
    } catch (err) {
        console.warn(err);
    }
};


function handleItem(rawRowEvt) {
    //   const itemAttributes = AttributeValue.unwrap(rawRowEvt.dynamodb.NewImage);
    //   const patientId = itemAttributes.id;
    //   const query = `
    //     query {
    //         patient(id: ${patientId}){
    //             id
    //             name
    //             age
    //             provider{
    //                 id
    //                 name
    //               }
    //               dentalRecord{
    //                 id
    //                 toothCondition
    //                 lastCheckUp
    //               }
    //           }
    //     }
    //     `;
    //   graphql(schema, query)
    //   .then(res => console.log(JSON.stringify(res, null, 2)));


}
