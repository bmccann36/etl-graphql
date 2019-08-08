const chai = require('chai');
const dentalWatcher = require('./dentalTableWatcher');



describe('dental watcher test invoke', () => {
  it('does stuff', () => {
    const mockEvt = require('../mocks/dataChange.json');
    dentalWatcher.main(mockEvt);
  })
})
