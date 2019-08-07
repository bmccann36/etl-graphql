const faker = require('faker');
const batchWrite = require('./dynamoBatchWrite');


(async () => {
  const d = new Date();
  const startTime = d.getTime();
  
  const dentalBatch = createDentalBatch(1, 1000);
  await batchWrite(`DentalTable-${process.env.DEV_NAME}`, dentalBatch);
  
  const patientBatch = createPatientBatch(1, 1000);
  await batchWrite(`PatientTable-${process.env.DEV_NAME}`, patientBatch);

  const providerBatch = createProviderBatch();
  await batchWrite(`ProviderTable-${process.env.DEV_NAME}`, providerBatch);
  
  const d2 = new Date();
  const elapsed = d2.getTime() - startTime;
  console.log('elapsed: ', elapsed);
})();


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
  for (let i = 1; i <= batchSize; i++) {
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
  for (let i = 1; i <= batchSize; i++) {
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
    toothCondition: conditions[getRandomInt(0, 3)]
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
    providerId: providerId
  };
  return fake;
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
