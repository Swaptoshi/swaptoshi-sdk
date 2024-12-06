/* eslint-disable */
import { GovernanceModule } from '@dist/module';
import { BoostVoteCommand } from '@dist/commands/boost_vote_command';

describe('BoostVoteCommand', () => {
	let module: GovernanceModule;
	let command: BoostVoteCommand;

	beforeEach(() => {
		module = new GovernanceModule();
		command = new BoostVoteCommand(module.stores, module.events);
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toEqual('boostVote');
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
