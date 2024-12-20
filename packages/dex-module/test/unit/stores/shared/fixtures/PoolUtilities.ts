/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DEXPool } from '@dist/stores/factory';
import { Uint256String, Uint256 } from '@dist/stores/library/int';

export function setFeeGrowthGlobal0X128(this: DEXPool, _feeGrowthGlobal0X128: Uint256String) {
	this.feeGrowthGlobal0X128 = _feeGrowthGlobal0X128;
}

export function setFeeGrowthGlobal1X128(this: DEXPool, _feeGrowthGlobal1X128: Uint256String) {
	this.feeGrowthGlobal1X128 = _feeGrowthGlobal1X128;
}

export function advanceTime(this: DEXPool, by: Uint256String) {
	if (this['mutableDependencyReady']) {
		this['mutableContext']!.timestamp = Uint256.from(this['mutableContext']!.timestamp).add(by).toString();
	}
}
