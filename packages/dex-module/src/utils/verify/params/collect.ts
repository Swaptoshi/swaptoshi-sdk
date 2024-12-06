/* eslint-disable import/no-cycle */
import { CollectParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyCollectParam(params: CollectParams) {
	verify.verifyAddress('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('amount0Max', params.amount0Max);
	verify.verifyNumberString('amount1Max', params.amount1Max);
}
