import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import * as utils from '@klayr/utils';
import { ProposalVoterStoreData } from '../types';
import { proposalVoterStoreSchema } from '../schema';
import { bytes } from '@swaptoshi/utils';

export const defaultProposalVoters = Object.freeze<ProposalVoterStoreData>({
	voters: [],
});

export class ProposalVoterStore extends Modules.BaseStore<ProposalVoterStoreData> {
	public async getOrDefault(context: Modules.ImmutableStoreGetter, proposalId: number): Promise<ProposalVoterStoreData> {
		try {
			const proposalVoters = await this.get(context, bytes.numberToBytes(proposalId));
			return proposalVoters;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			return utils.objects.cloneDeep(defaultProposalVoters) as ProposalVoterStoreData;
		}
	}

	public async addVoter(context: Modules.StoreGetter, proposalId: number, address: Buffer) {
		const proposalVoters = await this.getOrDefault(context, proposalId);
		const index = proposalVoters.voters.findIndex(voter => voter.equals(address));
		if (index === -1) {
			proposalVoters.voters.push(address);
			await this.set(context, bytes.numberToBytes(proposalId), proposalVoters);
		}
	}

	public schema = proposalVoterStoreSchema;
}
