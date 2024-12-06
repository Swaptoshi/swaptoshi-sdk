/* eslint-disable import/no-cycle */
import { QuoteExactOutputSingleParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyQuoteExactOutputSingleParam(params: QuoteExactOutputSingleParams) {
	verify.verifyToken('tokenIn', Buffer.from(params.tokenIn, 'hex'));
	verify.verifyToken('tokenOut', Buffer.from(params.tokenOut, 'hex'));
	verify.verifyNumberString('amount', params.amount);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyNumberString('sqrtPriceLimitX96', params.sqrtPriceLimitX96);
}
