import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import * as utils from '@klayr/utils';
import { PositionInfo } from '../types';
import { positionInfoStoreSchema } from '../schema';

export const defaultPositionInfo: PositionInfo = Object.freeze({
	liquidity: '0',
	feeGrowthInside0LastX128: '0',
	feeGrowthInside1LastX128: '0',
	tokensOwed0: '0',
	tokensOwed1: '0',
});

export class PositionInfoStore extends Modules.BaseStore<PositionInfo> {
	public getKey(poolAddress: Buffer, key: Buffer) {
		return Buffer.concat([poolAddress, key]);
	}

	public async getOrDefault(context: Modules.ImmutableStoreGetter, key: Buffer): Promise<PositionInfo> {
		try {
			const positionInfo = await this.get(context, key);
			return positionInfo;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			return utils.objects.cloneDeep(defaultPositionInfo) as PositionInfo;
		}
	}

	public schema = positionInfoStoreSchema;
	public default: PositionInfo = { ...defaultPositionInfo };
}
