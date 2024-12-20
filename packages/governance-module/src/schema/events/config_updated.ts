import { ConfigUpdatedEventData } from '../../types';
import { Types } from '@swaptoshi/utils';

export const configUpdatedEventSchema: Types.TypedSchema<ConfigUpdatedEventData> = {
	$id: '/governance/events/config_updated',
	type: 'object',
	required: ['module', 'path', 'old', 'new', 'type'],
	properties: {
		module: {
			dataType: 'string',
			fieldNumber: 1,
		},
		path: {
			dataType: 'string',
			fieldNumber: 2,
		},
		old: {
			dataType: 'string',
			fieldNumber: 3,
		},
		new: {
			dataType: 'string',
			fieldNumber: 4,
		},
		type: {
			dataType: 'string',
			fieldNumber: 5,
		},
	},
};
