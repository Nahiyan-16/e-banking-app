const API_URL = "https://hxj7ba5cg8.execute-api.us-east-1.amazonaws.com/prod/users";

export async function saveUserData(userId, data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, ...data })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to save user data:", error);
    throw error;
  }
}
