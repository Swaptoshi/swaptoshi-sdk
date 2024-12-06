import { Modules } from 'klayr-framework';
import { vestedTokenLockedEventSchema } from '../schema';
import { VestedTokenLockedEventData } from '../types';

export class VestedTokenLockedEvent extends Modules.BaseEvent<VestedTokenLockedEventData> {
	public schema = vestedTokenLockedEventSchema;
}
