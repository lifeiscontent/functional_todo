/**
 * Represents a todo item in the application
 * @interface Todo
 */
export interface Todo {
  /** Unique identifier for the todo item */
  id: symbol;
  /** Text content of the todo item */
  text: string;
  /** Whether the todo item is completed */
  completed: boolean;
}
