import { Modules, StateMachine, Transaction } from 'klayr-framework';
import { codec } from '@klayr/codec';
import { PoolStore } from '../../stores/pool';
import { tokenTransferParamsSchema } from '../../schema';

interface TransferTokenParams {
	tokenID: Buffer;
	amount: bigint;
	recipientAddress: Buffer;
	data: string;
}

export async function isSwapByTransfer(this: { stores: Modules.NamedRegistry; events: Modules.NamedRegistry }, context: StateMachine.ImmutableMethodContext, transaction: Transaction) {
	if (transaction.module === 'token' && transaction.command === 'transfer') {
		const params = codec.decode<TransferTokenParams>(tokenTransferParamsSchema, transaction.params);

		const poolStore = this.stores.get(PoolStore);
		if (await poolStore.has(context, params.recipientAddress)) {
			return {
				status: true,
				payload: params,
			};
		}
	}
	return {
		status: false,
		payload: undefined,
	};
}
