"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState(null);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // selected category

  const [tasks, setTasks] = useState([]);

  // Fetch categories and tasks on mount
  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/categories/");
    const data = await res.json();
    setCategories(data);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/tasks/");
    const data = await res.json();
    setTasks(data);
  };

  // Call AI suggestion API
  const getAiSuggestion = async () => {
    if (!title || !description) {
      alert("Please enter title and description before getting AI suggestion.");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/ai/suggest/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });
    const data = await res.json();
    setAiSuggestion(data);
  };

  // Save task to backend (with AI suggested priority and deadline)
  const saveTask = async () => {
    if (!title || !description) {
      alert("Please enter title and description before saving.");
      return;
    }

    // Compute deadline date string from AI suggestion if available
    let deadlineString = null;
    if (aiSuggestion && aiSuggestion.deadline_days) {
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + aiSuggestion.deadline_days);
      deadlineString = deadlineDate.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    const taskData = {
      title,
      description,
      category,
      priority_score: aiSuggestion ? aiSuggestion.priority : null,
      deadline: deadlineString,
    };

    const res = await fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (res.ok) {
      alert("Task saved successfully!");
      // Clear form & AI suggestion
      setTitle("");
      setDescription("");
      setCategory("");
      setAiSuggestion(null);

      // Refresh task list
      fetchTasks();
    } else {
      alert("Failed to save task");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-6">
      <header className="w-full max-w-7xl mb-8 flex justify-between items-center px-4">
        <h1 className="text-3xl font-extrabold">Smart Todo List</h1>
        <Link href="/context">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md transition">
            Add Daily Context
          </button>
        </Link>
      </header>

      <div className="w-full max-w-7xl flex justify-center gap-12 px-4">
        {/* Left: Add New Task Form */}
        <section className="flex-1 max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={4}
          ></textarea>

          <button
            onClick={getAiSuggestion}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded shadow-md transition w-full mb-4"
          >
            Get AI Suggestion
          </button>

          {aiSuggestion && (
            <section className="mt-6 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-2">AI Suggestion</h3>
              <p>
                <strong>Priority:</strong> {aiSuggestion.priority}
              </p>
              <p>
                <strong>Deadline Suggestion:</strong> {aiSuggestion.deadline_days} day(s)
              </p>
              <p>
                <strong>Tags:</strong> {aiSuggestion.tags.join(", ")}
              </p>
              <p>
                <strong>Enhanced Description:</strong> {aiSuggestion.enhanced_description}
              </p>
              <button
                onClick={saveTask}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-md transition w-full"
              >
                Save Task
              </button>
            </section>
          )}
        </section>

        {/* Right: Task List */}
        <section className="flex-1 max-w-md bg-white p-6 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Your Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="border rounded p-4">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Category: {task.category || "None"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Priority: {task.priority_score || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Deadline: {task.deadline || "Not set"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
