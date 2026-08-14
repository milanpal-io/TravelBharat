export async function createDestination(data) {

  const response = await fetch(
    `${API_BASE_URL}/destinations`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );


  const result =
    await response.json();


  if (
    !response.ok ||
    !result.success
  ) {

    throw new Error(
      result.message ||
      "Failed to create destination."
    );

  }


  return result.data;
}