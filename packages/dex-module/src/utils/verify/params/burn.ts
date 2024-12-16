import { BurnParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyBurnParam(params: BurnParams) {
	verify.verifyAddress('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
}
