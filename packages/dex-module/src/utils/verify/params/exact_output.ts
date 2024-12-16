import { ExactOutputParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyExactOutputParam(params: ExactOutputParams) {
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('deadline', params.deadline);
	verify.verifyNumberString('amountOut', params.amountOut);
	verify.verifyNumberString('amountInMaximum', params.amountInMaximum);
}
