import { describe, it, expect, vi } from 'vitest';
import * as TodoItemView from './todo_item_view';
import type { Todo } from './todo';

describe('TodoItemView', () => {
  it('should create todo item view with uncompleted todo', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);

    expect(view.li).toBeInstanceOf(HTMLLIElement);
    expect(view.checkbox).toBeInstanceOf(HTMLInputElement);
    expect(view.checkbox.type).toBe('checkbox');
    expect(view.checkbox.checked).toBe(false);
    expect(view.label).toBeInstanceOf(HTMLLabelElement);
    expect(view.label.textContent).toBe('Test todo');
    expect(view.label.style.textDecoration).toBe('none');
    expect(view.deleteButton).toBeInstanceOf(HTMLButtonElement);
  });

  it('should create todo item view with completed todo', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: true };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);
    expect(view.label.style.textDecoration).toBe('line-through');
    expect(view.checkbox.checked).toBe(true);
  });

  it('should handle checkbox change', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);
    view.checkbox.dispatchEvent(new Event('change'));

    expect(onToggle).toHaveBeenCalledWith(todo.id);
  });

  it('should handle delete button click', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);
    view.deleteButton.dispatchEvent(new Event('click'));

    expect(onRemove).toHaveBeenCalledWith(todo.id);
  });

  it('should update todo item view', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);
    TodoItemView.update(view, { ...todo, completed: true, text: 'Updated todo' });

    expect(view.checkbox.checked).toBe(true);
    expect(view.label.textContent).toBe('Updated todo');
    expect(view.label.style.textDecoration).toBe('line-through');

    // Test updating back to uncompleted
    TodoItemView.update(view, { ...todo, completed: false, text: 'Updated again' });
    expect(view.checkbox.checked).toBe(false);
    expect(view.label.style.textDecoration).toBe('none');
  });

  it('should remove todo item view', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onToggle = vi.fn();
    const onRemove = vi.fn();

    const view = TodoItemView.create(todo, onToggle, onRemove);
    document.body.appendChild(view.li);
    expect(document.body.contains(view.li)).toBe(true);

    TodoItemView.remove(view);
    expect(document.body.contains(view.li)).toBe(false);
  });
});
