'use strict';
const dynamo = require('aws-sdk/clients/dynamodb');
const docClient = new dynamo.DocumentClient();

module.exports.main = async (event) => {

  const params = {
    TableName: `PatientTable-${process.env.STAGE}`,
    Key: {
      id: event.id,
    }
  };
  const dynamoRes = await docClient.get(params).promise(); 
  return dynamoRes.Item;
};
