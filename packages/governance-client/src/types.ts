export interface TransactionParam<T> {
	fee?: bigint;
	params: T;
}

export interface GetRegisteredGovernableConfigResponse {
	modules: string[];
}

export interface GetBaseVoteScoreResponse {
	score: string;
}

export interface GetProposalResponse {
	title: string;
	summary: string;
	deposited: string;
	author: string;
	turnout: {
		for: string;
		against: string;
		abstain: string;
	};
	parameters: {
		createdHeight: number;
		startHeight: number;
		quorumHeight: number;
		endHeight: number;
		executionHeight: number;
		maxBoostDuration: number;
		boostFactor: number;
		enableBoosting: boolean;
		enableTurnoutBias: boolean;
		quorumMode: number;
		quorumTreshold: string;
	};
	voteSummary: {
		for: string;
		against: string;
		abstain: string;
	};
	status: number;
	actions: {
		type: 'funding' | 'config';
		payload: string;
	}[];
	attributes: {
		key: string;
		data: string;
	}[];
}

export interface GetDelegatedVoteResponse {
	outgoingDelegation: string;
	incomingDelegation: string[];
}
