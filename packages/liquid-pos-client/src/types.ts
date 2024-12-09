export interface TransactionParam<T> {
	fee?: bigint;
	params: T;
}

export interface GetLSTTokenIDResponse {
	tokenID: string;
}
