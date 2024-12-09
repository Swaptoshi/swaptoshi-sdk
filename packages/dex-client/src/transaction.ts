import { apiClient, cryptography } from '@klayr/client';
import {
	BurnParams,
	CollectParams,
	CollectTreasuryParams,
	CreatePoolParams,
	DecreaseLiquidityParams,
	ExactInputParams,
	ExactInputSingleParams,
	ExactOutputParams,
	ExactOutputSingleParams,
	IncreaseLiquidityParams,
	MintParams,
	TreasurifyParams,
} from '@swaptoshi/dex-module';
import { TransactionParam } from './types';
import { INITIAL_MOCK_FEE } from './constant';

export class DexTransactionClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async burn(params: TransactionParam<BurnParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'burn', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async collect(params: TransactionParam<CollectParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'collect', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async collectTreasury(params: TransactionParam<CollectTreasuryParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'collectTreasury', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async createPool(params: TransactionParam<CreatePoolParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'createPool', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async decreaseLiquidity(params: TransactionParam<DecreaseLiquidityParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'decreaseLiquidity', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async exactInput(params: TransactionParam<ExactInputParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'exactInput', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async exactInputSingle(params: TransactionParam<ExactInputSingleParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'exactInputSingle', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async exactOutput(params: TransactionParam<ExactOutputParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'exactOutput', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async exactOutputSingle(params: TransactionParam<ExactOutputSingleParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'exactOutputSingle', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async increaseLiquidity(params: TransactionParam<IncreaseLiquidityParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'increaseLiquidity', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async mint(params: TransactionParam<MintParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'mint', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async treasurify(params: TransactionParam<TreasurifyParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'treasurify', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	private async _sendTransaction(client: apiClient.APIClient, command: string, params: TransactionParam<any>, senderPrivateKey: Buffer) {
		const senderPublicKey = cryptography.ed.getPublicKeyFromPrivateKey(senderPrivateKey);

		const { nonce } = (await client.invoke('auth_getAuthAccount', {
			address: cryptography.address.getKlayr32AddressFromPublicKey(senderPublicKey),
		})) as unknown as { nonce: string };

		const payload = { module: 'dex', command, nonce, params: params.params as unknown as Record<string, unknown> };

		let transaction = await client.transaction.create({ ...payload, fee: INITIAL_MOCK_FEE }, senderPrivateKey.toString('hex'));

		const fee = params.fee && params.fee > BigInt(0) ? params.fee : client.transaction.computeMinFee(transaction);
		transaction = await client.transaction.create({ ...payload, fee }, senderPrivateKey.toString('hex'));

		return client.transaction.send(transaction);
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
