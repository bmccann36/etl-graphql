
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.USE_REGION });
const logger = require('../../utils/getLogger')('patient resolver');

const localPatientbackEndService = require('../../backEndService/patient/patientHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

/**
 * define how to reach out to the lambda function (this is what will always run in deployed code)
 */
function callRemoteLambda(argsToLambda) {
  logger.info('INVOKING REMOTE PATIENT LAMBDA');
  const params = {
    FunctionName: `etl-graphql-${process.env.STAGE}-patientHandler`,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(argsToLambda),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

// wrap in higher order fn so resolver knows whether to call local or remote code 
const wrappedPatientFn = wrapLocalOrRemote(localPatientbackEndService.main, callRemoteLambda);

module.exports = {
  Query: {
    patient: async (root, args, ctx) => wrappedPatientFn(args)
  },
  DentalRecord: {
    patient: (parent) => wrappedPatientFn({ id: parent.patientId }),
  }
};
