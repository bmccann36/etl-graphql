const {createDentalBatch, createPatientBatch, createProviderBatch} = require('./seedHelperFns');
const batchWrite = require('./dynamoBatchWrite');



(async () => {
  
  const dentalBatch = createDentalBatch(1, 1000);
  await batchWrite(`DentalTable-${process.env.DEV_NAME}`, dentalBatch);
  
})();
