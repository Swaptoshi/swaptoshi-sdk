import { RevokeDelegatedVoteParams } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const revokeDelegatedVoteCommandSchema: TypedSchema<RevokeDelegatedVoteParams> = {
	$id: '/governance/command/revoke_delegated_vote',
	type: 'object',
	required: [],
	properties: {},
};
