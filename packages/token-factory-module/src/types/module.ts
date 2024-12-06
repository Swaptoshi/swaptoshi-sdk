import { Modules } from 'klayr-framework';
import { DexMethod } from '@swaptoshi/dex-module';
import { FeeConversionMethod } from '@swaptoshi/fee-conversion-module';
import { GovernanceMethod } from '@swaptoshi/governance-module';

export type TokenMethod = Modules.Token.TokenMethod;
export type FeeMethod = Modules.Fee.FeeMethod;
export type NFTMethod = Modules.NFT.NFTMethod;
export type SidechainInteroperabilityMethod = Modules.Interoperability.SidechainInteroperabilityMethod;
export type MainchainInteroperabilityMethod = Modules.Interoperability.MainchainInteroperabilityMethod;

export interface TokenFactoryModuleDependencies {
	tokenMethod: TokenMethod;
	feeMethod: FeeMethod;
	nftMethod: NFTMethod;
	interoperabilityMethod: SidechainInteroperabilityMethod | MainchainInteroperabilityMethod;
	dexMethod?: DexMethod;
	feeConversionMethod?: FeeConversionMethod;
	governanceMethod?: GovernanceMethod;
}
