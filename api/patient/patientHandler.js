'use strict';

module.exports.main = async (event) => {

  console.log('hit patient handler lambda');
  return {
    id: '1',
    name: 'Brian',
    age: 32,
    providerId: '1'
  };
};
