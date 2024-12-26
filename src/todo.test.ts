import { describe, it, expect } from 'vitest';
import type { Todo } from './todo';

describe('Todo', () => {
  it('should type check todo implementation', () => {
    const todo: Todo = {
      id: Symbol(),
      text: 'Test todo',
      completed: false,
    };

    expect(typeof todo.id).toBe('symbol');
    expect(typeof todo.text).toBe('string');
    expect(typeof todo.completed).toBe('boolean');
  });
});
