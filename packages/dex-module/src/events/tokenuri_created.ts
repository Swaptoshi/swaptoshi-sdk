/* eslint-disable import/no-cycle */
import { Modules } from 'klayr-framework';
import { tokenUriCreatedEventSchema } from '../schema';

export interface TokenURICreatedEventData {
	tokenURI: string;
	tokenId: Buffer;
}

export class TokenURICreatedEvent extends Modules.BaseEvent<TokenURICreatedEventData> {
	public schema = tokenUriCreatedEventSchema;
}
