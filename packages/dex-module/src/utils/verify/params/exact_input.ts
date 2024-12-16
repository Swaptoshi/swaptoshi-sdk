import { ExactInputParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyExactInputParam(params: ExactInputParams) {
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('deadline', params.deadline);
	verify.verifyNumberString('amountIn', params.amountIn);
	verify.verifyNumberString('amountOutMinimum', params.amountOutMinimum);
}
