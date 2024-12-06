import { Schema } from '@klayr/codec';
import { removeProperty } from '@swaptoshi/utils/dist/object';
import { configSchema } from '../config';

export const getConfigEndpointResponseSchema = removeProperty(configSchema, ['governable']) as Schema;

export const getConfigEndpointRequestSchema = {
	$id: '/governance/endpoint/request/get_config',
	type: 'object',
	required: [],
	properties: {},
};
