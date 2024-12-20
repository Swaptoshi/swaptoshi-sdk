import { GovernableConfigSchema } from '@swaptoshi/governance-module';
import { DexModuleConfig } from '../types';

export const configSchema: GovernableConfigSchema<DexModuleConfig> = {
	$id: '/dex/config',
	type: 'object',
	required: ['feeAmountTickSpacing', 'feeProtocol', 'feeProtocolPool', 'feeConversionEnabled', 'supportAllTokens', 'minTransactionFee', 'baseFee', 'nftPositionMetadata', 'nftPositionColorRange'],
	properties: {
		feeAmountTickSpacing: {
			type: 'array',
			fieldNumber: 1,
			items: {
				type: 'object',
				required: ['fee', 'tickSpacing'],
				properties: {
					fee: {
						dataType: 'string',
						fieldNumber: 1,
					},
					tickSpacing: {
						dataType: 'string',
						fieldNumber: 2,
					},
				},
			},
		},
		feeProtocol: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
		feeProtocolPool: {
			dataType: 'string',
			fieldNumber: 3,
		},
		feeConversionEnabled: {
			dataType: 'boolean',
			fieldNumber: 4,
		},
		supportAllTokens: {
			dataType: 'boolean',
			fieldNumber: 5,
		},
		minTransactionFee: {
			type: 'object',
			fieldNumber: 6,
			required: ['createPool', 'mint', 'burn', 'collect', 'increaseLiquidity', 'decreaseLiquidity', 'exactInput', 'exactInputSingle', 'exactOutput', 'exactOutputSingle', 'treasurify'],
			properties: {
				createPool: {
					dataType: 'string',
					fieldNumber: 1,
				},
				mint: {
					dataType: 'string',
					fieldNumber: 2,
				},
				burn: {
					dataType: 'string',
					fieldNumber: 3,
				},
				collect: {
					dataType: 'string',
					fieldNumber: 4,
				},
				increaseLiquidity: {
					dataType: 'string',
					fieldNumber: 5,
				},
				decreaseLiquidity: {
					dataType: 'string',
					fieldNumber: 6,
				},
				exactInput: {
					dataType: 'string',
					fieldNumber: 7,
				},
				exactInputSingle: {
					dataType: 'string',
					fieldNumber: 8,
				},
				exactOutput: {
					dataType: 'string',
					fieldNumber: 9,
				},
				exactOutputSingle: {
					dataType: 'string',
					fieldNumber: 10,
				},
				treasurify: {
					dataType: 'string',
					fieldNumber: 11,
				},
			},
		},
		baseFee: {
			type: 'object',
			fieldNumber: 7,
			required: ['createPool', 'mint', 'burn', 'collect', 'increaseLiquidity', 'decreaseLiquidity', 'exactInput', 'exactInputSingle', 'exactOutput', 'exactOutputSingle', 'treasurify'],
			properties: {
				createPool: {
					dataType: 'string',
					fieldNumber: 1,
				},
				mint: {
					dataType: 'string',
					fieldNumber: 2,
				},
				burn: {
					dataType: 'string',
					fieldNumber: 3,
				},
				collect: {
					dataType: 'string',
					fieldNumber: 4,
				},
				increaseLiquidity: {
					dataType: 'string',
					fieldNumber: 5,
				},
				decreaseLiquidity: {
					dataType: 'string',
					fieldNumber: 6,
				},
				exactInput: {
					dataType: 'string',
					fieldNumber: 7,
				},
				exactInputSingle: {
					dataType: 'string',
					fieldNumber: 8,
				},
				exactOutput: {
					dataType: 'string',
					fieldNumber: 9,
				},
				exactOutputSingle: {
					dataType: 'string',
					fieldNumber: 10,
				},
				treasurify: {
					dataType: 'string',
					fieldNumber: 11,
				},
			},
		},
		nftPositionMetadata: {
			type: 'object',
			fieldNumber: 8,
			required: ['dex', 'mainchain'],
			properties: {
				dex: {
					type: 'object',
					fieldNumber: 1,
					required: ['name', 'symbol', 'decimal'],
					properties: {
						name: {
							fieldNumber: 1,
							dataType: 'string',
						},
						symbol: {
							fieldNumber: 2,
							dataType: 'string',
						},
						decimal: {
							fieldNumber: 3,
							dataType: 'uint32',
						},
					},
				},
				mainchain: {
					type: 'object',
					fieldNumber: 2,
					required: ['symbol', 'decimal'],
					properties: {
						symbol: {
							fieldNumber: 1,
							dataType: 'string',
						},
						decimal: {
							fieldNumber: 2,
							dataType: 'uint32',
						},
					},
				},
			},
		},
		nftPositionColorRange: {
			type: 'object',
			fieldNumber: 9,
			required: ['hue', 'saturation', 'lightness'],
			properties: {
				hue: {
					type: 'array',
					fieldNumber: 1,
					items: {
						dataType: 'uint32',
					},
				},
				saturation: {
					type: 'array',
					fieldNumber: 2,
					items: {
						dataType: 'uint32',
					},
				},
				lightness: {
					type: 'array',
					fieldNumber: 3,
					items: {
						dataType: 'uint32',
					},
				},
			},
		},
	},
};
