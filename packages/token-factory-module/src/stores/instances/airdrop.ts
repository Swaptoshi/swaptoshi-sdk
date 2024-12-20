/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Modules, Types } from 'klayr-framework';
import * as utils from '@klayr/utils';
import { AirdropCreateParams, AirdropDistributeParams, AirdropEditRecipientsParams, AirdropStoreData } from '../../types';
import { FactoryStore } from '../factory';
import { BaseInstance } from './base';
import { AirdropStore } from '../airdrop';
import { object, verify } from '@swaptoshi/utils';
import { AirdropCreatedEvent } from '../../events/airdrop_created';
import { AirdropRecipientsChangedEvent } from '../../events/airdrop_recipients_changed';
import { AirdropDistributedEvent } from '../../events/airdrop_distributed';
import { TokenFactoryGovernableConfig } from '../../config';

export class Airdrop extends BaseInstance<AirdropStoreData, AirdropStore> implements AirdropStoreData {
	public constructor(
		stores: Modules.NamedRegistry,
		events: Modules.NamedRegistry,
		config: TokenFactoryGovernableConfig,
		genesisConfig: Types.GenesisConfig,
		moduleName: string,
		airdrop: AirdropStoreData,
		tokenId: Buffer,
		providerAddress: Buffer,
	) {
		super(AirdropStore, stores, events, config, genesisConfig, moduleName, Buffer.concat([tokenId, providerAddress]));

		Object.assign(this, utils.objects.cloneDeep(airdrop));

		this.factoryStore = stores.get(FactoryStore);
	}

	public toJSON() {
		return utils.objects.cloneDeep(
			object.serializer<AirdropStoreData>({
				recipients: this.recipients,
			}),
		) as Types.JSONObject<AirdropStoreData>;
	}

	public toObject() {
		return utils.objects.cloneDeep({
			recipients: this.recipients,
		} as AirdropStoreData) as AirdropStoreData;
	}

	public async verifyCreate(params: AirdropCreateParams) {
		this._checkImmutableDependencies();
		verify.verifyToken('tokenId', params.tokenId);
		verify.verifyAddress('providerAddress', params.providerAddress);
		this._verifyRecipientsParam(params.recipients, true);

		await this._checkFactoryOwner(params.tokenId);
	}

	public async create(params: AirdropCreateParams, verify = true) {
		this._checkMutableDependencies();

		if (verify) await this.verifyCreate(params);

		await this._registerAirdrop(params);

		const events = this.events.get(AirdropCreatedEvent);
		events.add(
			this.mutableContext!.context,
			{
				tokenId: params.tokenId,
				providerAddress: params.providerAddress,
			},
			[params.providerAddress],
		);
	}

	public async verifyEditRecipients(params: AirdropEditRecipientsParams) {
		this._checkImmutableDependencies();
		verify.verifyToken('tokenId', params.tokenId);
		this._verifyRecipientsParam(params.recipients);

		await this._checkAirdropExists(params.tokenId, this.immutableContext!.senderAddress);
	}

	public async editRecipients(params: AirdropEditRecipientsParams, verify = true) {
		this._checkMutableDependencies();

		if (verify) await this.verifyEditRecipients(params);

		for (const recipient of params.recipients) {
			const index = this.recipients.findIndex(t => Buffer.compare(t.address, recipient.address) === 0);
			if (index >= 0) {
				this.recipients[index].amount += recipient.amountDelta;
				if (this.recipients[index].amount < BigInt(0))
					throw new Error(
						`total airdrop amount can't be negative, airdrop amount for address ${this.recipients[index].address.toString('hex')} is ${this.recipients[index].amount.toString()}`,
					);
				if (this.recipients[index].amount === BigInt(0)) this.recipients.splice(index, 1);
			} else {
				if (recipient.amountDelta < BigInt(0))
					throw new Error(`total airdrop amount can't be negative, airdrop amount for address ${recipient.address.toString('hex')} is ${recipient.amountDelta.toString()}`);
				this.recipients.push({ address: recipient.address, amount: recipient.amountDelta });
			}
			const events = this.events.get(AirdropRecipientsChangedEvent);
			events.add(
				this.mutableContext!.context,
				{
					tokenId: params.tokenId,
					recipientAddress: recipient.address,
					amountDelta: recipient.amountDelta,
				},
				[recipient.address],
			);
		}

		await this._saveStore();
	}

	public async verifyDistribute(params: AirdropDistributeParams) {
		this._checkImmutableDependencies();
		verify.verifyToken('tokenId', params.tokenId);

		await this._checkAirdropExists(params.tokenId, this.immutableContext!.senderAddress);
		await this._checkProviderBalance(params);
	}

	public async distribute(params: AirdropDistributeParams, verify = true) {
		this._checkMutableDependencies();

		if (verify) await this.verifyDistribute(params);

		for (const recipient of this.recipients) {
			await this.tokenMethod!.transfer(this.mutableContext!.context, this.immutableContext!.senderAddress, recipient.address, params.tokenId, recipient.amount);

			const events = this.events.get(AirdropDistributedEvent);
			events.add(
				this.mutableContext!.context,
				{
					tokenId: params.tokenId,
					recipientAddress: recipient.address,
					amount: recipient.amount,
					senderAddress: this.immutableContext!.senderAddress,
				},
				[recipient.address, this.immutableContext!.senderAddress],
			);
		}

		this.recipients = [];
		await this._saveStore();
	}

	private async _registerAirdrop(params: AirdropCreateParams): Promise<void> {
		if (await this._isAirdropExists(params.tokenId, params.providerAddress))
			throw new Error(`airdrop for ${params.tokenId.toString('hex')} with provider ${params.providerAddress.toString('hex')} already registered`);

		this._setKey(Buffer.concat([params.tokenId, params.providerAddress]));
		this.recipients = params.recipients.map(t => ({
			address: t.address,
			amount: t.amountDelta,
		}));

		await this._saveStore();
	}

	private async _checkAirdropExists(tokenId: Buffer, address: Buffer) {
		if (!(await this._isAirdropExists(tokenId, address))) throw new Error(`airdrop for ${tokenId.toString('hex')} with provider ${address.toString('hex')} is not exists`);
	}

	private async _checkProviderBalance(params: AirdropDistributeParams) {
		this._checkImmutableDependencies();
		const balance = await this.tokenMethod!.getAvailableBalance(this.immutableContext!.context, this.immutableContext!.senderAddress, params.tokenId);
		const totalAirdrop = this._getTotalAirdrop();
		if (balance < totalAirdrop) throw new Error(`provider balance is not sufficient to distribute airdrops`);
	}

	private _getTotalAirdrop() {
		let totalAirdrop = BigInt(0);

		for (const recipient of this.recipients) {
			totalAirdrop += recipient.amount;
		}

		return totalAirdrop;
	}

	private async _checkFactoryOwner(tokenId: Buffer) {
		this._checkImmutableDependencies();
		const factory = await this.factoryStore.getImmutableFactory(this.immutableContext!, tokenId);
		if (!(await factory.isFactoryOwner())) throw new Error('sender is not factory owner');
	}

	private async _isAirdropExists(tokenId: Buffer, providerAddress: Buffer) {
		return this.instanceStore.has(this.immutableContext!.context, Buffer.concat([tokenId, providerAddress]));
	}

	private _verifyRecipientsParam(recipients: AirdropEditRecipientsParams['recipients'], positiveAmount = false) {
		for (const recipient of recipients) {
			verify.verifyAddress('recipients.address', recipient.address);
			if (positiveAmount) verify.verifyPositiveNumber('recipients.amountDelta', recipient.amountDelta);
		}
	}

	public recipients: AirdropStoreData['recipients'] = [];

	private readonly factoryStore: FactoryStore;
}
