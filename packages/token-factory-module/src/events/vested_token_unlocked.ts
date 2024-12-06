import { Modules } from 'klayr-framework';
import { vestedTokenUnlockedEventSchema } from '../schema';
import { VestedTokenUnlockedEventData } from '../types';

export class VestedTokenUnlockedEvent extends Modules.BaseEvent<VestedTokenUnlockedEventData> {
	public schema = vestedTokenUnlockedEventSchema;
}
