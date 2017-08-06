const assert = require('assert');
const { api } = require('../../server/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = api.service('users');

    assert.ok(service, 'Registered the service');
  });
});
