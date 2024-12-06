import { Modules } from 'klayr-framework';
import { icoSwapEventSchema } from '../schema';
import { ICOSwapEventData } from '../types';

export class IcoSwapEvent extends Modules.BaseEvent<ICOSwapEventData> {
	public schema = icoSwapEventSchema;
}
