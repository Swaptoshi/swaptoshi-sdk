import { Modules } from 'klayr-framework';

export const getGovernableConfigPrefix = (moduleName: string, storeIndex: number) => Buffer.concat([Modules.computeStorePrefix(moduleName), Modules.computeSubstorePrefix(storeIndex)]);
