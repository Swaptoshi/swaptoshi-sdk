import { GetPositionParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyGetPositionParam(params: GetPositionParams) {
	verify.verifyKlayer32Address('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
}
