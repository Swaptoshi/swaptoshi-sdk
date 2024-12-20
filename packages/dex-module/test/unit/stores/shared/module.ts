/* eslint-disable import/no-extraneous-dependencies */
import { Transaction, testing } from 'klayr-framework';
import { codec, Schema } from '@klayr/codec';
import * as cryptography from '@klayr/cryptography';
import { PrefixedStateReadWriter } from 'klayr-framework/dist-node/state_machine/prefixed_state_read_writer';
import { DexModule } from '@dist/module';
import { ObservationStore } from '@dist/stores/observation';
import { PoolStore } from '@dist/stores/pool';
import { PositionInfoStore } from '@dist/stores/position_info';
import { PositionManagerStore } from '@dist/stores/position_manager';
import { TickBitmapStore } from '@dist/stores/tick_bitmap';
import { TickInfoStore } from '@dist/stores/tick_info';
import { TokenSymbolStore } from '@dist/stores/token_symbol';
import { DexModuleConfig, FeeMethod, MainchainInteroperabilityMethod, NFTMethod, SidechainInteroperabilityMethod, TokenMethod } from '@dist/types';
import { DEFAULT_TREASURY_ADDRESS } from '@dist/constants';
import { SupportedTokenStore } from '@dist/stores/supported_token';
import { FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { GovernanceMethod } from '@swaptoshi/governance-module';
import { MockedTokenMethod } from './token';
import { MockedNFTMethod } from './nft/index';
import { MockedFeeMethod } from './fee';
import { MockedFeeConversionMethod } from './fee_conversion';
import { MockedGovernanceMethod } from './governance';

export const chainID = Buffer.from('00000001', 'hex');
export const tokenID = Buffer.concat([chainID, Buffer.alloc(4, 0)]);
export const moduleConfig: DexModuleConfig = {
	feeAmountTickSpacing: [
		{
			fee: '500',
			tickSpacing: '10',
		},
		{
			fee: '3000',
			tickSpacing: '60',
		},
		{
			fee: '10000',
			tickSpacing: '200',
		},
	],
	feeProtocol: 0,
	feeProtocolPool: cryptography.address.getKlayr32AddressFromAddress(DEFAULT_TREASURY_ADDRESS),
	feeConversionEnabled: true,
	supportAllTokens: true,
	minTransactionFee: {
		createPool: '0',
		mint: '0',
		burn: '0',
		collect: '0',
		increaseLiquidity: '0',
		decreaseLiquidity: '0',
		exactInput: '0',
		exactInputSingle: '0',
		exactOutput: '0',
		exactOutputSingle: '0',
		treasurify: '0',
	},
	baseFee: {
		createPool: '0',
		mint: '0',
		burn: '0',
		collect: '0',
		increaseLiquidity: '0',
		decreaseLiquidity: '0',
		exactInput: '0',
		exactInputSingle: '0',
		exactOutput: '0',
		exactOutputSingle: '0',
		treasurify: '0',
	},
	nftPositionMetadata: {
		dex: {
			name: 'Swaptoshi',
			symbol: 'SWX',
			decimal: 8,
		},
		mainchain: {
			symbol: 'KLY',
			decimal: 8,
		},
	},
	nftPositionColorRange: {
		hue: [0, 360],
		saturation: [70, 100],
		lightness: [50, 60],
	},
};

export async function storeFixture() {
	const module = new DexModule();
	const tokenMethod = new MockedTokenMethod() as TokenMethod;
	const nftMethod = new MockedNFTMethod() as NFTMethod;
	const feeMethod = new MockedFeeMethod() as unknown as FeeMethod;
	const feeConversionMethod = new MockedFeeConversionMethod() as FeeConversionMethod;
	const governanceMethod = new MockedGovernanceMethod() as unknown as GovernanceMethod;
	const interoperabilityMethod = {} as SidechainInteroperabilityMethod | MainchainInteroperabilityMethod;
	const stateStore = new PrefixedStateReadWriter(new testing.InMemoryPrefixedStateDB());

	module.addDependencies({ tokenMethod, nftMethod, feeMethod, interoperabilityMethod, feeConversionMethod, governanceMethod });
	await module.init({ moduleConfig: moduleConfig as any, genesisConfig: { chainID } as any });

	const observationStore = module.stores.get(ObservationStore);
	const positionInfoStore = module.stores.get(PositionInfoStore);
	const tickBitmapStore = module.stores.get(TickBitmapStore);
	const tickInfoStore = module.stores.get(TickInfoStore);
	const tokenSymbolStore = module.stores.get(TokenSymbolStore);

	const supportedTokenStore = module.stores.get(SupportedTokenStore);
	supportedTokenStore.addDependencies(tokenMethod);
	await supportedTokenStore.apply(stateStore);

	const poolStore = module.stores.get(PoolStore);
	poolStore.addDependencies(tokenMethod);

	const positionManagerStore = module.stores.get(PositionManagerStore);
	positionManagerStore.addDependencies(tokenMethod, nftMethod);

	return {
		config: moduleConfig,
		module,
		tokenMethod,
		nftMethod,
		feeMethod,
		feeConversionMethod,
		governanceMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
	};
}

export async function commandContextFixture<T extends object>(command: string, commandSchema: Schema, senderPublicKey: Buffer) {
	const {
		config,
		module,
		tokenMethod,
		interoperabilityMethod,
		nftMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
	} = await storeFixture();

	function createCommandContext(param: T) {
		const encodedTransactionParams = codec.encode(commandSchema, param);
		const transaction = new Transaction({
			module: module.name,
			command,
			senderPublicKey,
			nonce: BigInt(0),
			fee: BigInt(1000000000),
			params: encodedTransactionParams,
			signatures: [senderPublicKey],
		});
		return testing.createTransactionContext({ chainID, stateStore, transaction });
	}

	function createCommandVerifyContext(param: T) {
		const context = createCommandContext(param);
		return context.createCommandVerifyContext<T>(commandSchema);
	}

	function createCommandExecuteContext(param: T) {
		const context = createCommandContext(param);
		return context.createCommandExecuteContext<T>(commandSchema);
	}

	return {
		config,
		module,
		tokenMethod,
		nftMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
		createCommandContext,
		createCommandVerifyContext,
		createCommandExecuteContext,
	};
}

export async function hookContextFixture() {
	const {
		config,
		module,
		tokenMethod,
		nftMethod,
		feeMethod,
		feeConversionMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		governanceMethod,
		positionManagerStore,
	} = await storeFixture();

	function createTransactionVerifyContext(transaction: Transaction) {
		return testing
			.createBlockContext({ chainID, stateStore, transactions: [transaction] })
			.getTransactionContext(transaction)
			.createTransactionVerifyContext();
	}

	function createTransactionExecuteContext(transaction: Transaction) {
		return testing
			.createBlockContext({ chainID, stateStore, transactions: [transaction] })
			.getTransactionContext(transaction)
			.createTransactionExecuteContext();
	}

	return {
		config,
		module,
		tokenMethod,
		nftMethod,
		feeMethod,
		feeConversionMethod,
		governanceMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
		createTransactionVerifyContext,
		createTransactionExecuteContext,
	};
}

export async function methodContextFixture() {
	const {
		config,
		module,
		tokenMethod,
		nftMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
	} = await storeFixture();

	function createMethodContext() {
		return testing.createTransientMethodContext({ stateStore });
	}

	return {
		config,
		module,
		tokenMethod,
		nftMethod,
		interoperabilityMethod,
		stateStore,
		observationStore,
		positionInfoStore,
		tickBitmapStore,
		tickInfoStore,
		tokenSymbolStore,
		poolStore,
		positionManagerStore,
		createMethodContext,
	};
}
