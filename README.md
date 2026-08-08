# Todo App

A full-stack todo/task manager. React + TypeScript + Vite frontend backed by an Express + MongoDB REST API.

## Features

- Add tasks
- Mark tasks complete/incomplete (persisted to the API)
- Delete tasks with an inline confirmation
- Loading spinner, empty state, and dismissible error banner
- Live date display that auto-updates at midnight

## Tech stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** Express, MongoDB (Mongoose), Zod, Helmet, CORS — in the sibling `server/` directory

## Project structure

```
todo-react/
  src/
    components/   # UI components (Header, TodoForm, TodoList, Todo, ErrorBanner)
    hooks/        # useTodos, useCurrentDate
    types.ts      # shared Todo type
    App.tsx       # app composition
    main.tsx      # entry point
server/           # Express + MongoDB backend (separate project)
  src/
    app.ts        # API routes
    server.ts     # server entry (MongoDB connection + listen)
    model/        # Mongoose models
```

## Getting started

**Prerequisites:** Node.js and a running MongoDB instance on `localhost:27017`.

### 1. Start the backend

```sh
cd server
npm install
npm run dev
```

Requires a `.env` file in `server/`:

```
PORT=8000
DB_URL=mongodb://localhost:27017/todoappreact
```

The server runs on `http://localhost:8000`.

### 2. Start the frontend

```sh
cd todo-react
npm install
npm run dev
```

Vite starts with `--host` and prints a local URL to open.

## Available scripts

| Script      | Description                              |
| ----------- | ---------------------------------------- |
| `npm run dev` | Start the Vite dev server              |
| `npm run build` | Type-check and build for production  |
| `npm run lint`  | Run ESLint                           |
| `npm run preview` | Preview the production build       |

## API

Base URL: `http://localhost:8000/api`

| Method | Endpoint        | Body                          | Description            |
| ------ | --------------- | ----------------------------- | ---------------------- |
| GET    | `/api/todo`     | —                             | List all todos         |
| POST   | `/api/todo`     | `{ "task": "..." }`           | Create a todo (2–100 chars) |
| GET    | `/api/todo/:id` | —                             | Get a single todo      |
| PATCH  | `/api/todo/:id` | `{ "completed": true }`       | Update completion      |
| DELETE | `/api/todo/:id` | —                             | Delete a todo          |
