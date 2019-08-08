'use strict';
const dynamo = require('aws-sdk/clients/dynamodb');
const docClient = new dynamo.DocumentClient();


module.exports.main = async (event) => {

  if (event.patientId) {
    return getDentalByPatientId(event.patientId);
  } if (event.id) {
    return getDentalById(event.id);
  }

};


async function getDentalById(id) {
  const params = {
    TableName: `DentalTable-${process.env.STAGE}`,
    Key: { id }
  };
  const dynamoRes = await docClient.get(params).promise();
  return dynamoRes.Item;
}

async function getDentalByPatientId(patientId) {
  
  const params = {
    TableName: `DentalTable-${process.env.STAGE}`,
    IndexName: 'patientId-index',
    KeyConditionExpression: 'patientId = :patientId',
    ExpressionAttributeValues: {
      ':patientId': patientId,
    }
  };
  const dynamoRes = await docClient.query(params).promise();
  return dynamoRes.Items[0];
}
