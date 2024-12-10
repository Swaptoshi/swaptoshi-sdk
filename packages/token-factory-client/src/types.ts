export interface TransactionParam<T> {
	fee?: bigint;
	params: T;
}

export interface GetICOPoolResponse {
	providerAddress: string;
	price: string;
	poolAddress: string;
}

export interface QuoteICOExactInputResponse {
	amountOut: string;
}

export interface QuoteICOExactInputSingleResponse {
	amountOut: string;
}

export interface QuoteICOExactOutputResponse {
	amountIn: string;
}

export interface QuoteICOExactOutputSingleResponse {
	amountIn: string;
}

export interface GetAirdropResponse {
	recipients: {
		address: string;
		amount: string;
	}[];
}

export interface GetFactoryResponse {
	owner: string;
	attributesArray: {
		key: string;
		attributes: string;
	}[];
}

export interface GetNextAvailableTokenIdResponse {
	nextTokenId: string;
}

export interface GetVestingUnlockResponse {
	toBeUnlocked: {
		tokenId: string;
		address: string;
		amount: string;
	}[];
}
