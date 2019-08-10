const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: process.env.AWS_REGION });
const logger = require('../../utils/getLogger')('provider resolver');

const localProviderbackEndService = require('../../backEndService/provider/providerHandler');
const wrapLocalOrRemote = require('../../utils/wrapLocalOrRemote');

function callRemoteLambda(argsToHandler) {
  logger.info('INVOKING REMOTE PROVIDER LAMBDA');
  const params = {
    FunctionName: `etl-graphql-${process.env.STAGE}-providerHandler`,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(argsToHandler),
  };
  return lambda.invoke(params).promise().then(res => {
    return JSON.parse(res.Payload);
  });
}

const wrappedProviderFn = wrapLocalOrRemote(localProviderbackEndService.main, callRemoteLambda);


module.exports = {
  Query: {
    provider: (parent, args) => {
      return wrappedProviderFn({ id: args.id });
    }
  },
  Patient: {
    provider: (parent) => {
      return wrappedProviderFn(
        { id: parent.providerId }
      );
    }
  }
};
