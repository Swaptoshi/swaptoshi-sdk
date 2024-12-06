import { ProposalVoterStoreData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const proposalVoterStoreSchema: Types.TypedSchema<ProposalVoterStoreData> = {
	$id: '/governance/store/proposal_voter',
	type: 'object',
	required: ['voters'],
	properties: {
		voters: {
			type: 'array',
			fieldNumber: 1,
			items: {
				dataType: 'bytes',
				format: 'klayr32',
			},
		},
	},
};
