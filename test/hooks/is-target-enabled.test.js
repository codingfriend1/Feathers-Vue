const assert = require('assert');
const isTargetEnabled = require('../../server/hooks/is-target-enabled');

describe('\'is-target-enabled\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = isTargetEnabled();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});
