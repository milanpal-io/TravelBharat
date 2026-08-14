const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

// ======================================================
// API URLS
// ======================================================

export const API_URL = API_BASE_URL;

export const STATES_URL =
  `${API_BASE_URL}/api/states`;

export const DESTINATIONS_URL =
  `${API_BASE_URL}/api/destinations`;

// ======================================================
// GET ALL STATES
// ======================================================

export const getStates = async () => {
  const response = await fetch(STATES_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to load states (${response.status})`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to load states"
    );
  }

  return result.data;
};

// ======================================================
// GET ALL DESTINATIONS
// ======================================================

export const getDestinations = async () => {
  const response = await fetch(DESTINATIONS_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to load destinations (${response.status})`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to load destinations"
    );
  }

  return result.data;
};

// ======================================================
// GET SINGLE DESTINATION
// ======================================================

export const getDestinationById = async (id) => {
  if (!id) {
    throw new Error("Destination ID is required.");
  }

  const response = await fetch(
    `${DESTINATIONS_URL}/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load destination (${response.status})`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to load destination"
    );
  }

  return result.data;
};

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default API_BASE_URL;