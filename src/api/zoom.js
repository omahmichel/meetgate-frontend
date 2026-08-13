import { authenticatedFetch } from "./apiClient";

import { API_ROOT } from "./config";

const ZOOM_API_URL = `${API_ROOT}/api/zoom`;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  let data = {};

  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(
      data.detail ||
        data.message ||
        "Something went wrong while connecting to Zoom."
    );
  }

  return data;
}

export async function getZoomConnectionStatus() {
  const response = await authenticatedFetch(`${ZOOM_API_URL}/status/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}
export async function getZoomAuthorizationUrl() {
  const response = await authenticatedFetch(`${ZOOM_API_URL}/login/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}