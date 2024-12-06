import { TreasuryMintEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const treasuryMintEventSchema: Types.TypedSchema<TreasuryMintEventData> = {
	$id: '/governance/events/treasury_mint',
	type: 'object',
	required: ['amount'],
	properties: {
		amount: {
			dataType: 'uint64',
			fieldNumber: 1,
		},
	},
};
