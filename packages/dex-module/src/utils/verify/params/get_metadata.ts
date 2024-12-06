/* eslint-disable import/no-cycle */
import { GetMetadataParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyGetMetadataParam(params: GetMetadataParams) {
	verify.verifyKlayer32Address('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
}
