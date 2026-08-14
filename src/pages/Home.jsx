
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = [
    {
      name: "All",
      icon: "✦",
      path: "/destinations",
    },
    {
      name: "Religious",
      icon: "🛕",
      path: "/categories/Religious",
    },
    {
      name: "Nature",
      icon: "🌿",
      path: "/categories/Nature",
    },
    {
      name: "Adventure",
      icon: "🏔️",
      path: "/categories/Adventure",
    },
    {
      name: "Heritage",
      icon: "🏛️",
      path: "/categories/Heritage",
    },
  ];

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      navigate("/search");
      return;
    }

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-[calc(100vh-96px)] overflow-hidden">

        {/* Background */}

        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=90"
          alt="Taj Mahal, India"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />


        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center px-6 py-20">

          <div className="mx-auto w-full max-w-7xl">

            <div className="max-w-4xl text-white">

              {/* Eyebrow */}

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-12 bg-orange-400" />

                <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-400">
                  Incredible India
                </p>

              </div>


              {/* Main Heading */}

              <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">

                Discover

                <span className="block text-orange-400">
                  Incredible India.
                </span>

              </h1>


              {/* Description */}

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg md:text-xl">

                From timeless heritage and peaceful spiritual places
                to breathtaking landscapes and unforgettable adventures —
                discover the places that make India extraordinary.

              </p>


              {/* =================================================
                  SEARCH BOX
              ================================================= */}

              <form
                onSubmit={handleSearch}
                className="mt-9 max-w-3xl"
              >

                <div className="rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl">

                  <div className="flex flex-col gap-2 sm:flex-row">

                    {/* Input */}

                    <div className="flex flex-1 items-center rounded-xl bg-white px-5">

                      <span className="mr-3 text-xl">
                        🔎
                      </span>

                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerm(e.target.value)
                        }
                        placeholder="Where do you want to go?"
                        className="h-14 w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-500"
                      />

                    </div>


                    {/* Search Button */}

                    <button
                      type="submit"
                      className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition duration-300 hover:bg-orange-600 sm:min-w-[140px]"
                    >
                      Search
                    </button>

                  </div>

                </div>

              </form>


              {/* =================================================
                  HERO ACTIONS
              ================================================= */}

              <div className="mt-7 flex flex-wrap gap-4">

                <Link
                  to="/destinations"
                  className="rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
                >
                  Explore Destinations
                  <span className="ml-2">
                    →
                  </span>
                </Link>


                <Link
                  to="/states"
                  className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
                >
                  Explore States
                </Link>

              </div>


              {/* =================================================
                  TRUST / QUICK INFO
              ================================================= */}

              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-7">

                <div>
                  <p className="text-2xl font-bold">
                    145+
                  </p>

                  <p className="text-sm text-gray-300">
                    Destinations
                  </p>
                </div>


                <div>
                  <p className="text-2xl font-bold">
                    28+
                  </p>

                  <p className="text-sm text-gray-300">
                    States & UTs
                  </p>
                </div>


                <div>
                  <p className="text-2xl font-bold">
                    5
                  </p>

                  <p className="text-sm text-gray-300">
                    Travel Categories
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Scroll Indicator */}

        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center text-white/70 md:flex">

          <span className="text-xs uppercase tracking-[0.3em]">
            Explore
          </span>

          <span className="mt-2 animate-bounce text-xl">
            ↓
          </span>

        </div>

      </section>


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="font-bold uppercase tracking-[0.2em] text-orange-500">
                Explore your way
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
                Find your kind of India
              </h2>

            </div>

            <Link
              to="/categories"
              className="font-semibold text-orange-500 transition hover:text-orange-600"
            >
              View all categories →
            </Link>

          </div>


          {/* Category Cards */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {categories.map((category) => (

              <Link
                key={category.name}
                to={category.path}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition duration-300 hover:-translate-y-2 hover:border-orange-200 hover:bg-orange-50 hover:shadow-lg"
              >

                <div className="flex items-center justify-between">

                  <span className="text-3xl transition duration-300 group-hover:scale-110">
                    {category.icon}
                  </span>

                  <span className="text-gray-300 transition group-hover:text-orange-500">
                    →
                  </span>

                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Explore {category.name.toLowerCase()} destinations
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED DESTINATIONS
      ===================================================== */}

      <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="font-bold uppercase tracking-[0.2em] text-orange-500">
                Popular places
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-900 md:text-5xl">
                Start your journey
              </h2>

              <p className="mt-4 max-w-2xl text-gray-600">
                Discover some of India's most memorable destinations
                and start planning your next adventure.
              </p>

            </div>

            <Link
              to="/destinations"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Explore all destinations →
            </Link>

          </div>


          {/* Destination Preview */}

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {/* Taj Mahal */}

            <Link
              to="/destinations"
              className="group relative h-[420px] overflow-hidden rounded-3xl"
            >

              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=85"
                alt="Taj Mahal"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase backdrop-blur-md">
                  Heritage
                </span>

                <h3 className="mt-4 text-3xl font-black">
                  Agra
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Timeless architecture and unforgettable history.
                </p>

              </div>

            </Link>


            {/* Mountains */}

            <Link
              to="/destinations"
              className="group relative h-[420px] overflow-hidden rounded-3xl"
            >

              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
                alt="Himalayan mountains"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase backdrop-blur-md">
                  Nature
                </span>

                <h3 className="mt-4 text-3xl font-black">
                  Himalayas
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Majestic mountains, valleys and peaceful escapes.
                </p>

              </div>

            </Link>


            {/* Kerala */}

            <Link
              to="/destinations"
              className="group relative h-[420px] overflow-hidden rounded-3xl"
            >

              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85"
                alt="Kerala"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase backdrop-blur-md">
                  Nature
                </span>

                <h3 className="mt-4 text-3xl font-black">
                  Kerala
                </h3>

                <p className="mt-2 text-sm text-gray-200">
                  Backwaters, greenery and unforgettable experiences.
                </p>

              </div>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY TRAVELBHARAT
      ===================================================== */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-bold uppercase tracking-[0.2em] text-orange-500">
              Why TravelBharat?
            </p>

            <h2 className="mt-3 text-3xl font-black text-gray-900 md:text-5xl">
              India, organized for explorers.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Everything you need to discover India's destinations,
              states, culture and experiences — all in one place.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}

            <div className="rounded-3xl border border-gray-100 p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                🗺️
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Discover Easily
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Browse destinations by state, category or search
                exactly where you want to go.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="rounded-3xl border border-gray-100 p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                🧭
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Explore Your Way
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Find nature escapes, heritage sites, religious places
                and adventure destinations.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="rounded-3xl border border-gray-100 p-8">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                ❤️
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Made for Travelers
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                A simple and responsive experience designed to make
                discovering India enjoyable.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[2rem] bg-gray-900 px-8 py-16 text-center text-white md:px-16">

            {/* Decorative */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />


            <div className="relative z-10">

              <p className="font-bold uppercase tracking-[0.25em] text-orange-400">
                Your journey starts here
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black md:text-6xl">
                Where will India take you?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
                Explore extraordinary places, discover new experiences
                and create memories across India.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  to="/destinations"
                  className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
                >
                  Start Exploring →
                </Link>

                <Link
                  to="/states"
                  className="rounded-xl border border-white/20 px-8 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  Browse States
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;