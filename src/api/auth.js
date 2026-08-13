import { API_ROOT } from "./config";

const API_BASE_URL = `${API_ROOT}/api/accounts`;

async function handleResponse(response) {
  const data = await response.json();

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

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
}

export async function loginUser(loginData) {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return handleResponse(response);
}

export async function sendMobileOTP(phoneNumber) {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("You must log in before verifying your mobile number.");
  }

  const response = await fetch(`${API_BASE_URL}/mobile/send-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ phone_number: phoneNumber }),
  });

  return handleResponse(response);
}

export async function verifyMobileOTP(phoneNumber, otp) {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    throw new Error("You must log in before verifying your mobile number.");
  }

  const response = await fetch(`${API_BASE_URL}/mobile/verify-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ phone_number: phoneNumber, otp }),
  });

  return handleResponse(response);
}

export async function getGoogleAuthConfig() {
  const response = await fetch(`${API_BASE_URL}/google/config/`);

  return handleResponse(response);
}

export async function googleAuth(credential, accountType = "") {
  const payload = { credential };

  if (accountType) {
    payload.account_type = accountType;
  }

  const response = await fetch(`${API_BASE_URL}/google/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}
