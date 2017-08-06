const assert = require('assert');
const { api } = require('../../server/app');

describe('\'email\' service', () => {
  it('registered the service', () => {
    const service = api.service('emails');

    assert.ok(service, 'Registered the service');
  });
});
