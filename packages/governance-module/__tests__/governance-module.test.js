'use strict';

const governanceModule = require('..');
const assert = require('assert').strict;

assert.strictEqual(governanceModule(), 'Hello from governanceModule');
console.info('governanceModule tests passed');
