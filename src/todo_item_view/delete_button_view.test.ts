import { describe, it, expect, vi } from 'vitest';
import * as DeleteButtonView from './delete_button_view';
import type { Todo } from '../todo';

describe('DeleteButtonView', () => {
  it('should create delete button view', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onRemove = vi.fn();
    const view = DeleteButtonView.create(todo, onRemove);

    expect(view.deleteButton).toBeInstanceOf(HTMLButtonElement);
    expect(view.deleteButton.textContent).toBe('x');
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 68, 68)');
  });

  it('should handle hover and focus events', () => {
    const todo: Todo = { id: Symbol(), text: 'Test todo', completed: false };
    const onRemove = vi.fn();
    const view = DeleteButtonView.create(todo, onRemove);

    // Initial state
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 68, 68)');
    expect(view.deleteButton.style.borderColor).toBe('transparent');

    // Hover state
    view.deleteButton.dispatchEvent(new Event('mouseover'));
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 102, 102)');
    expect(view.deleteButton.style.borderColor).toBe('#ff8888');

    // Focus state
    view.deleteButton.dispatchEvent(new Event('focus'));
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 102, 102)');
    expect(view.deleteButton.style.borderColor).toBe('#ff8888');

    // Back to initial state
    view.deleteButton.dispatchEvent(new Event('blur'));
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 68, 68)');
    expect(view.deleteButton.style.borderColor).toBe('transparent');

    view.deleteButton.dispatchEvent(new Event('mouseout'));
    expect(view.deleteButton.style.backgroundColor).toBe('rgb(255, 68, 68)');
    expect(view.deleteButton.style.borderColor).toBe('transparent');
  });
});
