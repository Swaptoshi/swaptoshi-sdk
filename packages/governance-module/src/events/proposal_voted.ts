import { Modules } from 'klayr-framework';
import { proposalVotedEventSchema } from '../schema';
import { ProposalVotedEventData } from '../types';

export class ProposalVotedEvent extends Modules.BaseEvent<ProposalVotedEventData> {
	public schema = proposalVotedEventSchema;
}
