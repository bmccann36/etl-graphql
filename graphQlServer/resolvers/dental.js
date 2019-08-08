const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.AWS_REGION });

const localDentalbackEndService = require('../../backEndService/dental/dentalHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

function callRemoteLambda(argsToHandler) {
  const params = {
    FunctionName: `etl-graphql-${process.env.STAGE}-dentalHandler`,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(argsToHandler),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

const wrappedDentalFn = wrapLocalOrRemote(localDentalbackEndService.main, callRemoteLambda);


module.exports = {
  Query: {
    dentalRecord: (parent, args) => {
      return wrappedDentalFn(args);
    }
  },
  Patient: {
    dentalRecord: (parent) => {
      return wrappedDentalFn(
        { patientId: parent.id }
      );
    }
  }
};
