import { tokenFactoryClient } from '../../src/token-factory-client';

test('should test', () => {
	expect(tokenFactoryClient()).toBe('Hello from tokenFactoryClient');
});
