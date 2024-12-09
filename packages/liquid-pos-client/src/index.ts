import { LiquidPosClient } from './client';

export function createIPCClient(path: string) {
	const liquidPosClient = new LiquidPosClient(path, 'ipc');
	return liquidPosClient;
}

export function createWSClient(url: string) {
	const liquidPosClient = new LiquidPosClient(url, 'ws');
	return liquidPosClient;
}
