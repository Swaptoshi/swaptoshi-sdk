import { GetPoolAddressFromCollectionIdParams } from '../../../types';
import { verify } from '@swaptoshi/utils';

export function verifyGetPoolAddressFromCollectionIdParam(params: GetPoolAddressFromCollectionIdParams) {
	verify.verifyCollectionId('collectionId', Buffer.from(params.collectionId, 'hex'));
}
