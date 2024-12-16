import { GetTokenURIParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyGetTokenURIParam(params: GetTokenURIParams) {
	verify.verifyKlayer32Address('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
}
