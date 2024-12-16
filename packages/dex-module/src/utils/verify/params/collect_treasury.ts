import { CollectTreasuryParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyCollectTreasuryParam(params: CollectTreasuryParams) {
	verify.verifyAddress('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
}
