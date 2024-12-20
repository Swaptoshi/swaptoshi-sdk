import { Modules } from 'klayr-framework';
import * as db from '@liskhq/lisk-db';
import { TickBitmap } from '../types';
import { Int16String } from './library/int';
import { tickBitmapStoreSchema } from '../schema';
import { maxUnsigned } from './library/int/base/limit';

export class TickBitmapStore extends Modules.BaseStore<TickBitmap> {
	public getKey(poolAddress: Buffer, index: Int16String) {
		const indexBuf = Buffer.allocUnsafe(2);
		indexBuf.writeUIntBE(this.hof(index, 16), 0, 2);
		return Buffer.concat([poolAddress, indexBuf]);
	}

	public async getOrDefault(context: Modules.ImmutableStoreGetter, key: Buffer): Promise<TickBitmap> {
		try {
			const tickBitmap = await this.get(context, key);
			return tickBitmap;
		} catch (error) {
			if (!(error instanceof db.NotFoundError)) {
				throw error;
			}
			return { bitmap: '0' };
		}
	}

	private hof(value: string, bitSize: number): number {
		const max = parseInt(maxUnsigned[bitSize] as string, 10);
		const min = 0;

		let result = parseInt(value, 10);
		if (result < min || result > max) {
			const range = max - min + 1;
			result = ((((result - min) % range) + range) % range) + min;
		}

		return result;
	}

	public schema = tickBitmapStoreSchema;
	public default: TickBitmap = { bitmap: '0' };
}
