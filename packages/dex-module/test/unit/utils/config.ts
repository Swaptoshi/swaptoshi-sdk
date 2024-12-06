import { Types } from 'klayr-framework';
import { DexModuleConfig } from '@dist/types';
import { chainID, moduleConfig } from '../stores/shared/module';

export const moduleInitArgs: { genesisConfig: Types.GenesisConfig; moduleConfig: DexModuleConfig } = {
	genesisConfig: {
		chainID: chainID.toString('hex'),
	} as Types.GenesisConfig,
	moduleConfig,
};
