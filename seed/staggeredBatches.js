
const { updatePatient, updateDental } = require('./seedHelperFns');

(async () => {

  for (let i = 1; i < 10000; i += 1000) {
    const batchStart = i;
    const batchEnd = i + 999;
    console.log('batchStart :', batchStart);
    console.log('batchEnd :', batchEnd);
    for (let i = batchStart; i <= batchEnd; i++) {
      if (i % 2 == 0) {
        updateDental();
      } else {
        updatePatient();
      }
    }
    console.log('pausing');
    await sleep(3000);

  }

})();


function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
