import { Modules, StateMachine } from 'klayr-framework';
import { PoolStore } from '../../stores/pool';
import { PoolAddress } from '../../stores/library/periphery';
import { mutableHookSwapContext } from '../../stores/context';
import { isSwapByTransfer } from './isSwapByTransfer';

export async function executeSwapByTransfer(this: { stores: Modules.NamedRegistry; events: Modules.NamedRegistry }, ctx: StateMachine.TransactionExecuteContext) {
	const check = await isSwapByTransfer.bind(this)(ctx, ctx.transaction);
	if (check.status && check.payload) {
		const poolStore = this.stores.get(PoolStore);
		if (await poolStore.has(ctx, check.payload.recipientAddress)) {
			const _ctx = {
				...mutableHookSwapContext(ctx),
				senderAddress: check.payload.recipientAddress,
			};
			const key = PoolAddress.decodePoolAddress(check.payload.recipientAddress);
			if (key.token0.compare(check.payload.tokenID) !== 0 && key.token1.compare(check.payload.tokenID) !== 0) {
				throw new Error('transfering incompatible token to pool address');
			}

			const tokenIn = key.token0.compare(check.payload.tokenID) === 0 ? key.token0 : key.token1;
			const tokenOut = key.token0.compare(check.payload.tokenID) === 0 ? key.token1 : key.token0;
			const router = await poolStore.getMutableRouter(_ctx);
			await router.exactInputSingle({
				tokenIn,
				tokenOut,
				fee: key.fee,
				recipient: _ctx.context.transaction.senderAddress,
				amountIn: check.payload.amount.toString(),
				amountOutMinimum: '0',
				sqrtPriceLimitX96: '0',
				deadline: _ctx.context.header.timestamp.toString(),
			});
		}
	}
}
