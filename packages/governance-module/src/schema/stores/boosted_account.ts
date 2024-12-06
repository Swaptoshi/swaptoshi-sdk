import { BoostedAccountStoreData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const boostedAccountStoreSchema: TypedSchema<BoostedAccountStoreData> = {
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
