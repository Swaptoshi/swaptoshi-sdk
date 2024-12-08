import { MODULE_NAME_TOKEN_FACTORY, STORE_INDEX_AIRDROP, STORE_INDEX_FACTORY, STORE_INDEX_ICO, STORE_INDEX_NEXT_AVAILABLE_TOKEN_ID, STORE_INDEX_VESTING_UNLOCK } from '@swaptoshi/token-factory-module';
import { Modules } from 'klayr-framework';

export const DB_PREFIX_TOKEN_FACTORY_AIRDROP_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_TOKEN_FACTORY), Modules.computeSubstorePrefix(STORE_INDEX_AIRDROP)]);
export const DB_PREFIX_TOKEN_FACTORY_FACTORY_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_TOKEN_FACTORY), Modules.computeSubstorePrefix(STORE_INDEX_FACTORY)]);
export const DB_PREFIX_TOKEN_FACTORY_ICO_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_TOKEN_FACTORY), Modules.computeSubstorePrefix(STORE_INDEX_ICO)]);
export const DB_PREFIX_TOKEN_FACTORY_NEXT_AVAILABLE_TOKEN_ID_STORE = Buffer.concat([
	Modules.computeStorePrefix(MODULE_NAME_TOKEN_FACTORY),
	Modules.computeSubstorePrefix(STORE_INDEX_NEXT_AVAILABLE_TOKEN_ID),
]);
export const DB_PREFIX_TOKEN_FACTORY_VESTING_UNLOCK_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_TOKEN_FACTORY), Modules.computeSubstorePrefix(STORE_INDEX_VESTING_UNLOCK)]);
