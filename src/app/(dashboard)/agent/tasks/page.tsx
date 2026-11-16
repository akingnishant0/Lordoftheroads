"use client";

import React, { useState } from "react";

export default function AgentTasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Call Vikram Malhotra to confirm Kashmir houseboat room upgrade", priority: "HIGH", completed: false, due: "Today, 4:00 PM" },
    { id: 2, text: "Verify Dubai tourist visa photo specifications for Ananya Iyer", priority: "MEDIUM", completed: false, due: "Tomorrow, 11:00 AM" },
    { id: 3, text: "Dispatch travel voucher and emergency driver contacts for Delhi flight", priority: "HIGH", completed: true, due: "Completed" },
    { id: 4, text: "Collect final 50% balance payment for Rajasthan heritage haveli booking", priority: "MEDIUM", completed: false, due: "In 3 days" },
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      {
        id: Date.now(),
        text: newTaskText.trim(),
        priority: newTaskPriority,
        completed: false,
        due: "Today",
      },
      ...tasks,
    ]);
    setNewTaskText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B7955B]">
            Productivity & Schedule
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            Agent Tasks & Reminders
          </h1>
          <p className="text-xs text-gray-500">
            Keep track of client follow-ups, payment deadlines, and departure vouchers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Active Task List</h3>

          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition ${
                  t.completed ? "bg-gray-50 border-gray-200 opacity-60 line-through" : "bg-white border-gray-200 hover:border-[#173D32]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => {}}
                    className="accent-[#173D32] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-gray-800 font-medium">{t.text}</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] shrink-0">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    t.priority === "HIGH" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {t.priority}
                  </span>
                  <span className="text-gray-400">{t.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Task Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Add New Task</h3>

          <form onSubmit={handleAddTask} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-500 mb-1 font-medium">Task Description</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Call client to discuss hotel room options..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#173D32]"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-500 mb-1 font-medium">Priority Level</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-gray-200 bg-white"
              >
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#173D32] hover:bg-[#287C70] text-white font-semibold transition"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
