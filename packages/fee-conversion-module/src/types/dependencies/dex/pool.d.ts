import { Modules } from 'klayr-framework';
import { DexModuleConfig } from './config';
import { ImmutableSwapContext, MutableSwapContext } from './context';
type TokenMethod = Modules.Token.TokenMethod;
interface Slot0 {
	sqrtPriceX96: string;
	tick: string;
	observationIndex: string;
	observationCardinality: string;
	observationCardinalityNext: string;
}
interface DEXPoolData {
	token0: Buffer;
	token1: Buffer;
	fee: string;
	tickSpacing: string;
	maxLiquidityPerTick: string;
	feeGrowthGlobal0X128: string;
	feeGrowthGlobal1X128: string;
	liquidity: string;
	slot0: Slot0;
}
interface TickInfo {
	liquidityGross: string;
	liquidityNet: string;
	feeGrowthOutside0X128: string;
	feeGrowthOutside1X128: string;
	tickCumulativeOutside: string;
	secondsPerLiquidityOutsideX128: string;
	secondsOutside: string;
	initialized: boolean;
}
export declare class DEXPool implements DEXPoolData {
	constructor(pool: DEXPoolData, stores: Modules.NamedRegistry, events: Modules.NamedRegistry, config: DexModuleConfig, moduleName: string, simulation?: boolean);
	createEmulator(): DEXPool;
	setSender(senderAddress: Buffer): void;
	setConfig(config: DexModuleConfig): void;
	addImmutableDependencies(context: ImmutableSwapContext, tokenMethod: TokenMethod): void;
	addMutableDependencies(context: MutableSwapContext, tokenMethod: TokenMethod): void;
	snapshotCumulativesInside(tickLower: string, tickUpper: string): Promise<[tickCumulativeInside: string, secondsPerLiquidityInsideX128: string, secondsInside: string]>;
	observe(secondsAgos: string[]): Promise<{
		tickCumulatives: string[];
		secondsPerLiquidityCumulativeX128s: string[];
	}>;
	increaseObservationCardinalityNext(observationCardinalityNext: string): Promise<void>;
	initialize(sqrtPriceX96: string): Promise<void>;
	mint(
		recipient: Buffer,
		tickLower: string,
		tickUpper: string,
		amount: string,
		data: string,
		callback: (amount0: string, amount1: string, data: string, pool?: DEXPoolData) => Promise<void>,
	): Promise<[amount0: string, amount1: string]>;
	collect(recipient: Buffer, tickLower: string, tickUpper: string, amount0Requested: string, amount1Requested: string): Promise<[amount0: string, amount1: string]>;
	burn(tickLower: string, tickUpper: string, amount: string): Promise<[amount0: string, amount1: string]>;
	swap(
		recipient: Buffer,
		zeroForOne: boolean,
		amountSpecified: string,
		sqrtPriceLimitX96: string,
		data: string,
		callback: (amount0: string, amount1: string, data: string, pool?: DEXPoolData) => Promise<void>,
	): Promise<[amount0: string, amount1: string]>;
	flash(recipient: Buffer, amount0: string, amount1: string, data: string, callback: (fee0: string, fee1: string, data: string, pool?: DEXPoolData) => Promise<void>): Promise<void>;
	getTick(tick: string): Promise<TickInfo>;
	getTickBitmap(index: string): Promise<string>;
	toJSON(): DEXPoolData;
	private _getBalance0;
	private _getBalance1;
	private _saveStore;
	private _checkMutableDependencies;
	private _checkImmutableDependencies;
	private _checkFeeProtocol;
	private _checkTicks;
	private _modifyPosition;
	private _updatePosition;
	private _validateFeeProtocol;
	readonly address: Buffer;
	readonly klayr32: string;
	readonly collectionId: Buffer;
	token0: Buffer;
	token1: Buffer;
	fee: string;
	tickSpacing: string;
	maxLiquidityPerTick: string;
	slot0: Slot0;
	feeGrowthGlobal0X128: string;
	feeGrowthGlobal1X128: string;
	liquidity: string;
	private readonly moduleName;
	private readonly poolStore;
	private readonly tickInfoStore;
	private readonly positionInfoStore;
	private readonly observationStore;
	private readonly tickBitmapStore;
	private readonly events;
	private readonly stores;
	private readonly config;
	private readonly simulation;
	private feeProtocol;
	private feeProtocolPool;
	private immutableContext;
	private mutableContext;
	private tokenMethod;
	private mutableDependencyReady;
	private immutableDependencyReady;
}
