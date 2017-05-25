const assert = require('assert');
const app = require('../../server/app');

describe('\'settings\' service', () => {
  it('registered the service', () => {
    const service = app.service('settings');

    assert.ok(service, 'Registered the service');
  });
});
