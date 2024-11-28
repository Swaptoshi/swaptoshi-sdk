'use strict';

const dexClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(dexClient(), 'Hello from dexClient');
console.info('dexClient tests passed');
