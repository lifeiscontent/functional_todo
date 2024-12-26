# Functional Todo App

A simple, functional and immutable todo application built with TypeScript demonstrating clean architecture principles and functional programming patterns.

## Project Structure

The project follows a modular architecture with clear separation of concerns:

### `/src/entities`
- Contains the core domain models
- `todo.ts`: Defines the `Todo` interface representing the fundamental todo item structure

### `/src/stores`
- Manages application state and business logic
- `app.ts`: Implements a functional store pattern with immutable state updates and event-based subscriptions

### `/src/views`
- Contains UI components and view logic
- `app.ts`: Main application view that sets up the UI structure and handles user interactions
- `todo-item.ts`: Individual todo item view component with update and remove capabilities

## Architecture

The application follows these key architectural principles:

1. **Immutable State Management**
   - All state updates create new state objects rather than mutating existing ones
   - State changes are handled through a centralized store

2. **Event-Based Architecture**
   - Uses a publish/subscribe pattern for state updates
   - Components subscribe to state changes and update accordingly

3. **Functional Components**
   - UI components are created using pure functions
   - Side effects are isolated and managed through callbacks
   - Clear separation between view logic and state management

4. **Type Safety**
   - Fully typed with TypeScript for better maintainability and developer experience

## Features

- Add new todos
- Toggle todo completion status
- Remove todos
- Clean and minimalist UI
- Responsive design

## Technical Implementation

The application uses vanilla TypeScript and DOM manipulation, demonstrating that complex patterns can be implemented without heavy frameworks. Key technical aspects include:

- Custom store implementation for state management
- Event-driven updates using the publisher/subscriber pattern
- Immutable state updates for predictable behavior
- Type-safe interfaces and function signatures
- Clean separation between UI and business logic
