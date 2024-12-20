/* eslint-disable @typescript-eslint/member-ordering */
import { Modules, StateMachine } from 'klayr-framework';
import { BaseGovernableConfig, GovernableConfigSetContext, GovernableConfigVerifyContext } from '@swaptoshi/governance-module';
import { defaultConfig } from './constants';
import { configSchema } from './schema';
import { DexModuleConfig } from './types';
import { verifyModuleConfig } from './utils';
import { FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { DexSwapFeeConversionMethod, DexTransferFeeConversionMethod } from './fc_method';

export class DexGovernableConfig extends BaseGovernableConfig<DexModuleConfig> {
	public schema = configSchema;
	public default = defaultConfig;

	private stores = new Modules.NamedRegistry();
	private _feeConversionMethod: FeeConversionMethod | undefined;

	public addDependencies(stores: Modules.NamedRegistry, feeConversionMethod?: FeeConversionMethod) {
		this.stores = stores;
		this._feeConversionMethod = feeConversionMethod;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async afterSetConfig(_context: GovernableConfigSetContext<DexModuleConfig>): Promise<void> {
		if (this._feeConversionMethod) {
			if (_context.newConfig.feeConversionEnabled) {
				this._feeConversionMethod.register('token', ['transfer'], new DexTransferFeeConversionMethod(this.stores, this.governanceEvent));
				this._feeConversionMethod.register(
					this.name,
					['exactInput', 'exactInputSingle', 'exactOutput', 'exactOutputSingle'],
					new DexSwapFeeConversionMethod(this.stores, this.governanceEvent),
				);
			} else {
				this._feeConversionMethod.unregister('token', ['transfer'], new DexTransferFeeConversionMethod(this.stores, this.governanceEvent));
				this._feeConversionMethod.unregister(
					this.name,
					['exactInput', 'exactInputSingle', 'exactOutput', 'exactOutputSingle'],
					new DexSwapFeeConversionMethod(this.stores, this.governanceEvent),
				);
			}
		}
	}

	public async verify(_context: GovernableConfigVerifyContext<DexModuleConfig>): Promise<StateMachine.VerificationResult> {
		try {
			await verifyModuleConfig(_context.config);

			if (_context.config.feeConversionEnabled && !this._feeConversionMethod) {
				throw new Error('feeConversionMethod dependencies is not configured, make sure to add FeeConversionModule.method to DexModule.addDependencies()');
			}
		} catch (error) {
			return {
				status: StateMachine.VerifyStatus.FAIL,
				error: new Error((error as { message: string }).message),
			};
		}
		return { status: StateMachine.VerifyStatus.OK };
	}
}
