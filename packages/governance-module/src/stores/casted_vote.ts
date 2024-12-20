import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import * as utils from '@klayr/utils';
import { CastedVoteStoreData } from '../types';
import { castedVoteStoreSchema } from '../schema';

export const defaultVote = Object.freeze<CastedVoteStoreData>({
	activeVote: [],
});

export class CastedVoteStore extends Modules.BaseStore<CastedVoteStoreData> {
	public async getOrDefault(context: Modules.ImmutableStoreGetter, address: Buffer): Promise<CastedVoteStoreData> {
		try {
			const castedVote = await this.get(context, address);
			return castedVote;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			return utils.objects.cloneDeep(defaultVote) as CastedVoteStoreData;
		}
	}

	public async removeAllCastedVote(context: Modules.StoreGetter, address: Buffer) {
		await this.set(context, address, defaultVote);
	}

	public async removeCastedVoteByProposalId(context: Modules.StoreGetter, address: Buffer, proposalId: number) {
		const castedVote = await this.getOrDefault(context, address);

		const indexToRemove = castedVote.activeVote.findIndex(vote => vote.proposalId === proposalId);
		if (indexToRemove !== -1) {
			castedVote.activeVote.splice(indexToRemove, 1);
			await this.set(context, address, castedVote);
		}
	}

	public schema = castedVoteStoreSchema;
}
