/* eslint-disable */
import { Modules, Types } from 'klayr-framework';
import * as cryptography from '@klayr/cryptography';
import * as validator from '@klayr/validator';
import { GovernableConfigRegistry } from './registry';
import { GovernanceGovernableConfig } from './config';
import { bytes, object } from '@swaptoshi/utils';
import { GetBaseVoteScoreParams, GetBoostedAccountParams, GetCastedVoteParams, GetDelegatedVoteParams, GetProposalParams, GetProposalQueueParams } from './types';
import {
	getBaseVoteScoreEndpointRequestSchema,
	getBaseVoteScoreEndpointResponseSchema,
	getBoostedAccountEndpointRequestSchema,
	getBoostedAccountEndpointResponseSchema,
	getCastedVoteEndpointRequestSchema,
	getCastedVoteEndpointResponseSchema,
	getConfigEndpointResponseSchema,
	getDelegatedVoteEndpointRequestSchema,
	getDelegatedVoteEndpointResponseSchema,
	getNextAvailableProposalIdEndpointResponseSchema,
	getProposalEndpointRequestSchema,
	getProposalEndpointResponseSchema,
	getProposalQueueEndpointRequestSchema,
	getProposalQueueEndpointResponseSchema,
	getRegisteredGovernableConfigEndpointResponseSchema,
} from './schema';
import { CastedVoteStore } from './stores/casted_vote';
import { VoteScoreStore } from './stores/vote_score';
import { ProposalStore } from './stores/proposal';
import { ProposalQueueStore } from './stores/queue';
import { BoostedAccountStore } from './stores/boosted_account';
import { DelegatedVoteStore } from './stores/delegated_vote';
import { NextAvailableProposalIdStore } from './stores/next_available_proposal_id';

export class GovernanceEndpoint extends Modules.BaseEndpoint {
	private _governableConfig: GovernableConfigRegistry | undefined;

	public init(governableConfig: GovernableConfigRegistry) {
		this._governableConfig = governableConfig;
	}

	public async getConfig(_context: Types.ModuleEndpointContext) {
		const configStore = this.stores.get(GovernanceGovernableConfig);
		const config = await configStore.getConfig(_context);
		return object.serializer(config, getConfigEndpointResponseSchema);
	}

	public async getRegisteredGovernableConfig(_context: Types.ModuleEndpointContext) {
		if (!this._governableConfig) throw new Error('GovernanceEndpoint is not initialized');
		const response = {
			modules: [...this._governableConfig!.keys()],
		};
		return object.serializer(response, getRegisteredGovernableConfigEndpointResponseSchema);
	}

	public async getCastedVote(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetCastedVoteParams;
		validator.validator.validate(getCastedVoteEndpointRequestSchema, params);
		const store = this.stores.get(CastedVoteStore);
		const data = await store.getOrDefault(context, cryptography.address.getAddressFromKlayr32Address(params.address));
		return object.serializer(data, getCastedVoteEndpointResponseSchema);
	}

	public async getBaseVoteScore(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetBaseVoteScoreParams;
		validator.validator.validate(getBaseVoteScoreEndpointRequestSchema, params);
		const store = this.stores.get(VoteScoreStore);
		const data = await store.getVoteScore(context, cryptography.address.getAddressFromKlayr32Address(params.address));
		return object.serializer({ score: data }, getBaseVoteScoreEndpointResponseSchema);
	}

	public async getProposal(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetProposalParams;
		validator.validator.validate(getProposalEndpointRequestSchema, params);
		const store = this.stores.get(ProposalStore);
		const data = await store.getOrDefault(context, bytes.numberToBytes(params.proposalId));
		return object.serializer(data, getProposalEndpointResponseSchema);
	}

	public async getProposalQueue(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetProposalQueueParams;
		validator.validator.validate(getProposalQueueEndpointRequestSchema, params);
		const store = this.stores.get(ProposalQueueStore);
		const data = await store.getOrDefault(context, bytes.numberToBytes(params.height));
		return object.serializer(data, getProposalQueueEndpointResponseSchema);
	}

	public async getBoostedAccount(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetBoostedAccountParams;
		validator.validator.validate(getBoostedAccountEndpointRequestSchema, params);
		const store = this.stores.get(BoostedAccountStore);
		const data = await store.getOrDefault(context, cryptography.address.getAddressFromKlayr32Address(params.address));
		return object.serializer(data, getBoostedAccountEndpointResponseSchema);
	}

	public async getDelegatedVote(context: Types.ModuleEndpointContext) {
		const params = context.params as unknown as GetDelegatedVoteParams;
		validator.validator.validate(getDelegatedVoteEndpointRequestSchema, params);
		const store = this.stores.get(DelegatedVoteStore);
		const data = await store.getOrDefault(context, cryptography.address.getAddressFromKlayr32Address(params.address));
		return object.serializer(data, getDelegatedVoteEndpointResponseSchema);
	}

	public async getNextAvailableProposalId(context: Types.ModuleEndpointContext) {
		const store = this.stores.get(NextAvailableProposalIdStore);
		const data = await store.getOrDefault(context);
		return object.serializer(data, getNextAvailableProposalIdEndpointResponseSchema);
	}
}
