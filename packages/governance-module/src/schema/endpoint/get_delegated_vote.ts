import { Types } from 'klayr-framework';
import { GetDelegatedVoteParams, DelegatedVoteStoreData } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getDelegatedVoteEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<DelegatedVoteStoreData>> = {
	$id: '/governance/endpoint/response/getDelegatedVote',
	type: 'object',
	required: ['outgoingDelegation', 'incomingDelegation'],
	properties: {
		outgoingDelegation: {
			dataType: 'string',
			format: 'klayr32',
			fieldNumber: 1,
		},
		incomingDelegation: {
			type: 'array',
			fieldNumber: 2,
			items: {
				dataType: 'string',
				format: 'klayr32',
			},
		},
	},
};

export const getDelegatedVoteEndpointRequestSchema: sTypes.TypedSchema<GetDelegatedVoteParams> = {
	$id: '/governance/endpoint/request/getDelegatedVote',
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
