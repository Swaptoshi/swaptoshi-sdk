import { governanceClient } from '../../src/governance-client';

test('should test', () => {
	expect(governanceClient()).toBe('Hello from governanceClient');
});
