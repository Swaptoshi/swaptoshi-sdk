import { Modules } from 'klayr-framework';
import { treasuryMintEventSchema } from '../schema';
import { TreasuryMintEventData } from '../types';

export class TreasuryMintEvent extends Modules.BaseEvent<TreasuryMintEventData> {
	public schema = treasuryMintEventSchema;
}
