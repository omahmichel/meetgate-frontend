import { API_ROOT } from "./config";

const TOKEN_REFRESH_URL = `${API_ROOT}/api/accounts/token/refresh/`;

let refreshPromise = null;

function clearStoredAuth() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    clearStoredAuth();
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!refreshPromise) {
    refreshPromise = fetch(TOKEN_REFRESH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })
      .then(async (response) => {
        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok || !data.access) {
          clearStoredAuth();
          throw new Error("Your session has expired. Please log in again.");
        }

        localStorage.setItem("access", data.access);

        // Preserve compatibility if refresh-token rotation is enabled later.
        if (data.refresh) {
          localStorage.setItem("refresh", data.refresh);
        }

        return data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function authenticatedFetch(url, options = {}) {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("You must log in before continuing.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${accessToken}`);

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshedAccessToken = await refreshAccessToken();

  const retryHeaders = new Headers(options.headers || {});
  retryHeaders.set("Authorization", `Bearer ${refreshedAccessToken}`);

  return fetch(url, {
    ...options,
    headers: retryHeaders,
  });
}
