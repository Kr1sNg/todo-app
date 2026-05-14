# [My To-Do List 📝](https://todo-app-0xty.onrender.com/)

A modern full-stack Todo application built from scratch with the **MERN Stack**.
This project allows users to manage tasks with full **CRUD operations**, filtering, pagination, statistics, and a responsive UI.

<p align="center">
	<img width="413" height="311" alt="Screenshot 2026-02-05 at 17 55 20" src="https://github.com/user-attachments/assets/57ace70a-b87d-49ac-86cb-1d8f56a2d27d" />
</p>



## 🚀 Live Demo

- 🌐 [My To-Do List Live Application](https://todo-app-0xty.onrender.com/) (deployed directly on Render)
- 🌐 [My To-Do List Live Application](https://todo-list-app-q5m8.onrender.com/) (deployed with Render through a Docker)

---
## ✨ Features

- ✅ Create, Read, Update, Delete (CRUD) todos
- 🌐 REST API architecture
- 🔍 Filter tasks by:
	- state (completed / pending)
	- time/date
- 📄 Pagination system
- 📊 Task Statistics dashboard
- 🔔 Toast notifications
- 📱 Modern Responsive UI
- 🎨 Modern design with Tailwind CSS + shadcn/ui
- ☁️ Free deployment on Render (with 2 different methods)

---
## 🛠 Tech Stack

### Backend

Built with:
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors
- Nodemon

### Frontend

Built with:
- React
- Vite
- Tailwind CSS
- shadcn/ui
	> Notes:
	> shadcn/ui requires using `jsconfig.json` instead of `tsconfig.json` in JavaScript projects.
- React Router
- Axios
- Sonner
- Lucide

Background patterns generated with:
- PatternCraft

---
## 📁 Project Structure

```ASCII Tree
todo-app
├── backend
│   ├── src
│   │   ├── config
│   │   │   ├── db.js
│   │   │   └── middleware.js
│   │   ├── controllers
│   │   │   └── taskControllers.js
│   │   ├── models
│   │   │   └── Task.js
│   │   └── routes
│   │       └── taskRouters.js
│   ├── .env
│   ├── eslint.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── test.rest
├── frontend
│   ├── public
│   │   ├── 404_NotFound.png
│   │   └── kr1s.ico
│   ├── src
│   │   ├── components
│   │   │   ├── ui
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── command.jsx
│   │   │   │   ├── dialog.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── pagination.jsx
│   │   │   │   └── popover.jsx
│   │   │   ├── AddTask.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatsAndFilter.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskEmpty.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskPagination.jsx
│   │   │   └── TimeFilter.jsx
│   │   ├── lib
│   │   │   ├── axios.js
│   │   │   ├── data.js
│   │   │   └── utils.js
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── LICENSE
└── README.md
```

---
## ⚙️ Local installation

If you don't want to run backend / frontend separately, use Docker (see [🐳 Docker integration]() chapter) 

### 0. Requirement
- Linux / MacOs
- [Node.js](https://nodejs.org/en/download) for JavaScript

### 1. Clone the repository

```bash
git clone <this-repository>
cd todo-app
```

### 2. Backend Setup

- Install dependencies

```bash
cd backend
npm install
```

- Create `.env`

```.env
PORT=3003
MONGODB_CONNECT=your_mongodb_connection_string
```

- Run backend server

```bash
# Development
npm run dev
# Production
npm start
```

- Backend runs on:

```bash
http://localhost:3003
```

### 3. Frontend Setup

- Install dependencies

```bash
cd frontend
npm install
```

- Run frontend

```bash
npm run dev
```

- Frontend runs on:

```bash
http://localhost:5173
```

---
## 🔗 Frontend ↔ Backend Connection (dev)

During development, frontend and backend run on different localhost ports:
- Frontend → localhost:5173
- Backend → localhost:5000

This causes a **CORS (Cross-Origin Resource Sharing)** issue because browsers (Chrome, Firefox,...) block requests between different origins by default.

### Solution 1 — Use CORS middleware (Backend)

```js
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

### Solution 2 — Use Vite Proxy (Frontend)

Inside `vite.config.js`:

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3003",
      changeOrigin: true,
    },
  },
}
```

---
## 🗄️ Database

This project uses **MongoDB** with *Mongoose*.

Unlike relational databases such as PostgreSQL or MySQL:

- MongoDB is document-based
- Data is stored in collections
- Flexible schema structure
- JSON-like documents

Example Todo document:

```JSON
{
  "_id": "6644d5e2...",
  "title": "Finish README",
  "status": "active",
  "completedAt": null,
  "createdAt": "2026-05-14T10:00:00Z"
}
```

---
## 📡 API Requests

This project uses **Axios** for sending *HTTP requests*.

Benefits of Axios:
- easier API calls
- automatic JSON transformation
- request/response interceptors
- custom headers support

Example:

```js
const response = await axios.get("/api/todos");
```

---
## 🐳 Docker integration

### 0. Requirement
- Linux / MacOs
- Docker
- Docker compose

### 1. Clone the repository

```bash
git clone <this-repository>
cd todo-app
```

### 2. run Docker

```bash
docker compose up --build -d

# When finish
docker compose down --volumes --rmi all
```

Application is running on:

```bash
http://localhost:3003
```

---
## 📊 Features Overview

### Filtering

Users can filter tasks by:

- Task status:
	- In progress tasks
	- Finished tasks
   
- Time filter:
	- Today
	- This week
	- This month
	- This year   

### Pagination

Tasks are loaded page by page to improve performance and UX.

### Statistics

Dashboard statistics include:
- Finished tasks
- In progress tasks

---
## 🚀 Deployment

The application is deployed for *free* on **Render**.

---
## 📚 What I Learned

Through this project, I practiced:

- Full-stack MERN architecture
- REST API development
- MongoDB & Mongoose
- React state management
- API integration
- Tailwind CSS styling
- Component-based architecture
- Error handling
- Deployment workflow
- CORS configuration
- Docker management

---
## 💡 Future Improvements

- 🔐 Authentication & authorization (JWT)
- 👤 User accounts
- 🌙 Dark mode
- 🏷 Task categories
- 📅 Calendar integration
- 📱 Mobile app version
- 🧪 Unit & integration testing

---
## 🐛 Issues and Bugs

Please feel free to create a new issue with its title and description on the `issues` page of this [todo-app](https://github.com/Kr1sNg/todo-app) repository. If you have already found the solution to the problem, I would love to review your `pull request`!

---
Happy Coding ❤️
