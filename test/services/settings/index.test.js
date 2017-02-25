'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('settings service', function() {
  it('registered the settings service', () => {
    assert.ok(app.service('settings'));
  });
});
