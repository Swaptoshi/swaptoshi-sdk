import { TokenFactoryEndpointClient } from './endpoint';
import { TokenFactoryTransactionClient } from './transaction';

export class TokenFactoryClient {
	public transaction: TokenFactoryTransactionClient;
	public endpoint: TokenFactoryEndpointClient;

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this.transaction = new TokenFactoryTransactionClient(url, mode);
		this.endpoint = new TokenFactoryEndpointClient(url, mode);
	}
}
