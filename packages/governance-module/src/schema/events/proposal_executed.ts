import { ProposalExecutedEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalExecutedEventSchema: TypedSchema<ProposalExecutedEventData> = {
	$id: '/governance/events/proposal_executed',
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
