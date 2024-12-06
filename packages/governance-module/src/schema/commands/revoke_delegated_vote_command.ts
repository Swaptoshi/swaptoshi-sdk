import { RevokeDelegatedVoteParams } from '../../types';
import { Types } from '@swaptoshi/utils';

export const revokeDelegatedVoteCommandSchema: Types.TypedSchema<RevokeDelegatedVoteParams> = {
	$id: '/governance/command/revoke_delegated_vote',
	type: 'object',
	required: [],
	properties: {},
};
