
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { states } from "../data/states";
import DestinationCard from "../components/DestinationCard";

const API_URL = "http://localhost:5000/api/destinations";

function StateDetails() {
  const { stateId } = useParams();

  const state = states.find(
    (item) => item.id === stateId
  );

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================================
  // FETCH DESTINATIONS FROM BACKEND
  // ==================================================

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to fetch destinations"
          );
        }

        setDestinations(result.data || []);
      } catch (err) {
        console.error(
          "Error fetching destinations:",
          err
        );

        setError(
          "Unable to load destinations. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ==================================================
  // FILTER DESTINATIONS FOR CURRENT STATE
  // ==================================================

  const stateDestinations = useMemo(() => {
    if (!state) {
      return [];
    }

    return destinations.filter(
      (destination) =>
        destination.stateId === state.id
    );
  }, [destinations, state]);

  // ==================================================
  // STATE NOT FOUND
  // ==================================================

  if (!state) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            State Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            Sorry, we couldn't find this state.
          </p>

          <Link
            to="/states"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            ← Back to States
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ==================================================
          STATE HERO
      ================================================== */}

      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">

        <img
          src={state.image}
          alt={state.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">

          <div className="max-w-4xl">

            <p className="mb-4 font-semibold uppercase tracking-widest text-orange-400">
              Explore India
            </p>

            <h1 className="text-5xl font-bold md:text-7xl">
              {state.name}
            </h1>

          </div>

        </div>

      </section>

      {/* ==================================================
          STATE INFORMATION
      ================================================== */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <Link
            to="/states"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            ← Back to All States
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-md md:p-10">

            <h2 className="text-3xl font-bold text-gray-900">
              About {state.name}
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              {state.description}
            </p>

          </div>

        </div>

      </section>

      {/* ==================================================
          DESTINATIONS FROM MONGODB
      ================================================== */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="font-semibold uppercase tracking-wide text-orange-500">
              Discover
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Popular Destinations in {state.name}
            </h2>

            <p className="mt-4 text-gray-600">
              Explore tourist places and experiences across{" "}
              {state.name}.
            </p>

          </div>

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (
            <div className="py-16 text-center">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />

              <p className="mt-5 text-gray-600">
                Loading destinations...
              </p>

            </div>
          )}

          {/* ==================================================
              ERROR
          ================================================== */}

          {!loading && error && (
            <div className="rounded-2xl bg-red-50 p-10 text-center">

              <p className="text-lg font-semibold text-red-600">
                ⚠️ {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Try Again
              </button>

            </div>
          )}

          {/* ==================================================
              DESTINATION CARDS
          ================================================== */}

          {!loading &&
            !error &&
            stateDestinations.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {stateDestinations.map(
                  (destination) => (
                    <DestinationCard
                      key={destination._id}
                      place={destination}
                      stateName={state.name}
                      stateId={state.id}
                    />
                  )
                )}

              </div>
            )}

          {/* ==================================================
              NO DESTINATIONS
          ================================================== */}

          {!loading &&
            !error &&
            stateDestinations.length === 0 && (
              <div className="rounded-2xl bg-gray-50 p-10 text-center">

                <p className="text-lg text-gray-600">
                  No destinations are currently available
                  for {state.name}.
                </p>

              </div>
            )}

        </div>

      </section>

    </main>
  );
}

export default StateDetails;
