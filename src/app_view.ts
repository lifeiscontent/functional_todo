/** Main application view module */
import type * as AppStore from './app_store';
import { Todo } from './todo';
import * as TodoItemView from './todo_item_view';
import * as AddButtonView from './app_view/add_button_view';
import * as InputView from './app_view/input_view';

/** Main application view structure */
export type t = {
  /** Button for adding new todos */
  addButton: HTMLButtonElement;
  /** Main container div */
  container: HTMLDivElement;
  /** Form for todo input */
  form: HTMLFormElement;
  /** Main heading */
  heading: HTMLHeadingElement;
  /** Input field for new todos */
  input: HTMLInputElement;
  /** List container for todos */
  ul: HTMLUListElement;
};

/**
 * Creates the main application view
 * @param appStore - The application store instance
 * @returns The main application view structure
 */
export function create(appStore: AppStore.t): t {
  const container = document.createElement('div');
  container.style.maxWidth = '1280px';
  container.style.margin = '0 auto';
  container.style.padding = '2rem';
  container.style.textAlign = 'center';
  container.style.fontFamily =
    'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';

  document.body.appendChild(container);

  const heading = document.createElement('h1');
  heading.textContent = 'Functional & Immutable Todo';
  heading.style.fontSize = '3.2em';
  heading.style.lineHeight = '1.1';
  heading.style.textAlign = 'center';
  container.appendChild(heading);

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.marginBottom = '1rem';

  const { input } = InputView.create();

  const { addButton } = AddButtonView.create();

  form.appendChild(input);
  form.appendChild(addButton);
  container.appendChild(form);

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.paddingLeft = '0';
  container.appendChild(ul);

  const todoItemViews: Map<Todo['id'], TodoItemView.t> = new Map();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      appStore.addTodo(input.value);
      input.value = '';
    }
  });

  appStore.subscribe((action) => {
    switch (action.type) {
      case 'todoAdded': {
        const todoItemView = TodoItemView.create(
          action.todo,
          appStore.toggleTodo,
          appStore.removeTodo,
        );
        ul.appendChild(todoItemView.li);
        todoItemViews.set(action.todo.id, todoItemView);
        break;
      }

      case 'todoUpdated': {
        const todoItemView = todoItemViews.get(action.todo.id);
        if (!todoItemView) return;
        TodoItemView.update(todoItemView, action.todo);
        break;
      }

      case 'todoRemoved': {
        const todoItemView = todoItemViews.get(action.id);
        if (!todoItemView) return;
        TodoItemView.remove(todoItemView);
        todoItemViews.delete(action.id);
        break;
      }

      default: {
        throw new Error(`Unknown action: ${action}`);
      }
    }
  });

  appStore.getState().todos.forEach((todo) => {
    const todoItemView = TodoItemView.create(
      todo,
      appStore.toggleTodo,
      appStore.removeTodo,
    );
    ul.appendChild(todoItemView.li);
    todoItemViews.set(todo.id, todoItemView);
  });

  return {
    addButton,
    container,
    form,
    heading,
    input,
    ul,
  };
}
