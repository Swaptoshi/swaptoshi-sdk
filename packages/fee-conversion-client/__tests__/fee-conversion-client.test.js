'use strict';

const feeConversionClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(feeConversionClient(), 'Hello from feeConversionClient');
console.info('feeConversionClient tests passed');
