/* eslint-disable jest/expect-expect */
import { StateMachine } from 'klayr-framework';
import { BurnCommand } from '@dist/commands/burn_command';
import { DexModule } from '@dist/module';
import { burnCommandSchema } from '@dist/schema';
import { BurnParams } from '@dist/types';
import { NonfungiblePositionManager } from '@dist/stores/factory';
import { TokenURIDestroyedEvent } from '@dist/events/tokenuri_destroyed';
import { invalidAddress, invalidNumberString } from '../utils/invalid';
import { Tokens, commandFixture } from '../utils/fixtures';
import { FeeAmount, MaxUint128, TICK_SPACINGS, getMaxTick, getMinTick } from '../stores/shared/utilities';
import { poolAddress, senderAddress, senderPublicKey } from '../utils/account';
import { eventResultHaveMinimumLength } from '../../utils/events';
import { NFTRegistry } from '../stores/shared/nft/nft_registry';
import { TokenRegistry } from '../stores/shared/token/token_registry';

type CommandParam = BurnParams;
const COMMAND_NAME = 'burn';
const commandSchema = burnCommandSchema;

const validParam: CommandParam = {
	poolAddress,
	tokenId: '0',
};

describe('BurnCommand', () => {
	let module: DexModule;
	let command: BurnCommand;
	let nft: NonfungiblePositionManager;
	let tokens: Tokens;
	let createCommandVerifyContext: (params: CommandParam) => StateMachine.CommandVerifyContext<CommandParam>;
	let createCommandExecuteContext: (params: CommandParam) => StateMachine.CommandExecuteContext<CommandParam>;

	beforeEach(async () => {
		({ module, createCommandExecuteContext, createCommandVerifyContext, tokens, nft } = await commandFixture<CommandParam>(COMMAND_NAME, commandSchema, senderPublicKey, validParam));
		command = new BurnCommand(module.stores, module.events);

		await nft.mint({
			token0: tokens[0].address,
			token1: tokens[1].address,
			fee: FeeAmount.MEDIUM,
			tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]).toString(),
			tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]).toString(),
			recipient: senderAddress,
			amount0Desired: '100',
			amount1Desired: '100',
			amount0Min: '0',
			amount1Min: '0',
			deadline: Date.now().toString(),
		});

		await nft.decreaseLiquidity({
			poolAddress,
			tokenId: validParam.tokenId,
			liquidity: '100',
			amount0Min: '0',
			amount1Min: '0',
			deadline: Date.now().toString(),
		});

		await nft.collect({
			poolAddress,
			tokenId: validParam.tokenId,
			recipient: senderAddress,
			amount0Max: MaxUint128.toString(),
			amount1Max: MaxUint128.toString(),
		});
	});

	afterEach(() => {
		NFTRegistry.reset();
		TokenRegistry.reset();
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toBe(COMMAND_NAME);
		});

		it('should have valid schema', () => {
			expect(command.schema).toMatchSnapshot();
		});
	});

	describe('verify', () => {
		it('should return status OK when called with valid input', async () => {
			const context = createCommandVerifyContext(validParam);
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.OK);
		});

		it('should throw error when user sends transaction with invalid address (poolAddress)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				poolAddress: invalidAddress,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});

		it('should throw error when user sends transaction with invalid number string (tokenId)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				tokenId: invalidNumberString,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});
	});

	describe('execute', () => {
		it('should delete the tokenId successfully', async () => {
			const context = createCommandExecuteContext(validParam);
			await command.execute(context);
			await expect((async () => nft.getPositions(validParam.tokenId))()).rejects.toThrow('NFT doesnt exist');
		});

		it('should add command events', async () => {
			const context = createCommandExecuteContext(validParam);
			await command.execute(context);

			eventResultHaveMinimumLength(context.eventQueue, TokenURIDestroyedEvent, module.name, 1);
		});
	});
});
