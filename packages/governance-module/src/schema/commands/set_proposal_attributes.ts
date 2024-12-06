import { SetProposalAttributesParams } from '../../types';
import { Types } from '@swaptoshi/utils';

export const setProposalAttributesCommandSchema: Types.TypedSchema<SetProposalAttributesParams> = {
	$id: '/governance/command/set_proposal_attributes',
	type: 'object',
	required: ['proposalId', 'key', 'data'],
	properties: {
		proposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		key: {
			dataType: 'string',
			fieldNumber: 2,
		},
		data: {
			dataType: 'bytes',
			fieldNumber: 3,
		},
	},
};
