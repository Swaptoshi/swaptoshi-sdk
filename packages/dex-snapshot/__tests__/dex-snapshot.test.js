'use strict';

const dexSnapshot = require('..');
const assert = require('assert').strict;

assert.strictEqual(dexSnapshot(), 'Hello from dexSnapshot');
console.info('dexSnapshot tests passed');
