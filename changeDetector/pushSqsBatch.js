const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();
const uuidv1 = require('uuid/v1');
const logger = require('../utils/getLogger')('pushSqsBatch');

module.exports = async (msgArray) => {
  let pendingSends = [];
  // push sqs api promise into array in batches of ten
  for (let i = 0; i < msgArray.length; i = i + 10) {
    const batch = msgArray.slice(i, i + 10);
    const preppedBatch = convertToEntries(batch);
    const pendingBatch = sqs.sendMessageBatch({
      Entries: preppedBatch,
      QueueUrl: process.env.SQS_QUEUE,
    }).promise();
    pendingSends.push(pendingBatch);
  }
  await Promise.all(pendingSends); // send all batches
  logger.info(`\n success sending batch of: ${msgArray.length}`);
};

function convertToEntries(objects) {
  return objects.map(obj => {
    const stringified = JSON.stringify(obj);
    return {
      Id: uuidv1(),
      MessageBody: stringified, /* required */
    };
  });
}
