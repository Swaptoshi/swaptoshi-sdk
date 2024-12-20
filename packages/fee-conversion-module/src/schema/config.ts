import { GovernableConfigSchema } from '@swaptoshi/governance-module';
import { FeeConversionModuleConfig } from '../types';

export const configSchema: GovernableConfigSchema<FeeConversionModuleConfig> = {
	$id: '/feeConversion/config',
	type: 'object',
	required: ['conversionPath'],
	properties: {
		conversionPath: {
			type: 'array',
			fieldNumber: 1,
			items: {
				dataType: 'string',
			},
		},
	},
};
