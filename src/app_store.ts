import { Store } from "./Store";
import { Todo } from "./todo";

export type State = {
  todos: Todo[];
};

export type Action =
  | { type: "todoAdded"; todo: Todo }
  | { type: "todoUpdated"; todo: Todo }
  | { type: "todoRemoved"; id: Todo["id"] };

export type t = Store<State, Action> & {
  addTodo: (text: string) => void;
  removeTodo: (id: Todo["id"]) => void;
  toggleTodo: (id: Todo["id"]) => void;
};

export function create(initialState: State): t {
  let state = initialState;
  const subscribers: ((action: Action) => void)[] = [];

  const dispatch: (action: Action) => void = (action) => {
    for (const subscriber of subscribers) {
      subscriber(action);
    }
  };

  return {
    getState: (): Readonly<State> => state,
    subscribe: (subscriber: (action: Action) => void) => {
      subscribers.push(subscriber);
    },
    addTodo: (text: string) => {
      if (!text.trim()) return;

      const newTodo: Todo = {
        id: Symbol(),
        text: text.trim(),
        completed: false,
      };

      state = {
        ...state,
        todos: [...state.todos, newTodo],
      };

      dispatch({ type: "todoAdded", todo: newTodo });
    },
    toggleTodo: (id: Todo["id"]) => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };

      state = {
        ...state,
        todos: state.todos.map((t) =>
          t.id === updatedTodo.id ? updatedTodo : t
        ),
      };
      dispatch({
        type: "todoUpdated",
        todo: updatedTodo,
      });
    },
    removeTodo: (id: Todo["id"]) => {
      const idx = state.todos.findIndex((t) => t.id === id);
      if (idx === -1) return;
      state = {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
      };
      dispatch({ type: "todoRemoved", id });
    },
  };
}
