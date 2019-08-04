module.exports.main = async (payload) => {
  console.log('hit the provider handler');
  console.log('payload :', payload);
  // get provider by id
  // todo figure out what properites I have and use them
  return providersStub[payload.id];
};



const providersStub = {
  1: {
    id: '1',
    name: 'Cigna'
  },
  2: {
    id: '2',
    name: 'MetroPlus'
  }
};


