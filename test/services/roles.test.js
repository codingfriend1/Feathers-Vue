const assert = require('assert');
const { api } = require('../../server/app');

describe('\'roles\' service', () => {
  it('registered the service', () => {
    const service = api.service('roles');

    assert.ok(service, 'Registered the service');
  });
});
