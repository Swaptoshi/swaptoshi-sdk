import { GovernanceEndpointClient } from './endpoint';
import { GovernanceTransactionClient } from './transaction';

export class GovernanceClient {
	public transaction: GovernanceTransactionClient;
	public endpoint: GovernanceEndpointClient;

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this.transaction = new GovernanceTransactionClient(url, mode);
		this.endpoint = new GovernanceEndpointClient(url, mode);
	}
}
