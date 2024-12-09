import { FeeConversionEndpointClient } from './endpoint';

export class FeeConversionClient {
	public endpoint: FeeConversionEndpointClient;

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this.endpoint = new FeeConversionEndpointClient(url, mode);
	}
}
