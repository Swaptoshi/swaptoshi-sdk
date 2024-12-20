/* eslint-disable class-methods-use-this */

import { Modules, StateMachine } from 'klayr-framework';
import { ICOTreasurifyParams } from '../types';
import { icoTreasurifyCommandSchema } from '../schema';
import { commandFactoryContext, immutableTransactionHookFactoryContext } from '../stores/context';
import { decodeICOPoolAddress } from '../stores/library';
import { ICOStore } from '../stores/ico';

export class IcoTreasurifyCommand extends Modules.BaseCommand {
	public async verify(_context: StateMachine.CommandVerifyContext<ICOTreasurifyParams>): Promise<StateMachine.VerificationResult> {
		try {
			const context = immutableTransactionHookFactoryContext(_context);
			const pool = decodeICOPoolAddress(_context.params.poolAddress);
			const ico = await this.stores.get(ICOStore).getImmutableICOPool(context, pool.tokenIn, pool.tokenOut);
			await ico.verifyTreasurify(_context.params);
		} catch (error: unknown) {
			return {
				status: StateMachine.VerifyStatus.FAIL,
				error: new Error((error as { message: string }).message),
			};
		}
		return { status: StateMachine.VerifyStatus.OK };
	}

	public async execute(_context: StateMachine.CommandExecuteContext<ICOTreasurifyParams>): Promise<void> {
		const context = commandFactoryContext(_context);
		const pool = decodeICOPoolAddress(_context.params.poolAddress);
		const ico = await this.stores.get(ICOStore).getMutableICOPool(context, pool.tokenIn, pool.tokenOut);
		await ico.treasurify(_context.params, false);
	}

	public schema = icoTreasurifyCommandSchema;
}
