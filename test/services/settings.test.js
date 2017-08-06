const assert = require('assert');
const { api } = require('../../server/app');

describe('\'settings\' service', () => {
  it('registered the service', () => {
    const service = api.service('settings');

    assert.ok(service, 'Registered the service');
  });
});
