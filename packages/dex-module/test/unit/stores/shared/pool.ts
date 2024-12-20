/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as cryptography from '@klayr/cryptography';
import { Uint } from '@dist/stores/library/int';
import { SwapRouter, DEXPool } from '@dist/stores/factory';
import { DexModule } from '@dist/module';
import { PoolStore } from '@dist/stores/pool';
import { MutableSwapContext } from '@dist/types';
import { defaultConfig } from '@dist/constants';
import { TokenRegistry } from './token/token_registry';
import { Token } from './token/token';
import { MockedTokenMethod } from './token';
import { TestCallee } from './fixtures/TestCallee';
import { TestRouter } from './fixtures/TestRouter';
import { methodContextFixture, tokenID } from './module';
import { token0 as token0ID, token1 as token1ID, token2 as token2ID, token3 as token3ID, token0Symbol, token1Symbol, token2Symbol, token3Symbol } from '../../utils/account';

type Fixture<T> = (context: MutableSwapContext, module: DexModule) => Promise<T>;

interface PoolFixture extends TokensFixture {
	swapTargetCallee: TestCallee;
	swapTargetRouter: TestRouter;
	createPool(fee: string, tickSpacing: string, firstToken?: Buffer, secondToken?: Buffer): Promise<DEXPool>;
}

interface CompleteFixture extends PoolFixture {
	uninitializedRouter: SwapRouter;
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = '1601906400';
export const NATIVE_TOKEN_ID = tokenID;

interface TokensFixture {
	nativeTokenId: Buffer;
	token0: Buffer;
	token1: Buffer;
	token2: Buffer;
	token3: Buffer;
	token0Symbol: string;
	token0Decimal: string;
	token1Symbol: string;
	token1Decimal: string;
	token2Symbol: string;
	token2Decimal: string;
	token3Symbol: string;
	token3Decimal: string;
}

async function tokensFixture(sender: Buffer): Promise<TokensFixture> {
	const tokenMethod = new MockedTokenMethod();

	const nativeToken = new Token();
	const nativeTokenId = tokenID;
	TokenRegistry.createToken(nativeTokenId, nativeToken);
	await tokenMethod.mint(undefined as any, sender, nativeTokenId, Uint.from(2).pow(255).toBigInt());

	const tokenA = new Token();
	const tokenAID = token0ID;
	const token0Decimal = '8';
	TokenRegistry.createToken(tokenAID, tokenA);
	await tokenMethod.mint(undefined as any, sender, tokenAID, Uint.from(2).pow(255).toBigInt());

	const tokenB = new Token();
	const tokenBID = token1ID;
	const token1Decimal = '8';
	TokenRegistry.createToken(tokenBID, tokenB);
	await tokenMethod.mint(undefined as any, sender, tokenBID, Uint.from(2).pow(255).toBigInt());

	const tokenC = new Token();
	const tokenCID = token2ID;
	const token2Decimal = '8';
	TokenRegistry.createToken(tokenCID, tokenC);
	await tokenMethod.mint(undefined as any, sender, tokenCID, Uint.from(2).pow(255).toBigInt());

	const tokenD = new Token();
	const tokenDID = token3ID;
	const token3Decimal = '8';
	TokenRegistry.createToken(tokenDID, tokenD);
	await tokenMethod.mint(undefined as any, sender, tokenDID, Uint.from(2).pow(255).toBigInt());

	const [token0, token1, token2, token3] = [tokenAID, tokenBID, tokenCID, tokenDID].sort((tokenAi, tokenBi) => Buffer.compare(tokenAi, tokenBi));

	return {
		nativeTokenId,
		token0,
		token1,
		token2,
		token3,
		token0Symbol,
		token0Decimal,
		token1Symbol,
		token1Decimal,
		token2Symbol,
		token2Decimal,
		token3Symbol,
		token3Decimal,
	};
}

export const poolFixture: Fixture<PoolFixture> = async (context: MutableSwapContext, module: DexModule): Promise<PoolFixture> => {
	const { nativeTokenId, token0, token1, token2, token3, token0Decimal, token1Decimal, token2Decimal, token3Decimal } = await tokensFixture(context.senderAddress);

	const swapTargetCallee = new TestCallee(context, module);
	const swapTargetRouter = new TestRouter(context, module);

	return {
		nativeTokenId,
		token0,
		token1,
		token2,
		token3,
		token0Symbol,
		token0Decimal,
		token1Symbol,
		token1Decimal,
		token2Symbol,
		token2Decimal,
		token3Symbol,
		token3Decimal,
		swapTargetCallee,
		swapTargetRouter,
		createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
			const poolStore = module.stores.get(PoolStore);
			await poolStore.del(context.context, poolStore.getKey(firstToken, secondToken, fee));
			// eslint-disable-next-line no-param-reassign
			module._config.default = {
				...defaultConfig,
				feeAmountTickSpacing: [{ fee, tickSpacing }],
			};
			poolStore.init(module._config);
			const pool = await poolStore.createPool(
				context,
				firstToken,
				cryptography.utils.hash(firstToken).subarray(0, 2).toString('hex'),
				8,
				secondToken,
				cryptography.utils.hash(secondToken).subarray(0, 2).toString('hex'),
				8,
				fee,
			);
			pool.tickSpacing = tickSpacing;

			return pool;
		},
	};
};

export const completeFixture: Fixture<CompleteFixture> = async (context: MutableSwapContext, module: DexModule) => {
	const fixture = await methodContextFixture();
	const uninitializedRouter = new SwapRouter(fixture.module.stores, fixture.config, fixture.module.name);
	const pools = await poolFixture(context, module);

	return {
		...pools,
		uninitializedRouter,
	};
};
