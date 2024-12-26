import type * as AppStore from "./app_store";
import { Todo } from "./todo";
import * as TodoItemView from "./todo_item_view";

export function create(appStore: ReturnType<typeof AppStore.create>) {
  const container = document.createElement("div");
  container.style.maxWidth = "400px";
  container.style.margin = "0 auto";
  container.style.fontFamily = "sans-serif";
  container.style.padding = "1rem";

  document.body.appendChild(container);

  const heading = document.createElement("h1");
  heading.textContent = "Functional & Immutable Todo";
  heading.style.textAlign = "center";
  container.appendChild(heading);

  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.marginBottom = "1rem";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "What needs to be done?";
  input.style.flex = "1";
  input.style.padding = "8px";
  input.style.marginRight = "8px";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";
  addButton.style.padding = "8px 16px";

  form.appendChild(input);
  form.appendChild(addButton);
  container.appendChild(form);

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.paddingLeft = "0";
  container.appendChild(ul);

  const todoItemViews: Map<
    Todo["id"],
    ReturnType<typeof TodoItemView.create>
  > = new Map();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      appStore.addTodo(input.value);
      input.value = "";
    }
  });

  appStore.subscribe((event) => {
    switch (event.type) {
      case "todoAdded": {
        const todoItemView = TodoItemView.create(
          event.todo,
          appStore.toggleTodo,
          appStore.removeTodo
        );
        ul.appendChild(todoItemView.li);
        todoItemViews.set(event.todo.id, todoItemView);
        break;
      }

      case "todoUpdated": {
        const todoItemView = todoItemViews.get(event.todo.id);
        if (!todoItemView) return;
        TodoItemView.update(todoItemView, event.todo);
        break;
      }

      case "todoRemoved": {
        const todoItemView = todoItemViews.get(event.id);
        if (!todoItemView) return;
        TodoItemView.remove(todoItemView);
        todoItemViews.delete(event.id);
        break;
      }

      default: {
        throw new Error(`Unknown event type: ${event}`);
      }
    }
  });

  appStore.getState().todos.forEach((todo) => {
    const todoItemView = TodoItemView.create(todo, appStore.toggleTodo, appStore.removeTodo);
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
