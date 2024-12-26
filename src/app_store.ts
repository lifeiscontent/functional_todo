import { Store } from "./store";
import { Todo } from "./todo";

/** Application state type */
export type State = { todos: Todo[] };

/** Action types for state mutations */
export type Action =
  | { type: "todoAdded"; todo: Todo }
  | { type: "todoUpdated"; todo: Todo }
  | { type: "todoRemoved"; id: Todo["id"] };

/** Store type with todo-specific actions */
export type t = Store<State, Action> & {
  /** Adds a new todo item */
  addTodo: (text: string) => void;
  /** Removes a todo item by id */
  removeTodo: (id: Todo["id"]) => void;
  /** Toggles the completed state of a todo item */
  toggleTodo: (id: Todo["id"]) => void;
};

/**
 * Creates a new todo application store
 * @param initialState - Initial state for the store
 * @returns A store instance with todo-specific actions
 */
export function create(initialState: State): t {
  let state = initialState;
  const subscribers = new Set<(action: Action) => void>();

  const publish: (action: Action) => void = (action) => {
    for (const subscriber of subscribers) {
      subscriber(action);
    }
  };

  const update = (newState: State, action: Action) => {
    state = newState;
    publish(action);
  };

  const findTodo = (id: Todo["id"]) => state.todos.find((t) => t.id === id);

  return {
    getState: (): Readonly<State> => state,
    subscribe: (subscriber: (action: Action) => void) => {
      subscribers.add(subscriber);
      return () => {
        subscribers.delete(subscriber);
      };
    },
    addTodo: (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText) return;

      const newTodo: Todo = {
        id: Symbol(),
        text: trimmedText,
        completed: false,
      };
      update(
        { ...state, todos: [...state.todos, newTodo] },
        { type: "todoAdded", todo: newTodo }
      );
    },
    toggleTodo: (id: Todo["id"]) => {
      const todo = findTodo(id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };
      update(
        {
          ...state,
          todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        },
        { type: "todoUpdated", todo: updatedTodo }
      );
    },
    removeTodo: (id: Todo["id"]) => {
      if (!findTodo(id)) return;
      update(
        { ...state, todos: state.todos.filter((t) => t.id !== id) },
        { type: "todoRemoved", id }
      );
    },
  };
}
