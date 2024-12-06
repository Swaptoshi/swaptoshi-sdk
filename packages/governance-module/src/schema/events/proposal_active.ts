import { ProposalActiveEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalActiveEventSchema: TypedSchema<ProposalActiveEventData> = {
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
