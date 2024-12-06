import { Modules } from 'klayr-framework';
import { proposalCreatedEventSchema } from '../schema';
import { ProposalCreatedEventData } from '../types';

export class ProposalCreatedEvent extends Modules.BaseEvent<ProposalCreatedEventData> {
	public schema = proposalCreatedEventSchema;
}
