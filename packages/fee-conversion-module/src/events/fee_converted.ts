import { Modules } from 'klayr-framework';
import { feeConvertedEventSchema } from '../schema';

export interface FeeConvertedEventData {
	moduleCommand: string;
	path: Buffer;
	token: Buffer;
	amount: string;
}

export class FeeConvertedEvent extends Modules.BaseEvent<FeeConvertedEventData> {
	public schema = feeConvertedEventSchema;
}
