const assert = require('assert');
const app = require('../../server/app');

describe('\'roles\' service', () => {
  it('registered the service', () => {
    const service = app.service('roles');

    assert.ok(service, 'Registered the service');
  });
});
