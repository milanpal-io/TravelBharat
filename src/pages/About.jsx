import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-gray-900 px-6 py-24 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-orange-400">
            About TravelBharat
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
            Discover the Incredible India 🇮🇳
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            TravelBharat is a tourism information platform designed to
            help travelers discover India's diverse destinations,
            heritage, nature, religious places and adventures in one
            convenient place.
          </p>

        </div>

      </section>


      {/* ==========================================
          ABOUT CONTENT
      ========================================== */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            {/* Image */}

            <div className="overflow-hidden rounded-3xl shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
                alt="India tourism"
                className="h-full min-h-[350px] w-full object-cover"
              />

            </div>


            {/* Text */}

            <div>

              <p className="font-semibold uppercase tracking-wide text-orange-500">
                Our Purpose
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                One Platform to Explore India
              </h2>

              <p className="mt-5 leading-relaxed text-gray-600">
                India has thousands of tourist destinations spread
                across different states and union territories. Finding
                organized and useful information about these places can
                sometimes be difficult.
              </p>

              <p className="mt-4 leading-relaxed text-gray-600">
                TravelBharat aims to organize destination information
                state-wise and category-wise so travelers can discover
                places more easily and plan their journeys better.
              </p>

              <Link
                to="/destinations"
                className="mt-7 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Explore Destinations →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          FEATURES
      ========================================== */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center">

            <p className="font-semibold uppercase tracking-wide text-orange-500">
              What We Offer
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Explore TravelBharat
            </h2>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Feature 1 */}

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="text-4xl">
                📍
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                State-Wise Discovery
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Browse tourist destinations across India's states and
                union territories.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="text-4xl">
                🔎
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Smart Search
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Quickly find destinations by name, state or category.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="text-4xl">
                🏛️
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Rich Information
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Discover historical significance, timings, nearby
                attractions and other useful destination information.
              </p>

            </div>


            {/* Feature 4 */}

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="text-4xl">
                🖼️
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Visual Discovery
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Explore destinations through images and visual
                galleries.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          CATEGORIES
      ========================================== */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-6xl text-center">

          <p className="font-semibold uppercase tracking-wide text-orange-500">
            Discover Your Interest
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Different Experiences
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-7 shadow-md">
              <div className="text-4xl">🏛️</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Heritage
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Historic monuments and cultural landmarks.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-md">
              <div className="text-4xl">🌿</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Nature
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Mountains, beaches, forests and natural landscapes.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-md">
              <div className="text-4xl">🛕</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Religious
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Temples, monasteries and important spiritual places.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-md">
              <div className="text-4xl">🏔️</div>
              <h3 className="mt-3 font-bold text-gray-900">
                Adventure
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Exciting destinations and outdoor experiences.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          TECHNOLOGY
      ========================================== */}

      <section className="bg-gray-900 px-6 py-16 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <p className="font-semibold uppercase tracking-wide text-orange-400">
            Built With Technology
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            TravelBharat Technology Stack
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            The platform is being developed using modern web
            technologies to provide a fast, responsive and scalable
            tourism experience.
          </p>


          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {[
              "HTML5",
              "CSS3",
              "JavaScript",
              "React.js",
              "Tailwind CSS",
              "Node.js",
              "Express.js",
              "MongoDB",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-gray-700 bg-gray-800 px-5 py-3 font-medium text-gray-200"
              >
                {technology}
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* ==========================================
          CTA
      ========================================== */}

      <section className="bg-orange-500 px-6 py-16 text-center text-white">

        <div className="mx-auto max-w-4xl">

          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Explore India?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Discover beautiful destinations and start exploring
            Incredible India with TravelBharat.
          </p>

          <Link
            to="/destinations"
            className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-bold text-orange-500 transition hover:bg-gray-100"
          >
            Explore Destinations
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;