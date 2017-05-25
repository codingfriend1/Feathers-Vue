const assert = require('assert');
const app = require('../../server/app');

describe('\'authManagement\' service', () => {
  it('registered the service', () => {
    const service = app.service('authManagement');

    assert.ok(service, 'Registered the service');
  });
});
