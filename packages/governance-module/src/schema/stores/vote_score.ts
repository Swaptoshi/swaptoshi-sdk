import { VoteScoreStoreData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const voteScoreStoreSchema: Types.TypedSchema<VoteScoreStoreData> = {
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
