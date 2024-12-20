import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import * as utils from '@klayr/utils';
import { NextAvailableProposalIdStoreData } from '../types';
import { nextAvailableProposalIdStoreSchema } from '../schema';

export const defaultNextId = Object.freeze<NextAvailableProposalIdStoreData>({
	nextProposalId: 0,
});

export class NextAvailableProposalIdStore extends Modules.BaseStore<NextAvailableProposalIdStoreData> {
	public async getOrDefault(context: Modules.ImmutableStoreGetter): Promise<NextAvailableProposalIdStoreData> {
		try {
			const nextAvailableId = await this.get(context, Buffer.alloc(0));
			return nextAvailableId;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			return utils.objects.cloneDeep(defaultNextId) as NextAvailableProposalIdStoreData;
		}
	}

	public async increase(context: Modules.StoreGetter) {
		const nextId = await this.getOrDefault(context);
		nextId.nextProposalId += 1;
		await this.set(context, Buffer.alloc(0), nextId);
	}

	public schema = nextAvailableProposalIdStoreSchema;
}
