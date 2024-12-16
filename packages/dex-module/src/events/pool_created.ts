import { Modules } from 'klayr-framework';
import { poolCreatedEventSchema } from '../schema';

export interface PoolCreatedEventData {
	token0: Buffer;
	token1: Buffer;
	fee: string;
	tickSpacing: string;
	poolAddress: Buffer;
}

export class PoolCreatedEvent extends Modules.BaseEvent<PoolCreatedEventData> {
	public schema = poolCreatedEventSchema;
}
