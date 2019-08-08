

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});



// var params = {
//   QueueName: 'launch-wizard-queue', /* required */
//   QueueOwnerAWSAccountId: '466357709346'
// };
// sqs.getQueueUrl(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


const params = {
  MessageAttributes: {
    Title: {
      DataType: 'String',
      StringValue: 'The Whistler'
    },
    Author: {
      DataType: 'String',
      StringValue: 'John Grisham'
    },
  },
  MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/466357709346/launch-wizard-queue'
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data.MessageId);
  }
});
