// ======================================================
// TravelBharat API Service
// ======================================================

// Production backend URL
// VITE_API_URL should be set in Render environment variables.
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://travelbharat-api-yg5r.onrender.com";


// ======================================================
// HELPER
// ======================================================

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  console.log("API Request:", url);

  try {
    const response = await fetch(url, {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error(
        `Server returned invalid response (${response.status}).`
      );
    }

    console.log("API Response:", result);

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Request failed with status ${response.status}.`
      );
    }

    if (result?.success === false) {
      throw new Error(
        result.message ||
          "API request failed."
      );
    }

    return result;

  } catch (error) {
    console.error("API Error:", error);

    // Better error message for network/CORS problems
    if (error instanceof TypeError) {
      throw new Error(
        "Failed to fetch API. Please check the backend URL, CORS configuration, and Render deployment."
      );
    }

    throw error;
  }
}


// ======================================================
// GET ALL DESTINATIONS
// ======================================================

export async function getDestinations() {
  const result = await request(
    "/api/destinations"
  );

  return Array.isArray(result)
    ? result
    : result?.data || [];
}


// ======================================================
// GET ALL STATES
// ======================================================

export async function getStates() {
  const result = await request(
    "/api/states"
  );

  return Array.isArray(result)
    ? result
    : result?.data || [];
}


// ======================================================
// GET DESTINATIONS BY STATE
// ======================================================

export async function getDestinationsByState(
  stateId
) {
  if (!stateId) {
    throw new Error(
      "State ID is required."
    );
  }

  const result = await request(
    `/api/destinations/state/${encodeURIComponent(
      stateId
    )}`
  );

  return Array.isArray(result)
    ? result
    : result?.data || [];
}


// ======================================================
// GET SINGLE DESTINATION
// ======================================================

export async function getDestinationById(
  id
) {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  const result = await request(
    `/api/destinations/${encodeURIComponent(id)}`
  );

  return result?.data || result;
}


// ======================================================
// CREATE DESTINATION
// ======================================================

export async function createDestination(
  data
) {
  const result = await request(
    "/api/destinations",
    {
      method: "POST",

      body: JSON.stringify(data),
    }
  );

  return result?.data || result;
}


// ======================================================
// UPDATE DESTINATION
// ======================================================

export async function updateDestination(
  id,
  data
) {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  const result = await request(
    `/api/destinations/${encodeURIComponent(id)}`,
    {
      method: "PUT",

      body: JSON.stringify(data),
    }
  );

  return result?.data || result;
}


// ======================================================
// DELETE DESTINATION
// ======================================================

export async function deleteDestination(
  id
) {
  if (!id) {
    throw new Error(
      "Destination ID is required."
    );
  }

  return request(
    `/api/destinations/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
}


// ======================================================
// ADMIN LOGIN
// ======================================================

export async function adminLogin(
  email,
  password
) {
  const result = await request(
    "/api/admin/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return result;
}


// ======================================================
// EXPORT API URL
// ======================================================

export { API_URL };