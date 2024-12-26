import { describe, it, expect } from 'vitest';
import * as AppStore from './app_store';

describe('AppStore', () => {
  it('should initialize with empty todos', () => {
    const store = AppStore.create({ todos: [] });
    expect(store.getState().todos).toEqual([]);
  });

  it('should initialize with provided todos', () => {
    const todo = { id: Symbol(), text: 'Initial todo', completed: false };
    const store = AppStore.create({ todos: [todo] });
    expect(store.getState().todos).toEqual([todo]);
  });

  describe('addTodo', () => {
    it('should add a new todo', () => {
      const store = AppStore.create({ todos: [] });
      store.addTodo('Test todo');
      const state = store.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('Test todo');
      expect(state.todos[0].completed).toBe(false);
    });

    it('should not add empty todos', () => {
      const store = AppStore.create({ todos: [] });
      store.addTodo('');
      store.addTodo('   ');
      expect(store.getState().todos).toHaveLength(0);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle todo completion status and not affect other todos', () => {
      const store = AppStore.create({ todos: [] });
      store.addTodo('First todo');
      store.addTodo('Second todo');
      const [todo1] = store.getState().todos;
      
      store.toggleTodo(todo1.id);
      const state = store.getState();
      expect(state.todos[0].completed).toBe(true); // First todo toggled
      expect(state.todos[1].completed).toBe(false); // Second todo unchanged
      expect(state.todos[1].text).toBe('Second todo'); // Second todo text unchanged
    });

    it('should not throw when toggling non-existent todo', () => {
      const store = AppStore.create({ todos: [] });
      expect(() => store.toggleTodo(Symbol())).not.toThrow();
    });
  });

  describe('removeTodo', () => {
    it('should remove a todo', () => {
      const store = AppStore.create({ todos: [] });
      store.addTodo('Test todo');
      const todo = store.getState().todos[0];
      
      store.removeTodo(todo.id);
      expect(store.getState().todos).toHaveLength(0);
    });

    it('should not throw when removing non-existent todo', () => {
      const store = AppStore.create({ todos: [] });
      expect(() => store.removeTodo(Symbol())).not.toThrow();
    });
  });

  describe('subscribe', () => {
    it('should notify subscribers of state changes', () => {
      const store = AppStore.create({ todos: [] });
      const actions: AppStore.Action[] = [];
      
      store.subscribe((action) => {
        actions.push(action);
      });

      store.addTodo('Test todo');
      const todo = store.getState().todos[0];
      store.toggleTodo(todo.id);
      store.removeTodo(todo.id);

      expect(actions).toHaveLength(3);
      expect(actions[0].type).toBe('todoAdded');
      expect(actions[1].type).toBe('todoUpdated');
      expect(actions[2].type).toBe('todoRemoved');
    });

    it('should notify multiple subscribers', () => {
      const store = AppStore.create({ todos: [] });
      const actions1: AppStore.Action[] = [];
      const actions2: AppStore.Action[] = [];

      store.subscribe((action) => actions1.push(action));
      store.subscribe((action) => actions2.push(action));

      store.addTodo('Test todo');

      expect(actions1).toHaveLength(1);
      expect(actions2).toHaveLength(1);
      expect(actions1[0]).toEqual(actions2[0]);
    });

    it('should allow unsubscribing', () => {
      const store = AppStore.create({ todos: [] });
      const actions: AppStore.Action[] = [];

      const unsubscribe = store.subscribe((action) => actions.push(action));
      store.addTodo('First todo');
      expect(actions).toHaveLength(1);

      unsubscribe();
      store.addTodo('Second todo');
      expect(actions).toHaveLength(1); // Still 1 because we unsubscribed
    });

    it('should handle multiple unsubscribes correctly', () => {
      const store = AppStore.create({ todos: [] });
      const actions1: AppStore.Action[] = [];
      const actions2: AppStore.Action[] = [];

      const unsubscribe1 = store.subscribe((action) => actions1.push(action));
      const unsubscribe2 = store.subscribe((action) => actions2.push(action));

      store.addTodo('First todo');
      expect(actions1).toHaveLength(1);
      expect(actions2).toHaveLength(1);

      unsubscribe1();
      store.addTodo('Second todo');
      expect(actions1).toHaveLength(1); // Unsubscribed, so no change
      expect(actions2).toHaveLength(2); // Still subscribed

      unsubscribe2();
      store.addTodo('Third todo');
      expect(actions1).toHaveLength(1); // Still unsubscribed
      expect(actions2).toHaveLength(2); // Now also unsubscribed
    });

    it('should handle unsubscribe of non-existent subscriber safely', () => {
      const store = AppStore.create({ todos: [] });
      const subscriber1 = (_action: AppStore.Action) => {};
      const subscriber2 = (_action: AppStore.Action) => {};
      
      // Subscribe both subscribers
      const unsubscribe1 = store.subscribe(subscriber1);
      const unsubscribe2 = store.subscribe(subscriber2);

      // Unsubscribe the first one
      unsubscribe1();
      
      // Add a todo to verify subscriber2 still gets notifications
      store.addTodo('Test todo');

      // Try to unsubscribe subscriber1 again (should handle -1 index)
      expect(() => unsubscribe1()).not.toThrow();
      
      // Unsubscribe subscriber2
      unsubscribe2();
      
      // Try to unsubscribe both again (should handle empty subscribers array)
      expect(() => {
        unsubscribe1();
        unsubscribe2();
      }).not.toThrow();
    });
  });
});
