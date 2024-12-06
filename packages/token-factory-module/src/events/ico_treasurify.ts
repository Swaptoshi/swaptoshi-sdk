import { Modules } from 'klayr-framework';
import { ICOTreasurifyEventData } from '../types';
import { icoTreasurifyEventSchema } from '../schema';

export class IcoTreasurifyEvent extends Modules.BaseEvent<ICOTreasurifyEventData> {
	public schema = icoTreasurifyEventSchema;
}
