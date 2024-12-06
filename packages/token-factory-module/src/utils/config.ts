import { TokenFactoryModuleConfig } from '../types';
import { verify } from '@swaptoshi/utils';

// eslint-disable-next-line @typescript-eslint/require-await
export async function verifyModuleConfig(config: TokenFactoryModuleConfig) {
	verify.verifyKlayer32Address('config.icoLeftOverAddress', config.icoLeftOverAddress);

	verify.verifyBoolean('config.icoFeeConversionEnabled', config.icoFeeConversionEnabled);

	verify.verifyBoolean('config.icoDexPathEnabled', config.icoDexPathEnabled);

	for (const commands of Object.keys(config.minTransactionFee)) {
		verify.verifyNumberString(`config.minTransactionFee.${commands}`, config.minTransactionFee[commands as keyof TokenFactoryModuleConfig['minTransactionFee']]);
		verify.verifyPositiveNumber(`config.minTransactionFee.${commands}`, config.minTransactionFee[commands as keyof TokenFactoryModuleConfig['minTransactionFee']]);
	}

	for (const commands of Object.keys(config.baseFee)) {
		verify.verifyNumberString(`config.baseFee.${commands}`, config.baseFee[commands as keyof TokenFactoryModuleConfig['baseFee']]);
		verify.verifyPositiveNumber(`config.baseFee.${commands}`, config.baseFee[commands as keyof TokenFactoryModuleConfig['baseFee']]);
	}
}
