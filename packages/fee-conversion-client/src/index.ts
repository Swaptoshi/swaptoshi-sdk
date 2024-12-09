import { FeeConversionClient } from './client';

export function createIPCClient(path: string) {
	const feeConversionClient = new FeeConversionClient(path, 'ipc');
	return feeConversionClient;
}

export function createWSClient(url: string) {
	const feeConversionClient = new FeeConversionClient(url, 'ws');
	return feeConversionClient;
}
