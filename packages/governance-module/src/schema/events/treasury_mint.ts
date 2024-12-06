import { TreasuryMintEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const treasuryMintEventSchema: TypedSchema<TreasuryMintEventData> = {
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
