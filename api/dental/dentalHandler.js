module.exports.main = async (payload) => {
  return dentalStub[payload.id];
};


const dentalStub = {
  1: {
    id: '1',
    toothCondition: 'clean',
    lastCheckUp: '2018-03-01'
  },
  2: {
    id: '1',
    toothCondition: 'dirty',
    lastCheckup: '2018-01-01'
  },
  3: {
    id: '3',
    toothCondition: 'white',
    lastCheckup: '2019-03-04'
  }
}
