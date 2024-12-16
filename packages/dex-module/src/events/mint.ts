import { Modules } from 'klayr-framework';
import { mintEventSchema } from '../schema';

export interface MintEventData {
	senderAddress: Buffer;
	recipientAddress: Buffer;
	tickLower: string;
	tickUpper: string;
	lowerLiquidityNetBefore: string;
	lowerLiquidityNet: string;
	upperLiquidityNetBefore: string;
	upperLiquidityNet: string;
}

export class MintEvent extends Modules.BaseEvent<MintEventData> {
	public schema = mintEventSchema;
}
