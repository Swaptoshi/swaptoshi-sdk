import { DexClient } from './client';

export function createIPCClient(path: string) {
	const dexClient = new DexClient(path, 'ipc');
	return dexClient;
}

export function createWSClient(url: string) {
	const dexClient = new DexClient(url, 'ws');
	return dexClient;
}
