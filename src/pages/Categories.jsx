import { Link } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import ImageWithFallback from "../components/ImageWithFallback";

import { states } from "../data/states";

function Categories() {
  // ==================================================
  // GET ALL DESTINATIONS
  // ==================================================

  const destinations = states.flatMap((state) =>
    (state.places || []).map((place) => ({
      ...place,
      stateName: state.name,
      stateId: state.id,
    }))
  );

  // ==================================================
  // GET UNIQUE CATEGORIES
  // ==================================================

  const categoryNames = [
    ...new Set(
      destinations
        .map((destination) => destination.category)
        .filter(Boolean)
    ),
  ];

  // ==================================================
  // CATEGORY INFORMATION
  // ==================================================

  const categoryInfo = {
    Heritage: {
      icon: "🏛️",
      title: "Heritage",
      description:
        "Explore India's historic monuments, forts, palaces, ancient cities and cultural landmarks.",
    },

    Nature: {
      icon: "🌿",
      title: "Nature",
      description:
        "Discover India's mountains, forests, waterfalls, beaches, valleys and beautiful natural landscapes.",
    },

    Religious: {
      icon: "🛕",
      title: "Religious",
      description:
        "Visit India's famous temples, mosques, churches, monasteries and spiritual destinations.",
    },

    Adventure: {
      icon: "🏔️",
      title: "Adventure",
      description:
        "Experience trekking, rafting, wildlife, water sports and exciting outdoor adventures across India.",
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="mb-12 text-center">

          <p className="font-semibold tracking-wide text-orange-500">
            DISCOVER INDIA
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
            Explore by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover India's incredible destinations based on your
            travel interests.
          </p>

        </div>


        {/* =================================================
            CATEGORY CARDS
        ================================================= */}

        {categoryNames.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {categoryNames.map((category) => {

              const info =
                categoryInfo[category] || {
                  icon: "📍",
                  title: category,
                  description:
                    `Explore amazing ${category.toLowerCase()} destinations across India.`,
                };

              const categoryCount =
                destinations.filter(
                  (destination) =>
                    destination.category?.toLowerCase() ===
                    category.toLowerCase()
                ).length;

              const categoryId = category
                .toLowerCase()
                .replace(/\s+/g, "-");

              return (

                <Link
                  key={category}
                  to={`/categories/${categoryId}`}
                  className="group overflow-hidden rounded-2xl bg-white p-7 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* ICON */}

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-4xl transition duration-300 group-hover:scale-110">
                    {info.icon}
                  </div>


                  {/* TITLE */}

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {info.title}
                  </h2>


                  {/* DESCRIPTION */}

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {info.description}
                  </p>


                  {/* COUNT */}

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-500">
                      {categoryCount} destination
                      {categoryCount !== 1 ? "s" : ""}
                    </span>

                    <span className="font-bold text-orange-500 transition group-hover:translate-x-1">
                      Explore →
                    </span>

                  </div>

                </Link>

              );
            })}

          </div>

        ) : (

          /* =================================================
             EMPTY CATEGORY STATE
          ================================================= */

          <EmptyState
            title="No Categories Available"
            message="There are currently no travel categories available."
            buttonText="Explore Destinations"
            buttonLink="/destinations"
          />

        )}


        {/* =================================================
            DESTINATION PREVIEW
        ================================================= */}

        {destinations.length > 0 && (

          <section className="mt-20">

            {/* SECTION HEADING */}

            <div className="mb-8">

              <p className="font-semibold tracking-wide text-orange-500">
                POPULAR DESTINATIONS
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Start Exploring
              </h2>

              <p className="mt-2 text-gray-600">
                Discover some of the amazing places available on
                TravelBharat.
              </p>

            </div>


            {/* DESTINATION GRID */}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {destinations.slice(0, 6).map((destination) => {

                const destinationId = destination.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (

                  <div
                    key={`${destination.stateId}-${destination.name}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    {/* =================================================
                        CLICKABLE DESTINATION IMAGE
                    ================================================= */}

                    <div className="h-56 overflow-hidden">

                      <Link
                        to={`/states/${destination.stateId}/${destinationId}`}
                        className="block h-full"
                        aria-label={`View details for ${destination.name}`}
                      >

                        <ImageWithFallback
                          src={destination.image}
                          alt={destination.name}
                          loading="lazy"
                          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
                        />

                      </Link>

                    </div>


                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-5">

                      {/* STATE */}

                      <p className="text-sm font-semibold text-orange-500">
                        📍 {destination.stateName}
                      </p>


                      {/* NAME */}

                      <h3 className="mt-1 text-xl font-bold text-gray-900">
                        {destination.name}
                      </h3>


                      {/* CATEGORY */}

                      {destination.category && (

                        <span className="mt-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                          {destination.category}
                        </span>

                      )}


                      {/* DESCRIPTION */}

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {destination.description}
                      </p>


                      {/* VIEW DETAILS */}

                      <Link
                        to={`/states/${destination.stateId}/${destinationId}`}
                        className="mt-4 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
                      >
                        View Details →
                      </Link>

                    </div>

                  </div>

                );

              })}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}

export default Categories;