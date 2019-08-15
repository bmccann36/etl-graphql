'use strict';
require('dotenv').config();
const { updateDental, updatePatient, getRandomInt } = require('./seedHelperFns');


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

    const sleepTime = getRandomInt(5000, 10000);
    console.log('sleeping for ', sleepTime);
    await sleep(sleepTime);

  }

})();





function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


