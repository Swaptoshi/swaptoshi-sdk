import { Modules, Types } from 'klayr-framework';
import * as cryptography from '@klayr/cryptography';
import {
	GetAirdropParams,
	GetFactoryParams,
	GetICOPoolParams,
	GetVestingUnlockParams,
	QuoteICOExactInputParams,
	QuoteICOExactInputSingleParams,
	QuoteICOExactOutputParams,
	QuoteICOExactOutputSingleParams,
} from './types';
import { object, verify, bytes } from '@swaptoshi/utils';
import { endpointFactoryContext } from './stores/context';
import { ICOStore } from './stores/ico';
import { AirdropStore } from './stores/airdrop';
import { computeICOPoolAddress } from './stores/library';
import { FactoryStore } from './stores/factory';
import { NextAvailableTokenIdStore } from './stores/next_available_token_id';
import { VestingUnlockStore } from './stores/vesting_unlock';
import { TokenFactoryGovernableConfig } from './config';
import {
	getAirdropEndpointResponseSchema,
	getConfigEndpointResponseSchema,
	getFactoryEndpointResponseSchema,
	getICOPoolEndpointResponseSchema,
	getNextAvailableTokenIdEndpointResponseSchema,
	getVestingUnlockEndpointResponseSchema,
	quoteICOExactInputEndpointResponseSchema,
	quoteICOExactInputSingleEndpointResponseSchema,
	quoteICOExactOutputEndpointResponseSchema,
	quoteICOExactOutputSingleEndpointResponseSchema,
} from './schema';

export class TokenFactoryEndpoint extends Modules.BaseEndpoint {
	public async getConfig(_context: Types.ModuleEndpointContext) {
		const configStore = this.stores.get(TokenFactoryGovernableConfig);
		const config = await configStore.getConfig(_context);
		return object.serializer(config, getConfigEndpointResponseSchema);
	}

	public async getICOPool(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as GetICOPoolParams;

		verify.verifyToken('tokenIn', Buffer.from(param.tokenIn, 'hex'));
		verify.verifyToken('tokenOut', Buffer.from(param.tokenOut, 'hex'));

		const _context = endpointFactoryContext(context);
		const icoPool = await this.stores.get(ICOStore).getImmutableICOPool(_context, Buffer.from(param.tokenIn, 'hex'), Buffer.from(param.tokenOut, 'hex'));

		const poolAddress = computeICOPoolAddress({
			tokenIn: Buffer.from(param.tokenIn, 'hex'),
			tokenOut: Buffer.from(param.tokenOut, 'hex'),
		});

		return object.serializer(
			{
				...icoPool.toJSON(),
				poolAddress,
			},
			getICOPoolEndpointResponseSchema,
		);
	}

	public async quoteICOExactInput(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as QuoteICOExactInputParams;

		verify.verifyToken('tokenOut', Buffer.from(param.tokenOut, 'hex'));
		verify.verifyPositiveNumber('amountIn', param.amountIn);
		verify.verifyString('path', param.path);

		const _context = endpointFactoryContext(context);
		const quoter = await this.stores.get(ICOStore).getImmutableICOQuoter(_context);

		const amountOut = await quoter.quoteExactInput({
			amountIn: BigInt(param.amountIn),
			path: Buffer.from(param.path, 'hex'),
			tokenOut: Buffer.from(param.tokenOut, 'hex'),
		});

		return object.serializer({ amountOut }, quoteICOExactInputEndpointResponseSchema);
	}

	public async quoteICOExactInputSingle(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as QuoteICOExactInputSingleParams;

		verify.verifyToken('tokenIn', Buffer.from(param.tokenIn, 'hex'));
		verify.verifyToken('tokenOut', Buffer.from(param.tokenOut, 'hex'));
		verify.verifyPositiveNumber('amountIn', param.amountIn);

		const _context = endpointFactoryContext(context);
		const quoter = await this.stores.get(ICOStore).getImmutableICOQuoter(_context);

		const amountOut = await quoter.quoteExactInputSingle({
			amountIn: BigInt(param.amountIn),
			tokenIn: Buffer.from(param.tokenIn, 'hex'),
			tokenOut: Buffer.from(param.tokenOut, 'hex'),
		});

		return object.serializer({ amountOut }, quoteICOExactInputSingleEndpointResponseSchema);
	}

	public async quoteICOExactOutput(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as QuoteICOExactOutputParams;

		verify.verifyToken('tokenOut', Buffer.from(param.tokenOut, 'hex'));
		verify.verifyPositiveNumber('amountOut', param.amountOut);
		verify.verifyString('path', param.path);

		const _context = endpointFactoryContext(context);
		const quoter = await this.stores.get(ICOStore).getImmutableICOQuoter(_context);

		const amountIn = await quoter.quoteExactOutput({
			amountOut: BigInt(param.amountOut),
			path: Buffer.from(param.path, 'hex'),
			tokenOut: Buffer.from(param.tokenOut, 'hex'),
		});

		return object.serializer({ amountIn }, quoteICOExactOutputEndpointResponseSchema);
	}

	public async quoteICOExactOutputSingle(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as QuoteICOExactOutputSingleParams;

		verify.verifyToken('tokenIn', Buffer.from(param.tokenIn, 'hex'));
		verify.verifyToken('tokenOut', Buffer.from(param.tokenOut, 'hex'));
		verify.verifyPositiveNumber('amountOut', param.amountOut);

		const _context = endpointFactoryContext(context);
		const quoter = await this.stores.get(ICOStore).getImmutableICOQuoter(_context);

		const amountIn = await quoter.quoteExactOutputSingle({
			amountOut: BigInt(param.amountOut),
			tokenIn: Buffer.from(param.tokenIn, 'hex'),
			tokenOut: Buffer.from(param.tokenOut, 'hex'),
		});

		return object.serializer({ amountIn }, quoteICOExactOutputSingleEndpointResponseSchema);
	}

	public async getAirdrop(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as GetAirdropParams;

		verify.verifyToken('tokenId', Buffer.from(param.tokenId, 'hex'));
		verify.verifyKlayer32Address('providerAddress', param.providerAddress);

		const _context = endpointFactoryContext(context);
		const airdrop = await this.stores.get(AirdropStore).getImmutableAirdrop(_context, Buffer.from(param.tokenId, 'hex'), cryptography.address.getAddressFromKlayr32Address(param.providerAddress));
		return object.serializer(airdrop.toJSON(), getAirdropEndpointResponseSchema);
	}

	public async getFactory(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as GetFactoryParams;

		verify.verifyToken('tokenId', Buffer.from(param.tokenId, 'hex'));

		const _context = endpointFactoryContext(context);
		const factory = await this.stores.get(FactoryStore).getImmutableFactory(_context, Buffer.from(param.tokenId, 'hex'));
		return object.serializer(factory.toJSON(), getFactoryEndpointResponseSchema);
	}

	public async getNextAvailableTokenId(context: Types.ModuleEndpointContext) {
		const nextAvailableTokenIdStore = this.stores.get(NextAvailableTokenIdStore);
		const nextAvailableTokenId = await nextAvailableTokenIdStore.getOrDefault(context);
		return object.serializer(nextAvailableTokenId, getNextAvailableTokenIdEndpointResponseSchema);
	}

	public async getVestingUnlock(context: Types.ModuleEndpointContext) {
		const param = context.params as unknown as GetVestingUnlockParams;

		verify.verifyPositiveNumber('height', param.height);

		const vestingStore = this.stores.get(VestingUnlockStore);
		const vesting = await vestingStore.getOrDefault(context, bytes.numberToBytes(param.height));

		return object.serializer(vesting, getVestingUnlockEndpointResponseSchema);
	}
}
