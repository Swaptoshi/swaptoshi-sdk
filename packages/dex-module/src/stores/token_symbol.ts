/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Modules, Types } from 'klayr-framework';
import { DexModuleConfig, MutableContext, TokenSymbol } from '../types';
import { tokenSymbolStoreSchema } from '../schema';
import { TokenRegisteredEvent } from '../events/token_registered';
import { getDEXToken, getMainchainToken } from '../utils';
import { DexGovernableConfig } from '../config';

export class TokenSymbolStore extends Modules.BaseStore<TokenSymbol> {
	public constructor(moduleName: string, index: number, events: Modules.NamedRegistry) {
		super(moduleName, index);
		this.events = events;
	}

	public init(genesisConfig: Types.GenesisConfig, dexConfig: DexGovernableConfig) {
		this.genesisConfig = genesisConfig;
		this.dexConfig = dexConfig;
		this.dependencyReady = true;
	}

	public getKey(tokenId: Buffer) {
		return tokenId;
	}

	public async registerSymbol(ctx: MutableContext, tokenId: Buffer, symbol: string, decimal: number) {
		this._checkDependencies();
		if (await this.has(ctx, this.getKey(tokenId))) return;

		let _symbol = symbol;
		let _decimal = decimal;

		const config = await this.dexConfig!.getConfig(ctx);

		if (this._isInvalidMainchainToken(tokenId, symbol, decimal, config)) throw new Error('invalid mainchain token parameter');

		if (this._isInvalidDEXToken(tokenId, symbol, decimal, config)) throw new Error('invalid dex token parameter');

		const mainchain = getMainchainToken(this.genesisConfig!, config);
		const dex = getDEXToken(this.genesisConfig!, config);

		if (this.getKey(tokenId).compare(mainchain.tokenId) === 0) {
			_symbol = mainchain.symbol;
			_decimal = mainchain.decimal;
		} else if (this.getKey(tokenId).compare(dex.tokenId) === 0) {
			_symbol = dex.symbol;
			_decimal = dex.decimal;
		}

		await this.set(ctx, this.getKey(tokenId), { symbol: _symbol, decimal: _decimal });

		const events = this.events.get(TokenRegisteredEvent);
		events.add(
			ctx,
			{
				tokenId,
				symbol: _symbol,
				decimal: _decimal,
			},
			[tokenId],
		);
	}

	private _isInvalidMainchainToken(tokenId: Buffer, symbol: string, decimal: number, config: DexModuleConfig) {
		const mainchain = getMainchainToken(this.genesisConfig!, config);
		const isMainchainToken = this.getKey(tokenId).compare(mainchain.tokenId) === 0;

		return (isMainchainToken && (symbol !== mainchain.symbol || decimal !== mainchain.decimal)) || (symbol === mainchain.symbol && (!isMainchainToken || decimal !== mainchain.decimal));
	}

	private _isInvalidDEXToken(tokenId: Buffer, symbol: string, decimal: number, config: DexModuleConfig) {
		const dex = getDEXToken(this.genesisConfig!, config);
		const isDEXToken = this.getKey(tokenId).compare(dex.tokenId) === 0;

		return (isDEXToken && (symbol !== dex.symbol || decimal !== dex.decimal)) || (symbol === dex.symbol && (!isDEXToken || decimal !== dex.decimal));
	}

	private _checkDependencies() {
		if (!this.dependencyReady) {
			throw new Error('dependencies not configured');
		}
	}

	public schema = tokenSymbolStoreSchema;

	private readonly events: Modules.NamedRegistry;

	private dexConfig: DexGovernableConfig | undefined = undefined;
	private genesisConfig: Types.GenesisConfig | undefined = undefined;

	private dependencyReady = false;
}
