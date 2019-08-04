const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.AWS_REGION });

const localProviderApi = require('../../api/provider/providerHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

function callRemoteLambda(argsToHandler) {
  const params = {
    FunctionName: 'etl-graphql-dev-providerHandler',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(argsToHandler),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

const wrappedProviderFn = wrapLocalOrRemote(localProviderApi.main, callRemoteLambda);


module.exports = {
  Query: {
    provider: (parent, args) => {
      return wrappedProviderFn({ id: args.id });
    }
  },
  Patient: {
    provider: (parent, args, ctx) => {
      return wrappedProviderFn(
        { id: parent.providerId }
      );
    }
  }
};
