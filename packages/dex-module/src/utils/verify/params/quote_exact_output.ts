/* eslint-disable import/no-cycle */
import { QuoteExactOutputParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyQuoteExactOutputParam(params: QuoteExactOutputParams) {
	verify.verifyString('path', params.path);
	verify.verifyNumberString('amountOut', params.amountOut);
}
