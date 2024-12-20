import { Types } from 'klayr-framework';
import { GetBoostedAccountParams, BoostedAccountStoreData } from '../../types';
import { Types as sTypes } from '@swaptoshi/utils';

export const getBoostedAccountEndpointResponseSchema: sTypes.TypedSchema<Types.JSONObject<BoostedAccountStoreData>> = {
	$id: '/governance/endpoint/response/getBoostedAccount',
	type: 'object',
	required: ['targetHeight'],
	properties: {
		targetHeight: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};

export const getBoostedAccountEndpointRequestSchema: sTypes.TypedSchema<GetBoostedAccountParams> = {
	$id: '/governance/endpoint/request/getBoostedAccount',
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
