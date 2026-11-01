const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeaders() {
  const token = localStorage.getItem("sms_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {}),
  };
}

async function parse(res) {
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    localStorage.removeItem("sms_token");
    localStorage.removeItem("sms_email");
    if (!window.location.pathname.startsWith("/login")) window.location.assign("/login");
  }
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const getStudents = () => fetch(`${BASE_URL}/students`, { headers: authHeaders() }).then(parse);
export const createStudent = (body) => fetch(`${BASE_URL}/students`, { method: "POST", headers: authHeaders(), body: JSON.stringify(body) }).then(parse);
export const updateStudent = (id, body) => fetch(`${BASE_URL}/students/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(body) }).then(parse);
export const deleteStudent = (id) => fetch(`${BASE_URL}/students/${id}`, { method: "DELETE", headers: authHeaders() }).then(parse);
export const login = (body) => fetch(`${BASE_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(parse);
export const register = (body) => fetch(`${BASE_URL}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(parse);
export const generateDescription = (body) => fetch(`${BASE_URL}/api/ai/generate-description`, { method: "POST", headers: authHeaders(), body: JSON.stringify(body) }).then(parse);
