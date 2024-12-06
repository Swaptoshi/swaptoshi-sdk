import { VoteDelegatedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const voteDelegatedEventSchema: Types.TypedSchema<VoteDelegatedEventData> = {
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
