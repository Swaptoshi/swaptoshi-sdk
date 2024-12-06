/* eslint-disable import/no-cycle */
import { DexModuleConfig } from '../../types';
import { verify } from '@swaptoshi/utils';

// eslint-disable-next-line @typescript-eslint/require-await
export async function verifyModuleConfig(config: DexModuleConfig) {
	for (const feeAmountTickSpacings of config.feeAmountTickSpacing) {
		verify.verifyNumberString('config.feeAmountTickSpacing.fee', feeAmountTickSpacings.fee);
		verify.verifyNumberString('config.feeAmountTickSpacing.tickSpacing', feeAmountTickSpacings.tickSpacing);
		verify.verifyPositiveNumber('config.feeAmountTickSpacing.fee', feeAmountTickSpacings.fee);
		verify.verifyPositiveNumber('config.feeAmountTickSpacing.tickSpacing', feeAmountTickSpacings.tickSpacing);
	}

	verify.verifyNumber('config.feeProtocol', config.feeProtocol);
	verify.verifyPositiveNumber('config.feeProtocol', config.feeProtocol);

	if (config.feeProtocolPool) {
		verify.verifyKlayer32Address('config.feeProtocolPool', config.feeProtocolPool);
	}

	verify.verifyBoolean('config.feeConversionEnabled', config.feeConversionEnabled);
	verify.verifyBoolean('config.supportAllTokens', config.supportAllTokens);

	for (const commands of Object.keys(config.minTransactionFee)) {
		verify.verifyNumberString(`config.minTransactionFee.${commands}`, config.minTransactionFee[commands as keyof DexModuleConfig['minTransactionFee']]);
		verify.verifyPositiveNumber(`config.minTransactionFee.${commands}`, config.minTransactionFee[commands as keyof DexModuleConfig['minTransactionFee']]);
	}

	for (const commands of Object.keys(config.baseFee)) {
		verify.verifyNumberString(`config.baseFee.${commands}`, config.baseFee[commands as keyof DexModuleConfig['baseFee']]);
		verify.verifyPositiveNumber(`config.baseFee.${commands}`, config.baseFee[commands as keyof DexModuleConfig['baseFee']]);
	}

	verify.verifyString('config.nftPositionMetadata.dex.name', config.nftPositionMetadata.dex.name);
	verify.verifyString('config.nftPositionMetadata.dex.symbol', config.nftPositionMetadata.dex.symbol);
	verify.verifyNumber('config.nftPositionMetadata.dex.decimal', config.nftPositionMetadata.dex.decimal);
	verify.verifyPositiveNumber('config.nftPositionMetadata.dex.decimal', config.nftPositionMetadata.dex.decimal);
	verify.verifyString('config.nftPositionMetadata.mainchain.symbol', config.nftPositionMetadata.mainchain.symbol);
	verify.verifyNumber('config.nftPositionMetadata.mainchain.decimal', config.nftPositionMetadata.mainchain.decimal);
	verify.verifyPositiveNumber('config.nftPositionMetadata.mainchain.decimal', config.nftPositionMetadata.mainchain.decimal);

	verify.verifyNumber('config.nftPositionColorRange.hue[0]', config.nftPositionColorRange.hue[0]);
	verify.verifyNumber('config.nftPositionColorRange.hue[1]', config.nftPositionColorRange.hue[1]);

	if (config.nftPositionColorRange.hue[0] < 0 || config.nftPositionColorRange.hue[0] > 360) throw new Error('config.nftPositionColorRange.hue needs to be between 0 and 360');
	if (config.nftPositionColorRange.hue[0] > config.nftPositionColorRange.hue[1]) throw new Error("config.nftPositionColorRange.hue at index 0 can't be higher than index 1");

	verify.verifyNumber('config.nftPositionColorRange.saturation[0]', config.nftPositionColorRange.saturation[0]);
	verify.verifyNumber('config.nftPositionColorRange.saturation[1]', config.nftPositionColorRange.saturation[1]);

	if (config.nftPositionColorRange.saturation[0] < 0 || config.nftPositionColorRange.saturation[0] > 100) throw new Error('config.nftPositionColorRange.saturation needs to be between 0 and 100');
	if (config.nftPositionColorRange.saturation[0] > config.nftPositionColorRange.saturation[1]) throw new Error("config.nftPositionColorRange.saturation at index 0 can't be higher than index 1");

	verify.verifyNumber('config.nftPositionColorRange.lightness[0]', config.nftPositionColorRange.lightness[0]);
	verify.verifyNumber('config.nftPositionColorRange.lightness[1]', config.nftPositionColorRange.lightness[1]);

	if (config.nftPositionColorRange.lightness[0] < 0 || config.nftPositionColorRange.lightness[0] > 100) throw new Error('config.nftPositionColorRange.lightness needs to be between 0 and 100');
	if (config.nftPositionColorRange.lightness[0] > config.nftPositionColorRange.lightness[1]) throw new Error("config.nftPositionColorRange.lightness at index 0 can't be higher than index 1");
}
