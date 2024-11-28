'use strict';

const tokenFactoryModule = require('..');
const assert = require('assert').strict;

assert.strictEqual(tokenFactoryModule(), 'Hello from tokenFactoryModule');
console.info('tokenFactoryModule tests passed');
