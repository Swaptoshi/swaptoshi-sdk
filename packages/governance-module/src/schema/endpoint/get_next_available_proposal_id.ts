import { Types } from 'klayr-framework';
import { NextAvailableProposalIdStoreData } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getNextAvailableProposalIdEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<NextAvailableProposalIdStoreData>> = {
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
