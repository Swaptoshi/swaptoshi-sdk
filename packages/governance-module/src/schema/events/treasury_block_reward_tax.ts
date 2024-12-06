import { TreasuryBlockRewardTaxEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const treasuryBlockRewardTaxEventSchema: TypedSchema<TreasuryBlockRewardTaxEventData> = {
	$id: '/governance/events/treasury_block_reward_tax',
	type: 'object',
	required: ['amount', 'generatorAddress'],
	properties: {
		amount: {
			dataType: 'uint64',
			fieldNumber: 1,
		},
		generatorAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 2,
		},
	},
};
