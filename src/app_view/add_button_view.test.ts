import { describe, it, expect } from 'vitest';
import * as AddButtonView from './add_button_view';

describe('AddButtonView', () => {
  it('should create add button view', () => {
    const view = AddButtonView.create();

    expect(view.addButton).toBeInstanceOf(HTMLButtonElement);
    expect(view.addButton.type).toBe('submit');
    expect(view.addButton.textContent).toBe('Add');
    expect(view.addButton.style.backgroundColor).toBe('rgb(241, 241, 241)');
  });

  it('should handle hover and focus events', () => {
    const view = AddButtonView.create();
    
    // Initial state
    expect(view.addButton.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.addButton.style.borderColor).toBe('transparent');

    // Hover state
    view.addButton.dispatchEvent(new Event('mouseover'));
    expect(view.addButton.style.backgroundColor).toBe('rgb(230, 230, 230)');
    expect(view.addButton.style.borderColor).toBe('#8a8a8a');

    // Focus state
    view.addButton.dispatchEvent(new Event('focus'));
    expect(view.addButton.style.backgroundColor).toBe('rgb(230, 230, 230)');
    expect(view.addButton.style.borderColor).toBe('#8a8a8a');

    // Back to initial state
    view.addButton.dispatchEvent(new Event('blur'));
    expect(view.addButton.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.addButton.style.borderColor).toBe('transparent');

    view.addButton.dispatchEvent(new Event('mouseout'));
    expect(view.addButton.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.addButton.style.borderColor).toBe('transparent');
  });
});
