import { IcoExactOutputSingleCommand } from '@dist/commands/ico_exact_output_single_command';
import { TokenFactoryModule } from '@dist/module';

describe('IcoExactOutputSingleCommand', () => {
	let module: TokenFactoryModule;
	let command: IcoExactOutputSingleCommand;

	beforeEach(() => {
		module = new TokenFactoryModule();
		command = new IcoExactOutputSingleCommand(module.stores, module.events);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toBe('icoExactOutputSingle');
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
