import { Modules } from 'klayr-framework';
import { voteChangedEventSchema } from '../schema';
import { VoteChangedEventData } from '../types';

export class VoteChangedEvent extends Modules.BaseEvent<VoteChangedEventData> {
	public schema = voteChangedEventSchema;
}
