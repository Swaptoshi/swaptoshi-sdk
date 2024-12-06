import { Modules } from 'klayr-framework';
import { proposalQuorumCheckedEventSchema } from '../schema';
import { ProposalQuorumCheckedEventData } from '../types';

export class ProposalQuorumCheckedEvent extends Modules.BaseEvent<ProposalQuorumCheckedEventData> {
	public schema = proposalQuorumCheckedEventSchema;
}
