import { Modules } from 'klayr-framework';
import { airdropCreatedEventSchema } from '../schema';
import { AirdropCreatedEventData } from '../types';

export class AirdropCreatedEvent extends Modules.BaseEvent<AirdropCreatedEventData> {
	public schema = airdropCreatedEventSchema;
}
