"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContextPage() {
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState("note");
  const [contexts, setContexts] = useState([]);

  const fetchContexts = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/contexts/");
    const data = await res.json();
    setContexts(data);
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await fetch("http://127.0.0.1:8000/api/contexts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, source_type: sourceType }),
    });
    setContent("");
    fetchContexts();
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center p-6">
      <header className="w-full max-w-3xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold">Daily Context Input</h1>
        <Link href="/">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md transition">
            Back to Tasks
          </button>
        </Link>
      </header>

      <section className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <textarea
          placeholder="Paste your WhatsApp message, email, or note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={5}
        />

        <select
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        >
          <option value="note">Note</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded shadow-md transition w-full"
        >
          Add Context Entry
        </button>
      </section>

      <section className="w-full max-w-3xl mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
        <ul className="space-y-3 max-h-64 overflow-auto">
          {contexts.map((ctx) => (
            <li
              key={ctx.id}
              className="p-3 border rounded bg-gray-100 text-sm break-words"
            >
              <strong className="capitalize">{ctx.source_type}:</strong>{" "}
              {ctx.content}
              <br />
              <em className="text-xs text-gray-500">
                {new Date(ctx.timestamp).toLocaleString()}
              </em>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
