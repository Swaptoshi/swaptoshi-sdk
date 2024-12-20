/* eslint-disable jest/expect-expect */
import { Modules, StateMachine } from 'klayr-framework';
import { DexModule } from '@dist/module';
import { NonfungiblePositionManager, SwapRouter, DEXPool } from '@dist/stores/factory';
import { DexMethod } from '@dist/method';
import { PoolCreatedEvent } from '@dist/events/pool_created';
import { Quoter } from '@dist/stores/library/lens';
import { methodFixture } from './utils/fixtures';
import { poolAddress2, senderAddress } from './utils/account';
import { FeeAmount } from './stores/shared/utilities';
import { eventResultHaveMinimumLength } from '../utils/events';

describe('DexMethod', () => {
	let module: DexModule;
	let method: DexMethod;
	let createMethodContext: () => StateMachine.MethodContext;
	let context: StateMachine.MethodContext;
	let token0: Buffer;
	let token1: Buffer;
	let token2: Buffer;

	beforeEach(jest.clearAllMocks);

	beforeEach(async () => {
		({ token0, token1, token2, module, createMethodContext } = await methodFixture());
		context = createMethodContext();
		method = module.method;
	});

	it('should inherit from BaseMethod', () => {
		expect(DexMethod.prototype).toBeInstanceOf(Modules.BaseMethod);
	});

	describe('constructor', () => {
		it('should be of the correct type', () => {
			expect(method).toBeInstanceOf(DexMethod);
		});

		it("should expose 'createPool'", () => {
			expect(typeof method.createPool).toBe('function');
		});

		it("should expose 'getPool'", () => {
			expect(typeof method.getPoolInstance).toBe('function');
		});

		it("should expose 'getPositionManager'", () => {
			expect(typeof method.getPositionManagerInstance).toBe('function');
		});

		it("should expose 'getRouter'", () => {
			expect(typeof method.getRouterInstance).toBe('function');
		});

		it("should expose 'getQuoter'", () => {
			expect(typeof method.getQuoterInstance).toBe('function');
		});
	});

	describe('createPool', () => {
		it('should create new pool', async () => {
			await method.createPool(context, senderAddress, Date.now(), token0, 'TKNA', 8, token1, 'TKNB', 8, FeeAmount.MEDIUM);
			eventResultHaveMinimumLength(context.eventQueue, PoolCreatedEvent, module.name, 1);
		});
	});

	describe('getPool', () => {
		it('should get pool with correct instance', async () => {
			const pool = await method.getPoolInstance(context, senderAddress, Date.now(), token1, token2, FeeAmount.MEDIUM);
			expect(pool).toBeInstanceOf(DEXPool);
		});
	});

	describe('getPositionManager', () => {
		it('should get positionManager with correct instance', async () => {
			const positionManager = await method.getPositionManagerInstance(context, senderAddress, Date.now(), poolAddress2);
			expect(positionManager).toBeInstanceOf(NonfungiblePositionManager);
		});
	});

	describe('getRouter', () => {
		it('should get router with correct instance', async () => {
			const router = await method.getRouterInstance(context, senderAddress, Date.now());
			expect(router).toBeInstanceOf(SwapRouter);
		});
	});

	describe('getQuoter', () => {
		it('should get quoter with correct instance', async () => {
			const quoter = await method.getQuoterInstance(context, senderAddress, Date.now());
			expect(quoter).toBeInstanceOf(Quoter);
		});
	});
});
