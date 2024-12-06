import { NextAvailableProposalIdStoreData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const nextAvailableProposalIdStoreSchema: Types.TypedSchema<NextAvailableProposalIdStoreData> = {
	$id: '/governance/store/next_available_proposal_id',
	type: 'object',
	required: ['nextProposalId'],
	properties: {
		nextProposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};
