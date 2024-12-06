import { Modules } from 'klayr-framework';
import { MutableSwapContext } from './context';
import { DexModuleConfig } from './config';
type TokenMethod = Modules.Token.TokenMethod;
interface ExactInputParams {
	path: Buffer;
	recipient: Buffer;
	deadline: string;
	amountIn: string;
	amountOutMinimum: string;
}
interface ExactInputSingleParams {
	tokenIn: Buffer;
	tokenOut: Buffer;
	fee: string;
	recipient: Buffer;
	deadline: string;
	amountIn: string;
	amountOutMinimum: string;
	sqrtPriceLimitX96: string;
}
interface ExactOutputParams {
	path: Buffer;
	recipient: Buffer;
	deadline: string;
	amountOut: string;
	amountInMaximum: string;
}
interface ExactOutputSingleParams {
	tokenIn: Buffer;
	tokenOut: Buffer;
	fee: string;
	recipient: Buffer;
	deadline: string;
	amountOut: string;
	amountInMaximum: string;
	sqrtPriceLimitX96: string;
}
export declare class SwapRouter {
	constructor(stores: Modules.NamedRegistry, config: DexModuleConfig, moduleName: string);
	addDependencies(context: MutableSwapContext, tokenMethod: TokenMethod): void;
	setSender(senderAddress: Buffer): void;
	setConfig(config: DexModuleConfig): void;
	exactInputSingle(params: ExactInputSingleParams): Promise<string>;
	exactInput(_params: ExactInputParams): Promise<string>;
	exactOutputSingle(params: ExactOutputSingleParams): Promise<string>;
	exactOutput(params: ExactOutputParams): Promise<string>;
	private _checkDependencies;
	private _checkDeadline;
	private _pay;
	private _createPayload;
	private _getPool;
	private _swapCallback;
	private _exactInputInternal;
	private _exactOutputInternal;
	private _checkRemainingBalance;
	private _checkFeeProtocol;
	private _validateFeeProtocol;
	readonly address: Buffer<ArrayBufferLike>;
	private readonly _DEFAULT_AMOUNT_IN_CACHED;
	private readonly poolStore;
	private readonly moduleName;
	private feeProtocol;
	private feeProtocolPool;
	private _amountInCached;
	private mutableContext;
	private tokenMethod;
	private mutableDependencyReady;
}
