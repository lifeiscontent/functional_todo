import { describe, it, expect, vi } from 'vitest';
import * as AppView from './app_view';
import type { Todo } from './todo';
import type * as AppStore from './app_store';

describe('AppView', () => {
  function createMockStore(initialTodos: Todo[] = []) {
    return {
      getState: () => ({ todos: initialTodos }),
      subscribe: vi.fn(
        (_dispatch: (action: AppStore.Action) => void) => () => {},
      ),
      addTodo: vi.fn(),
      removeTodo: vi.fn(),
      toggleTodo: vi.fn(),
    };
  }

  it('should create app view with all elements', () => {
    const view = AppView.create(createMockStore());

    expect(view.container).toBeInstanceOf(HTMLDivElement);
    expect(view.heading).toBeInstanceOf(HTMLHeadingElement);
    expect(view.heading.textContent).toBe('Functional & Immutable Todo');
    expect(view.form).toBeInstanceOf(HTMLFormElement);
    expect(view.input).toBeInstanceOf(HTMLInputElement);
    expect(view.addButton).toBeInstanceOf(HTMLButtonElement);
    expect(view.ul).toBeInstanceOf(HTMLUListElement);
  });

  it('should handle form submission', () => {
    const mockStore = createMockStore();
    const view = AppView.create(mockStore);

    view.input.value = 'Test todo';
    view.form.dispatchEvent(new Event('submit'));

    expect(mockStore.addTodo).toHaveBeenCalledWith('Test todo');
    expect(view.input.value).toBe('');
  });

  it('should not add empty todos', () => {
    const mockStore = createMockStore();
    const view = AppView.create(mockStore);

    view.input.value = '   ';
    view.form.dispatchEvent(new Event('submit'));

    expect(mockStore.addTodo).not.toHaveBeenCalled();
  });

  it('should handle todo actions', () => {
    const mockStore = createMockStore();
    AppView.create(mockStore);

    const subscriber = mockStore.subscribe.mock.calls[0][0];

    // Test todoAdded action
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    subscriber({ type: 'todoAdded', todo });
    expect(document.querySelector('li')).toBeTruthy();

    // Test todoUpdated action
    subscriber({ type: 'todoUpdated', todo: { ...todo, completed: true } });
    const checkbox = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    expect(checkbox?.checked).toBe(true);

    // Test todoRemoved action
    subscriber({ type: 'todoRemoved', id: todo.id });
    expect(document.querySelector('li')).toBeFalsy();
  });

  it('should handle unknown action', () => {
    const mockStore = createMockStore();
    AppView.create(mockStore);

    const subscriber = mockStore.subscribe.mock.calls[0][0];

    expect(() => {
      subscriber({ type: 'unknown' } as any);
    }).toThrow('Unknown action: [object Object]');
  });

  it('should initialize with existing todos', () => {
    const todo: Todo = {
      id: Symbol(),
      text: 'Existing todo',
      completed: false,
    };
    AppView.create(createMockStore([todo]));

    expect(document.querySelectorAll('li').length).toBe(1);
  });

  it('should handle non-existent todo item views', () => {
    const mockStore = createMockStore();
    const view = AppView.create(mockStore);
    const subscriber = mockStore.subscribe.mock.calls[0][0];

    // Add a todo first
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    subscriber({ type: 'todoAdded', todo });

    // Test todoUpdated action with non-existent todo
    const nonExistentTodo: Todo = {
      id: Symbol(),
      text: 'Non-existent',
      completed: false,
    };
    subscriber({ type: 'todoUpdated', todo: nonExistentTodo });
    expect(view.ul.children.length).toBe(1);
    expect(
      view.ul.children[0].querySelector('label')?.textContent?.trim(),
    ).toBe('Test todo');

    // Test todoRemoved action with non-existent todo
    subscriber({ type: 'todoRemoved', id: nonExistentTodo.id });
    expect(view.ul.children.length).toBe(1);
    expect(
      view.ul.children[0].querySelector('label')?.textContent?.trim(),
    ).toBe('Test todo');
  });
});
