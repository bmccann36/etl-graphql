process.env.GQL_LOCAL_URL = 'http://localhost:4000/graphql';
process.env.SQS_QUEUE = 'https://sqs.us-east-1.amazonaws.com/466357709346/etl-queue-brian';

const chai = require('chai');
const patientWatcher = require('./patientTableWatcher');



describe('#Patient Table Watcher', () => {
  it('works on patient events', () => {

    const mockEvt = require('../mocks/patientChanges.json');
    patientWatcher.main(mockEvt);
  });
  
});
