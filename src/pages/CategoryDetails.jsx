
import { useParams, Link } from "react-router-dom";
import { states } from "../data/states";
import DestinationCard from "../components/DestinationCard";

function CategoryDetails() {
  const { category } = useParams();

  const safeCategory =
    category || "";

  const categoryName =
    safeCategory.length > 0
      ? safeCategory.charAt(0).toUpperCase() +
        safeCategory.slice(1)
      : "Destinations";


  // ======================================================
  // FIND DESTINATIONS
  // ======================================================

  const destinations = states.flatMap(
    (state) => {

      if (!Array.isArray(state.places)) {
        return [];
      }

      return state.places
        .filter(
          (place) =>
            place.category?.toLowerCase() ===
            safeCategory.toLowerCase()
        )
        .map((place) => ({
          ...place,

          stateName:
            place.stateName ||
            state.name,

          stateId:
            place.stateId ||
            state.id,
        }));
    }
  );


  // ======================================================
  // PAGE
  // ======================================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            BACK
        ================================================== */}

        <Link
          to="/categories"
          className="mb-8 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
        >
          ← Back to Categories
        </Link>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-12 text-center">

          <p className="font-semibold uppercase tracking-wide text-orange-500">
            Explore India
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            {categoryName} Destinations
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover the best{" "}
            {categoryName.toLowerCase()}{" "}
            destinations across India.
          </p>

        </div>


        {/* ==================================================
            RESULTS
        ================================================== */}

        {destinations.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {destinations.map(
              (place, index) => (

                <DestinationCard
                  key={
                    place._id ||
                    place.id ||
                    `${place.stateId}-${place.name}-${index}`
                  }
                  place={place}
                  stateName={place.stateName}
                  stateId={place.stateId}
                />

              )
            )}

          </div>

        ) : (

          <div className="rounded-2xl bg-white p-12 text-center shadow-md">

            <div className="text-5xl">
              🧭
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              No destinations found
            </h2>

            <p className="mt-3 text-gray-600">
              There are currently no destinations
              available in this category.
            </p>

            <Link
              to="/destinations"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              Explore All Destinations
            </Link>

          </div>

        )}

      </div>

    </main>
  );
}

export default CategoryDetails;