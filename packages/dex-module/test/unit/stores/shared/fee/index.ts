/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { ModuleConfig } from 'klayr-framework/dist-node/modules/fee/types';
import { StateMachine } from 'klayr-framework';
import { FeeMethod } from '@dist/types';

const chainID = Buffer.from('00000001', 'hex');
const tokenID = Buffer.concat([chainID, Buffer.alloc(4, 0)]);

export const mock_fee_init = jest.fn();
export const mock_fee_getFeeTokenID = jest.fn();
export const mock_fee_payFee = jest.fn();

export class MockedFeeMethod implements Omit<FeeMethod, ''> {
	public init(_config: ModuleConfig): void {
		mock_fee_init(_config);
	}
	public getConfig(): ModuleConfig {
		return {
			minFeePerByte: 1000,
			maxBlockHeightZeroFeePerByte: 0,
			feeTokenID: Buffer.from('0400000000000000'),
		};
	}
	public getFeeTokenID(): Buffer {
		mock_fee_getFeeTokenID();
		return tokenID;
	}
	public payFee(_methodContext: StateMachine.MethodContext, _amount: bigint): void {
		mock_fee_payFee(_amount);
	}
}
