import { LiquidPosEndpointClient } from './endpoint';

export class LiquidPosClient {
	public endpoint: LiquidPosEndpointClient;

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this.endpoint = new LiquidPosEndpointClient(url, mode);
	}
}
