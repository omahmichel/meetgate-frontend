const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

// Keep API URL construction consistent in local and production builds.
export const API_ROOT = rawApiBaseUrl.replace(/\/+$/, "");
