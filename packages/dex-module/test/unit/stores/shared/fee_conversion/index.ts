/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { FeeMethod, TokenMethod } from '@dist/types';
import { BaseFeeConversionMethod, FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { FeeConversionMethodRegistry } from '@swaptoshi/fee-conversion-module/dist/registry';

export const mock_fee_conversion_init = jest.fn();
export const mock_fee_conversion_add_dependencies = jest.fn();
export const mock_fee_conversion_register = jest.fn();
export const mock_fee_conversion_unregister = jest.fn();

export class MockedFeeConversionMethod implements Omit<FeeConversionMethod, ''> {
	public init(handler: FeeConversionMethodRegistry): void {
		mock_fee_conversion_init(handler);
	}

	public addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod): void {
		mock_fee_conversion_add_dependencies(tokenMethod, feeMethod);
	}

	public register(module: string, commands: string[], handler: BaseFeeConversionMethod): void {
		mock_fee_conversion_register(module, commands, handler);
	}

	public unregister(module: string, commands: string[], handler: BaseFeeConversionMethod): void {
		mock_fee_conversion_unregister(module, commands, handler);
	}
}
