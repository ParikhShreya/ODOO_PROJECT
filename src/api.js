const API = "http://localhost:5000/api/auth";

export const signupUser = async (data) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const signinUser = async (data) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};