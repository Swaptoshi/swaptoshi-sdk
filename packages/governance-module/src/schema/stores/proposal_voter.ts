import { ProposalVoterStoreData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const proposalVoterStoreSchema: TypedSchema<ProposalVoterStoreData> = {
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
