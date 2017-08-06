const assert = require('assert');
const { api } = require('../../server/app');

describe('\'message\' service', () => {
  it('registered the service', () => {
    const service = api.service('message');

    assert.ok(service, 'Registered the service');
  });
});
