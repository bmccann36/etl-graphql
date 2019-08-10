const { AttributeValue } = require('dynamodb-data-types');
// const { fromDental } = require('../graphQlClient/queries'); // make gql query
const execQuery = require('../graphQlClient/execQuery');
const pushSqsBatch = require('./pushSqsBatch');
const logger = require('../utils/getLogger')('patientTableWatcher');
const { fromPatient } = require('../graphQlClient/queries');

module.exports.main = async (event) => {

  try {
    const pendingBatch = [];
    event.Records.map(record => {
      pendingBatch.push(handlePatientItem(record));
    });
    const aggrResultsArr = await Promise.all(pendingBatch);
    logger.log('info', `aggregated batch of ${aggrResultsArr.length} pushing to SQS`);
    await pushSqsBatch(aggrResultsArr);
  } catch (err) {
    logger.error(err);
  }

};



async function handlePatientItem(rawRowEvt) {

  // unwrap the attributes on the event
  const itemAttributes = AttributeValue.unwrap(rawRowEvt.dynamodb.NewImage);
  const patientId = itemAttributes.id;

  const graphQlRes = await execQuery(fromPatient, { id: patientId });

  // flatten out gql response into more friendly package
  const provider = Object.assign({},
    graphQlRes.data.patient.provider
  );
  const dentalRecord = Object.assign({},
    graphQlRes.data.patient.dentalRecord
  );
  const patient = Object.assign({},
    graphQlRes.data.patient
  );
  delete patient.provider;
  delete patient.dentalRecord;

  const finalRes = {
    provider,
    dentalRecord,
    patient,
  };
  
  return finalRes;

}
