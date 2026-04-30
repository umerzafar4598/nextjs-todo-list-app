# 📝 Next.js Full-Stack Todo App

A modern, full-stack **multi-user Todo List application** built with Next.js App Router.  
Users can securely manage their tasks with authentication, deadlines, filtering, and a clean dashboard UI.

---

## 🚀 Features

- 🔐 Authentication (Signup / Login)
- 👤 Multi-user support
- ✅ CRUD operations (Create, Read, Update, Delete todos)
- 📅 Set deadlines for tasks
- 📊 Dashboard stats:
  - Total Todos
  - Completed
  - Pending
  - Overdue
- 🔍 Search todos by title
- 🎯 Filter todos:
  - All
  - Completed
  - Pending
  - Overdue
- ⚡ Server Actions (Next.js App Router)
- 🧠 State management (Redux Toolkit)
- 🎨 Responsive & modern UI

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** Better Auth
- **State Management:** Redux Toolkit 
- **Styling:** Tailwind CSS

---

## 📂 Project Structure

```
app/            # App Router pages & layouts
components/     # Reusable UI components
lib/            # Auth, utilities, helpers
db/             # Database config & schema (Drizzle)
store/          # State management
actions/         # Server actions (CRUD logic)
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/umerzafar4598/nextjs-todo-list-app.git
cd nextjs-todo-list-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Open: http://localhost:3000

---

## 🧩 Key Concepts Used

- Server Actions for backend logic
- Session-based authentication
- Database abstraction with Drizzle ORM
- State synchronization between client & server
- Modular and scalable folder structure

---


## 🚀 Deployment

You can deploy easily on:

- Vercel (recommended)
- Docker (optional)

```bash
npm run build
npm start
```

---

## 📌 Future Improvements

- 🔔 Notifications for deadlines
- 📱 Mobile optimization
- 🧠 AI-based task suggestions
- 📊 Advanced analytics

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a PR

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Umer Zafar**

- GitHub: https://github.com/umerzafar4598

---

⭐ If you like this project, don't forget to star the repo!
