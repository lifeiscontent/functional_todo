import type { Todo } from "./todo";

export type t = {
  checkbox: HTMLInputElement;
  deleteBtn: HTMLButtonElement;
  label: HTMLLabelElement;
  li: HTMLLIElement;
  textNode: Text;
}

export function create(
  todo: Todo,
  onToggle: (id: Todo["id"]) => void,
  onRemove: (id: Todo["id"]) => void
): t {
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.alignItems = "center";
  li.style.marginBottom = "0.5rem";

  const label = document.createElement("label");
  label.style.flex = "1";
  label.style.cursor = "pointer";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "8px";
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", () => onToggle(todo.id));

  const textNode = document.createTextNode(todo.text);

  label.appendChild(checkbox);
  label.appendChild(textNode);

  label.style.textDecoration = todo.completed ? "line-through" : "none";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.style.marginLeft = "8px";
  deleteBtn.style.background = "red";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", () => onRemove(todo.id));

  li.appendChild(label);
  li.appendChild(deleteBtn);

  return {
    checkbox,
    deleteBtn,
    label,
    li,
    textNode,
  };
}

export function update(
  view: t,
  todo: Todo
) {
  view.textNode.nodeValue = todo.text;
  view.checkbox.checked = todo.completed;
  view.label.style.textDecoration = todo.completed ? "line-through" : "none";
}

export function remove(view: t) {
  view.li.remove();
}
