import { apiClient } from '@klayr/client';
import { LiquidPosModuleConfig } from '@swaptoshi/liquid-pos-module';
import { GetLSTTokenIDResponse } from './types';

export class LiquidPosEndpointClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async getConfig() {
		const client = await this._getClient();
		const result = await client.invoke<LiquidPosModuleConfig>('liquidPos_getConfig', {});
		return result;
	}

	public async getLSTTokenID() {
		const client = await this._getClient();
		const result = await client.invoke<GetLSTTokenIDResponse>('liquidPos_getLSTTokenID', {});
		return result;
	}

	private async _getClient() {
		if (this._mode === 'ipc') {
			return apiClient.createIPCClient(this._url);
		}
		if (this._mode === 'ws') {
			return apiClient.createWSClient(this._url);
		}
		throw new Error('unknown mode');
	}
}
