import { Modules } from 'klayr-framework';
import { decreaseLiquidityEventSchema } from '../schema';

export interface DecreaseLiquidityEventData {
	tokenId: Buffer;
	liquidity: string;
	amount0: string;
	amount1: string;
}

export class DecreaseLiquidityEvent extends Modules.BaseEvent<DecreaseLiquidityEventData> {
	public schema = decreaseLiquidityEventSchema;
}
