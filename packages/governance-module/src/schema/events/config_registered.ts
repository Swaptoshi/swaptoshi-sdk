import { ConfigRegisteredEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const configRegisteredEventSchema: Types.TypedSchema<ConfigRegisteredEventData> = {
	$id: '/governance/events/config_registered',
	type: 'object',
	required: ['module', 'index'],
	properties: {
		module: {
			dataType: 'string',
			fieldNumber: 1,
		},
		index: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
	},
};
