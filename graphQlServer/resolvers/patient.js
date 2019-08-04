
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.USE_REGION });

const localPatientApi = require('../../api/patient/patientHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

/**
 * define how to reach out to the lambda function (this is what will always run in deployed code)
 */
function callRemoteLambda() {
  console.log('invoking remote lambda');
  const params = {
    FunctionName: 'etl-graphql-dev-patientHandler',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ hello: 'world' }),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

// wrap in higher order fn so resolver knows whether to call local or remote code 
const wrappedPatientFn = wrapLocalOrRemote(localPatientApi.main, callRemoteLambda);

module.exports = {
  Query: {
    patient: async (root, args, ctx) => wrappedPatientFn()
  },
};
