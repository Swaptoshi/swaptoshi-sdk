import { Modules } from 'klayr-framework';
import { increaseLiquidityEventSchema } from '../schema';

export interface IncreaseLiquidityEventData {
	tokenId: Buffer;
	liquidity: string;
	amount0: string;
	amount1: string;
	ownerAddress: Buffer;
}

export class IncreaseLiquidityEvent extends Modules.BaseEvent<IncreaseLiquidityEventData> {
	public schema = increaseLiquidityEventSchema;
}
