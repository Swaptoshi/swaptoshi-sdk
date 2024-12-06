/* eslint-disable import/no-cycle */
import { QuoteExactInputSingleParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyQuoteExactInputSingleParam(params: QuoteExactInputSingleParams) {
	verify.verifyToken('tokenIn', Buffer.from(params.tokenIn, 'hex'));
	verify.verifyToken('tokenOut', Buffer.from(params.tokenOut, 'hex'));
	verify.verifyNumberString('amountIn', params.amountIn);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyNumberString('sqrtPriceLimitX96', params.sqrtPriceLimitX96);
}
