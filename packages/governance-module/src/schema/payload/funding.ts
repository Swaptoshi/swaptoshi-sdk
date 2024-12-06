import { FundingActionPayload } from '../../types';
import { Types } from '@swaptoshi/utils';

export const fundingActionPayloadSchema: Types.TypedSchema<FundingActionPayload> = {
	$id: '/governance/action/funding',
	type: 'object',
	required: ['tokenId', 'receivingAddress', 'fundingAmount'],
	properties: {
		tokenId: {
			dataType: 'bytes',
			fieldNumber: 1,
		},
		receivingAddress: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 2,
		},
		fundingAmount: {
			dataType: 'uint64',
			fieldNumber: 3,
		},
	},
};
