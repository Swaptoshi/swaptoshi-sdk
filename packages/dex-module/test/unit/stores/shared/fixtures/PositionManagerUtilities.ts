/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NonfungiblePositionManager } from '@dist/stores/factory';
import { Uint256String } from '@dist/stores/library/int';

export function setTime(this: NonfungiblePositionManager, _time: Uint256String) {
	if (this['mutableDependencyReady']) {
		this['mutableContext']!.timestamp = _time;
	}
}
