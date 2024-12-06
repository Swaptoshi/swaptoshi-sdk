import { SchemaPropertiesFields, TypeScriptTypeToSchemaType } from '@swaptoshi/utils/dist/types';
import { StateMachine, Types } from 'klayr-framework';

export interface GovernableConfigStoreData {
	data: Buffer;
}

export interface GovernableConfigVerifyContext<T extends object> {
	context: StateMachine.ImmutableMethodContext;
	config: T;
	genesisConfig: Types.GenesisConfig;
}

export interface GovernableConfigSetContext<T> extends StateMachine.MethodContext {
	oldConfig: T;
	newConfig: T;
}

export type GovernableConfigSchema<T> = { $id: string } & ObjectSchemaWithGovernableProps<T>;

type ObjectSchemaWithGovernableProps<T> = {
	type: 'object';
	required: (keyof T extends string ? keyof T : never)[];
	properties: SchemaPropertiesWithGovernableProps<T>;
};

type SchemaPropertiesWithGovernableProps<T> = {
	[K in keyof T]: K extends keyof T ? TypeScriptTypeToSchemaType<T[K]> & SchemaPropertiesFields & { governable?: boolean } : never;
};
