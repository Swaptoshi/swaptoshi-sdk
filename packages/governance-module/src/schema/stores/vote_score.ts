import { VoteScoreStoreData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const voteScoreStoreSchema: TypedSchema<VoteScoreStoreData> = {
	$id: '/governance/store/vote_score',
	type: 'object',
	required: ['score'],
	properties: {
		score: {
			dataType: 'uint64',
			fieldNumber: 1,
		},
	},
};
