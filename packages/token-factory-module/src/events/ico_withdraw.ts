import { Modules } from 'klayr-framework';
import { icoWithdrawEventSchema } from '../schema';
import { ICOWithdrawEventData } from '../types';

export class IcoWithdrawEvent extends Modules.BaseEvent<ICOWithdrawEventData> {
	public schema = icoWithdrawEventSchema;
}
