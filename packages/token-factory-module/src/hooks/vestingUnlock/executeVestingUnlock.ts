import { Modules, StateMachine } from 'klayr-framework';
import { mutableBlockHookFactoryContext } from '../../stores/context';
import { VestingUnlockStore } from '../../stores/vesting_unlock';

export async function executeVestingUnlock(this: { stores: Modules.NamedRegistry; events: Modules.NamedRegistry }, ctx: StateMachine.BlockExecuteContext) {
	const context = mutableBlockHookFactoryContext(ctx);
	const vesting = await this.stores.get(VestingUnlockStore).getInstance(context);
	await vesting.unlock();
}
