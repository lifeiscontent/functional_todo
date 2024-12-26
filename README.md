# Functional Todo App

A simple, functional and immutable todo application built with TypeScript demonstrating clean architecture principles and functional programming patterns.

## Project Structure

The project follows a modular architecture with clear separation of concerns:

### `/src`

- `todo.ts`: Core domain model defining the `Todo` interface
- `store.ts`: Generic store interface for state management
- `app_store.ts`: Todo-specific store implementation with state management and actions
- `app_view.ts`: Main application view component
- `app_view/`
  - `add_button_view.ts`: Add button component
  - `input_view.ts`: Input field component
- `todo_item_view.ts`: Individual todo item view component
- `todo_item_view/`
  - `delete_button_view.ts`: Delete button component
- `main.ts`: Application entry point
- `style.css`: Application styles

## Architecture

The application follows these key architectural principles:

1. **Immutable State Management**

   - All state updates create new state objects rather than mutating existing ones
   - State changes are handled through a centralized store
   - Typed actions for predictable state mutations

2. **Event-Based Architecture**

   - Uses a publish/subscribe pattern for state updates
   - Components subscribe to state changes and update accordingly
   - Strong typing ensures type-safe event handling

3. **Functional Components**

   - UI components are created using pure functions
   - Side effects are isolated and managed through callbacks
   - Clear separation between view logic and state management

4. **Type Safety**
   - Comprehensive TSDoc documentation for all interfaces and components
   - Fully typed with TypeScript for better maintainability
   - Type-safe interfaces and function signatures

## Features

- Add new todos with a simple form interface
- Toggle todo completion status with checkbox
- Remove todos with delete button
- Clean and minimalist UI
- Responsive design with centered layout

## Technical Implementation

The application uses vanilla TypeScript and DOM manipulation, demonstrating that complex patterns can be implemented without heavy frameworks. Key technical aspects include:

- Generic store interface for flexible state management
- Event-driven updates using the publisher/subscriber pattern
- Immutable state updates for predictable behavior
- Comprehensive type definitions and TSDoc documentation
- Clean separation between UI and business logic
- Modern styling with flexbox layout
- Modular component structure with dedicated view components
