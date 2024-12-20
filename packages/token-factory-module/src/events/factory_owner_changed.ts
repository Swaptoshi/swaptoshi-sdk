import { Modules } from 'klayr-framework';
import { factoryOwnerChangedEventSchema } from '../schema';
import { FactoryOwnerChangedEventData } from '../types';

export class FactoryOwnerChangedEvent extends Modules.BaseEvent<FactoryOwnerChangedEventData> {
	public schema = factoryOwnerChangedEventSchema;
}
