import { IncreaseLiquidityParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyIncreaseLiquidityParam(params: IncreaseLiquidityParams) {
	verify.verifyAddress('poolAddress', params.poolAddress);
	verify.verifyNumberString('tokenId', params.tokenId);
	verify.verifyNumberString('amount0Desired', params.amount0Desired);
	verify.verifyNumberString('amount1Desired', params.amount1Desired);
	verify.verifyNumberString('amount0Min', params.amount0Min);
	verify.verifyNumberString('amount1Min', params.amount1Min);
	verify.verifyNumberString('deadline', params.deadline);
}
