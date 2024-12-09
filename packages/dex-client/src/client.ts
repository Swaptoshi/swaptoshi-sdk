import { DexEndpointClient } from './endpoint';
import { DexTransactionClient } from './transaction';

export class DexClient {
	public transaction: DexTransactionClient;
	public endpoint: DexEndpointClient;

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this.transaction = new DexTransactionClient(url, mode);
		this.endpoint = new DexEndpointClient(url, mode);
	}
}
