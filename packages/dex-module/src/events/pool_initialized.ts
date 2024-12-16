import { Modules } from 'klayr-framework';
import { poolInitializedEventSchema } from '../schema';

export interface PoolInitializedEventData {
	sqrtPriceX96: string;
	tick: string;
}

export class PoolInitializedEvent extends Modules.BaseEvent<PoolInitializedEventData> {
	public schema = poolInitializedEventSchema;
}
