/** Interface representing the input view component */
export type t = {
  /** The HTML input element for todo text entry */
  input: HTMLInputElement;
};

/** Creates and returns a new input view component */
export function create(): t {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'What needs to be done?';
  input.style.flex = '1';
  input.style.padding = '8px';
  input.style.marginRight = '8px';
  input.style.borderRadius = '8px';
  input.style.border = '1px solid transparent';
  input.style.fontSize = '1em';
  input.style.fontFamily = 'inherit';
  input.style.backgroundColor = '#f1f1f1';

  input.addEventListener('focus', hover);
  input.addEventListener('mouseover', hover);
  input.addEventListener('blur', initial);
  input.addEventListener('mouseout', initial);

  return {
    input,
  };
}

/** Handles initial/default state styling for the input
 * @param this - The HTML input element
 */
function initial(this: HTMLInputElement) {
  this.style.backgroundColor = '#f1f1f1';
  this.style.borderColor = 'transparent';
}

/** Handles hover and focus state styling for the input
 * @param this - The HTML input element
 */
function hover(this: HTMLInputElement) {
  this.style.backgroundColor = '#e6e6e6';
  this.style.borderColor = '#8a8a8a';
}
