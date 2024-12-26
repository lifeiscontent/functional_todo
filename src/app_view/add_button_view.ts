/** Interface representing the add button view component */
export type t = {
  /** The HTML button element for adding todos */
  addButton: HTMLButtonElement;
};

/** Creates and returns a new add button view component */
export function create(): t {
  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";
  addButton.style.borderRadius = "8px";
  addButton.style.border = "1px solid transparent";
  addButton.style.padding = "0.6em 1.2em";
  addButton.style.fontSize = "1em";
  addButton.style.fontWeight = "500";
  addButton.style.fontFamily = "inherit";
  addButton.style.backgroundColor = "#f1f1f1";
  addButton.style.cursor = "pointer";
  addButton.style.transition = "border-color 0.25s";

  addButton.addEventListener("focus", hover);
  addButton.addEventListener("mouseover", hover);
  addButton.addEventListener("blur", initial);
  addButton.addEventListener("mouseout", initial);

  return {
    addButton,
  };
}

/** Handles hover and focus state styling for the button
 * @param this - The HTML button element
 */
function hover(this: HTMLButtonElement) {
  this.style.backgroundColor = "#e6e6e6";
  this.style.borderColor = "#8a8a8a";
}

/** Handles initial/default state styling for the button
 * @param this - The HTML button element
 */
function initial(this: HTMLButtonElement) {
  this.style.backgroundColor = "#f1f1f1";
  this.style.borderColor = "transparent";
}
