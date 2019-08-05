const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.AWS_REGION });

const localDentalApi = require('../../api/dental/dentalHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

function callRemoteLambda(argsToHandler) {
  const params = {
    FunctionName: 'etl-graphql-dev-dentalHandler',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(argsToHandler),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

const wrappedDentalFn = wrapLocalOrRemote(localDentalApi.main, callRemoteLambda);


module.exports = {
  Query: {
    dentalRecord: (parent, args) => {
      return wrappedDentalFn({ id: args.id });
    }
  },
  // Patient: {
  //   dentalRecord: (parent, args, ctx) => {
  //   return wrappedDentalFn(
  //     { id: parent.providerId }
  //   );
  // }
  // }
};
