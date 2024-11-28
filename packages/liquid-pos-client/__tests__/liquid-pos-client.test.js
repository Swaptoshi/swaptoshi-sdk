'use strict';

const liquidPosClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(liquidPosClient(), 'Hello from liquidPosClient');
console.info('liquidPosClient tests passed');
