'use strict';

const tokenFactorySnapshot = require('..');
const assert = require('assert').strict;

assert.strictEqual(tokenFactorySnapshot(), 'Hello from tokenFactorySnapshot');
console.info('tokenFactorySnapshot tests passed');
