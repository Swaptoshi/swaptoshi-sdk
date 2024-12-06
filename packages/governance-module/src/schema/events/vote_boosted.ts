import { VoteBoostedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const voteBoostedEventSchema: Types.TypedSchema<VoteBoostedEventData> = {
	$id: '/governance/events/vote_boosted',
	type: 'object',
	required: ['address', 'targetHeight'],
	properties: {
		address: {
			dataType: 'bytes',
			format: 'klayr32',
			fieldNumber: 1,
		},
		targetHeight: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
	},
};
