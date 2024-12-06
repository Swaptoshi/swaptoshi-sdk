import { Modules } from 'klayr-framework';
import { treasuryBlockRewardTaxEventSchema } from '../schema';
import { TreasuryBlockRewardTaxEventData } from '../types';

export class TreasuryBlockRewardTaxEvent extends Modules.BaseEvent<TreasuryBlockRewardTaxEventData> {
	public schema = treasuryBlockRewardTaxEventSchema;
}
