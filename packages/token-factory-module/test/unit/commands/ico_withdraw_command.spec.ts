import { IcoWithdrawCommand } from '@dist/commands/ico_withdraw_command';
import { TokenFactoryModule } from '@dist/module';

describe('IcoWithdrawCommand', () => {
	let module: TokenFactoryModule;
	let command: IcoWithdrawCommand;

	beforeEach(() => {
		module = new TokenFactoryModule();
		command = new IcoWithdrawCommand(module.stores, module.events);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toBe('icoWithdraw');
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
