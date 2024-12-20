/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Modules, Types } from 'klayr-framework';
import * as cryptography from '@klayr/cryptography';
import * as utils from '@klayr/utils';
import { DelegateVoteParams, DelegatedVoteStoreData, RevokeDelegatedVoteParams, VoteScoreArray } from '../../types';
import { BaseInstance } from './base';
import { GovernanceGovernableConfig } from '../../config';
import { object, verify } from '@swaptoshi/utils';
import { DelegatedVoteStore } from '../delegated_vote';
import { VoteDelegatedEvent } from '../../events/vote_delegated';
import { DelegatedVoteRevokedEvent } from '../../events/delegated_vote_revoked';
import { VoteScoreStore } from '../vote_score';
import { CastedVoteStore } from '../casted_vote';
import { BoostedAccountStore } from '../boosted_account';

export class DelegatedVote extends BaseInstance<DelegatedVoteStoreData, DelegatedVoteStore> implements DelegatedVoteStoreData {
	public constructor(
		stores: Modules.NamedRegistry,
		events: Modules.NamedRegistry,
		config: GovernanceGovernableConfig,
		genesisConfig: Types.GenesisConfig,
		moduleName: string,
		delegatedVote: DelegatedVoteStoreData,
		address: Buffer,
	) {
		super(DelegatedVoteStore, stores, events, config, genesisConfig, moduleName, address);

		Object.assign(this, utils.objects.cloneDeep(delegatedVote));

		this.castedVoteStore = stores.get(CastedVoteStore);
		this.boostedAccountStore = stores.get(BoostedAccountStore);
		this.voteScoreStore = stores.get(VoteScoreStore);
	}

	public toJSON() {
		return utils.objects.cloneDeep(
			object.serializer<DelegatedVoteStoreData>({
				outgoingDelegation: this.outgoingDelegation,
				incomingDelegation: this.incomingDelegation,
			}),
		) as Types.JSONObject<DelegatedVoteStoreData>;
	}

	public toObject() {
		return utils.objects.cloneDeep({
			outgoingDelegation: this.outgoingDelegation,
			incomingDelegation: this.incomingDelegation,
		} as DelegatedVoteStoreData) as DelegatedVoteStoreData;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verifyDelegateVote(params: DelegateVoteParams) {
		this._checkImmutableDependencies();
		verify.verifyAddress('params.delegateeAddress', params.delegateeAddress);

		if (Buffer.compare(this.outgoingDelegation, Buffer.alloc(0)) !== 0) {
			throw new Error(`sender already delegate their vote, revoke it first!`);
		}

		const delegateeAccount = await this.instanceStore.getOrDefault(this.immutableContext!.context, params.delegateeAddress);
		const index = delegateeAccount.incomingDelegation.findIndex(buf => buf.equals(this.immutableContext!.senderAddress));
		if (index !== -1) {
			throw new Error(`sender already exists on ${cryptography.address.getKlayr32AddressFromAddress(params.delegateeAddress)} incoming delegation`);
		}

		const circularDelegationPath = await this._isCircularDelegation(params.delegateeAddress);
		if (circularDelegationPath.length > 0) {
			throw new Error(`circular delegation detected: ${circularDelegationPath.map(addr => cryptography.address.getKlayr32AddressFromAddress(addr)).join(' => ')}`);
		}
	}

	public async delegateVote(params: DelegateVoteParams, verify = true) {
		this._checkMutableDependencies();

		if (verify) await this.verifyDelegateVote(params);

		await this._removeSenderVoteAndDelegatedVoteFromProposal();

		this.outgoingDelegation = params.delegateeAddress;

		await this._saveStore();

		const delegateeAccount = await this.instanceStore.getOrDefault(this.mutableContext!.context, params.delegateeAddress);
		delegateeAccount.incomingDelegation.push(this.mutableContext!.senderAddress);
		await this.instanceStore.set(this.mutableContext!.context, params.delegateeAddress, delegateeAccount);

		await this._addDelegatedSenderVoteToProposal();

		const events = this.events.get(VoteDelegatedEvent);
		events.add(
			this.mutableContext!.context,
			{
				delegatorAddress: this.mutableContext!.senderAddress,
				delegateeAddress: params.delegateeAddress,
			},
			[this.mutableContext!.senderAddress, params.delegateeAddress],
		);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verifyRevokeDelegatedVote(_params: RevokeDelegatedVoteParams | undefined) {
		this._checkImmutableDependencies();

		if (Buffer.compare(this.outgoingDelegation, Buffer.alloc(0)) === 0) {
			throw new Error(`sender is not delegating their vote!`);
		}
	}

	public async revokeDelegatedVote(_params: RevokeDelegatedVoteParams | undefined, verify = true) {
		this._checkMutableDependencies();

		if (verify) await this.verifyRevokeDelegatedVote(_params);

		await this._removeSenderVoteAndDelegatedVoteFromProposal();

		const delegateeAccount = await this.instanceStore.getOrDefault(this.mutableContext!.context, this.outgoingDelegation);

		const indexToRemove = delegateeAccount.incomingDelegation.findIndex(buf => buf.equals(this.mutableContext!.senderAddress));
		if (indexToRemove !== -1) delegateeAccount.incomingDelegation.splice(indexToRemove, 1);
		await this.instanceStore.set(this.mutableContext!.context, this.outgoingDelegation, delegateeAccount);

		const events = this.events.get(DelegatedVoteRevokedEvent);
		events.add(
			this.mutableContext!.context,
			{
				delegatorAddress: this.mutableContext!.senderAddress,
				delegateeAddress: this.outgoingDelegation,
			},
			[this.mutableContext!.senderAddress, this.outgoingDelegation],
		);

		this.outgoingDelegation = Buffer.alloc(0);
		await this._saveStore();
	}

	public async getIncomingDelegationVoteScore(): Promise<VoteScoreArray> {
		return this._getIncomingDelegationVoteScore(this.key);
	}

	private async _getIncomingDelegationVoteScore(address: Buffer): Promise<VoteScoreArray> {
		this._checkImmutableDependencies();

		const voteScoreArray: VoteScoreArray = [];

		const delegatedVote = await this.instanceStore.getOrDefault(this.immutableContext!.context, address);

		for (const incomingDelegation of delegatedVote.incomingDelegation) {
			const incomingDelegationState = await this.instanceStore.getOrDefault(this.immutableContext!.context, incomingDelegation);
			if (incomingDelegationState.incomingDelegation.length > 0) {
				voteScoreArray.push(...(await this._getIncomingDelegationVoteScore(incomingDelegation)));
			} else {
				const voteScore = await this.voteScoreStore.getVoteScore(this.immutableContext!.context, incomingDelegation);
				const boostingHeight = await this.boostedAccountStore.getOrDefault(this.immutableContext!.context, incomingDelegation);
				voteScoreArray.push({ voteScore, boostingHeight: boostingHeight.targetHeight });
			}
		}

		return voteScoreArray;
	}

	private async _isCircularDelegation(delegateeAddress: Buffer): Promise<Buffer[]> {
		this._checkImmutableDependencies();

		const visited = new Set<string>();
		const path: Buffer[] = [];

		visited.add(delegateeAddress.toString('hex'));
		path.push(delegateeAddress);

		return this._checkForCycles(this.immutableContext!.senderAddress, visited, path);
	}

	private async _checkForCycles(address: Buffer, visited: Set<string>, path: Buffer[]): Promise<Buffer[]> {
		const addressHex = address.toString('hex');

		if (visited.has(addressHex)) {
			path.push(address);

			const cycleStartIndex = path.findIndex(addr => addr.equals(address));
			if (cycleStartIndex !== -1) {
				return path.slice(cycleStartIndex);
			}
			return [];
		}

		visited.add(addressHex);
		path.push(address);

		const delegatedVote = await this.instanceStore.getOrDefault(this.immutableContext!.context, address);

		if (delegatedVote.incomingDelegation.length === 0) {
			path.pop();
			visited.delete(addressHex);
			return [];
		}

		for (const incomingDelegation of delegatedVote.incomingDelegation) {
			const circularRoute = await this._checkForCycles(incomingDelegation, visited, path);
			if (circularRoute.length > 0) {
				return circularRoute;
			}
		}

		path.pop();
		visited.delete(addressHex);

		return [];
	}

	private async _removeSenderVoteAndDelegatedVoteFromProposal() {
		this._checkMutableDependencies();
		if (!this.internalMethod) throw new Error(`delegatedVote instance is created without internalMethod dependencies`);

		const voteScore = await this.voteScoreStore.getVoteScore(this.mutableContext!.context, this.mutableContext!.senderAddress);
		await this.internalMethod.updateProposalVoteSummaryByVoter(this.mutableContext!.context, this.mutableContext!.senderAddress, BigInt(0), voteScore);

		const incomingDelegationVoteScore = await this._getIncomingDelegationVoteScore(this.mutableContext!.senderAddress);
		await this.internalMethod.updateProposalVoteSummaryByVoter(this.mutableContext!.context, this.mutableContext!.senderAddress, BigInt(0), incomingDelegationVoteScore);

		await this.castedVoteStore.removeAllCastedVote(this.mutableContext!.context, this.mutableContext!.senderAddress);
	}

	private async _addDelegatedSenderVoteToProposal() {
		this._checkMutableDependencies();
		if (!this.internalMethod) throw new Error(`delegatedVote instance is created without internalMethod dependencies`);

		const voteScore = await this.voteScoreStore.getVoteScore(this.mutableContext!.context, this.mutableContext!.senderAddress);
		await this.internalMethod.updateProposalVoteSummaryByVoter(this.mutableContext!.context, this.mutableContext!.senderAddress, voteScore, BigInt(0));

		const incomingDelegationVoteScore = await this._getIncomingDelegationVoteScore(this.mutableContext!.senderAddress);
		await this.internalMethod.updateProposalVoteSummaryByVoter(this.mutableContext!.context, this.mutableContext!.senderAddress, incomingDelegationVoteScore, BigInt(0));
	}

	public outgoingDelegation: DelegatedVoteStoreData['outgoingDelegation'] = Buffer.alloc(0);
	public incomingDelegation: DelegatedVoteStoreData['incomingDelegation'] = [];

	private readonly castedVoteStore: CastedVoteStore;
	private readonly boostedAccountStore: BoostedAccountStore;
	private readonly voteScoreStore: VoteScoreStore;
}
