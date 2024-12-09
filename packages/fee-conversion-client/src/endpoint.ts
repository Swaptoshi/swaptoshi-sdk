import { apiClient } from '@klayr/client';
import { DryRunTransactionResponse, FeeConversionModuleConfig, RegisteredMethodResponse } from '@swaptoshi/fee-conversion-module';

export class FeeConversionEndpointClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async getConfig() {
		const client = await this._getClient();
		const result = await client.invoke<FeeConversionModuleConfig>('feeConversion_getConfig', {});
		return result;
	}

	public async getRegisteredHandlers() {
		const client = await this._getClient();
		const result = await client.invoke<RegisteredMethodResponse>('feeConversion_getRegisteredHandlers', {});
		return result;
	}

	public async dryRunTransaction(params: { transaction: string }) {
		const client = await this._getClient();
		const result = await client.invoke<DryRunTransactionResponse>('feeConversion_dryRunTransaction', params);
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
