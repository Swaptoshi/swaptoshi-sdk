/* eslint-disable */
import { GovernanceModule } from '@dist/module';
import { SetProposalAttributesCommand } from '@dist/commands/set_proposal_attributes_command';

describe('SetProposalAttributesCommand', () => {
	let module: GovernanceModule;
	let command: SetProposalAttributesCommand;

	beforeEach(() => {
		module = new GovernanceModule();
		command = new SetProposalAttributesCommand(module.stores, module.events);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toEqual('setProposalAttributes');
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
