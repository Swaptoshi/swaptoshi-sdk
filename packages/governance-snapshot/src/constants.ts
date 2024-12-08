import { Modules } from 'klayr-framework';
import {
	MODULE_NAME_GOVERNANCE,
	STORE_INDEX_BOOSTED_ACCOUNT,
	STORE_INDEX_CASTED_VOTE,
	STORE_INDEX_CONFIG_REGISTRY,
	STORE_INDEX_DELEGTAED_VOTE,
	STORE_INDEX_NEXT_AVAILABLE_PROPOSAL_ID,
	STORE_INDEX_PROPOSAL,
	STORE_INDEX_PROPOSAL_QUEUE,
	STORE_INDEX_PROPOSAL_VOTER,
	STORE_INDEX_VOTE_SCORE,
} from '@swaptoshi/governance-module';

export const DB_PREFIX_GOVERNANCE_PROPOSAL_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_PROPOSAL)]);
export const DB_PREFIX_GOVERNANCE_QUEUE_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_PROPOSAL_QUEUE)]);
export const DB_PREFIX_GOVERNANCE_BOOSTED_ACCOUNT_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_BOOSTED_ACCOUNT)]);
export const DB_PREFIX_GOVERNANCE_DELEGATED_VOTE_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_DELEGTAED_VOTE)]);
export const DB_PREFIX_GOVERNANCE_NEXT_AVAILABLE_PROPOSAL_ID_STORE = Buffer.concat([
	Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE),
	Modules.computeSubstorePrefix(STORE_INDEX_NEXT_AVAILABLE_PROPOSAL_ID),
]);
export const DB_PREFIX_GOVERNANCE_CASTED_VOTE_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_CASTED_VOTE)]);
export const DB_PREFIX_GOVERNANCE_VOTE_SCORE_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_VOTE_SCORE)]);
export const DB_PREFIX_GOVERNANCE_PROPOSAL_VOTER_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_PROPOSAL_VOTER)]);
export const DB_PREFIX_GOVERNANCE_CONFIG_REGISTRY = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_GOVERNANCE), Modules.computeSubstorePrefix(STORE_INDEX_CONFIG_REGISTRY)]);
