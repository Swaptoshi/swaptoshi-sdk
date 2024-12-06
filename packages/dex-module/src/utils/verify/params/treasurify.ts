/* eslint-disable import/no-cycle */
import { TreasurifyParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyTreasurifyParam(params: TreasurifyParams) {
	verify.verifyAddress('address', params.address);
	verify.verifyToken('token', params.token);
}
