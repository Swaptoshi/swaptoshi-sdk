import { Modules } from 'klayr-framework';
import { proposalSetAttributesEventSchema } from '../schema';
import { ProposalSetAttributesEventData } from '../types';

export class ProposalSetAttributesEvent extends Modules.BaseEvent<ProposalSetAttributesEventData> {
	public schema = proposalSetAttributesEventSchema;
}
