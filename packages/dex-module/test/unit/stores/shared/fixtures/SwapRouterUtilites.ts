/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SwapRouter } from '@dist/stores/factory';
import { Uint256String } from '@dist/stores/library/int';

export function setTime(this: SwapRouter, _time: Uint256String) {
	if (this['mutableDependencyReady']) {
		this['mutableContext']!.timestamp = _time;
	}
}
