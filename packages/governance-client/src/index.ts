import { GovernanceClient } from './client';

export function createIPCClient(path: string) {
	const governanceClient = new GovernanceClient(path, 'ipc');
	return governanceClient;
}

export function createWSClient(url: string) {
	const governanceClient = new GovernanceClient(url, 'ws');
	return governanceClient;
}
