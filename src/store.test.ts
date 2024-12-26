import { describe, it, expect } from 'vitest';
import type { Store } from './store';

describe('Store', () => {
  it('should type check store implementation', () => {
    type TestState = { count: number };
    type TestAction = { type: 'increment' } | { type: 'decrement' };

    const createTestStore = (): Store<TestState, TestAction> => ({
      getState: () => ({ count: 0 }),
      subscribe: (_dispatch: (action: TestAction) => void) => () => {},
    });

    const store = createTestStore();
    expect(store.getState().count).toBe(0);
    const unsubscribe = store.subscribe(() => {});
    expect(typeof unsubscribe).toBe('function');
  });
});
