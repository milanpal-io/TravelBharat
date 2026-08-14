import EmptyState from "../components/EmptyState";
import ImageWithFallback from "../components/ImageWithFallback";

import { useMemo, useState } from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { states } from "../data/states";

function Search() {
  // ==================================================
  // READ QUERY PARAMETER FROM URL
  // ==================================================

  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const [selectedState, setSelectedState] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");


  // ==================================================
  // CONVERT NESTED STATES → FLAT DESTINATION LIST
  // ==================================================

  const destinations = useMemo(() => {
    return states.flatMap((state) =>
      (state.places || []).map((place) => ({
        ...place,
        stateName: state.name,
        stateId: state.id,
      }))
    );
  }, []);


  // ==================================================
  // GET CATEGORIES FROM ACTUAL DATA
  // ==================================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        destinations
          .map((place) => place.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [destinations]);


  // ==================================================
  // SEARCH + FILTER
  // ==================================================

  const filteredDestinations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return destinations.filter((place) => {

      // Search by:
      // Destination name
      // State name
      // Category

      const matchesSearch =
        !search ||
        place.name?.toLowerCase().includes(search) ||
        place.stateName?.toLowerCase().includes(search) ||
        place.category?.toLowerCase().includes(search);


      // State filter

      const matchesState =
        !selectedState ||
        place.stateId === selectedState;


      // Category filter

      const matchesCategory =
        !selectedCategory ||
        place.category?.toLowerCase() ===
          selectedCategory.toLowerCase();


      return (
        matchesSearch &&
        matchesState &&
        matchesCategory
      );
    });

  }, [
    destinations,
    searchTerm,
    selectedState,
    selectedCategory,
  ]);


  // ==================================================
  // HANDLE SEARCH
  // ==================================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();

    if (query) {
      setSearchParams({
        query: query,
      });
    } else {
      setSearchParams({});
    }
  };


  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedCategory("");

    setSearchParams({});
  };


  // ==================================================
  // RENDER
  // ==================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">


        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="mb-10 text-center">

          <p className="font-semibold uppercase tracking-wide text-orange-500">
            Discover India
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            Search Destinations
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find tourist places by destination name, state or
            category.
          </p>

        </div>


        {/* =================================================
            SEARCH & FILTER BOX
        ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <form onSubmit={handleSearch}>

            <div className="grid gap-4 md:grid-cols-3">


              {/* SEARCH INPUT */}

              <div className="md:col-span-3">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Search
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    placeholder="Search place, state or category..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    🔎 Search
                  </button>

                </div>

              </div>


              {/* STATE FILTER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  State / UT
                </label>

                <select
                  value={selectedState}
                  onChange={(e) =>
                    setSelectedState(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >

                  <option value="">
                    All States & UTs
                  </option>

                  {states.map((state) => (
                    <option
                      key={state.id}
                      value={state.id}
                    >
                      {state.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* CATEGORY FILTER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >

                  <option value="">
                    All Categories
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}

                </select>

              </div>


              {/* CLEAR FILTERS */}

              <div className="flex items-end">

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
                >
                  Clear Filters
                </button>

              </div>

            </div>

          </form>

        </div>


        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="mb-6 mt-10">

          <h2 className="text-2xl font-bold text-gray-900">
            Destinations
          </h2>

          <p className="mt-1 text-gray-600">

            {filteredDestinations.length} destination
            {filteredDestinations.length !== 1
              ? "s"
              : ""}{" "}
            found

          </p>

        </div>


        {/* =================================================
            DESTINATION RESULTS
        ================================================= */}

        {filteredDestinations.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredDestinations.map((place) => {

              const destinationId = place.name
                .toLowerCase()
                .replace(/\s+/g, "-");


              return (

                <div
                  key={`${place.stateId}-${place.name}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="h-52 overflow-hidden">

                    <ImageWithFallback
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                  </div>


                  {/* CONTENT */}

                  <div className="p-5">


                    {/* STATE */}

                    <p className="text-sm font-semibold text-orange-500">
                      {place.stateName}
                    </p>


                    {/* DESTINATION NAME */}

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {place.name}
                    </h3>


                    {/* CATEGORY */}

                    {place.category && (

                      <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                        {place.category}
                      </span>

                    )}


                    {/* DESCRIPTION */}

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {place.description}
                    </p>


                    {/* DETAILS */}

                    <Link
                      to={`/states/${place.stateId}/${destinationId}`}
                      className="mt-4 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>

              );

            })}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <EmptyState
            title="No Destinations Found"
            message="Try searching for another destination, state or category."
            buttonText="Clear Search"
            onButtonClick={clearFilters}
          />

        )}


      </div>

    </main>
  );
}

export default Search;