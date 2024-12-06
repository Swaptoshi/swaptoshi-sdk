import { Types } from 'klayr-framework';
import { ProposalQueueStoreData, GetProposalQueueParams } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getProposalQueueEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<ProposalQueueStoreData>> = {
	$id: '/governance/endpoint/response/getProposalQueue',
	type: 'object',
	required: ['start', 'quorum', 'ends', 'execute'],
	properties: {
		start: {
			type: 'array',
			fieldNumber: 1,
			items: {
				dataType: 'uint32',
			},
		},
		quorum: {
			type: 'array',
			fieldNumber: 2,
			items: {
				dataType: 'uint32',
			},
		},
		ends: {
			type: 'array',
			fieldNumber: 3,
			items: {
				dataType: 'uint32',
			},
		},
		execute: {
			type: 'array',
			fieldNumber: 4,
			items: {
				dataType: 'uint32',
			},
		},
	},
};

export const getProposalQueueEndpointRequestSchema: sTypes.TypedSchema<GetProposalQueueParams> = {
	$id: '/governance/endpoint/request/getProposalQueue',
	type: 'object',
	required: ['height'],
	properties: {
		height: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};
