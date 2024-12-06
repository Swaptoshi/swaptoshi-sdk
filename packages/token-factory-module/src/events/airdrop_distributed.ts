import { Modules } from 'klayr-framework';
import { airdropDistributedEventSchema } from '../schema';
import { AirdropDistributedEventData } from '../types';

export class AirdropDistributedEvent extends Modules.BaseEvent<AirdropDistributedEventData> {
	public schema = airdropDistributedEventSchema;
}
