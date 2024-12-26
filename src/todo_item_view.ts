/** View module for individual todo items */
import type { Todo } from './todo';
import * as DeleteButtonView from './todo_item_view/delete_button_view';

/** Todo item view component structure */
export type t = {
  /** Checkbox input element for completing/uncompleting todo */
  checkbox: HTMLInputElement;
  /** Button element for deleting todo */
  deleteButton: HTMLButtonElement;
  /** Label element containing checkbox and text */
  label: HTMLLabelElement;
  /** List item container element */
  li: HTMLLIElement;
  /** Text node containing todo text */
  textNode: Text;
};

/**
 * Creates a new todo item view
 * @param todo - The todo item data
 * @param onToggle - Callback function for toggling todo completion
 * @param onRemove - Callback function for removing todo
 * @returns Todo item view structure
 */
export function create(
  todo: Todo,
  onToggle: (id: Todo['id']) => void,
  onRemove: (id: Todo['id']) => void,
): t {
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.marginBottom = '0.5rem';

  const label = document.createElement('label');
  label.style.flex = '1';
  label.style.cursor = 'pointer';
  label.style.fontFamily =
    'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '8px';
  checkbox.checked = todo.completed;
  checkbox.style.cursor = 'pointer';

  checkbox.addEventListener('change', () => onToggle(todo.id));

  const textNode = document.createTextNode(todo.text);

  label.appendChild(checkbox);
  label.appendChild(textNode);

  label.style.textDecoration = todo.completed ? 'line-through' : 'none';

  const { deleteButton } = DeleteButtonView.create(todo, onRemove);

  li.appendChild(label);
  li.appendChild(deleteButton);

  return {
    checkbox,
    deleteButton,
    label,
    li,
    textNode,
  };
}

/**
 * Updates an existing todo item view
 * @param view - The todo item view to update
 * @param todo - Updated todo data
 */
export function update(view: t, todo: Todo) {
  view.textNode.nodeValue = todo.text;
  view.checkbox.checked = todo.completed;
  view.label.style.textDecoration = todo.completed ? 'line-through' : 'none';
}

/**
 * Removes a todo item view from the DOM
 * @param view - The todo item view to remove
 */
export function remove(view: t) {
  view.li.remove();
}
