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
    logger.info(`\n AGGREGATED BATCH OF ${aggrResultsArr.length} PUBLISHING TO SQS\n`);
    await pushSqsBatch(aggrResultsArr);
  } catch (err) {
    logger.error(err);
  }

};



async function handlePatientItem(rawRowEvt) {

  // unwrap the attributes on the event
  const itemAttributes = AttributeValue.unwrap(rawRowEvt.dynamodb.NewImage);
  const patientId = itemAttributes.id;

  logger.log('info', '\n HANDLING PATIENT DATA CHANGE EVENT\n');
  logger.info(JSON.stringify(itemAttributes, null,2));

  const graphQlRes = await execQuery(fromPatient, { id: patientId });

  logger.info('\n GOT RESPONSE FROM GQL SERVER\n ');
  logger.info(JSON.stringify(graphQlRes, null, 2));

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

  logger.log('info', '\n FLATTENED RESPONSE: \n');
  logger.info(JSON.stringify(finalRes, null, 2));

  return finalRes;

}
