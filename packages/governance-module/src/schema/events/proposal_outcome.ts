import { ProposalOutcomeEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalOutcomeEventSchema: Types.TypedSchema<ProposalOutcomeEventData> = {
	$id: '/governance/events/proposal_outcome',
	type: 'object',
	required: ['proposalId', 'status', 'turnoutBiasEnabled', 'boostingEnabled'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		status: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
		turnoutBiasEnabled: {
			dataType: 'boolean',
			fieldNumber: 3,
		},
		boostingEnabled: {
			dataType: 'boolean',
			fieldNumber: 4,
		},
	},
};
