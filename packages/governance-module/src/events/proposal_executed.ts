import { Modules } from 'klayr-framework';
import { proposalExecutedEventSchema } from '../schema';
import { ProposalExecutedEventData } from '../types';

export class ProposalExecutedEvent extends Modules.BaseEvent<ProposalExecutedEventData> {
	public schema = proposalExecutedEventSchema;
}
