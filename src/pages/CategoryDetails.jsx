import { useParams, Link } from "react-router-dom";
import { states } from "../data/states";
import DestinationCard from "../components/DestinationCard";

function CategoryDetails() {
  const { category } = useParams();

  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  // Find destinations belonging to this category
  const destinations = states.flatMap((state) =>
    state.places
      .filter(
        (place) =>
          place.category?.toLowerCase() === category.toLowerCase()
      )
      .map((place) => ({
        ...place,
        stateName: state.name,
        stateId: state.id,
      }))
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/categories"
          className="mb-8 inline-block font-semibold text-orange-500 hover:text-orange-600"
        >
          ← Back to Categories
        </Link>

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-wide text-orange-500">
            Explore India
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            {categoryName} Destinations
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover the best {categoryName.toLowerCase()} destinations
            across India.
          </p>
        </div>

        {/* Results */}
        {destinations.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((place) => (
              <DestinationCard
                key={`${place.stateId}-${place.name}`}
                place={place}
                stateName={place.stateName}
                stateId={place.stateId}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              No destinations found
            </h2>

            <p className="mt-3 text-gray-600">
              There are currently no destinations available in this category.
            </p>
          </div>
        )}

      </div>

    </main>
  );
}

export default CategoryDetails;