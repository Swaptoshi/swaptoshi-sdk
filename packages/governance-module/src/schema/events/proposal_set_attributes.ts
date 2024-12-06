import { ProposalSetAttributesEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalSetAttributesEventSchema: Types.TypedSchema<ProposalSetAttributesEventData> = {
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
