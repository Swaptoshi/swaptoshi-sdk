import { TokenMintCommand } from '@dist/commands/token_mint_command';
import { TokenFactoryModule } from '@dist/module';

describe('TokenMintCommand', () => {
	let module: TokenFactoryModule;
	let command: TokenMintCommand;

	beforeEach(() => {
		module = new TokenFactoryModule();
		command = new TokenMintCommand(module.stores, module.events);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toBe('tokenMint');
		});

		it('should have valid schema', () => {
			expect(command.schema).toMatchSnapshot();
		});
	});

	describe('verify', () => {
		describe('schema validation', () => {
			it.todo('should throw errors for invalid schema');
			it.todo('should be ok for valid schema');
		});
	});

	describe('execute', () => {
		describe('valid cases', () => {
			it.todo('should update the state store');
		});

		describe('invalid cases', () => {
			it.todo('should throw error');
		});
	});
});
