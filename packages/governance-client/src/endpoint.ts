import { apiClient } from '@klayr/client';
import {
	BoostedAccountStoreData,
	CastedVoteStoreData,
	GetBaseVoteScoreParams,
	GetBoostedAccountParams,
	GetCastedVoteParams,
	GetDelegatedVoteParams,
	GetProposalParams,
	GetProposalQueueParams,
	GovernanceModuleConfig,
	NextAvailableProposalIdStoreData,
	ProposalQueueStoreData,
} from '@swaptoshi/governance-module';
import { GetBaseVoteScoreResponse, GetDelegatedVoteResponse, GetProposalResponse, GetRegisteredGovernableConfigResponse } from './types';

export class GovernanceEndpointClient {
	private _url: string;
	private _mode: 'ipc' | 'ws';

	public constructor(url: string, mode: 'ipc' | 'ws') {
		this._url = url;
		this._mode = mode;
	}

	public async getConfig() {
		const client = await this._getClient();
		const result = await client.invoke<GovernanceModuleConfig>('governance_getConfig', {});
		return result;
	}

	public async getRegisteredGovernableConfig() {
		const client = await this._getClient();
		const result = await client.invoke<GetRegisteredGovernableConfigResponse>('governance_getRegisteredGovernableConfig', {});
		return result;
	}

	public async getCastedVote(params: GetCastedVoteParams) {
		const client = await this._getClient();
		const result = await client.invoke<CastedVoteStoreData>('governance_getCastedVote', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getBaseVoteScore(params: GetBaseVoteScoreParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetBaseVoteScoreResponse>('governance_getBaseVoteScore', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getProposal(params: GetProposalParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetProposalResponse>('governance_getProposal', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getProposalQueue(params: GetProposalQueueParams) {
		const client = await this._getClient();
		const result = await client.invoke<ProposalQueueStoreData>('governance_getProposalQueue', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getBoostedAccount(params: GetBoostedAccountParams) {
		const client = await this._getClient();
		const result = await client.invoke<BoostedAccountStoreData>('governance_getBoostedAccount', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getDelegatedVote(params: GetDelegatedVoteParams) {
		const client = await this._getClient();
		const result = await client.invoke<GetDelegatedVoteResponse>('governance_getDelegatedVote', params as unknown as Record<string, unknown>);
		return result;
	}

	public async getNextAvailableProposalId() {
		const client = await this._getClient();
		const result = await client.invoke<NextAvailableProposalIdStoreData>('governance_getNextAvailableProposalId', {});
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
