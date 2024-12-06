/* eslint-disable import/no-cycle */
import { DecreaseLiquidityParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyDecreaseLiquidityParam(params: DecreaseLiquidityParams) {
	verify.verifyAddress('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
	verify.verifyNumberString('liquidity', params.liquidity);
	verify.verifyNumberString('amount0Min', params.amount0Min);
	verify.verifyNumberString('amount1Min', params.amount1Min);
	verify.verifyNumberString('deadline', params.deadline);
}
