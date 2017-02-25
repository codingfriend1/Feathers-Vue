'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('roles service', function() {
  it('registered the roles service', () => {
    assert.ok(app.service('roles'));
  });
});
