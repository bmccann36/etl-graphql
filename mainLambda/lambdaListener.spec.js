process.env.GQL_LOCAL_URL = 'http://localhost:4000/graphql';
process.env.SQS_QUEUE = 'https://sqs.us-east-1.amazonaws.com/466357709346/etl-queue-brian';

const lambdaListener = require('./lambdaListener');




describe('test invoke main lambda',  () => {
    it('works on one event', async () => {
        const mockEvt = require('../mocks/dataChange.json');
        await lambdaListener(mockEvt)
    })
})