import { ProposalQuorumCheckedEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalQuorumCheckedEventSchema: TypedSchema<ProposalQuorumCheckedEventData> = {
	$id: '/governance/events/proposal_quorum_checked',
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
