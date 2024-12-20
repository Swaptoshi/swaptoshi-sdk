import { Modules } from 'klayr-framework';
import { flashEventSchema } from '../schema';

export interface FlashEventData {
	senderAddress: Buffer;
	recipientAddress: Buffer;
	amount0: string;
	amount1: string;
	paid0: string;
	paid1: string;
}

export class FlashEvent extends Modules.BaseEvent<FlashEventData> {
	public schema = flashEventSchema;
}
