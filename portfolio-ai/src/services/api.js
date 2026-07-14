const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5002";

export async function askAI(message) {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return { reply: "Couldn't reach the backend. Please make sure the server is running! 🔌" };
  }
}
