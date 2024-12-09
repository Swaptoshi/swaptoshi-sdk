import { GovernanceClient } from './client';

export function createIPCClient(path: string) {
	const dexClient = new GovernanceClient(path, 'ipc');
	return dexClient;
}

export function createWSClient(url: string) {
	const dexClient = new GovernanceClient(url, 'ws');
	return dexClient;
}
