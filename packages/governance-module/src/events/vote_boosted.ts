import { Modules } from 'klayr-framework';
import { voteBoostedEventSchema } from '../schema';
import { VoteBoostedEventData } from '../types';

export class VoteBoostedEvent extends Modules.BaseEvent<VoteBoostedEventData> {
	public schema = voteBoostedEventSchema;
}
