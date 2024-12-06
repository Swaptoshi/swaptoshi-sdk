import { Modules, Types } from 'klayr-framework';
import { DexModuleConfig } from './config';
import { DEXPool } from './pool';
import { ImmutableSwapContext, MutableSwapContext } from './context';
type TokenMethod = Modules.Token.TokenMethod;
type NFTMethod = Modules.NFT.NFTMethod;
interface DecreaseLiquidityParams {
	poolAddress: Buffer;
	tokenId: string;
	liquidity: string;
	amount0Min: string;
	amount1Min: string;
	deadline: string;
}
interface MintParams {
	token0: Buffer;
	token1: Buffer;
	fee: string;
	tickLower: string;
	tickUpper: string;
	amount0Desired: string;
	amount1Desired: string;
	amount0Min: string;
	amount1Min: string;
	recipient: Buffer;
	deadline: string;
}
interface IncreaseLiquidityParams {
	poolAddress: Buffer;
	tokenId: string;
	amount0Desired: string;
	amount1Desired: string;
	amount0Min: string;
	amount1Min: string;
	deadline: string;
}
interface PositionManager {
	poolAddress: Buffer;
	name: string;
	symbol: string;
}
interface CollectParams {
	poolAddress: Buffer;
	tokenId: string;
	recipient: Buffer;
	amount0Max: string;
	amount1Max: string;
}
interface NFTMetadata {
	name: string;
	description: string;
	image: string;
}
interface PositionInfo {
	liquidity: string;
	feeGrowthInside0LastX128: string;
	feeGrowthInside1LastX128: string;
	tokensOwed0: string;
	tokensOwed1: string;
}
interface DexNFTAttribute extends PositionInfo {
	token0: Buffer;
	token1: Buffer;
	fee: string;
	tickLower: string;
	tickUpper: string;
}
export declare class NonfungiblePositionManager {
	constructor(positionManager: PositionManager, stores: Modules.NamedRegistry, events: Modules.NamedRegistry, genesisConfig: Types.GenesisConfig, dexConfig: DexModuleConfig, moduleName: string);
	toJSON(): PositionManager;
	addMutableDependencies(context: MutableSwapContext, tokenMethod: TokenMethod, nftMethod: NFTMethod): void;
	addImmutableDependencies(context: ImmutableSwapContext, tokenMethod: TokenMethod, nftMethod: NFTMethod): void;
	setSender(senderAddress: Buffer): void;
	createAndInitializePoolIfNecessary(
		token0: Buffer,
		token0Symbol: string,
		token0Decimal: number,
		token1: Buffer,
		token1Symbol: string,
		token1Decimal: number,
		fee: string,
		sqrtPriceX96: string,
	): Promise<DEXPool>;
	getPositions(tokenId: string): Promise<DexNFTAttribute>;
	mint(params: MintParams): Promise<[tokenId: string, liquidity: string, amount0: string, amount1: string]>;
	increaseLiquidity(params: IncreaseLiquidityParams): Promise<[liquidity: string, amount0: string, amount1: string]>;
	decreaseLiquidity(params: DecreaseLiquidityParams): Promise<[amount0: string, amount1: string]>;
	collect(params: CollectParams): Promise<[amount0: string, amount1: string]>;
	burn(tokenId: string): Promise<void>;
	tokenURI(tokenId: string): Promise<string>;
	getMetadata(tokenId: string): Promise<NFTMetadata>;
	total(tokenId: string, sqrtRatioX96: string): Promise<[amount0: string, amount1: string]>;
	principal(tokenId: string, sqrtRatioX96: string): Promise<[amount0: string, amount1: string]>;
	fees(tokenId: string): Promise<[amount0: string, amount1: string]>;
	private _fees;
	private _getFeeGrowthInside;
	private _metadataToIPFS;
	private _saveTokenURI;
	private _savePosition;
	private _checkImmutableDependency;
	private _checkMutableDependency;
	private _pay;
	private _mintCallback;
	private _checkDeadline;
	private _addLiquidity;
	private _isAuthorizedForToken;
	collectionId: Buffer;
	poolAddress: Buffer;
	name: string;
	symbol: string;
	address: Buffer;
	private readonly moduleName;
	private readonly chainId;
	private readonly events;
	private readonly poolStore;
	private readonly tokenSymbolStore;
	private readonly positionInfoStore;
	private readonly dexConfig;
	private mutableContext;
	private immutableContext;
	private tokenMethod;
	private nftMethod;
	private mutableDependencyReady;
	private immutableDependencyReady;
}
