import { DelegateVoteParams } from '../../types';
import { Types } from '@swaptoshi/utils';

export const delegateVoteCommandSchema: Types.TypedSchema<DelegateVoteParams> = {
	$id: '/governance/command/delegate_vote',
	type: 'object',
	required: ['delegateeAddress'],
	properties: {
		delegateeAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 1,
		},
	},
};
