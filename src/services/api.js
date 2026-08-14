// ======================================================
// TravelBharat API Service
// ======================================================

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

// ======================================================
// Generic API Request
// ======================================================

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let result = {};

  try {
    result = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message ||
        `Request failed with status ${response.status}`
    );
  }

  return result;
};

// ======================================================
// GET ALL STATES
// ======================================================

export const getStates = async () => {
  return apiRequest("/api/states");
};

// ======================================================
// GET ALL DESTINATIONS
// ======================================================

export const getDestinations = async () => {
  return apiRequest("/api/destinations");
};

// ======================================================
// GET SINGLE DESTINATION
// ======================================================

export const getDestination = async (id) => {
  if (!id) {
    throw new Error("Destination ID is required.");
  }

  return apiRequest(
    `/api/destinations/${encodeURIComponent(id)}`
  );
};

// ======================================================
// GET SINGLE DESTINATION BY ID
// ======================================================

export const getDestinationById = getDestination;

// ======================================================
// CREATE DESTINATION
// ======================================================

export const createDestination = async (destination) => {
  return apiRequest("/api/destinations", {
    method: "POST",
    body: JSON.stringify(destination),
  });
};

// ======================================================
// UPDATE DESTINATION
// ======================================================

export const updateDestination = async (
  id,
  destination
) => {
  if (!id) {
    throw new Error("Destination ID is required.");
  }

  return apiRequest(
    `/api/destinations/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(destination),
    }
  );
};

// ======================================================
// DELETE DESTINATION
// ======================================================

export const deleteDestination = async (id) => {
  if (!id) {
    throw new Error("Destination ID is required.");
  }

  return apiRequest(
    `/api/destinations/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
};

// ======================================================
// EXPORT BASE URL
// ======================================================

export { API_BASE_URL };