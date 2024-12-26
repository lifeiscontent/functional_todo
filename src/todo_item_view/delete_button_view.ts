import { Todo } from "../todo";

/** Interface representing the delete button view component */
export type t = {
    /** The HTML button element for deleting todos */
    deleteButton: HTMLButtonElement;
};

/** Creates and returns a new delete button view component
 * @param todo - The todo item associated with this delete button
 * @param onRemove - Callback function to handle todo removal
 */
export function create(todo: Todo, onRemove: (id: Todo["id"]) => void): t {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.style.marginLeft = "8px";
  deleteButton.style.borderRadius = "8px";
  deleteButton.style.border = "1px solid transparent";
  deleteButton.style.padding = "0.4em 0.8em";
  deleteButton.style.fontSize = "1em";
  deleteButton.style.fontWeight = "500";
  deleteButton.style.fontFamily = "inherit";
  deleteButton.style.backgroundColor = "#ff4444";
  deleteButton.style.color = "white";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.transition = "border-color 0.25s, background-color 0.25s";

  deleteButton.addEventListener("focus", hover);
  deleteButton.addEventListener("mouseover", hover);
  deleteButton.addEventListener("blur", initial);
  deleteButton.addEventListener("mouseout", initial);

  deleteButton.addEventListener("click", () => onRemove(todo.id));

  return {
    deleteButton,
  };
}

/** Handles hover and focus state styling for the delete button
 * @param this - The HTML button element
 */
function hover(this: HTMLButtonElement) {
  this.style.backgroundColor = "#ff6666";
  this.style.borderColor = "#ff8888";
}

/** Handles initial/default state styling for the delete button
 * @param this - The HTML button element
 */
function initial(this: HTMLButtonElement) {
  this.style.backgroundColor = "#ff4444";
  this.style.borderColor = "transparent";
}