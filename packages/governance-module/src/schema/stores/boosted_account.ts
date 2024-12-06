import { BoostedAccountStoreData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const boostedAccountStoreSchema: Types.TypedSchema<BoostedAccountStoreData> = {
	$id: '/governance/store/boosted_account',
	type: 'object',
	required: ['targetHeight'],
	properties: {
		targetHeight: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};
