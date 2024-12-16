import { ObserveParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyObserveParam(params: ObserveParams) {
	verify.verifyKlayer32Address('poolAddress', params.poolAddress);
	params.secondsAgos.forEach(secondsAgos => {
		verify.verifyNumberString('secondsAgos', secondsAgos);
	});
}
