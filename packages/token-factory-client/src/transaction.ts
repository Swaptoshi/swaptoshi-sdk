import { apiClient, cryptography } from '@klayr/client';
import { TransactionParam } from './types';
import { INITIAL_MOCK_FEE } from './constant';
import {
	AirdropCreateParams,
	AirdropDistributeParams,
	AirdropEditRecipientsParams,
	FactorySetAttributesParams,
	FactoryTransferOwnershipParams,
	ICOChangePriceParams,
	ICOCreateParams,
	ICODepositParams,
	ICOExactInputParams,
	ICOExactInputSingleParams,
	ICOExactOutputParams,
	ICOTreasurifyParams,
	ICOWithdrawParams,
	TokenBurnParams,
	TokenCreateParams,
	TokenMintParams,
} from '@swaptoshi/token-factory-module';

export class TokenFactoryTransactionClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async airdropCreate(params: TransactionParam<AirdropCreateParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'airdropCreate', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async airdropDistribute(params: TransactionParam<AirdropDistributeParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'airdropDistribute', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async airdropEditRecipients(params: TransactionParam<AirdropEditRecipientsParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'airdropEditRecipients', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async factorySetAttributes(params: TransactionParam<FactorySetAttributesParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'factorySetAttributes', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async factoryTransferOwnership(params: TransactionParam<FactoryTransferOwnershipParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'factoryTransferOwnership', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoChangePrice(params: TransactionParam<ICOChangePriceParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoChangePrice', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoCreate(params: TransactionParam<ICOCreateParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoCreate', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoDeposit(params: TransactionParam<ICODepositParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoDeposit', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoExactInput(params: TransactionParam<ICOExactInputParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoExactInput', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoExactInputSingle(params: TransactionParam<ICOExactInputSingleParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoExactInputSingle', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoExactOutput(params: TransactionParam<ICOExactOutputParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoExactOutput', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoExactOutputSingle(params: TransactionParam<ICOExactOutputParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoExactOutputSingle', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoTreasurify(params: TransactionParam<ICOTreasurifyParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoTreasurify', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async icoWithdraw(params: TransactionParam<ICOWithdrawParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'icoWithdraw', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async tokenBurn(params: TransactionParam<TokenBurnParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'tokenBurn', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async tokenCreate(params: TransactionParam<TokenCreateParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'tokenCreate', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async tokenMint(params: TransactionParam<TokenMintParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'tokenMint', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	private async _sendTransaction(client: apiClient.APIClient, command: string, params: TransactionParam<any>, senderPrivateKey: Buffer) {
		const senderPublicKey = cryptography.ed.getPublicKeyFromPrivateKey(senderPrivateKey);

		const { nonce } = (await client.invoke('auth_getAuthAccount', {
			address: cryptography.address.getKlayr32AddressFromPublicKey(senderPublicKey),
		})) as unknown as { nonce: string };

		const payload = { module: 'tokenFactory', command, nonce, params: params.params as unknown as Record<string, unknown> };

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
