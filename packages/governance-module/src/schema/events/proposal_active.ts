import { ProposalActiveEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalActiveEventSchema: Types.TypedSchema<ProposalActiveEventData> = {
	$id: '/governance/events/proposal_active',
	type: 'object',
	required: ['proposalId', 'status'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		status: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
	},
};
