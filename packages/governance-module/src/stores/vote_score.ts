import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import { VoteScoreStoreData } from '../types';
import { voteScoreStoreSchema } from '../schema';

export class VoteScoreStore extends Modules.BaseStore<VoteScoreStoreData> {
	public async getVoteScore(context: Modules.ImmutableStoreGetter, address: Buffer): Promise<bigint> {
		try {
			const voteScore = await this.get(context, address);
			return voteScore.score;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			return BigInt(0);
		}
	}

	public async addVoteScore(context: Modules.StoreGetter, address: Buffer, addedVote: bigint): Promise<void> {
		const voteScore = await this.getVoteScore(context, address);
		await this.set(context, address, { score: voteScore + addedVote });
	}

	public schema = voteScoreStoreSchema;
}
