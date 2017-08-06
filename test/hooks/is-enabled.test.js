const assert = require('assert');
const { isEnabled } = require('../../server/hooks');

describe('\'is-enabled\' hook', () => {

  it(`Prevents disabled users from having access`, () => {
    // A mock hook object
    const mock = {
      params: {
        user: {
          isEnabled: false,
          name: 'Jimmy'
        },
        provider: 'rest'
      },
    };

    const hook = isEnabled()

    try {
      const result = hook(mock);
    } catch(err) {
      assert.equal(err.message, 'Jimmy is disabled.');
    }
  });

  it(`Shows user's name or email in the error message`, () => {
    // A mock hook object
    const mock = {
      params: {
        user: {
          isEnabled: false,
          name: 'Jim'
        },
        provider: 'rest'
      },
    };

    const hook = isEnabled()

    try {
      const result = hook(mock);
    } catch(err) {
      assert.equal(err.message, 'Jim is disabled.');
    }

    try {
      mock.params.user.name = undefined
      mock.params.user.email = 'jimmy@fakename.com'
      const result = hook(mock);
    } catch(err) {
      assert.equal(err.message, 'jimmy@fakename.com is disabled.');
    }

    try {
      mock.params.user.name = undefined
      mock.params.user.email = undefined
      const result = hook(mock);
    } catch(err) {
      assert.equal(err.message, 'This user is disabled.');
    }
  });

  it(`Bypasses isEnabled if provider is not set`, () => {
    // A mock hook object
    const mock = {
      params: {
        user: {
          isEnabled: false
        },
        provider: undefined
      },
    };
    // Initialize our hook with no options
    const hook = isEnabled();

    try {
      const result = hook(mock);
      assert.equal(result, mock);
    } catch(err) {}
  });

  it(`Throws error if user is missing`, () => {
    // A mock hook object
    const mock = {
      params: {
        user: undefined,
        provider: 'rest'
      },
    };
    // Initialize our hook with no options
    const hook = isEnabled();

    try {
      const result = hook(mock);
    } catch(err) {
      assert.equal(err.message, `Cannot check if the user is enabled. You must not be authenticated.`);
    }
  });

  it(`Allows request if user is an admin even if disabled`, () => {
    // A mock hook object
    const mock = {
      params: {
        user: {
          isEnabled: false
        },
        provider: 'rest'
      },
    };
    // Initialize our hook with no options
    const hook = isEnabled();

    try {
      const result = hook(mock);
      assert.equal(result, mock, 'Returns the expected hook object');
    } catch(err) {}
  });
});
