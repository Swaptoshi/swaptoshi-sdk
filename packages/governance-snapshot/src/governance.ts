import { StateDB } from '@liskhq/lisk-db';
import { address } from '@klayr/cryptography';
import {
	BoostedAccountGenesisSubstoreEntry,
	BoostedAccountStoreData,
	CastedVoteGenesisSubstoreEntry,
	CastedVoteStoreData,
	ConfigRegistryStoreData,
	DelegatedVoteGenesisSubstoreEntry,
	DelegatedVoteStoreData,
	GenesisAssetEntry,
	GovernableConfigStoreData,
	GovernableConfigSubstoreEntry,
	GovernanceGenesisStoreEntry,
	NextAvailableProposalIdStoreData,
	ProposalGenesisSubstoreEntry,
	ProposalQueueGenesisSubstoreEntry,
	ProposalQueueStoreData,
	ProposalStoreData,
	ProposalVoterGenesisSubstoreEntry,
	ProposalVoterStoreData,
	VoteScoreGenesisSubstoreEntry,
	VoteScoreStoreData,
	AdditionalConfigRegistry,
} from './types';
import {
	boostedAccountStoreSchema,
	castedVoteStoreSchema,
	configRegistryStoreSchema,
	delegatedVoteStoreSchema,
	governableConfigSchema,
	governanceGenesisStoreSchema,
	nextAvailableProposalIdStoreSchema,
	proposalQueueStoreSchema,
	proposalStoreSchema,
	proposalVoterStoreSchema,
	voteScoreStoreSchema,
	MODULE_NAME_GOVERNANCE,
} from '@swaptoshi/governance-module';
import {
	DB_PREFIX_GOVERNANCE_BOOSTED_ACCOUNT_STORE,
	DB_PREFIX_GOVERNANCE_CASTED_VOTE_STORE,
	DB_PREFIX_GOVERNANCE_CONFIG_REGISTRY,
	DB_PREFIX_GOVERNANCE_DELEGATED_VOTE_STORE,
	DB_PREFIX_GOVERNANCE_NEXT_AVAILABLE_PROPOSAL_ID_STORE,
	DB_PREFIX_GOVERNANCE_PROPOSAL_STORE,
	DB_PREFIX_GOVERNANCE_PROPOSAL_VOTER_STORE,
	DB_PREFIX_GOVERNANCE_QUEUE_STORE,
	DB_PREFIX_GOVERNANCE_VOTE_SCORE_STORE,
} from './constants';
import { getGovernableConfigPrefix } from './utils';
import { StateStore } from '@klayr/chain';

const getGovernableConfigSubstoreItem = async (db: StateDB, moduleName: string, storeIndex: number): Promise<GovernableConfigSubstoreEntry | undefined> => {
	const configSubstore = new StateStore(db, getGovernableConfigPrefix(moduleName, storeIndex));
	try {
		const config = await configSubstore.getWithSchema<GovernableConfigStoreData>(Buffer.alloc(0), governableConfigSchema);

		return {
			module: moduleName,
			data: config.data.toString('hex'),
		};
	} catch {
		return undefined;
	}
};

const getConfigSubstore = async (db: StateDB, registries: ConfigRegistryStoreData['registry']): Promise<GovernableConfigSubstoreEntry[]> => {
	const configSubstore: GovernableConfigSubstoreEntry[] = [];
	for (const registry of registries) {
		const item = await getGovernableConfigSubstoreItem(db, registry.module, registry.index);
		if (!item) {
			throw new Error(`undefined on-chain module config: ${registry.module} at index ${registry.index}`);
		}
		configSubstore.push(item);
	}
	configSubstore.sort((a, b) => {
		if (a.module > b.module) return -1;
		if (b.module > a.module) return 1;
		return 0;
	});
	return configSubstore;
};

const getBoostedAccountSubstore = async (db: StateDB): Promise<BoostedAccountGenesisSubstoreEntry[]> => {
	const boostedAccountStore = new StateStore(db, DB_PREFIX_GOVERNANCE_BOOSTED_ACCOUNT_STORE);
	const boostedAccounts = (await boostedAccountStore.iterateWithSchema(
		{
			gte: Buffer.alloc(20, 0),
			lte: Buffer.alloc(20, 255),
		},
		boostedAccountStoreSchema,
	)) as { key: Buffer; value: BoostedAccountStoreData }[];

	return boostedAccounts
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			...item.value,
			address: address.getKlayr32AddressFromAddress(item.key),
		}));
};

const getCastedVoteSubstore = async (db: StateDB): Promise<CastedVoteGenesisSubstoreEntry[]> => {
	const castedVoteStore = new StateStore(db, DB_PREFIX_GOVERNANCE_CASTED_VOTE_STORE);
	const castedVotes = (await castedVoteStore.iterateWithSchema(
		{
			gte: Buffer.alloc(20, 0),
			lte: Buffer.alloc(20, 255),
		},
		castedVoteStoreSchema,
	)) as { key: Buffer; value: CastedVoteStoreData }[];

	return castedVotes
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			...item.value,
			address: address.getKlayr32AddressFromAddress(item.key),
		}));
};

const getDelegatedVoteSubstore = async (db: StateDB): Promise<DelegatedVoteGenesisSubstoreEntry[]> => {
	const delegatedVoteStore = new StateStore(db, DB_PREFIX_GOVERNANCE_DELEGATED_VOTE_STORE);
	const delegatedVotes = (await delegatedVoteStore.iterateWithSchema(
		{
			gte: Buffer.alloc(20, 0),
			lte: Buffer.alloc(20, 255),
		},
		delegatedVoteStoreSchema,
	)) as { key: Buffer; value: DelegatedVoteStoreData }[];

	return delegatedVotes
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			outgoingDelegation: address.getKlayr32AddressFromAddress(item.value.outgoingDelegation),
			incomingDelegation: item.value.incomingDelegation.map(t => address.getKlayr32AddressFromAddress(t)),
			address: address.getKlayr32AddressFromAddress(item.key),
		}));
};

const getNextAvailableProposalIdSubstore = async (db: StateDB): Promise<NextAvailableProposalIdStoreData> => {
	const nextAvailableProposalIdStore = new StateStore(db, DB_PREFIX_GOVERNANCE_NEXT_AVAILABLE_PROPOSAL_ID_STORE);

	let nextAvailableProposalId;
	try {
		nextAvailableProposalId = await nextAvailableProposalIdStore.getWithSchema<NextAvailableProposalIdStoreData>(Buffer.alloc(0), nextAvailableProposalIdStoreSchema);
	} catch {
		return {
			nextProposalId: 0,
		};
	}

	return {
		nextProposalId: nextAvailableProposalId.nextProposalId,
	};
};

const getProposalVoterSubstore = async (db: StateDB): Promise<ProposalVoterGenesisSubstoreEntry[]> => {
	const proposalVoterStore = new StateStore(db, DB_PREFIX_GOVERNANCE_PROPOSAL_VOTER_STORE);
	const proposalVoters = (await proposalVoterStore.iterateWithSchema(
		{
			gte: Buffer.alloc(4, 0),
			lte: Buffer.alloc(4, 255),
		},
		proposalVoterStoreSchema,
	)) as { key: Buffer; value: ProposalVoterStoreData }[];

	return proposalVoters
		.sort((a, b) => a.key.readUIntBE(0, 4) - b.key.readUIntBE(0, 4)) // sort by proposalId
		.map(item => ({
			voters: item.value.voters.map(t => address.getKlayr32AddressFromAddress(t)),
			proposalId: item.key.readUIntBE(0, 4),
		}));
};

const getProposalSubstore = async (db: StateDB): Promise<ProposalGenesisSubstoreEntry[]> => {
	const proposalStore = new StateStore(db, DB_PREFIX_GOVERNANCE_PROPOSAL_STORE);
	const proposals = (await proposalStore.iterateWithSchema(
		{
			gte: Buffer.alloc(4, 0),
			lte: Buffer.alloc(4, 255),
		},
		proposalStoreSchema,
	)) as { key: Buffer; value: ProposalStoreData }[];

	return proposals
		.sort((a, b) => a.key.readUIntBE(0, 4) - b.key.readUIntBE(0, 4)) // sort by proposalId
		.map(item => ({
			...item.value,
			deposited: item.value.deposited.toString(),
			author: address.getKlayr32AddressFromAddress(item.value.author),
			turnout: {
				for: item.value.turnout.for.toString(),
				against: item.value.turnout.against.toString(),
				abstain: item.value.turnout.abstain.toString(),
			},
			voteSummary: {
				for: item.value.voteSummary.for.toString(),
				against: item.value.voteSummary.against.toString(),
				abstain: item.value.voteSummary.abstain.toString(),
			},
			actions: item.value.actions.map(t => ({
				...t,
				payload: t.payload.toString('hex'),
			})),
			attributes: item.value.attributes.map(t => ({
				...t,
				data: t.data.toString('hex'),
			})),
			proposalId: item.key.readUIntBE(0, 4),
		}));
};

const getProposalQueueSubstore = async (db: StateDB): Promise<ProposalQueueGenesisSubstoreEntry[]> => {
	const proposalQueueStore = new StateStore(db, DB_PREFIX_GOVERNANCE_QUEUE_STORE);
	const proposalQueues = (await proposalQueueStore.iterateWithSchema(
		{
			gte: Buffer.alloc(4, 0),
			lte: Buffer.alloc(4, 255),
		},
		proposalQueueStoreSchema,
	)) as { key: Buffer; value: ProposalQueueStoreData }[];

	return proposalQueues
		.sort((a, b) => a.key.readUIntBE(0, 4) - b.key.readUIntBE(0, 4)) // sort by height
		.map(item => ({
			...item.value,
			height: item.key.readUIntBE(0, 4),
		}));
};

const getVoteScoreSubstore = async (db: StateDB): Promise<VoteScoreGenesisSubstoreEntry[]> => {
	const voteScoreStore = new StateStore(db, DB_PREFIX_GOVERNANCE_VOTE_SCORE_STORE);
	const voteScores = (await voteScoreStore.iterateWithSchema(
		{
			gte: Buffer.alloc(20, 0),
			lte: Buffer.alloc(20, 255),
		},
		voteScoreStoreSchema,
	)) as { key: Buffer; value: VoteScoreStoreData }[];

	return voteScores
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			score: item.value.score.toString(),
			address: address.getKlayr32AddressFromAddress(item.key),
		}));
};

const getConfigRegistrySubstore = async (db: StateDB, additionalConfig?: AdditionalConfigRegistry[]): Promise<ConfigRegistryStoreData> => {
	const configRegistryStore = new StateStore(db, DB_PREFIX_GOVERNANCE_CONFIG_REGISTRY);

	let configRegistry;

	try {
		configRegistry = await configRegistryStore.getWithSchema<ConfigRegistryStoreData>(Buffer.alloc(0), configRegistryStoreSchema);
	} catch {
		configRegistry = {
			registry: [],
		};
	}

	if (additionalConfig && additionalConfig.length > 0) {
		for (const registry of additionalConfig) {
			configRegistry.registry.push(registry);
		}
	}

	configRegistry.registry.sort((a, b) => {
		if (a.module > b.module) return -1;
		if (b.module > a.module) return 1;
		return 0;
	});

	return configRegistry;
};

const getGovernanceModuleEntry = (
	boostedAccountSubstore: BoostedAccountGenesisSubstoreEntry[],
	castedVoteSubstore: CastedVoteGenesisSubstoreEntry[],
	delegatedVoteSubstore: DelegatedVoteGenesisSubstoreEntry[],
	nextAvailableProposalIdSubstore: NextAvailableProposalIdStoreData,
	proposalVoterSubstore: ProposalVoterGenesisSubstoreEntry[],
	proposalSubstore: ProposalGenesisSubstoreEntry[],
	queueSubstore: ProposalQueueGenesisSubstoreEntry[],
	voteScoreSubstore: VoteScoreGenesisSubstoreEntry[],
	configRegistrySubstore: ConfigRegistryStoreData,
	configSubstore: GovernableConfigSubstoreEntry[],
): GenesisAssetEntry => {
	const genesisObj: GovernanceGenesisStoreEntry = {
		boostedAccountSubstore,
		castedVoteSubstore,
		delegatedVoteSubstore,
		nextAvailableProposalIdSubstore,
		proposalVoterSubstore,
		proposalSubstore,
		queueSubstore,
		voteScoreSubstore,
		configRegistrySubstore,
		configSubstore,
	};
	return {
		module: MODULE_NAME_GOVERNANCE,
		data: genesisObj as unknown as Record<string, unknown>,
		schema: governanceGenesisStoreSchema,
	};
};

export const createGovernanceModuleAsset = async (db: StateDB, additionalConfig?: AdditionalConfigRegistry[]) => {
	const boostedAccountSubstore = await getBoostedAccountSubstore(db);
	const castedVoteSubstore = await getCastedVoteSubstore(db);
	const delegatedVoteSubstore = await getDelegatedVoteSubstore(db);
	const nextAvailableProposalIdSubstore = await getNextAvailableProposalIdSubstore(db);
	const proposalVoterSubstore = await getProposalVoterSubstore(db);
	const proposalSubstore = await getProposalSubstore(db);
	const queueSubstore = await getProposalQueueSubstore(db);
	const voteScoreSubstore = await getVoteScoreSubstore(db);
	const configRegistrySubstore = await getConfigRegistrySubstore(db, additionalConfig);
	const configSubstore = await getConfigSubstore(db, configRegistrySubstore.registry);
	const governanceModuleAssets = await getGovernanceModuleEntry(
		boostedAccountSubstore,
		castedVoteSubstore,
		delegatedVoteSubstore,
		nextAvailableProposalIdSubstore,
		proposalVoterSubstore,
		proposalSubstore,
		queueSubstore,
		voteScoreSubstore,
		configRegistrySubstore,
		configSubstore,
	);
	return governanceModuleAssets;
};

export const createGovernanceModuleAssetFromPath = async (path: string, additionalConfig?: AdditionalConfigRegistry[]) => {
	const db = new StateDB(path);
	return createGovernanceModuleAsset(db, additionalConfig);
};
