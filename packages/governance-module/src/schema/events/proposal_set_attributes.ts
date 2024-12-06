import { ProposalSetAttributesEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalSetAttributesEventSchema: TypedSchema<ProposalSetAttributesEventData> = {
	$id: '/governance/events/proposal_quorum_checked',
	type: 'object',
	required: ['proposalId', 'key'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		key: {
			dataType: 'string',
			fieldNumber: 2,
		},
	},
};
