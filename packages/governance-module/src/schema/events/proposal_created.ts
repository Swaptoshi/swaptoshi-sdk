import { ProposalCreatedEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalCreatedEventSchema: TypedSchema<ProposalCreatedEventData> = {
	$id: '/governance/events/proposal_created',
	type: 'object',
	required: ['proposalId', 'author'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		author: {
			dataType: 'bytes',
			fieldNumber: 2,
		},
	},
};
