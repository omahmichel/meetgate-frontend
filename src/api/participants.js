import { authenticatedFetch } from "./apiClient";

const MEETINGS_API_URL = "http://127.0.0.1:8000/api/meetings/";

async function handleResponse(response) {
  if (response.status === 204) {
    return true;
  }

  const contentType = response.headers.get("content-type") || "";
  let data = {};

  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const firstError =
      data.detail ||
      data.non_field_errors?.[0] ||
      Object.values(data).flat()[0] ||
      "Something went wrong while managing participants.";

    throw new Error(firstError);
  }

  return data;
}

export async function getMeetingParticipants(meetingId) {
  const response = await authenticatedFetch(
    `${MEETINGS_API_URL}${meetingId}/participants/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return handleResponse(response);
}

export async function addMeetingParticipant(meetingId, participantData) {
  const response = await authenticatedFetch(
    `${MEETINGS_API_URL}${meetingId}/participants/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantData),
    },
  );

  return handleResponse(response);
}

export async function updateMeetingParticipant(
  meetingId,
  participantId,
  participantData,
) {
  const response = await authenticatedFetch(
    `${MEETINGS_API_URL}${meetingId}/participants/${participantId}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantData),
    },
  );

  return handleResponse(response);
}

export async function deleteMeetingParticipant(meetingId, participantId) {
  const response = await authenticatedFetch(
    `${MEETINGS_API_URL}${meetingId}/participants/${participantId}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return handleResponse(response);
}
