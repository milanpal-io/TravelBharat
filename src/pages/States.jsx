import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDestinations } from "../services/api";

function States() {
  // =================================================
  // STATE
  // =================================================

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =================================================
  // FETCH DESTINATIONS FROM MONGODB
  // =================================================

  useEffect(() => {
    async function fetchStates() {
      try {
        setLoading(true);
        setError("");

        // Get API response
        const response = await getDestinations();

        // API response format:
        // {
        //   success: true,
        //   count: number,
        //   data: [...]
        // }

        const destinations = Array.isArray(response)
          ? response
          : response?.data;

        // Make sure destinations is an array
        if (!Array.isArray(destinations)) {
          throw new Error(
            "Invalid destinations data received from server."
          );
        }

        // =================================================
        // CREATE UNIQUE STATES
        // =================================================

        const uniqueStates = [];

        destinations.forEach((destination) => {
          // Ignore invalid destination records
          if (!destination || !destination.stateId) {
            return;
          }

          const exists = uniqueStates.find(
            (state) => state.id === destination.stateId
          );

          if (!exists) {
            uniqueStates.push({
              id: destination.stateId,
              name: destination.stateName || "Unknown State",
              image:
                destination.image ||
                "https://via.placeholder.com/800x500?text=India",
              description:
                destination.description ||
                `Explore the beautiful destinations of ${
                  destination.stateName || "India"
                }.`,
            });
          }
        });

        // Sort states alphabetically
        uniqueStates.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setStates(uniqueStates);
      } catch (error) {
        console.error(
          "Failed to load states:",
          error
        );

        setError(
          error.message ||
            "Failed to load states. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStates();
  }, []);

  // =================================================
  // LOADING
  // =================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-semibold text-gray-600">
            Loading states...
          </p>
        </div>
      </main>
    );
  }

  // =================================================
  // ERROR
  // =================================================

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Unable to Load States
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =================================================
  // MAIN PAGE
  // =================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-12 text-center">
          <p className="font-semibold tracking-wide text-orange-500">
            EXPLORE INDIA
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            All States & Union Territories
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover tourist destinations, culture, heritage
            and natural beauty from across India.
          </p>
        </div>

        {/* =================================================
            STATES
        ================================================= */}

        {states.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {states.map((state) => (
              <div
                key={state.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="h-52 overflow-hidden">
                  <Link
                    to={`/states/${state.id}`}
                    className="block h-full"
                    aria-label={`Explore ${state.name}`}
                  >
                    <img
                      src={state.image}
                      alt={state.name}
                      className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://via.placeholder.com/800x500?text=India";
                      }}
                    />
                  </Link>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    {state.name}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {state.description}
                  </p>

                  {/* =================================================
                      EXPLORE BUTTON
                  ================================================= */}

                  <Link
                    to={`/states/${state.id}`}
                    className="mt-4 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center shadow-md">
            <p className="text-gray-600">
              No states found.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

export default States;