# [todo-app](https://todo-app-0xty.onrender.com/)
fullstack ToDo app

## Backend

- express
- mongoDB: mongoose
	- document based (NoSQL - not relational with the tables like Postgres ...)
- dotenv
- cors (middleware)

- dev:
	- nodemon


## Frontend

- vite
- react

- shadcn (lib of React components styled in tailwindcss): need to use jsconfig.json instead of tsconfig

- react-router
- sonner (for Toaster pop-up notification)
- axios	(lib API send-receive): easier to call, auto post json and set header
- lucide-react (icon)

- tailwindcss

- background: https://patterncraft.fun/


## Connect front and back (only in dev with localhost)

- error CORS (Cross-origin resource sharing) because Chrome doesn't allow front and back in 2 different domains => use `cors` middleware for backend
- or add proxy to vite.config.js
