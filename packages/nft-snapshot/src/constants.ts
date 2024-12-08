import { Modules } from 'klayr-framework';

export const MODULE_NAME_NFT = 'nft';

export const DB_PREFIX_NFT_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_NFT), Modules.computeSubstorePrefix(0)]);

export const DB_PREFIX_SUPPORTED_NFT_STORE = Buffer.concat([Modules.computeStorePrefix(MODULE_NAME_NFT), Modules.computeSubstorePrefix(3)]);
