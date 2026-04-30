import { getToken } from "../services/auth";

const BASE_URL = "http://localhost:3000";

const API = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();

    return { data };
  },

  post: async (endpoint, body = {}) => {

    const token = getToken();

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return { data, status: res.status, };
  },

  delete: async (endpoint) => {
    const token = getToken();
  
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
  
    const data = await res.json();
    return { data };
  },
};

export default API;