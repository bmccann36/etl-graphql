process.env.GQL_LOCAL_URL = 'http://localhost:4000/graphql';
process.env.SQS_QUEUE = 'https://sqs.us-east-1.amazonaws.com/466357709346/etl-queue-brian';

const chai = require('chai');
const dentalWatcher = require('./dentalTableWatcher');



describe('dental watcher test invoke', () => {
  it('does stuff', () => {

    const mockEvt = require('../mocks/dataChange.json');
    dentalWatcher.main(mockEvt);
  });
  
  it.only('works with multiple rows', () => {

    const mockEvt = require('../mocks/multiRecord.json');
    dentalWatcher.main(mockEvt);
  });
  
})
