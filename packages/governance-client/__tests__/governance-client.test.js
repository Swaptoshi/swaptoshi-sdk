'use strict';

const governanceClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(governanceClient(), 'Hello from governanceClient');
console.info('governanceClient tests passed');
