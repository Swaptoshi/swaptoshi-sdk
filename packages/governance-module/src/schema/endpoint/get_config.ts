import { Schema } from '@klayr/codec';
import { object } from '@swaptoshi/utils';
import { configSchema } from '../config';

export const getConfigEndpointResponseSchema = object.removeProperty(configSchema, ['governable']) as Schema;

export const getConfigEndpointRequestSchema = {
	$id: '/governance/endpoint/request/get_config',
	type: 'object',
	required: [],
	properties: {},
};
