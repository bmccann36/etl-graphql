const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();


module.exports = function(messageBody){
  const params = {
    MessageAttributes: {
      TriggeredBy: {
        DataType: 'String',
        StringValue: 'table_name_stub'
      },
    },
    MessageBody: messageBody,
    QueueUrl: process.env.SQS_QUEUE
  };
  
  return sqs.sendMessage(params).promise();
};



