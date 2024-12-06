import cryptography from '@klayr/cryptography';

const POOL_ADDRESS_LENGTH = 20;
const TOKEN_ID_LENGTH = 8;
const COLLECTION_ID_LENGTH = 4;

export function verifyString(name: string, string: string) {
	if (string.length === 0) {
		throw new Error(`${name}, cant be an empty string`);
	}
}

export function verifyToken(name: string, token: Buffer) {
	if (token.length !== TOKEN_ID_LENGTH) {
		throw new Error(`${name}, needs to be exactly ${TOKEN_ID_LENGTH} bytes`);
	}
}

export function verifyCollectionId(name: string, collectionId: Buffer) {
	if (collectionId.length !== COLLECTION_ID_LENGTH) {
		throw new Error(`${name}, needs to be exactly ${COLLECTION_ID_LENGTH} bytes`);
	}
}

export function verifyAddress(name: string, address: Buffer) {
	if (address.length !== POOL_ADDRESS_LENGTH) {
		throw new Error(`${name}, needs to be exactly ${POOL_ADDRESS_LENGTH} bytes`);
	}
}

export function verifyPositiveNumber(name: string, number: bigint | number | string) {
	if (BigInt(number) < BigInt(0)) {
		throw new Error(`${name}, must be a positive number`);
	}
}

export function verifyNumberString(name: string, value: string) {
	try {
		BigInt(value);
	} catch {
		throw new Error(`${name} needs to be in number string format`);
	}
}

export function verifyKlayer32Address(name: string, value: string) {
	try {
		cryptography.address.validateKlayr32Address(value);
	} catch {
		throw new Error(`${name} needs to be in Klayr32 string format`);
	}
}

export function verifyNumber(name: string, value: number) {
	if (typeof value !== 'number') {
		throw new Error(`${name}, needs to be a number`);
	}
}

export function verifyBoolean(name: string, value: boolean) {
	if (typeof value !== 'boolean') {
		throw new Error(`${name}, needs to be a boolean`);
	}
}

export function verifyBuffer(name: string, buffer: Buffer) {
	if (buffer.length === 0) {
		throw new Error(`${name}, cant be an empty buffer`);
	}
}
