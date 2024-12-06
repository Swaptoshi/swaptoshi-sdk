import { Modules } from 'klayr-framework';
import { icoDepositEventSchema } from '../schema';
import { ICODepositEventData } from '../types';

export class IcoDepositEvent extends Modules.BaseEvent<ICODepositEventData> {
	public schema = icoDepositEventSchema;
}
