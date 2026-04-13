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
};

export default API;