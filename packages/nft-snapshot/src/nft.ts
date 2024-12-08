import { StateDB } from '@liskhq/lisk-db';
import { StateStore } from '@klayr/chain';
import { DB_PREFIX_NFT_STORE, DB_PREFIX_SUPPORTED_NFT_STORE, MODULE_NAME_NFT } from './constants';
import { nftGenesisStoreSchema, nftStoreSchema, supportedNFTsStoreSchema } from './schema';
import { GenesisAssetEntry, NFTGenesisStoreEntry, NFTStoreData, NFTSubstoreEntry, SupportedNFTsStoreData, SupportedNFTSubstoreEntry } from './types';

const getNFTSubstore = async (db: StateDB): Promise<NFTSubstoreEntry[]> => {
	const nftStore = new StateStore(db, DB_PREFIX_NFT_STORE);
	const nfts = (await nftStore.iterateWithSchema(
		{
			gte: Buffer.alloc(16, 0),
			lte: Buffer.alloc(16, 255),
		},
		nftStoreSchema,
	)) as { key: Buffer; value: NFTStoreData }[];

	return nfts
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			nftID: item.key.toString('hex'),
			owner: item.value.owner.toString('hex'),
			attributesArray: item.value.attributesArray.map(t => ({
				module: t.module,
				attributes: t.attributes.toString('hex'),
			})),
		}));
};

const getSupportedNFTsSubstore = async (db: StateDB): Promise<SupportedNFTSubstoreEntry[]> => {
	const supportedNFTStore = new StateStore(db, DB_PREFIX_SUPPORTED_NFT_STORE);
	const supportedNFTs = (await supportedNFTStore.iterateWithSchema(
		{
			gte: Buffer.alloc(4, 0),
			lte: Buffer.alloc(4, 255),
		},
		supportedNFTsStoreSchema,
	)) as { key: Buffer; value: SupportedNFTsStoreData }[];

	return supportedNFTs
		.sort((a, b) => a.key.compare(b.key))
		.map(item => ({
			chainID: item.key.toString('hex'),
			supportedCollectionIDArray: item.value.supportedCollectionIDArray.map(t => ({
				collectionID: t.collectionID.toString('hex'),
			})),
		}));
};

const getNFTModuleEntry = (nftSubstore: NFTSubstoreEntry[], supportedNFTsSubstore: SupportedNFTSubstoreEntry[]): GenesisAssetEntry => {
	const genesisObj: NFTGenesisStoreEntry = {
		nftSubstore,
		supportedNFTsSubstore,
	};
	return {
		module: MODULE_NAME_NFT,
		data: genesisObj as unknown as Record<string, unknown>,
		schema: nftGenesisStoreSchema,
	};
};

export const createNFTModuleAsset = async (db: StateDB) => {
	const nftSubstore = await getNFTSubstore(db);
	const supportedNFTsSubstore = await getSupportedNFTsSubstore(db);
	const nftModuleSubstore = await getNFTModuleEntry(nftSubstore, supportedNFTsSubstore);
	return nftModuleSubstore;
};

export const createNFTModuleAssetFromPath = async (path: string) => {
	const db = new StateDB(path);
	return createNFTModuleAsset(db);
};
