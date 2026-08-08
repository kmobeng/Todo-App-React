# Todo App

A task management frontend built with React + TypeScript + Vite.

## Features

- Add tasks
- Mark tasks complete/incomplete (persisted via the API)
- Delete tasks with an inline confirmation
- Loading spinner, empty state, and dismissible error banner
- Live date display that auto-updates at midnight

## Tech stack

- React 19
- TypeScript
- Vite
- CSS

## Project structure

```
todo-react/
  src/
    components/   # UI components (Header, TodoForm, TodoList, Todo, ErrorBanner)
    hooks/        # useTodos, useCurrentDate
    types.ts      # shared Todo type
    App.tsx       # app composition
    main.tsx      # entry point
```

## Getting started

**Prerequisite:** Node.js.

```sh
npm install
npm run dev
```

Vite starts with `--host` and prints a local URL to open.

> Note: the app expects a REST API at `http://localhost:8000/api` to be running, otherwise todos won't load and an error banner is shown.

## Available scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build for production   |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview the production build          |
