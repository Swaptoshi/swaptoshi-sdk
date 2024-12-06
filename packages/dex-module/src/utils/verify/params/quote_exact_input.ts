/* eslint-disable import/no-cycle */
import { QuoteExactInputParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyQuoteExactInputParam(params: QuoteExactInputParams) {
	verify.verifyString('path', params.path);
	verify.verifyNumberString('amountIn', params.amountIn);
}
