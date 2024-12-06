import { Types } from 'klayr-framework';
import { GetBaseVoteScoreParams, VoteScoreStoreData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const getBaseVoteScoreEndpointResponseSchema: TypedSchema<Types.JSONObject<VoteScoreStoreData>> = {
	$id: '/governance/endpoint/response/getBaseVoteScore',
	type: 'object',
	required: ['score'],
	properties: {
		score: {
			dataType: 'string',
			fieldNumber: 1,
		},
	},
};

export const getBaseVoteScoreEndpointRequestSchema: TypedSchema<GetBaseVoteScoreParams> = {
	$id: '/governance/endpoint/request/getBaseVoteScore',
	type: 'object',
	required: ['address'],
	properties: {
		address: {
			dataType: 'string',
			format: 'klayr32',
			fieldNumber: 1,
		},
	},
};
