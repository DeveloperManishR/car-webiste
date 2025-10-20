import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL);
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach access token from storage if present
apiClient.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("authTokens");
    if (stored) {
      try {
        const { accessToken } = JSON.parse(stored);
        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        console.warn("Invalid authTokens format in localStorage");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
