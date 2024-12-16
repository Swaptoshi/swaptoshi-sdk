import { MintParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyMintParam(params: MintParams) {
	verify.verifyToken('token0', params.token0);
	verify.verifyToken('token1', params.token1);
	verify.verifyNumberString('fee', params.fee);
	verify.verifyNumberString('tickLower', params.tickLower);
	verify.verifyNumberString('tickUpper', params.tickUpper);
	verify.verifyNumberString('amount0Desired', params.amount0Desired);
	verify.verifyNumberString('amount1Desired', params.amount1Desired);
	verify.verifyNumberString('amount0Min', params.amount0Min);
	verify.verifyNumberString('amount1Min', params.amount1Min);
	verify.verifyAddress('recipient', params.recipient);
	verify.verifyNumberString('deadline', params.deadline);
}
