import { codec, Schema } from '@klayr/codec';
import { ConfigActionPayload } from '../types';
import { object } from '@swaptoshi/utils';
import { configActionPayloadSchema } from '../schema';
import { Types } from '@swaptoshi/utils';

interface ConfigProposalPayloadValue<T> {
	value: T;
}

function buildConfigPayloadValueSchema(schema: Schema, path: string) {
	const configValueSchema = {
		$id: `configProposalPayload_${schema.$id}_${path}`,
		type: 'object',
		properties: { value: { ...object.getSchemaByPath(schema, path), fieldNumber: 1 } },
	};
	return configValueSchema;
}

export function encodeConfigProposalValue<T extends object, P extends Types.ConfigPathKeys<T>>(configSchema: Schema, path: P, value: Types.ConfigPathType<T, P>) {
	const configValueSchema = buildConfigPayloadValueSchema(configSchema, path);
	return codec.encode(object.removeProperty(configValueSchema, ['governable']) as Schema, { value });
}

export function decodeConfigProposalValue<T extends object, P extends Types.ConfigPathKeys<T>>(configSchema: Schema, payload: ConfigActionPayload): Types.ConfigPathType<T, P> {
	const configValueSchema = buildConfigPayloadValueSchema(configSchema, payload.paramPath);
	const configObject = codec.decode<ConfigProposalPayloadValue<Types.ConfigPathType<T, P>>>(object.removeProperty(configValueSchema, ['governable']) as Schema, payload.value);
	return configObject.value;
}

export function encodeConfigProposalPayload<T extends object, P extends Types.ConfigPathKeys<T>>(configSchema: Schema, moduleName: string, paramPath: P, configValue: Types.ConfigPathType<T, P>) {
	const configPayload = {
		moduleName,
		paramPath,
		value: encodeConfigProposalValue(configSchema, paramPath as never, configValue),
	};
	return codec.encode(configActionPayloadSchema, configPayload);
}

export function decodeConfigProposalPayload(encodedPayload: Buffer): ConfigActionPayload {
	const decodedPayload = codec.decode<ConfigActionPayload>(configActionPayloadSchema, encodedPayload);
	return decodedPayload;
}
