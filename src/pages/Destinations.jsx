
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const DESTINATIONS_URL =
  `${API_URL}/api/destinations`;

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [state, setState] = useState("All");

  // ======================================================
  // LOAD DESTINATIONS
  // ======================================================

  useEffect(() => {
    let cancelled = false;

    const loadDestinations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          DESTINATIONS_URL
        );

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status}`
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message ||
              "Failed to load destinations."
          );
        }

        if (!cancelled) {
          setDestinations(
            Array.isArray(result.data)
              ? result.data
              : []
          );
        }
      } catch (err) {
        console.error(
          "Destinations loading error:",
          err
        );

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load destinations."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  // ======================================================
  // STATES
  // ======================================================

  const states = useMemo(() => {
    const uniqueStates = destinations
      .map(
        (destination) =>
          destination.stateName
      )
      .filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(uniqueStates)
      ).sort(),
    ];
  }, [destinations]);

  // ======================================================
  // CATEGORIES
  // ======================================================

  const categories = useMemo(() => {
    const uniqueCategories =
      destinations
        .map(
          (destination) =>
            destination.category
        )
        .filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(uniqueCategories)
      ).sort(),
    ];
  }, [destinations]);

  // ======================================================
  // FILTER
  // ======================================================

  const filteredDestinations =
    useMemo(() => {
      const searchText =
        search.trim().toLowerCase();

      return destinations.filter(
        (destination) => {
          const matchesSearch =
            !searchText ||
            destination.name
              ?.toLowerCase()
              .includes(searchText) ||
            destination.stateName
              ?.toLowerCase()
              .includes(searchText) ||
            destination.description
              ?.toLowerCase()
              .includes(searchText);

          const matchesCategory =
            category === "All" ||
            destination.category ===
              category;

          const matchesState =
            state === "All" ||
            destination.stateName ===
              state;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesState
          );
        }
      );
    }, [
      destinations,
      search,
      category,
      state,
    ]);

  // ======================================================
  // DESTINATION URL
  // ======================================================

  const getDestinationUrl = (
    destination
  ) => {
    const stateId =
      destination.stateId ||
      destination.stateName
        ?.toLowerCase()
        .replace(/\s+/g, "-");

    const destinationId =
      destination._id ||
      destination.id;

    if (!stateId || !destinationId) {
      return "/destinations";
    }

    return `/states/${stateId}/${destinationId}`;
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

            <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <div className="h-56 animate-pulse bg-slate-200" />

                  <div className="p-5">
                    <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />

                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              )
            )}

          </div>
        </div>
      </main>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
            TravelBharat
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Explore Destinations
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Discover beautiful destinations
            across India — from mountains and
            beaches to heritage sites and
            spiritual places.
          </p>

        </div>

        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            {/* SEARCH */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search destinations..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

            </div>

            {/* STATE */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                State
              </label>

              <select
                value={state}
                onChange={(event) =>
                  setState(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                {states.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="font-bold text-red-700">
              Unable to load destinations
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ==================================================
            RESULT COUNT
        ================================================== */}

        {!error && (
          <div className="mb-5">

            <p className="text-sm font-semibold text-slate-500">
              Showing{" "}
              <span className="font-black text-slate-900">
                {filteredDestinations.length}
              </span>{" "}
              destination
              {filteredDestinations.length !==
              1
                ? "s"
                : ""}
            </p>

          </div>
        )}

        {/* ==================================================
            EMPTY
        ================================================== */}

        {!error &&
          filteredDestinations.length ===
            0 && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="text-5xl">
                🔎
              </div>

              <h2 className="mt-4 text-xl font-black text-slate-900">
                No destinations found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search,
                category, or state filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setState("All");
                }}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* ==================================================
            DESTINATION GRID
        ================================================== */}

        {!error &&
          filteredDestinations.length >
            0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredDestinations.map(
                (destination) => (
                  <Link
                    key={
                      destination._id ||
                      destination.id ||
                      destination.name
                    }
                    to={getDestinationUrl(
                      destination
                    )}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-slate-200">

                      {destination.image ? (
                        <img
                          src={
                            destination.image
                          }
                          alt={
                            destination.name ||
                            "Destination"
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(
                            event
                          ) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">
                          🇮🇳
                        </div>
                      )}

                      {/* CATEGORY */}

                      {destination.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-orange-600 shadow-sm">
                          {
                            destination.category
                          }
                        </span>
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <h2 className="text-xl font-black text-slate-900 transition group-hover:text-orange-600">
                        {destination.name ||
                          "Unnamed Destination"}
                      </h2>

                      {destination.stateName && (
                        <p className="mt-1 text-sm font-semibold text-orange-500">
                          📍{" "}
                          {
                            destination.stateName
                          }
                        </p>
                      )}

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {destination.description ||
                          "Discover this beautiful destination in India."}
                      </p>

                      <div className="mt-5 flex items-center justify-between">

                        <span className="text-sm font-black text-orange-600">
                          Explore →
                        </span>

                        {destination.location && (
                          <span className="max-w-[50%] truncate text-xs font-medium text-slate-400">
                            {
                              destination.location
                            }
                          </span>
                        )}

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>
          )}

      </div>

    </main>
  );
}

export default Destinations;