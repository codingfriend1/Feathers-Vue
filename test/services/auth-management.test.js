const assert = require('assert');
const { api } = require('../../server/app');

describe('\'authManagement\' service', () => {
  it('registered the service', () => {
    const service = api.service('authManagement');

    assert.ok(service, 'Registered the service');
  });
});
