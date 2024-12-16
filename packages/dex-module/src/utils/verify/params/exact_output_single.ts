import { ExactOutputSingleParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyExactOutputSingleParam(params: ExactOutputSingleParams) {
	verify.verifyToken('tokenIn', params.tokenIn);
	verify.verifyToken('tokenOut', params.tokenOut);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('deadline', params.deadline);
	verify.verifyNumberString('amountOut', params.amountOut);
	verify.verifyNumberString('amountInMaximum', params.amountInMaximum);
	verify.verifyNumberString('sqrtPriceLimitX96', params.sqrtPriceLimitX96);
}
