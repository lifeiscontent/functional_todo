import { describe, it, expect } from 'vitest';
import * as InputView from './input_view';

describe('InputView', () => {
  it('should create input view', () => {
    const view = InputView.create();

    expect(view.input).toBeInstanceOf(HTMLInputElement);
    expect(view.input.type).toBe('text');
    expect(view.input.placeholder).toBe('What needs to be done?');
    expect(view.input.style.backgroundColor).toBe('rgb(241, 241, 241)');
  });

  it('should handle hover and focus events', () => {
    const view = InputView.create();

    // Initial state
    expect(view.input.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.input.style.borderColor).toBe('transparent');

    // Hover state
    view.input.dispatchEvent(new Event('mouseover'));
    expect(view.input.style.backgroundColor).toBe('rgb(230, 230, 230)');
    expect(view.input.style.borderColor).toBe('#8a8a8a');

    // Focus state
    view.input.dispatchEvent(new Event('focus'));
    expect(view.input.style.backgroundColor).toBe('rgb(230, 230, 230)');
    expect(view.input.style.borderColor).toBe('#8a8a8a');

    // Back to initial state
    view.input.dispatchEvent(new Event('blur'));
    expect(view.input.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.input.style.borderColor).toBe('transparent');

    view.input.dispatchEvent(new Event('mouseout'));
    expect(view.input.style.backgroundColor).toBe('rgb(241, 241, 241)');
    expect(view.input.style.borderColor).toBe('transparent');
  });
});
