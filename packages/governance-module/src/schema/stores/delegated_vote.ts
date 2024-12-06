import { DelegatedVoteStoreData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const delegatedVoteStoreSchema: Types.TypedSchema<DelegatedVoteStoreData> = {
	$id: '/governance/store/delegated_vote',
	type: 'object',
	required: ['outgoingDelegation', 'incomingDelegation'],
	properties: {
		outgoingDelegation: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 1,
		},
		incomingDelegation: {
			type: 'array',
			fieldNumber: 2,
			items: {
				dataType: 'bytes',
				format: 'klayr32',
			},
		},
	},
};
