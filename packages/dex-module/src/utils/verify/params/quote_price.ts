/* eslint-disable import/no-cycle */
import { QuotePriceParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyPriceParam(params: QuotePriceParams) {
	verify.verifyString('path', params.path);
}
