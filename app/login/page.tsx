"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/admin"; // ✅ success → admin page
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="text-green-500 flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
