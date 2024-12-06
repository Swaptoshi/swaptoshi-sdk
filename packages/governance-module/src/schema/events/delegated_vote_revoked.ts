import { DelegatedVoteRevokedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const delegatedVoteRevokedEventSchema: Types.TypedSchema<DelegatedVoteRevokedEventData> = {
	$id: '/governance/events/delegated_vote_revoked',
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
