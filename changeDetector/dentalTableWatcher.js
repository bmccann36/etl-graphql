
const { AttributeValue } = require('dynamodb-data-types');
const { fromDental } = require('../graphQlClient/queries');
const execQuery = require('../graphQlClient/execQuery');
const pushSqs = require('./pushSqs');

module.exports.main = async (event) => {
  try {
    // unwrap the attributes on the event
    const itemAttributes = AttributeValue.unwrap(event.Records[0].dynamodb.NewImage);
    const dentalRecordId = itemAttributes.id;
    // send gql query to get current data snapshot
    const graphQlRes = await execQuery(fromDental, { id: dentalRecordId });
    // flatten out gql response into more friendly package
    const provider = Object.assign({}, graphQlRes.data.dentalRecord.patient.provider);
    const patient = Object.assign({}, graphQlRes.data.dentalRecord.patient);
    delete patient.provider;
    const dentalRecord = Object.assign({}, graphQlRes.data.dentalRecord);
    delete dentalRecord.patient;

    const combinedData = {
      provider,
      patient,
      dentalRecord,
    };
    console.log('\n COMBINED DATA: \n', combinedData, '\n PUSHING TO SQS \n');
    await pushSqs(JSON.stringify(combinedData));
    console.log('push completed');
    
    
  } catch (err) {
    console.log(err);
  }


};
