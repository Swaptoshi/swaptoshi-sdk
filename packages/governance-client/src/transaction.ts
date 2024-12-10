import { apiClient, cryptography } from '@klayr/client';
import { TransactionParam } from './types';
import { INITIAL_MOCK_FEE } from './constant';
import { BoostVoteParams, CreateProposalParams, DelegateVoteParams, RevokeDelegatedVoteParams, SetProposalAttributesParams, VoteParams } from '@swaptoshi/governance-module';

export class GovernanceTransactionClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async boostVote(params: TransactionParam<BoostVoteParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'boostVote', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async createProposal(params: TransactionParam<CreateProposalParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'createProposal', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async delegateVote(params: TransactionParam<DelegateVoteParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'delegateVote', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async revokeDelegatedVote(params: TransactionParam<RevokeDelegatedVoteParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'createProposal', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async setProposalAttributes(params: TransactionParam<SetProposalAttributesParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'setProposalAttributes', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	public async vote(params: TransactionParam<VoteParams>, senderPrivateKey: Buffer) {
		const client = await this._getClient();
		const result = await this._sendTransaction(client, 'vote', params, senderPrivateKey);
		await client.disconnect();
		return result;
	}

	private async _sendTransaction(client: apiClient.APIClient, command: string, params: TransactionParam<any>, senderPrivateKey: Buffer) {
		const senderPublicKey = cryptography.ed.getPublicKeyFromPrivateKey(senderPrivateKey);

		const { nonce } = (await client.invoke('auth_getAuthAccount', {
			address: cryptography.address.getKlayr32AddressFromPublicKey(senderPublicKey),
		})) as unknown as { nonce: string };

		const payload = { module: 'governance', command, nonce, params: params.params as unknown as Record<string, unknown> };

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
