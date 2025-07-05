# 🧠 Smart Todo List with AI

A full-stack web application for intelligent task management. Built with **Django REST Framework**, **Next.js**, **Tailwind CSS**, and integrated with AI for smart suggestions.

## 🚀 Features

- 📝 Create, view, and manage tasks
- 🤖 AI-powered task suggestions (priority, category, deadline)
- 🧠 Add context entries (messages, notes, emails)
- 🔎 Filter by category or priority
- 🌓 Dark mode toggle
- 🏷 Smart categorization via dropdown
- 📈 Responsive UI with Tailwind CSS

## 🛠 Tech Stack

| Layer    | Tech Used                     |
|----------|-------------------------------|
| Backend  | Django, Django REST Framework |
| Frontend | Next.js 15, Tailwind CSS      |
| AI       | OpenAI (or local LLM support) |
| Database | Supabase (PostgreSQL)         |
| Storage  | Supabase Storage (if needed)  |

## 🔧 Setup Instructions

### 🔙 Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Run server
python manage.py runserver
```

### 🌐 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Ensure your backend is running at `http://127.0.0.1:8000/`

## 🌌 API Documentation

### 🔹 GET /api/tasks/
Fetch all tasks.

### 🔹 POST /api/tasks/
Create a new task.
```json
{
  "title": "Read book",
  "description": "Finish reading AI paper",
  "category": "Study"
}
```

### 🔹 GET /api/categories/
Fetch all categories.

### 🔹 POST /api/categories/
Create a new category.
```json
{
  "name": "Work"
}
```

### 🔹 GET /api/contexts/
Fetch all context entries.

### 🔹 POST /api/contexts/
Add a new context entry.
```json
{
  "source_type": "email",
  "content": "Reminder from client about deadline"
}
```

### 🔹 POST /api/ai/suggest/
Get AI-based task recommendation (priority, deadline, enhanced desc)

## 📸 Screenshots

| Dashboard (Light Mode) | Dashboard (Dark Mode) |
|------------------------|------------------------|
| ![Light](screenshots/light.png) | ![Dark](screenshots/dark.png) |

| Task Form with AI | Context Input |
|-------------------|----------------|
| ![Form](screenshots/form.png) | ![Context](screenshots/context.png) |

## 📦 Sample Data

### ✅ Sample Task
```json
{
  "title": "Finish Resume",
  "description": "Update projects, refine experience",
  "category": "Career"
}
```

### 💬 Sample Context
```json
{
  "source_type": "note",
  "content": "Need to update portfolio before Friday"
}
```

## 📎 Requirements

See `requirements.txt` for Python dependencies.

## 💡 AI Suggestion Sample

Given task:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, and fruits"
}
```

AI returns:
```json
{
  "priority_score": 2,
  "suggested_deadline": "2025-07-06",
  "category": "Personal",
  "enhanced_description": "Buy groceries including milk, eggs, bread, and fruits by Sunday to avoid weekday rush."
}
```

## 📥 Submission

- GitHub Repo: **[your repo link here]**
- Filled the form: ✅ https://forms.gle/CUv48PxFwG59RCEt9

## 🧠 Future Enhancements (Planned)

- Calendar integration (.ics export)
- Task status toggle & completion tracking
- Advanced context NLP (sentiment/keywords)
- Import/export tasks
- Notifications & reminders

## ✨ Author

Made with ❤️ by Shreedevi Patil