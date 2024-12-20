/* eslint-disable camelcase */
/* eslint-disable jest/expect-expect */
import { StateMachine } from 'klayr-framework';
import { DexModule } from '@dist/module';
import { ExactInputParams, TokenMethod } from '@dist/types';
import { NonfungiblePositionManager } from '@dist/stores/factory';
import { exactInputCommandSchema } from '@dist/schema';
import { ExactInputCommand } from '@dist/commands/exact_input_command';
import { Uint } from '@dist/stores/library/int';
import { invalidAddress, invalidNumberString } from '../utils/invalid';
import { commandFixture } from '../utils/fixtures';
import { FeeAmount, TICK_SPACINGS, getMaxTick, getMinTick } from '../stores/shared/utilities';
import { poolAddress, senderAddress, senderPublicKey, token0, token1 } from '../utils/account';
import { NFTRegistry } from '../stores/shared/nft/nft_registry';
import { TokenRegistry } from '../stores/shared/token/token_registry';
import { encodePath } from '../stores/shared/path';
import { mock_token_transfer } from '../stores/shared/token';

type CommandParam = ExactInputParams;
const COMMAND_NAME = 'exactInput';
const commandSchema = exactInputCommandSchema;

const validParam: CommandParam = {
	path: encodePath([token0, token1], new Array<string>(1).fill(FeeAmount.MEDIUM)),
	recipient: senderAddress,
	deadline: Date.now().toString(),
	amountIn: '3',
	amountOutMinimum: '1',
};

describe('ExactInputCommand', () => {
	let module: DexModule;
	let command: ExactInputCommand;
	let nft: NonfungiblePositionManager;
	let tokenMethod: TokenMethod;
	let createCommandVerifyContext: (params: CommandParam) => StateMachine.CommandVerifyContext<CommandParam>;
	let createCommandExecuteContext: (params: CommandParam) => StateMachine.CommandExecuteContext<CommandParam>;

	beforeEach(async () => {
		({ module, createCommandExecuteContext, createCommandVerifyContext, nft, tokenMethod } = await commandFixture<CommandParam>(COMMAND_NAME, commandSchema, senderPublicKey, validParam));
		command = new ExactInputCommand(module.stores, module.events);

		await nft.mint({
			token0,
			token1,
			fee: FeeAmount.MEDIUM,
			tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]).toString(),
			tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]).toString(),
			recipient: senderAddress,
			amount0Desired: '1000000',
			amount1Desired: '1000000',
			amount0Min: '0',
			amount1Min: '0',
			deadline: Date.now().toString(),
		});
	});

	afterEach(() => {
		NFTRegistry.reset();
		TokenRegistry.reset();
	});

	const getBalances = async (who: Buffer, context: StateMachine.CommandExecuteContext<CommandParam>) => {
		const balances = await Promise.all([await tokenMethod.getAvailableBalance(context, who, token0), await tokenMethod.getAvailableBalance(context, who, token1)]);
		return {
			token0: Uint.from(balances[0]),
			token1: Uint.from(balances[1]),
		};
	};

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

		it('should throw error when user sends transaction with invalid address (recipient)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				recipient: invalidAddress,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});

		it('should throw error when user sends transaction with invalid number string (deadline)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				deadline: invalidNumberString,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});

		it('should throw error when user sends transaction with invalid number string (amountIn)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				amountIn: invalidNumberString,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});

		it('should throw error when user sends transaction with invalid number string (amountOutMinimum)', async () => {
			const context = createCommandVerifyContext({
				...validParam,
				amountOutMinimum: invalidNumberString,
			});
			await expect(command.verify(context)).resolves.toHaveProperty('status', StateMachine.VerifyStatus.FAIL);
		});
	});

	describe('execute', () => {
		it('should swap tokens successfully', async () => {
			const context = createCommandExecuteContext(validParam);

			const poolBefore = await getBalances(poolAddress, context);
			const senderBefore = await getBalances(senderAddress, context);

			await command.execute(context);

			const poolAfter = await getBalances(poolAddress, context);
			const senderAfter = await getBalances(senderAddress, context);

			expect(senderAfter.token0).toStrictEqual(senderBefore.token0.sub(3));
			expect(senderAfter.token1).toStrictEqual(senderBefore.token1.add(1));
			expect(poolAfter.token0).toStrictEqual(poolBefore.token0.add(3));
			expect(poolAfter.token1).toStrictEqual(poolBefore.token1.sub(1));
		});

		it('should add command events', async () => {
			const context = createCommandExecuteContext(validParam);
			await command.execute(context);

			expect(mock_token_transfer).toHaveBeenCalledWith(senderAddress.toString('hex'), poolAddress.toString('hex'), '3');

			expect(mock_token_transfer).toHaveBeenCalledWith(poolAddress.toString('hex'), senderAddress.toString('hex'), '1');
		});
	});
});
