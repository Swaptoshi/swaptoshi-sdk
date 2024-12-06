import { Modules } from 'klayr-framework';
import { ImmutableSwapContext } from './context';
interface QuoteExactInputSingleParams {
	tokenIn: string;
	tokenOut: string;
	amountIn: string;
	fee: string;
	sqrtPriceLimitX96: string;
}
interface QuoteExactOutputSingleParams {
	tokenIn: string;
	tokenOut: string;
	amount: string;
	fee: string;
	sqrtPriceLimitX96: string;
}
interface PopulatedTick {
	tick: string;
	liquidityNet: string;
	liquidityGross: string;
}
export declare class Quoter {
	constructor(context: ImmutableSwapContext, stores: Modules.NamedRegistry);
	getPopulatedTicksInWord(tokenA: Buffer, tokenB: Buffer, fee: string, tickBitmapIndex: string): Promise<PopulatedTick[]>;
	quoteExactInputSingle(params: QuoteExactInputSingleParams): Promise<{
		amountOut: string;
		sqrtPriceX96After: string;
		initializedTicksCrossed: string;
	}>;
	quoteExactInput(
		path: Buffer,
		amountIn: string,
	): Promise<{
		amountOut: string;
		sqrtPriceX96AfterList: string[];
		initializedTicksCrossedList: string[];
	}>;
	quoteExactOutputSingle(params: QuoteExactOutputSingleParams): Promise<{
		amountIn: string;
		sqrtPriceX96After: string;
		initializedTicksCrossed: string;
	}>;
	quoteExactOutput(
		path: Buffer,
		amountOut: string,
	): Promise<{
		amountIn: string;
		sqrtPriceX96AfterList: string[];
		initializedTicksCrossedList: string[];
	}>;
	quotePrice(path: Buffer): Promise<{
		price: number;
		pair: string;
	}>;
	private _createPayload;
	private _swapCallback;
	private _parseRevertReason;
	private _handleRevert;
	private readonly senderAddress;
	private readonly immutableContext;
	private readonly poolStore;
	private readonly tickBitmapStore;
	private readonly tokenSymbolStore;
}
export {};
