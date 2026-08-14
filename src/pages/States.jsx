
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getStates,
  getDestinations,
} from "../services/api";

function States() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ======================================================
  // LOAD STATES + DESTINATION IMAGES
  // ======================================================

  useEffect(() => {
    async function loadStates() {
      try {
        setLoading(true);
        setError("");

        // Get states
        const statesData = await getStates();

        // Get destinations
        const destinationsData =
          await getDestinations();

        if (!Array.isArray(statesData)) {
          throw new Error(
            "Invalid states data received."
          );
        }

        if (!Array.isArray(destinationsData)) {
          throw new Error(
            "Invalid destinations data received."
          );
        }


        // ==================================================
        // CREATE STATE LIST
        // ==================================================

        const formattedStates = statesData.map(
          (state) => {

            // Find first destination belonging
            // to this state
            const stateDestination =
              destinationsData.find(
                (destination) =>
                  destination?.stateId ===
                  state.stateId
              );

            return {
              id: state.stateId,

              name: state.stateName,

              destinationCount:
                Number(
                  state.destinationCount
                ) || 0,

              // Use first destination image
              image:
                stateDestination?.image ||
                "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",

              description:
                stateDestination?.description ||
                `Explore the beautiful destinations of ${state.stateName}.`,
            };
          }
        );


        // Sort alphabetically
        formattedStates.sort((a, b) =>
          a.name.localeCompare(b.name)
        );


        setStates(formattedStates);

      } catch (err) {

        console.error(
          "Failed to load states:",
          err
        );

        setError(
          err.message ||
            "Failed to load states."
        );

      } finally {
        setLoading(false);
      }
    }

    loadStates();

  }, []);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

          <p className="mt-5 text-lg font-semibold text-gray-600">
            Loading states...
          </p>

        </div>

      </main>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <div className="text-5xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Unable to Load States
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }


  // ======================================================
  // PAGE
  // ======================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-12 text-center">

          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Explore India
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            All States & Union Territories
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover tourist destinations, culture,
            heritage and natural beauty from across India.
          </p>

        </div>


        {/* ==================================================
            COUNT
        ================================================== */}

        <div className="mb-8 text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
            {states.length} States & Union Territories
          </span>

        </div>


        {/* ==================================================
            STATE GRID
        ================================================== */}

        {states.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {states.map((state) => (

              <Link
                key={state.id}
                to={`/states/${state.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* ==================================================
                    IMAGE
                ================================================== */}

                <div className="h-52 overflow-hidden bg-gray-200">

                  <img
                    src={state.image}
                    alt={state.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(event) => {

                      // Prevent infinite error loop
                      event.currentTarget.onerror =
                        null;

                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />

                </div>


                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-900 transition group-hover:text-orange-500">
                    {state.name}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {state.description}
                  </p>


                  {/* DESTINATION COUNT */}

                  <p className="mt-3 text-sm font-semibold text-gray-500">
                    {state.destinationCount}{" "}
                    {state.destinationCount === 1
                      ? "destination"
                      : "destinations"}
                  </p>


                  {/* EXPLORE */}

                  <div className="mt-4 font-semibold text-orange-500 transition group-hover:text-orange-600">
                    Explore →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="rounded-2xl bg-white p-12 text-center shadow-md">

            <div className="text-5xl">
              🇮🇳
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              No States Found
            </h2>

            <p className="mt-3 text-gray-600">
              No state information is currently available.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

export default States;