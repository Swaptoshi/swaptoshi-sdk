import { GovernableConfigSchema } from '@swaptoshi/governance-module';
import { LiquidPosModuleConfig } from '../types';

export const configSchema: GovernableConfigSchema<LiquidPosModuleConfig> = {
	$id: '/liquidPos/config',
	type: 'object',
	required: ['tokenID', 'ratio'],
	properties: {
		tokenID: {
			dataType: 'string',
			governable: false,
			fieldNumber: 1,
		},
		ratio: {
			dataType: 'uint32',
			governable: false,
			fieldNumber: 2,
		},
	},
};
