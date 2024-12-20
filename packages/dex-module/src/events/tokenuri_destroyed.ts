import { Modules } from 'klayr-framework';
import { tokenUriDestroyedEventSchema } from '../schema';

export interface TokenURIDestroyedEventData {
	tokenURI: string;
	tokenId: Buffer;
}

export class TokenURIDestroyedEvent extends Modules.BaseEvent<TokenURIDestroyedEventData> {
	public schema = tokenUriDestroyedEventSchema;
}
