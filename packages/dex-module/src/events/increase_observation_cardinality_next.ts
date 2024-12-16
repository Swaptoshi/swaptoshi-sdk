import { Modules } from 'klayr-framework';
import { increaseObservationCardinalityNextEventSchema } from '../schema';

export interface IncreaseObservationCardinalityNextEventData {
	observationCardinalityNextOld: string;
	observationCardinalityNextNew: string;
}

export class IncreaseObservationCardinalityNextEvent extends Modules.BaseEvent<IncreaseObservationCardinalityNextEventData> {
	public schema = increaseObservationCardinalityNextEventSchema;
}
