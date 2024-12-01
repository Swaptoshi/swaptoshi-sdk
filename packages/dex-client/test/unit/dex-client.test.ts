import { dexClient } from '../../src/dex-client';

test('should test', () => {
	expect(dexClient()).toBe('Hello from dexClient');
});
