'use strict';
const faker = require('faker');

const dynamo = require('aws-sdk/clients/dynamodb');
const docClient = new dynamo.DocumentClient();
const { getRandomInt } = require('./seedHelperFns');

(async () => {
  while (true) {

    const myBool = getRandomInt(0, 2);
    if (myBool) {
      console.log('update patient');
      updatePatient();

    } else {
      console.log('update dental');
      updateDental();
    }
    
    const sleepTime = getRandomInt(10000, 30000);
    console.log('sleeping for ', sleepTime);
    await sleep(sleepTime);

  }

})();


function updatePatient() {
  const newAge = getRandomInt(1, 90);
  const idToChange = getRandomInt(1,10000).toString();
  var params = {
    TableName: `PatientTable-${process.env.DEV_NAME}`,
    Key: { id: idToChange },
    UpdateExpression: 'set #age = :age',
    ExpressionAttributeNames: { '#age': 'age' },
    ExpressionAttributeValues: {
      ':age': newAge,
    }
  };
  console.log('updating to: ', params);
  return docClient.update(params).promise();
}


function updateDental(){
  const newLastCheckup = faker.date.past().toISOString();
  const idToChange = getRandomInt(1,10000).toString();
  var params = {
    TableName: `DentalTable-${process.env.DEV_NAME}`,
    Key: { id: idToChange },
    UpdateExpression: 'set lastCheckUp = :lastCheckUp',
    ExpressionAttributeValues: {
      ':lastCheckUp': newLastCheckup,
    }
  };
  console.log('updating to: ', params);
  return docClient.update(params).promise();
}


function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
