
const { AttributeValue } = require('dynamodb-data-types');
const { fromDental } = require('../graphQlClient/queries');
const execQuery = require('../graphQlClient/execQuery');
const pushSqsBatch = require('./pushSqsBatch');

module.exports.main = async (event) => {
  try {
    const pendingBatch = [];
    event.Records.map(record => {
      pendingBatch.push(handleRow(record));
    });
    const aggrResultsArr = await Promise.all(pendingBatch);
    await pushSqsBatch(aggrResultsArr);
  } catch (err) {
    console.log(err);
  }

};

async function handleRow(rawRowEvt) {
  // unwrap the attributes on the event
  const itemAttributes = AttributeValue.unwrap(rawRowEvt.dynamodb.NewImage);
  const dentalRecordId = itemAttributes.id;
  // send gql query to get current data snapshot
  const graphQlRes = await execQuery(fromDental, { id: dentalRecordId });
  // flatten out gql response into more friendly package
  const provider = Object.assign({}, graphQlRes.data.dentalRecord.patient.provider);
  const patient = Object.assign({}, graphQlRes.data.dentalRecord.patient);
  delete patient.provider;
  const dentalRecord = Object.assign({}, graphQlRes.data.dentalRecord);
  delete dentalRecord.patient;

  return {
    provider,
    patient,
    dentalRecord,
  };


}
