import { ExactInputSingleParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyExactInputSingleParam(params: ExactInputSingleParams) {
	verify.verifyToken('tokenIn', params.tokenIn);
	verify.verifyToken('tokenOut', params.tokenOut);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('deadline', params.deadline);
	verify.verifyNumberString('amountIn', params.amountIn);
	verify.verifyNumberString('amountOutMinimum', params.amountOutMinimum);
	verify.verifyNumberString('sqrtPriceLimitX96', params.sqrtPriceLimitX96);
}
