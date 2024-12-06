import { BoostVoteParams } from '../../types';
import { Types } from '@swaptoshi/utils';

export const boostVoteCommandSchema: Types.TypedSchema<BoostVoteParams> = {
	$id: '/governance/command/boost_vote',
	type: 'object',
	required: ['targetHeight'],
	properties: {
		targetHeight: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
	},
};
