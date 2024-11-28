'use strict';

const feeConversionModule = require('..');
const assert = require('assert').strict;

assert.strictEqual(feeConversionModule(), 'Hello from feeConversionModule');
console.info('feeConversionModule tests passed');
