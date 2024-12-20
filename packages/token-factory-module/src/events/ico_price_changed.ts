import { Modules } from 'klayr-framework';
import { icoPriceChangedEventSchema } from '../schema';
import { ICOPriceChangedEventData } from '../types';

export class IcoPriceChangedEvent extends Modules.BaseEvent<ICOPriceChangedEventData> {
	public schema = icoPriceChangedEventSchema;
}
