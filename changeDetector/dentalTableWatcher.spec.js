process.env.GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
process.env.SQS_QUEUE = 'https://sqs.us-east-1.amazonaws.com/466357709346/etl-queue-brian';

const chai = require('chai');
const dentalWatcher = require('./dentalTableWatcher');



describe('dental watcher test invoke', () => {
  it('does stuff', () => {

    const mockEvt = require('../mocks/dataChange.json');
    dentalWatcher.main(mockEvt);
  })
})
