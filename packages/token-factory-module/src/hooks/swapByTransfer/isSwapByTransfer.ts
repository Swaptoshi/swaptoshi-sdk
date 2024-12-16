import { Modules, StateMachine, Transaction } from 'klayr-framework';
import { codec } from '@klayr/codec';
import { ICOStore } from '../../stores/ico';
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

		const icoStore = this.stores.get(ICOStore);
		if (await icoStore.has(context, params.recipientAddress)) {
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
