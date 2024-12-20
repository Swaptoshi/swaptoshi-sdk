import { Types } from 'klayr-framework';
import { GetCastedVoteParams, CastedVoteStoreData } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getCastedVoteEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<CastedVoteStoreData>> = {
	$id: '/governance/endpoint/response/getCastedVote',
	type: 'object',
	required: ['activeVote'],
	properties: {
		activeVote: {
			type: 'array',
			fieldNumber: 1,
			items: {
				type: 'object',
				required: ['proposalId', 'decision', 'data'],
				properties: {
					proposalId: {
						dataType: 'uint32',
						fieldNumber: 1,
					},
					decision: {
						dataType: 'uint32',
						fieldNumber: 2,
					},
					data: {
						dataType: 'string',
						fieldNumber: 3,
					},
				},
			},
		},
	},
};

export const getCastedVoteEndpointRequestSchema: sTypes.TypedSchema<GetCastedVoteParams> = {
	$id: '/governance/endpoint/request/getCastedVote',
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
