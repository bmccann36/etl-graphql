const faker = require('faker');
const batchWrite = require('./dynamoBatchWrite');
const {createDentalBatch, createPatientBatch, createProviderBatch} = require('./seedHelperFns');


(async () => {
  const d = new Date();
  const startTime = d.getTime();

  for (let i = 1; i < 10000; i += 1000) {
    const batchStart = i;
    const batchEnd = i + 1000;
    console.log('batchStart :', batchStart);
    console.log('batchEnd :', batchEnd);
    const dentalBatch = createDentalBatch(batchStart, batchEnd);
    await batchWrite(`DentalTable-${process.env.DEV_NAME}`, dentalBatch);

    // const patientBatch = createPatientBatch(batchStart, batchEnd);
    // await batchWrite(`PatientTable-${process.env.DEV_NAME}`, patientBatch);

  }

  // const providerBatch = createProviderBatch();
  // await batchWrite(`ProviderTable-${process.env.DEV_NAME}`, providerBatch);

  const d2 = new Date();
  const elapsed = d2.getTime() - startTime;
  console.log('elapsed: ', elapsed);
})();





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
