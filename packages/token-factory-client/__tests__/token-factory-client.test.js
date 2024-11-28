'use strict';

const tokenFactoryClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(tokenFactoryClient(), 'Hello from tokenFactoryClient');
console.info('tokenFactoryClient tests passed');
