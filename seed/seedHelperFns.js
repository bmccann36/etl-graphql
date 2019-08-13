const faker = require('faker');
const uuidv4 = require('uuid/v4');
const dynamo = require('aws-sdk/clients/dynamodb');
const docClient = new dynamo.DocumentClient();

module.exports = {
  createProviderBatch,
  createPatientBatch,
  createDentalBatch,
  makeDental,
  makePatient,
  getRandomInt,
  updatePatient,
  updateDental,
};

function createProviderBatch() {
  const prods = [];
  for (let i = 1; i <= 50; i++) {
    const prod = makeProvider(i.toString());
    prods.push(prod);
  }
  return prods;
}

function createPatientBatch(startId, endId) {
  const batchSize = endId - startId + 1;
  const arrayOfLength = [];
  for (let i = startId; i <= endId; i++) {
    arrayOfLength.push(i.toString());
  }
  const patIds = shuffle(arrayOfLength.slice(0, batchSize));

  const patients = arrayOfLength.map(() => {
    return makePatient(patIds.pop(), getRandomInt(1, 50).toString());
  });
  return patients;
}

function createDentalBatch(startId, endId) {
  const batchSize = endId - startId + 1;
  const arrayOfLength = [];
  for (let i = startId; i <= endId; i++) {
    arrayOfLength.push(i.toString());
  }
  const patIds = shuffle(arrayOfLength.slice(0, batchSize));
  const dentalIds = shuffle(arrayOfLength.slice(0, batchSize));

  const dentals = arrayOfLength.map(() => {
    return makeDental(dentalIds.pop(), patIds.pop());
  });
  return dentals;
}


function makeDental(dentalId, patientId) {
  const conditions = ['clean', 'rotten', 'plaquey', 'cavities'];
  const fake = {
    id: dentalId,
    lastCheckUp: faker.date.past().toISOString(),
    patientId: patientId,
    toothCondition: conditions[getRandomInt(0, 3)],
    data: uuidv4(),
  };
  return fake;
}


function makeProvider(providerId) {
  const fake = {
    id: providerId,
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
  };
  return fake;
}
function makePatient(patientId, providerId) {
  const fake = {
    age: getRandomInt(1, 90),
    id: patientId,
    name: faker.name.findName(),
    providerId: providerId,
    data: uuidv4(),
  };
  return fake;
}
function updatePatient() {
  const newName = uuidv4();
  const idToChange = getRandomInt(1,10000).toString();
  var params = {
    TableName: `PatientTable-${process.env.DEV_NAME}`,
    Key: { id: idToChange },
    UpdateExpression: 'set #data = :data',
    ExpressionAttributeNames: { '#data': 'data' },
    ExpressionAttributeValues: {
      ':data': newName,
    }
  };
  // console.log('updating to: ', params);
  return docClient.update(params).promise();
}


function updateDental(){
  // const newLastCheckup = faker.date.past().toISOString();
  const newDate = uuidv4();
  const idToChange = getRandomInt(1,10000).toString();
  var params = {
    TableName: `DentalTable-${process.env.DEV_NAME}`,
    Key: { id: idToChange },
    UpdateExpression: 'set #data = :data',
    ExpressionAttributeNames: { '#data': 'data' },    
    ExpressionAttributeValues: {
      ':data': newDate,
    }
  };
  // console.log('updating to: ', params);
  return docClient.update(params).promise();
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
