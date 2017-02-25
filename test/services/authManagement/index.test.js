'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('authManagement service', function() {
  it('registered the authManagements service', () => {
    assert.ok(app.service('authManagements'));
  });
});
