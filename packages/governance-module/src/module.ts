/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/member-ordering */

import { Modules, StateMachine } from 'klayr-framework';
import { codec } from '@klayr/codec';
import * as utils from '@klayr/utils';
import * as validator from '@klayr/validator';
import { BoostVoteCommand } from './commands/boost_vote_command';
import { CreateProposalCommand } from './commands/create_proposal_command';
import { DelegateVoteCommand } from './commands/delegate_vote_command';
import { RevokeDelegatedVoteCommand } from './commands/revoke_delegated_vote_command';
import { SetProposalAttributesCommand } from './commands/set_proposal_attributes_command';
import { VoteCommand } from './commands/vote_command';
import { GovernanceGovernableConfig } from './config';
import {
	defaultConfig,
	MODULE_NAME_GOVERNANCE,
	STORE_INDEX_BOOSTED_ACCOUNT,
	STORE_INDEX_CASTED_VOTE,
	STORE_INDEX_CONFIG_REGISTRY,
	STORE_INDEX_DELEGTAED_VOTE,
	STORE_INDEX_MODULE_CONFIG,
	STORE_INDEX_NEXT_AVAILABLE_PROPOSAL_ID,
	STORE_INDEX_PROPOSAL,
	STORE_INDEX_PROPOSAL_QUEUE,
	STORE_INDEX_PROPOSAL_VOTER,
	STORE_INDEX_VOTE_SCORE,
} from './constants';
import { GovernanceEndpoint } from './endpoint';
import { ConfigUpdatedEvent } from './events/config_updated';
import { DelegatedVoteRevokedEvent } from './events/delegated_vote_revoked';
import { ProposalCreatedEvent } from './events/proposal_created';
import { ProposalOutcomeEvent } from './events/proposal_outcome';
import { ProposalQuorumCheckedEvent } from './events/proposal_quorum_checked';
import { ProposalSetAttributesEvent } from './events/proposal_set_attributes';
import { ProposalVotedEvent } from './events/proposal_voted';
import { TreasuryBlockRewardTaxEvent } from './events/treasury_block_reward_tax';
import { TreasuryMintEvent } from './events/treasury_mint';
import { VoteBoostedEvent } from './events/vote_boosted';
import { VoteDelegatedEvent } from './events/vote_delegated';
import { executeBaseFee, verifyBaseFee, verifyMinimumFee } from './hooks';
import { GovernanceInternalMethod } from './internal_method';
import { GovernanceMethod } from './method';
import { GovernableConfigRegistry } from './registry';
import { BoostedAccountStore } from './stores/boosted_account';
import { DelegatedVoteStore } from './stores/delegated_vote';
import { NextAvailableProposalIdStore } from './stores/next_available_proposal_id';
import { ProposalStore } from './stores/proposal';
import { ProposalQueueStore } from './stores/queue';
import { FeeMethod, GovernanceGenesisStore, GovernanceModuleConfig, GovernanceModuleDependencies } from './types';
import { immutableTransactionHookGovernanceContext } from './stores/context';
import { ProposalExecutedEvent } from './events/proposal_executed';
import { VoteChangedEvent } from './events/vote_changed';
import { CastedVoteStore } from './stores/casted_vote';
import { VoteScoreStore } from './stores/vote_score';
import { ProposalActiveEvent } from './events/proposal_active';
import {
	getRegisteredGovernableConfigEndpointRequestSchema,
	getRegisteredGovernableConfigEndpointResponseSchema,
	getCastedVoteEndpointRequestSchema,
	getCastedVoteEndpointResponseSchema,
	getConfigEndpointRequestSchema,
	getConfigEndpointResponseSchema,
	getBaseVoteScoreEndpointRequestSchema,
	getBaseVoteScoreEndpointResponseSchema,
	getProposalEndpointRequestSchema,
	getProposalEndpointResponseSchema,
	getProposalQueueEndpointRequestSchema,
	getProposalQueueEndpointResponseSchema,
	getBoostedAccountEndpointRequestSchema,
	getBoostedAccountEndpointResponseSchema,
	getDelegatedVoteEndpointRequestSchema,
	getDelegatedVoteEndpointResponseSchema,
	getNextAvailableProposalIdEndpointResponseSchema,
	getNextAvailableProposalIdEndpointRequestSchema,
	governanceGenesisStoreSchema,
} from './schema';
import { ProposalVoterStore } from './stores/proposal_voter';
import { bytes } from '@swaptoshi/utils';
import { ConfigRegisteredEvent } from './events/config_registered';
import { ConfigRegistryStore } from './stores/config_registry';

export class GovernanceModule extends Modules.BaseModule {
	public _config = new GovernanceGovernableConfig(this.name, STORE_INDEX_MODULE_CONFIG);
	public _feeMethod: FeeMethod | undefined;

	public endpoint = new GovernanceEndpoint(this.stores, this.offchainStores);
	public method = new GovernanceMethod(this.stores, this.events);
	public commands = [
		new CreateProposalCommand(this.stores, this.events),
		new VoteCommand(this.stores, this.events),
		new SetProposalAttributesCommand(this.stores, this.events),
		new BoostVoteCommand(this.stores, this.events),
		new DelegateVoteCommand(this.stores, this.events),
		new RevokeDelegatedVoteCommand(this.stores, this.events),
	];

	private readonly _governableConfig = new GovernableConfigRegistry();
	private readonly _internalMethod = new GovernanceInternalMethod(this.stores, this.events);

	public constructor() {
		super();
		this.stores.register(GovernanceGovernableConfig, this._config); // index is 0
		this.stores.register(ProposalStore, new ProposalStore(this.name, STORE_INDEX_PROPOSAL, this.stores, this.events));
		this.stores.register(ProposalQueueStore, new ProposalQueueStore(this.name, STORE_INDEX_PROPOSAL_QUEUE, this.stores, this.events));
		this.stores.register(BoostedAccountStore, new BoostedAccountStore(this.name, STORE_INDEX_BOOSTED_ACCOUNT, this.stores, this.events));
		this.stores.register(DelegatedVoteStore, new DelegatedVoteStore(this.name, STORE_INDEX_DELEGTAED_VOTE, this.stores, this.events));
		this.stores.register(NextAvailableProposalIdStore, new NextAvailableProposalIdStore(this.name, STORE_INDEX_NEXT_AVAILABLE_PROPOSAL_ID));
		this.stores.register(CastedVoteStore, new CastedVoteStore(this.name, STORE_INDEX_CASTED_VOTE));
		this.stores.register(VoteScoreStore, new VoteScoreStore(this.name, STORE_INDEX_VOTE_SCORE));
		this.stores.register(ProposalVoterStore, new ProposalVoterStore(this.name, STORE_INDEX_PROPOSAL_VOTER));
		this.stores.register(ConfigRegistryStore, new ConfigRegistryStore(this.name, STORE_INDEX_CONFIG_REGISTRY));

		this.events.register(ConfigUpdatedEvent, new ConfigUpdatedEvent(this.name));
		this.events.register(DelegatedVoteRevokedEvent, new DelegatedVoteRevokedEvent(this.name));
		this.events.register(ProposalActiveEvent, new ProposalActiveEvent(this.name));
		this.events.register(ProposalCreatedEvent, new ProposalCreatedEvent(this.name));
		this.events.register(ProposalOutcomeEvent, new ProposalOutcomeEvent(this.name));
		this.events.register(ProposalExecutedEvent, new ProposalExecutedEvent(this.name));
		this.events.register(ProposalQuorumCheckedEvent, new ProposalQuorumCheckedEvent(this.name));
		this.events.register(ProposalSetAttributesEvent, new ProposalSetAttributesEvent(this.name));
		this.events.register(ProposalVotedEvent, new ProposalVotedEvent(this.name));
		this.events.register(VoteChangedEvent, new VoteChangedEvent(this.name));
		this.events.register(TreasuryBlockRewardTaxEvent, new TreasuryBlockRewardTaxEvent(this.name));
		this.events.register(TreasuryMintEvent, new TreasuryMintEvent(this.name));
		this.events.register(VoteBoostedEvent, new VoteBoostedEvent(this.name));
		this.events.register(VoteDelegatedEvent, new VoteDelegatedEvent(this.name));
		this.events.register(ConfigRegisteredEvent, new ConfigRegisteredEvent(this.name));

		this.method.init(this._governableConfig);
		this.endpoint.init(this._governableConfig);
	}

	get name(): string {
		return MODULE_NAME_GOVERNANCE;
	}

	public metadata(): Modules.ModuleMetadata {
		return {
			...this.baseMetadata(),
			endpoints: [
				{
					name: this.endpoint.getConfig.name,
					request: getConfigEndpointRequestSchema,
					response: getConfigEndpointResponseSchema,
				},
				{
					name: this.endpoint.getRegisteredGovernableConfig.name,
					request: getRegisteredGovernableConfigEndpointRequestSchema,
					response: getRegisteredGovernableConfigEndpointResponseSchema,
				},
				{
					name: this.endpoint.getCastedVote.name,
					request: getCastedVoteEndpointRequestSchema,
					response: getCastedVoteEndpointResponseSchema,
				},
				{
					name: this.endpoint.getBaseVoteScore.name,
					request: getBaseVoteScoreEndpointRequestSchema,
					response: getBaseVoteScoreEndpointResponseSchema,
				},
				{
					name: this.endpoint.getProposal.name,
					request: getProposalEndpointRequestSchema,
					response: getProposalEndpointResponseSchema,
				},
				{
					name: this.endpoint.getProposalQueue.name,
					request: getProposalQueueEndpointRequestSchema,
					response: getProposalQueueEndpointResponseSchema,
				},
				{
					name: this.endpoint.getBoostedAccount.name,
					request: getBoostedAccountEndpointRequestSchema,
					response: getBoostedAccountEndpointResponseSchema,
				},
				{
					name: this.endpoint.getDelegatedVote.name,
					request: getDelegatedVoteEndpointRequestSchema,
					response: getDelegatedVoteEndpointResponseSchema,
				},
				{
					name: this.endpoint.getNextAvailableProposalId.name,
					request: getNextAvailableProposalIdEndpointRequestSchema,
					response: getNextAvailableProposalIdEndpointResponseSchema,
				},
			],
			assets: [
				{
					version: 0,
					data: governanceGenesisStoreSchema,
				},
			],
		};
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async init(args: Modules.ModuleInitArgs): Promise<void> {
		const config = utils.objects.mergeDeep({}, defaultConfig, args.moduleConfig) as GovernanceModuleConfig;

		if (config.governGovernanceConfig) {
			this.method.registerGovernableConfig(args, this.name, this._config);
		} else {
			this._config.init(args);
		}

		const proposalStore = this.stores.get(ProposalStore);
		const proposalQueueStore = this.stores.get(ProposalQueueStore);
		const delegatedVoteStore = this.stores.get(DelegatedVoteStore);
		const boostedAccountStore = this.stores.get(BoostedAccountStore);

		proposalStore.init(args.genesisConfig, this._config);
		proposalQueueStore.init(args.genesisConfig, this._config);
		delegatedVoteStore.init(args.genesisConfig, this._config);
		boostedAccountStore.init(args.genesisConfig, this._config);
	}

	public addDependencies(dependencies: GovernanceModuleDependencies) {
		const proposalStore = this.stores.get(ProposalStore);
		const proposalQueueStore = this.stores.get(ProposalQueueStore);
		const delegatedVoteStore = this.stores.get(DelegatedVoteStore);
		const boostedAccountStore = this.stores.get(BoostedAccountStore);

		proposalQueueStore.addDependencies({ ...dependencies, governableConfigRegistry: this._governableConfig });
		proposalStore.addDependencies({ ...dependencies, governableConfigRegistry: this._governableConfig, internalMethod: this._internalMethod });
		delegatedVoteStore.addDependencies({ ...dependencies, internalMethod: this._internalMethod });
		boostedAccountStore.addDependencies({ ...dependencies, internalMethod: this._internalMethod });

		this._feeMethod = dependencies.feeMethod;

		this._internalMethod.addDependencies(dependencies.tokenMethod);
		this._config.addDependencies(this._internalMethod);
	}

	public async verifyTransaction(_context: StateMachine.TransactionVerifyContext): Promise<StateMachine.VerificationResult> {
		try {
			const ctx = immutableTransactionHookGovernanceContext(_context);
			const boostedAccount = await this.stores.get(BoostedAccountStore).getImmutableBoostedAccount(ctx);
			await boostedAccount.isValidUnstake();

			await verifyMinimumFee.bind(this)(_context);
			await verifyBaseFee.bind(this)(_context);
		} catch (error: unknown) {
			return {
				status: StateMachine.VerifyStatus.FAIL,
				error: new Error((error as { message: string }).message),
			};
		}
		return { status: StateMachine.VerifyStatus.OK };
	}

	public async beforeCommandExecute(_context: StateMachine.TransactionExecuteContext): Promise<void> {
		const ctx = immutableTransactionHookGovernanceContext(_context);
		const boostedAccount = await this.stores.get(BoostedAccountStore).getImmutableBoostedAccount(ctx);
		await boostedAccount.isValidUnstake();

		await verifyMinimumFee.bind(this)(_context);
		await verifyBaseFee.bind(this)(_context);
		await executeBaseFee.bind(this)(_context);
	}

	public async afterCommandExecute(context: StateMachine.TransactionExecuteContext): Promise<void> {
		await this._internalMethod.updateVoteScoreAfterStake(context);
	}

	public async afterTransactionsExecute(context: StateMachine.BlockAfterExecuteContext): Promise<void> {
		await this._internalMethod.addTreasuryReward(context);
		await this._internalMethod.executeQueuedProposal(context);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async beforeTransactionsExecute(context: StateMachine.BlockExecuteContext): Promise<void> {
		this._internalMethod.setModulePriorityStatus(context);
	}

	public async initGenesisState(context: StateMachine.GenesisBlockExecuteContext): Promise<void> {
		const assetBytes = context.assets.getAsset(this.name);
		// if there is no asset, only initialize configSubstore data from config file
		if (!assetBytes) {
			await this._initGovernableConfig(context);
			return;
		}

		const genesisStore = codec.decode<GovernanceGenesisStore>(governanceGenesisStoreSchema, assetBytes);
		validator.validator.validate(governanceGenesisStoreSchema, genesisStore);

		const boostedAccountStore = this.stores.get(BoostedAccountStore);

		// create copied object to verify sorting
		const copiedBoostedAccountSubstore = [...genesisStore.boostedAccountSubstore];
		copiedBoostedAccountSubstore.sort((a, b) => a.address.compare(b.address));

		for (let i = 0; i < genesisStore.boostedAccountSubstore.length; i += 1) {
			const boostedAccountData = genesisStore.boostedAccountSubstore[i];

			// Validate sorting of boostedAccountSubstore
			if (!boostedAccountData.address.equals(copiedBoostedAccountSubstore[i].address)) {
				throw new Error('boostedAccountSubstore must be sorted by address.');
			}

			// set state
			await boostedAccountStore.set(context, boostedAccountData.address, boostedAccountData);
		}

		const castedVoteStore = this.stores.get(CastedVoteStore);

		// create copied object to verify sorting
		const copiedCastedVoteSubstore = [...genesisStore.castedVoteSubstore];
		copiedCastedVoteSubstore.sort((a, b) => a.address.compare(b.address));

		for (let i = 0; i < genesisStore.castedVoteSubstore.length; i += 1) {
			const castedVoteData = genesisStore.castedVoteSubstore[i];

			// Validate sorting of castedVoteSubstore
			if (!castedVoteData.address.equals(copiedCastedVoteSubstore[i].address)) {
				throw new Error('castedVoteSubstore must be sorted by address.');
			}

			// set state
			await castedVoteStore.set(context, castedVoteData.address, castedVoteData);
		}

		const delegatedVoteStore = this.stores.get(DelegatedVoteStore);

		// create copied object to verify sorting
		const copiedDelegatedVoteSubstore = [...genesisStore.delegatedVoteSubstore];
		copiedDelegatedVoteSubstore.sort((a, b) => a.address.compare(b.address));

		for (let i = 0; i < genesisStore.delegatedVoteSubstore.length; i += 1) {
			const delegatedVoteData = genesisStore.delegatedVoteSubstore[i];

			// Validate sorting of delegatedVoteSubstore
			if (!delegatedVoteData.address.equals(copiedDelegatedVoteSubstore[i].address)) {
				throw new Error('delegatedVoteSubstore must be sorted by address.');
			}

			// set state
			await delegatedVoteStore.set(context, delegatedVoteData.address, delegatedVoteData);
		}

		const nextAvailableProposalIdStore = this.stores.get(NextAvailableProposalIdStore);

		if (!genesisStore.nextAvailableProposalIdSubstore) throw new Error('nextAvailableProposalIdSubstore not present in governance genesis assets');

		await nextAvailableProposalIdStore.set(context, Buffer.alloc(0), genesisStore.nextAvailableProposalIdSubstore);

		const proposalVoterStore = this.stores.get(ProposalVoterStore);

		// create copied object to verify sorting
		const copiedProposalVoterSubstore = [...genesisStore.proposalVoterSubstore];
		copiedProposalVoterSubstore.sort((a, b) => a.proposalId - b.proposalId);

		for (let i = 0; i < genesisStore.proposalVoterSubstore.length; i += 1) {
			const proposalVoterData = genesisStore.proposalVoterSubstore[i];

			// Validate sorting of proposalVoterSubstore
			if (proposalVoterData.proposalId !== copiedProposalVoterSubstore[i].proposalId) {
				throw new Error('proposalVoterSubstore must be sorted by proposalId.');
			}

			// set state
			await proposalVoterStore.set(context, bytes.numberToBytes(proposalVoterData.proposalId), proposalVoterData);
		}

		const proposalStore = this.stores.get(ProposalStore);

		// create copied object to verify sorting
		const copiedProposalSubstore = [...genesisStore.proposalSubstore];
		copiedProposalSubstore.sort((a, b) => a.proposalId - b.proposalId);

		for (let i = 0; i < genesisStore.proposalSubstore.length; i += 1) {
			const proposalData = genesisStore.proposalSubstore[i];

			// Validate sorting of proposalSubstore
			if (proposalData.proposalId !== copiedProposalSubstore[i].proposalId) {
				throw new Error('proposalSubstore must be sorted by proposalId.');
			}

			// set state
			await proposalStore.set(context, bytes.numberToBytes(proposalData.proposalId), proposalData);
		}

		const queueStore = this.stores.get(ProposalQueueStore);

		// create copied object to verify sorting
		const copiedQueueSubstore = [...genesisStore.queueSubstore];
		copiedQueueSubstore.sort((a, b) => a.height - b.height);

		for (let i = 0; i < genesisStore.queueSubstore.length; i += 1) {
			const queueData = genesisStore.queueSubstore[i];

			// Validate sorting of queueSubstore
			if (queueData.height !== copiedQueueSubstore[i].height) {
				throw new Error('queueSubstore must be sorted by height.');
			}

			// set state
			await queueStore.set(context, bytes.numberToBytes(queueData.height), queueData);
		}

		const voteScoreStore = this.stores.get(VoteScoreStore);

		// create copied object to verify sorting
		const copiedVoteScoreStore = [...genesisStore.voteScoreSubstore];
		copiedVoteScoreStore.sort((a, b) => a.address.compare(b.address));

		for (let i = 0; i < genesisStore.voteScoreSubstore.length; i += 1) {
			const voteScoreData = genesisStore.voteScoreSubstore[i];

			// Validate sorting of voteScoreSubstore
			if (!voteScoreData.address.equals(copiedVoteScoreStore[i].address)) {
				throw new Error('voteScoreSubstore must be sorted by address.');
			}

			// set state
			await voteScoreStore.set(context, voteScoreData.address, voteScoreData);
		}

		const configRegistryStore = this.stores.get(ConfigRegistryStore);

		if (genesisStore.configRegistrySubstore.registry.length > 0) {
			// create copied object to verify sorting
			const copiedConfigRegistrySubstore = [...genesisStore.configRegistrySubstore.registry];
			copiedConfigRegistrySubstore.sort((a, b) => {
				if (a.module > b.module) return -1;
				if (b.module > a.module) return 1;
				return 0;
			});

			for (let i = 0; i < genesisStore.configRegistrySubstore.registry.length; i += 1) {
				const registry = genesisStore.configRegistrySubstore.registry[i];

				// validate sorting of configRegistrySubstore.registry
				if (registry.module !== copiedConfigRegistrySubstore[i].module) {
					throw new Error('configRegistrySubstore.registry must be sorted by module name');
				}
			}

			// set state
			await configRegistryStore.set(context, Buffer.alloc(0), genesisStore.configRegistrySubstore);
		}

		if (genesisStore.configSubstore.length > 0) {
			const governableConfigList = this._governableConfig.values();

			// create copied object to verify sorting
			const copiedConfigSubstore = [...genesisStore.configSubstore];
			copiedConfigSubstore.sort((a, b) => {
				if (a.module > b.module) return -1;
				if (b.module > a.module) return 1;
				return 0;
			});

			for (let i = 0; i < genesisStore.configSubstore.length; i += 1) {
				// validate sorting of configRegistrySubstore.registry
				if (genesisStore.configSubstore[i].module !== copiedConfigSubstore[i].module) {
					throw new Error('configSubstore must be sorted by module name');
				}

				const governableConfigIndex = governableConfigList.findIndex(t => t.module === genesisStore.configSubstore[i].module);
				if (governableConfigIndex === -1) {
					throw new Error(`configSubstore item with module ${genesisStore.configSubstore[i].module} doesnt exists on governableConfigRegistry`);
				}

				// set state
				await governableConfigList[governableConfigIndex].set(context, Buffer.alloc(0), { data: genesisStore.configSubstore[i].data });
			}
		} else {
			await this._initGovernableConfig(context);
		}
	}

	private async _initGovernableConfig(context: StateMachine.GenesisBlockExecuteContext) {
		const configRegistryStore = this.stores.get(ConfigRegistryStore);
		const configRegisteredEvent = this.events.get(ConfigRegisteredEvent);
		const governableConfigList = this._governableConfig.values();

		for (const governableConfig of governableConfigList) {
			await governableConfig.initRegisteredConfig(context);
			await configRegistryStore.register(context, governableConfig.module, governableConfig.index);
			configRegisteredEvent.add(context, { module: governableConfig.module, index: governableConfig.index }, [governableConfig.storePrefix]);
		}
	}
}
