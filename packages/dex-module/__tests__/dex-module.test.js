'use strict';

const dexModule = require('..');
const assert = require('assert').strict;

assert.strictEqual(dexModule(), 'Hello from dexModule');
console.info('dexModule tests passed');
