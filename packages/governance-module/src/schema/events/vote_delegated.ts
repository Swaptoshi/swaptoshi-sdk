import { VoteDelegatedEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const voteDelegatedEventSchema: TypedSchema<VoteDelegatedEventData> = {
	$id: '/governance/events/vote_delegated',
	type: 'object',
	required: ['delegateeAddress', 'delegatorAddress'],
	properties: {
		delegateeAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 1,
		},
		delegatorAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 2,
		},
	},
};