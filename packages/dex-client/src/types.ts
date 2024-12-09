export interface TransactionParam<T> {
	fee?: bigint;
	params: T;
}

export interface QuoteExactInputResponse {
	amountOut: string;
	sqrtPriceX96AfterList: string[];
	initializedTicksCrossedList: string[];
}

export interface QuoteExactInputSingleResponse {
	amountOut: string;
	sqrtPriceX96After: string;
	initializedTicksCrossed: string;
}

export interface QuoteExactOutputResponse {
	amountIn: string;
	sqrtPriceX96AfterList: string[];
	initializedTicksCrossedList: string[];
}

export interface QuoteExactOutputSingleResponse {
	amountIn: string;
	sqrtPriceX96After: string;
	initializedTicksCrossed: string;
}

export interface QuotePriceResponse {
	price: number;
	pair: string;
}

export interface GetPoolAddressFromCollectionIdResponse {
	poolAddress: string;
}

export interface GetPoolResponse {
	token0: string;
	token1: string;
	fee: string;
	tickSpacing: string;
	maxLiquidityPerTick: string;
	feeGrowthGlobal0X128: string;
	feeGrowthGlobal1X128: string;
	liquidity: string;
	slot0: {
		sqrtPriceX96: string;
		tick: string;
		observationIndex: string;
		observationCardinality: string;
		observationCardinalityNext: string;
	};
	address: string;
	collectionId: string;
}

export interface GetPositionResponse {
	token0: string;
	token1: string;
	fee: string;
	tickLower: string;
	tickUpper: string;
	liquidity: string;
	feeGrowthInside0LastX128: string;
	feeGrowthInside1LastX128: string;
	tokensOwed0: string;
	tokensOwed1: string;
}

export interface GetTokenURIResponse {
	tokenURI: string;
}

export interface GetMetadataResponse {
	name: string;
	description: string;
	image: string;
}

export interface ObserveResponse {
	tickCumulatives: string[];
	secondsPerLiquidityCumulativeX128s: string[];
}
