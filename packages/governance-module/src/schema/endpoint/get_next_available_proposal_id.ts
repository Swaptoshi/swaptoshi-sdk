import { Types } from 'klayr-framework';
import { NextAvailableProposalIdStoreData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const getNextAvailableProposalIdEndpointResponseSchema: TypedSchema<Types.JSONObject<NextAvailableProposalIdStoreData>> = {
	$id: '/governance/endpoint/response/getNextAvailableProposalId',
	type: 'object',
	required: ['nextProposalId'],
	properties: {
		nextProposalId: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};

export const getNextAvailableProposalIdEndpointRequestSchema = {
	$id: '/governance/endpoint/request/getNextAvailableProposalId',
	type: 'object',
	required: [],
	properties: {},
};