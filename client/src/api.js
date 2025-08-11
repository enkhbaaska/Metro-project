// client/src/api.js (example helper file)
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function getMessage() {
  const res = await fetch(`${API_BASE}/api`);
  return res.json();
}
