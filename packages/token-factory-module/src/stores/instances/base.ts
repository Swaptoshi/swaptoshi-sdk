/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Modules, Types } from 'klayr-framework';
import { Constructor, FeeMethod, ImmutableContext, ImmutableFactoryContext, MutableFactoryContext, TokenMethod } from '../../types';
import { DexMethod } from '@swaptoshi/dex-module';
import { TokenFactoryGovernableConfig } from '../../config';

export interface AddDependenciesParam<T extends ImmutableFactoryContext | MutableFactoryContext> {
	context: T;
	tokenMethod?: TokenMethod;
	feeMethod?: FeeMethod;
	dexMethod?: DexMethod;
}

export class BaseInstance<T, K extends Modules.BaseStore<T>> {
	public constructor(
		storeKey: Constructor,
		stores: Modules.NamedRegistry,
		events: Modules.NamedRegistry,
		config: TokenFactoryGovernableConfig,
		genesisConfig: Types.GenesisConfig,
		moduleName: string,
		key?: Buffer,
	) {
		this.stores = stores;
		this.events = events;
		this.moduleName = moduleName;
		this.config = config;
		this.genesisConfig = genesisConfig;
		this.instanceStore = stores.get(storeKey) as unknown as K;
		if (key) this.key = key;
	}

	public toJSON(): Types.JSONObject<T> {
		throw new Error('toJSON() method is not implemented');
	}

	public toObject(): T {
		throw new Error('toObject() method is not implemented');
	}

	public addImmutableDependencies(param: AddDependenciesParam<ImmutableFactoryContext>) {
		if (this.mutableDependencyReady || this.immutableDependencyReady) {
			throw new Error('this instance dependencies already been configured');
		}

		const { context, ...methods } = param;
		Object.assign(this, methods);

		this.immutableContext = context;
		this.immutableDependencyReady = true;
	}

	public addMutableDependencies(param: AddDependenciesParam<MutableFactoryContext>) {
		if (this.mutableDependencyReady || this.immutableDependencyReady) {
			throw new Error('this instance dependencies already been configured');
		}

		const { context, ...methods } = param;
		Object.assign(this, methods);

		this.mutableContext = context;
		this.context = context;
		this.immutableContext = context;

		this.mutableDependencyReady = true;
		this.immutableDependencyReady = true;
	}

	public addDependencies(param: AddDependenciesParam<MutableFactoryContext>) {
		this.addMutableDependencies(param);
	}

	public async getConfig(context: ImmutableContext) {
		const config = await this.config.getConfig(context);
		return config;
	}

	protected _checkMutableDependencies() {
		if (!this.mutableDependencyReady) {
			throw new Error('dependencies not configured');
		}
	}

	protected _checkImmutableDependencies() {
		if (!this.immutableDependencyReady) {
			throw new Error('dependencies not configured');
		}
	}

	protected _checkDependencies() {
		this._checkMutableDependencies();
	}

	protected _setKey(key: Buffer) {
		this.key = key;
	}

	protected async _saveStore() {
		this._checkMutableDependencies();

		if (this.key.compare(Buffer.alloc(0)) === 0) {
			throw new Error("instance _saveStore() can't store data with empty buffer as key");
		}

		await this.instanceStore.set(this.mutableContext!.context, this.key, this.toObject());
	}

	protected readonly instanceStore: K;
	protected readonly stores: Modules.NamedRegistry;
	protected readonly events: Modules.NamedRegistry;
	protected readonly genesisConfig: Types.GenesisConfig;
	protected readonly moduleName: string;
	protected readonly config: TokenFactoryGovernableConfig;

	protected readonly tokenMethod: TokenMethod | undefined;
	protected readonly feeMethod: FeeMethod | undefined;
	protected readonly dexMethod: DexMethod | undefined;

	protected context: MutableFactoryContext | undefined;
	protected immutableContext: ImmutableFactoryContext | undefined;
	protected mutableContext: MutableFactoryContext | undefined;
	protected mutableDependencyReady = false;
	protected immutableDependencyReady = false;

	protected key: Buffer = Buffer.alloc(0);
}
