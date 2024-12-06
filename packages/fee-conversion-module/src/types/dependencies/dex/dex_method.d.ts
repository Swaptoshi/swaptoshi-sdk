import { Modules, StateMachine } from 'klayr-framework';
import { Quoter } from './quoter';
import { NonfungiblePositionManager } from './position_manager';
import { DEXPool } from './pool';
import { SwapRouter } from './swap_router';
export declare class DexMethod extends Modules.BaseMethod {
	getConfig(context: StateMachine.ImmutableMethodContext): Promise<any>;
	createPool(
		context: StateMachine.MethodContext,
		senderAddress: Buffer,
		timestamp: number,
		tokenA: Buffer,
		tokenASymbol: string,
		tokenADecimal: number,
		tokenB: Buffer,
		tokenBSymbol: string,
		tokenBDecimal: number,
		fee: string,
	): Promise<DEXPool>;
	getPoolInstance(context: StateMachine.MethodContext, senderAddress: Buffer, timestamp: number, tokenA: Buffer, tokenB: Buffer, fee: string): Promise<DEXPool>;
	poolExists(context: StateMachine.ImmutableMethodContext, tokenA: Buffer, tokenB: Buffer, fee: string): Promise<boolean>;
	getPositionManagerInstance(context: StateMachine.MethodContext, senderAddress: Buffer, timestamp: number, poolAddress: Buffer): Promise<NonfungiblePositionManager>;
	getRouterInstance(context: StateMachine.MethodContext, senderAddress: Buffer, timestamp: number): Promise<SwapRouter>;
	getQuoterInstance(context: StateMachine.ImmutableMethodContext, senderAddress: Buffer, timestamp: number): Promise<Quoter>;
}
