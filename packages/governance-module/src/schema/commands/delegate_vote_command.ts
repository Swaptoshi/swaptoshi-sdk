import { DelegateVoteParams } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const delegateVoteCommandSchema: TypedSchema<DelegateVoteParams> = {
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
