import { Todo } from "./todo";

interface AppStoreState {
  todos: Todo[];
}

type AppStoreEvent =
  | { type: "todoAdded"; todo: Todo }
  | { type: "todoUpdated"; todo: Todo }
  | { type: "todoRemoved"; id: Todo["id"] };

type AppStoreListener = (event: AppStoreEvent) => void;

export function create(initialState: AppStoreState) {
  let state = initialState;
  const appListeners: AppStoreListener[] = [];

  const publish = (event: AppStoreEvent) => {
    switch (event.type) {
      case "todoAdded": {
        state = {
          ...state,
          todos: [...state.todos, event.todo],
        };
        break;
      }
      case "todoUpdated": {
        state = {
          ...state,
          todos: state.todos.map((t) =>
            t.id === event.todo.id ? event.todo : t
          ),
        };
        break;
      }
      case "todoRemoved": {
        state = {
          ...state,
          todos: state.todos.filter((t) => t.id !== event.id),
        };
        break;
      }
      default: {
        throw new Error(`Unknown event type: ${event}`);
      }
    }
    for (const listener of appListeners) {
      listener(event);
    }
  };

  return {
    getState: (): Readonly<AppStoreState> => state,
    subscribe: (listener: AppStoreListener) => {
      appListeners.push(listener);
    },
    addTodo: (text: string) => {
      if (!text.trim()) return;

      const newTodo: Todo = {
        id: Symbol(),
        text: text.trim(),
        completed: false,
      };

      publish({ type: "todoAdded", todo: newTodo });
    },
    toggleTodo: (id: Todo["id"]) => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return;

      publish({
        type: "todoUpdated",
        todo: { ...todo, completed: !todo.completed },
      });
    },
    removeTodo: (id: Todo["id"]) => {
      const idx = state.todos.findIndex((t) => t.id === id);
      if (idx === -1) return;
      publish({ type: "todoRemoved", id });
    },
  };
}
