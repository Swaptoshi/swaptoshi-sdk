/* eslint-disable import/no-cycle */
import { CreatePoolParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyCreatePoolParam(params: CreatePoolParams) {
	verify.verifyToken('tokenA', params.tokenA);
	verify.verifyToken('tokenB', params.tokenB);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyNumberString('sqrtPriceX96', params.sqrtPriceX96);
}
