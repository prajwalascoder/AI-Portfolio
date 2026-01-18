const API_BASE = process.env.REACT_APP_API_URL;

export async function askAI(message) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  return res.json();
}
