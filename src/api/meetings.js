import { authenticatedFetch } from "./apiClient";

import { API_ROOT } from "./config";

const MEETINGS_API_URL = `${API_ROOT}/api/meetings/`;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  let data;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const responseText = await response.text();

    throw new Error(
      `Server returned ${response.status} instead of JSON. Request URL: ${response.url}`
    );
  }

  if (!response.ok) {
    const firstError =
      data.detail ||
      data.non_field_errors?.[0] ||
      Object.values(data).flat()[0] ||
      "Something went wrong. Please try again.";

    throw new Error(firstError);
  }

  return data;
}
export async function getMeetings() {
  const response = await authenticatedFetch(MEETINGS_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}

export async function createMeeting(meetingData) {
  const response = await authenticatedFetch(MEETINGS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meetingData),
  });

  return handleResponse(response);
}
export async function getMeetingById(meetingId) {
  const response = await authenticatedFetch(`${MEETINGS_API_URL}${meetingId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}
export async function updateMeeting(meetingId, meetingData) {
  const response = await authenticatedFetch(`${MEETINGS_API_URL}${meetingId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meetingData),
  });

  return handleResponse(response);
}
export async function deleteMeeting(meetingId) {
  const response = await authenticatedFetch(`${MEETINGS_API_URL}${meetingId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    return true;
  }

  return handleResponse(response);
}