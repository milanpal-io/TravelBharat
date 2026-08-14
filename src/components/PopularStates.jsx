import { Link } from "react-router-dom";
import { states } from "../data/states";

function PopularStates() {
  const popularStates = states.slice(0, 4);

  return (
    <section className="bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            HEADING
        ========================================== */}

        <div className="mb-10 text-center">

          <p className="font-semibold tracking-wide text-orange-500">
            EXPLORE INDIA
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Popular States
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover amazing destinations, culture, heritage and natural
            beauty across the states of India.
          </p>

        </div>


        {/* ==========================================
            POPULAR STATE CARDS
        ========================================== */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {popularStates.map((state) => (

            <div
              key={state.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* ========================================
                  CLICKABLE STATE IMAGE
              ======================================== */}

              <div className="h-64 overflow-hidden">

                <Link
                  to={`/states/${state.id}`}
                  className="block h-full"
                  aria-label={`Explore ${state.name}`}
                >

                  <img
                    src={state.image}
                    alt={state.name}
                    className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
                  />

                </Link>

              </div>


              {/* ========================================
                  CARD CONTENT
              ======================================== */}

              <div className="p-5 text-center">

                <h3 className="text-2xl font-bold text-gray-900">
                  {state.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-gray-600">
                  {state.description}
                </p>


                {/* ======================================
                    EXPLORE BUTTON
                ====================================== */}

                <Link
                  to={`/states/${state.id}`}
                  className="mt-5 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
                >
                  Explore →
                </Link>

              </div>

            </div>

          ))}

        </div>


        {/* ==========================================
            VIEW ALL STATES
        ========================================== */}

        <div className="mt-10 text-center">

          <Link
            to="/states"
            className="inline-block rounded-xl border-2 border-orange-500 px-7 py-3 font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
          >
            View All States →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default PopularStates;