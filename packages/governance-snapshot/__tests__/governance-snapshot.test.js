'use strict';

const governanceSnapshot = require('..');
const assert = require('assert').strict;

assert.strictEqual(governanceSnapshot(), 'Hello from governanceSnapshot');
console.info('governanceSnapshot tests passed');
