import { GetPoolParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyGetPoolParam(params: GetPoolParams) {
	verify.verifyToken('tokenA', Buffer.from(params.tokenA, 'hex'));
	verify.verifyToken('tokenB', Buffer.from(params.tokenB, 'hex'));
	verify.verifyNumberString('fee', params.fee);
}
