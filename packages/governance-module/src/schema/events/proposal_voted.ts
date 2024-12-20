import { ProposalVotedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalVotedEventSchema: Types.TypedSchema<ProposalVotedEventData> = {
	$id: '/governance/events/proposal_voted',
	type: 'object',
	required: ['proposalId', 'voterAddress', 'decision', 'data'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		voterAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 2,
		},
		decision: {
			dataType: 'uint32',
			fieldNumber: 3,
		},
		data: {
			dataType: 'string',
			fieldNumber: 4,
		},
	},
};
