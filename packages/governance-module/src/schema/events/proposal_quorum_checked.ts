import { ProposalQuorumCheckedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalQuorumCheckedEventSchema: Types.TypedSchema<ProposalQuorumCheckedEventData> = {
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
