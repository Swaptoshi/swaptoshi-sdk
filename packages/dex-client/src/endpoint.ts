import { apiClient } from '@klayr/client';
import {
	DexModuleConfig,
	GetMetadataParams,
	GetPoolAddressFromCollectionIdParams,
	GetPoolParams,
	GetPositionParams,
	GetTokenURIParams,
	ObserveParams,
	QuoteExactInputParams,
	QuoteExactInputSingleParams,
	QuoteExactOutputParams,
	QuoteExactOutputSingleParams,
	QuotePriceParams,
} from '@swaptoshi/dex-module';
import {
	GetMetadataResponse,
	GetPoolAddressFromCollectionIdResponse,
	GetPoolResponse,
	GetPositionResponse,
	GetTokenURIResponse,
	ObserveResponse,
	QuoteExactInputResponse,
	QuoteExactInputSingleResponse,
	QuoteExactOutputResponse,
	QuoteExactOutputSingleResponse,
	QuotePriceResponse,
} from './types';

export class DexEndpointClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async getConfig() {
		const client = await this._getClient();
		const result = await client.invoke<DexModuleConfig>('dex_getConfig', {});
		return result;
	}

	public async quoteExactInput(params: QuoteExactInputParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteExactInputResponse>('dex_quoteExactInput', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteExactInputSingle(params: QuoteExactInputSingleParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteExactInputSingleResponse>('dex_quoteExactInputSingle', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteExactOutput(params: QuoteExactOutputParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteExactOutputResponse>('dex_quoteExactOutput', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quoteExactOutputSingle(params: QuoteExactOutputSingleParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuoteExactOutputSingleResponse>('dex_quoteExactOutputSingle', params as unknown as Record<string, unknown>);
		return result;
	}

	public async quotePrice(params: QuotePriceParams) {
		const client = await this._getClient();
		const result = await client.invoke<QuotePriceResponse>('dex_quotePrice', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getPoolAddressFromCollectionId(params: GetPoolAddressFromCollectionIdParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetPoolAddressFromCollectionIdResponse>('dex_getPoolAddressFromCollectionId', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getPool(params: GetPoolParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetPoolResponse>('dex_getPool', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getPosition(params: GetPositionParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetPositionResponse>('dex_getPosition', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getTokenURI(params: GetTokenURIParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetTokenURIResponse>('dex_getTokenURI', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getMetadata(params: GetMetadataParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetMetadataResponse>('dex_getMetadata', params as unknown as Record<string, unknown>);
		return result;
	}

	public async observe(params: ObserveParams) {
		const client = await this._getClient();
		const result = await client.invoke<ObserveResponse>('dex_observe', params as unknown as Record<string, unknown>);
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
