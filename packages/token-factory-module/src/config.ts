/* eslint-disable @typescript-eslint/member-ordering */
import { Modules, StateMachine } from 'klayr-framework';
import { BaseGovernableConfig, GovernableConfigSetContext, GovernableConfigVerifyContext } from '@swaptoshi/governance-module';
import { defaultConfig } from './constants';
import { configSchema } from './schema';
import { TokenFactoryModuleConfig } from './types';
import { DexMethod } from '@swaptoshi/dex-module';
import { FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { verifyModuleConfig } from './utils';
import { TokenFactoryICOPurchaseFeeConversionMethod, TokenFactoryTransferFeeConversionMethod } from './fc_method';

export class TokenFactoryGovernableConfig extends BaseGovernableConfig<TokenFactoryModuleConfig> {
	public schema = configSchema;
	public default = defaultConfig;

	private stores = new Modules.NamedRegistry();
	private _dexMethod: DexMethod | undefined;
	private _feeConversionMethod: FeeConversionMethod | undefined;

	public addDependencies(stores: Modules.NamedRegistry, dexMethod?: DexMethod, feeConversionMethod?: FeeConversionMethod) {
		this.stores = stores;
		this._dexMethod = dexMethod;
		this._feeConversionMethod = feeConversionMethod;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async afterSetConfig(_context: GovernableConfigSetContext<TokenFactoryModuleConfig>): Promise<void> {
		if (this._feeConversionMethod) {
			if (_context.newConfig.icoFeeConversionEnabled) {
				this._feeConversionMethod.register('token', ['transfer'], new TokenFactoryTransferFeeConversionMethod(this.stores, this.governanceEvent));
				this._feeConversionMethod.register(
					this.name,
					['icoExactInput', 'icoExactInputSingle', 'icoExactOutput', 'icoExactOutputSingle'],
					new TokenFactoryICOPurchaseFeeConversionMethod(this.stores, this.governanceEvent),
				);
			} else {
				this._feeConversionMethod.unregister('token', ['transfer'], new TokenFactoryTransferFeeConversionMethod(this.stores, this.governanceEvent));
				this._feeConversionMethod.unregister(
					this.name,
					['icoExactInput', 'icoExactInputSingle', 'icoExactOutput', 'icoExactOutputSingle'],
					new TokenFactoryICOPurchaseFeeConversionMethod(this.stores, this.governanceEvent),
				);
			}
		}
	}

	public async verify(_context: GovernableConfigVerifyContext<TokenFactoryModuleConfig>): Promise<StateMachine.VerificationResult> {
		try {
			await verifyModuleConfig(_context.config);
			const { chainID } = _context.genesisConfig;

			for (const stringOrNumber of _context.config.skippedTokenID) {
				if (stringOrNumber.length === 16) {
					if (!stringOrNumber.startsWith(chainID)) throw new Error('invalid tokenFactory skippedTokenID config chainID');
					continue;
				}
				if (stringOrNumber.length === 8) {
					BigInt(`0x${stringOrNumber}`);
				}
				if (stringOrNumber.length !== 8) {
					throw new Error('invalid tokenFactory skippedTokenID config string length');
				}
			}

			if (_context.config.icoFeeConversionEnabled && !this._feeConversionMethod) {
				throw new Error('feeConversionMethod dependencies is not configured, make sure to add FeeConversionModule.method to TokenFactoryModule.addDependencies()');
			}

			if (_context.config.icoDexPathEnabled && !this._dexMethod) {
				throw new Error('dexMethod dependencies is not configured, make sure to add DexModule.method to TokenFactoryModule.addDependencies()');
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
