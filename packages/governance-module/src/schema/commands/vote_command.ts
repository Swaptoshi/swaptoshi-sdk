import { VoteParams } from '../../types';
import { Types } from '@swaptoshi/utils';

export const voteCommandSchema: Types.TypedSchema<VoteParams> = {
	$id: '/governance/command/vote',
	type: 'object',
	required: ['proposalId', 'decision', 'data'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		decision: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
		data: {
			dataType: 'string',
			fieldNumber: 3,
		},
	},
};
