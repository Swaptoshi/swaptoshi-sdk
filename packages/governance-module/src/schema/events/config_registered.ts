import { ConfigRegisteredEventData } from '../../types';
import { TypedSchema } from '@swaptoshi/utils/dist/types';

export const configRegisteredEventSchema: TypedSchema<ConfigRegisteredEventData> = {
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
