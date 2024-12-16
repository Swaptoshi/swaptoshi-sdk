import { FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { GovernanceMethod } from '@swaptoshi/governance-module';
import { SidechainInteroperabilityMethod, MainchainInteroperabilityMethod, FeeMethod, TokenMethod, NFTMethod } from './utils';

export interface DexModuleDependencies {
	tokenMethod: TokenMethod;
	nftMethod: NFTMethod;
	feeMethod: FeeMethod;
	interoperabilityMethod: SidechainInteroperabilityMethod | MainchainInteroperabilityMethod;
	feeConversionMethod?: FeeConversionMethod;
	governanceMethod?: GovernanceMethod;
}
