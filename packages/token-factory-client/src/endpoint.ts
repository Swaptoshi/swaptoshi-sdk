import { apiClient } from '@klayr/client';
import {
	GetAirdropParams,
	GetFactoryParams,
	GetICOPoolParams,
	GetVestingUnlockParams,
	QuoteICOExactInputParams,
	QuoteICOExactInputSingleParams,
	QuoteICOExactOutputParams,
	QuoteICOExactOutputSingleParams,
	TokenFactoryModuleConfig,
} from '@swaptoshi/token-factory-module';
import {
	GetAirdropResponse,
	GetFactoryResponse,
	GetICOPoolResponse,
	GetNextAvailableTokenIdResponse,
	GetVestingUnlockResponse,
	QuoteICOExactInputResponse,
	QuoteICOExactInputSingleResponse,
	QuoteICOExactOutputResponse,
	QuoteICOExactOutputSingleResponse,
} from './types';

export class TokenFactoryEndpointClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async getConfig() {
		const client = await this._getClient();
		const result = await client.invoke<TokenFactoryModuleConfig>('tokenFactory_getConfig', {});
		return result;
	}

	public async getICOPool(params: GetICOPoolParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetICOPoolResponse>('tokenFactory_getICOPool', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteICOExactInput(params: QuoteICOExactInputParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteICOExactInputResponse>('tokenFactory_quoteICOExactInput', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteICOExactInputSingle(params: QuoteICOExactInputSingleParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteICOExactInputSingleResponse>('tokenFactory_quoteICOExactInputSingle', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteICOExactOutput(params: QuoteICOExactOutputParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteICOExactOutputResponse>('tokenFactory_quoteICOExactOutput', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteICOExactOutputSingle(params: QuoteICOExactOutputSingleParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteICOExactOutputSingleResponse>('tokenFactory_quoteICOExactOutputSingle', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getAirdrop(params: GetAirdropParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetAirdropResponse>('tokenFactory_getAirdrop', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getFactory(params: GetFactoryParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetFactoryResponse>('tokenFactory_getFactory', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getNextAvailableTokenId() {
		const client = await this._getClient();
		const result = await client.invoke<GetNextAvailableTokenIdResponse>('tokenFactory_getNextAvailableTokenId', {});
		return result;
	}

	public async getVestingUnlock(params: GetVestingUnlockParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetVestingUnlockResponse>('tokenFactory_getVestingUnlock', params as unknown as Record<string, unknown>);
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
