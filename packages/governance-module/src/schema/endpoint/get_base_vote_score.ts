import { Types } from 'klayr-framework';
import { GetBaseVoteScoreParams, VoteScoreStoreData } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getBaseVoteScoreEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<VoteScoreStoreData>> = {
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

export const getBaseVoteScoreEndpointRequestSchema: sTypes.TypedSchema<GetBaseVoteScoreParams> = {
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
