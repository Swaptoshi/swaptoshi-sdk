import { Modules } from 'klayr-framework';
import { proposalOutcomeEventSchema } from '../schema';
import { ProposalOutcomeEventData } from '../types';

export class ProposalOutcomeEvent extends Modules.BaseEvent<ProposalOutcomeEventData> {
	public schema = proposalOutcomeEventSchema;
}
