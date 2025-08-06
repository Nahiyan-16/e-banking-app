import { fetchAuthSession } from "aws-amplify/auth";

const API_URL =
  "https://hxj7ba5cg8.execute-api.us-east-1.amazonaws.com/prod/users";

/**
 * Save or update user data in S3
 * @param {"signup" | "login"} mode
 * @param {Object} data - User data including at least `username` (and `id`, `email` for signup)
 */
export async function saveUserData(mode, data) {
  try {
    const body = { mode, ...data };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to save user data:", error);
    throw error;
  }
}

export async function fetchUserData(userId) {
  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    const response = await fetch(`${API_URL}?username=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}
