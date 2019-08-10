const {createDentalBatch, createPatientBatch, createProviderBatch} = require('./seedHelperFns');
const batchWrite = require('./dynamoBatchWrite');



(async () => {
  
  for (let i = 1; i < 10000; i += 1000) {
    const batchStart = i;
    const batchEnd = i + 999;
    console.log('batchStart :', batchStart);
    console.log('batchEnd :', batchEnd);
    const patientBatch = createPatientBatch(batchStart, batchEnd);
    await batchWrite(`PatientTable-${process.env.DEV_NAME}`, patientBatch);
    console.log('pausing');
    await sleep(3000);

  }
  
})();


function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
