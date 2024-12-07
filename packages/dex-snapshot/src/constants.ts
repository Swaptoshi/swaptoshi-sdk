import { Modules } from 'klayr-framework';
import {
	MODULE_NAME_DEX,
	STORE_INDEX_OBSERVATION,
	STORE_INDEX_POOL,
	STORE_INDEX_POSITION_INFO,
	STORE_INDEX_POSITION_MANAGER,
	STORE_INDEX_SUPPORTED_TOKEN,
	STORE_INDEX_TICK_BITMAP,
	STORE_INDEX_TICK_INFO,
	STORE_INDEX_TOKEN_SYMBOL,
} from '@swaptoshi/dex-module';

export const DB_PREFIX_DEX_POOL_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_POOL)]);
export const DB_PREFIX_DEX_POSITION_MANAGER_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_POSITION_MANAGER)]);
export const DB_PREFIX_DEX_OBSERVATION_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_OBSERVATION)]);
export const DB_PREFIX_DEX_POSITION_INFO_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_POSITION_INFO)]);
export const DB_PREFIX_DEX_TICK_BITMAP_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_TICK_BITMAP)]);
export const DB_PREFIX_DEX_TICK_INFO_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_TICK_INFO)]);
export const DB_PREFIX_DEX_TOKEN_SYMBOL_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_TOKEN_SYMBOL)]);
export const DB_PREFIX_DEX_SUPPORTED_TOKEN_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_DEX), Modules.computeSubstorePrefix(STORE_INDEX_SUPPORTED_TOKEN)]);
