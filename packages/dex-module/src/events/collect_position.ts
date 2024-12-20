import { Modules } from 'klayr-framework';
import { collectPositionEventSchema } from '../schema';

export interface CollectPositionEventData {
	tokenId: Buffer;
	recipientAddress: Buffer;
	amount0Collect: string;
	amount1Collect: string;
}

export class CollectPositionEvent extends Modules.BaseEvent<CollectPositionEventData> {
	public schema = collectPositionEventSchema;
}
