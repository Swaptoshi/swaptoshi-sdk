import { Modules } from 'klayr-framework';
import { icoCreatedEventSchema } from '../schema';
import { ICOCreatedEventData } from '../types';

export class IcoCreatedEvent extends Modules.BaseEvent<ICOCreatedEventData> {
	public schema = icoCreatedEventSchema;
}
