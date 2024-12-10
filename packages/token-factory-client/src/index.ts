import { TokenFactoryClient } from './client';

export function createIPCClient(path: string) {
	const tokenFactoryClient = new TokenFactoryClient(path, 'ipc');
	return tokenFactoryClient;
}

export function createWSClient(url: string) {
	const tokenFactoryClient = new TokenFactoryClient(url, 'ws');
	return tokenFactoryClient;
}
