
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section
        className="relative min-h-[calc(100vh-116px)] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85')",
        }}
      >

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/50" />


        {/* Hero content */}

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-116px)] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12">

          <div className="w-full text-center lg:text-left">

            {/* ==================================================
                LABEL
            ================================================== */}

            <div className="mb-7 flex items-center justify-center gap-4 lg:justify-start">

              <span className="h-[2px] w-16 bg-orange-500" />

              <span className="text-sm font-black uppercase tracking-[0.45em] text-orange-400 sm:text-base">
                Incredible India
              </span>

            </div>


            {/* ==================================================
                HEADING
            ================================================== */}

            <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:mx-0 lg:text-7xl">

              Discover

              <span className="block text-orange-500">
                Incredible India.
              </span>

            </h1>


            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl lg:mx-0 lg:text-2xl">

              From timeless heritage and peaceful spiritual
              places to breathtaking landscapes and
              unforgettable adventures — discover the places
              that make India extraordinary.

            </p>


            {/* ==================================================
                SEARCH
            ================================================== */}

            <form
              onSubmit={handleSearch}
              className="mt-10 flex w-full max-w-5xl flex-col gap-3 rounded-3xl border border-white/20 bg-black/40 p-3 shadow-2xl backdrop-blur-md sm:flex-row"
            >

              <div className="flex flex-1 items-center rounded-2xl bg-white px-5">

                <span className="mr-4 text-2xl">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Where do you want to go?"
                  className="w-full bg-transparent py-5 text-lg text-slate-700 outline-none placeholder:text-slate-500"
                />

              </div>


              <button
                type="submit"
                className="rounded-2xl bg-orange-500 px-10 py-5 text-lg font-black text-white transition hover:bg-orange-600"
              >
                Search
              </button>

            </form>


            {/* ==================================================
                MAIN ACTION BUTTONS
            ================================================== */}

            <div className="mt-8 flex flex-wrap justify-center gap-5 lg:justify-start">

              {/* Explore Destinations */}

              <Link
                to="/destinations"
                className="rounded-2xl bg-orange-500 px-9 py-5 text-lg font-black text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Explore Destinations →
              </Link>


              {/* Explore States */}

              <Link
                to="/states"
                className="rounded-2xl border border-white/40 bg-white/10 px-9 py-5 text-lg font-black text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Explore States
              </Link>

            </div>


            {/* ==================================================
                ADMIN LOGIN
            ================================================== */}

            <div className="mt-7 flex justify-center lg:justify-start">

              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-black/35 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition duration-300 hover:border-orange-400 hover:bg-orange-500"
              >
                🔐
                <span>Admin Login</span>
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          QUICK ACCESS SECTION
      ================================================== */}

      <section className="bg-slate-50 px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="font-black uppercase tracking-widest text-orange-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              Start Your Journey
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Explore India's states, destinations and
              travel experiences.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* STATES */}

            <Link
              to="/states"
              className="group rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                🇮🇳
              </div>

              <h3 className="mt-5 text-2xl font-black text-slate-900">
                Explore States
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Discover destinations, culture, heritage and
                natural beauty across India.
              </p>

              <p className="mt-5 font-bold text-orange-500 group-hover:text-orange-600">
                Explore States →
              </p>

            </Link>


            {/* CATEGORIES */}

            <Link
              to="/categories"
              className="group rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                🏛️
              </div>

              <h3 className="mt-5 text-2xl font-black text-slate-900">
                Browse Categories
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Find heritage, nature, religious, adventure and
                other experiences.
              </p>

              <p className="mt-5 font-bold text-orange-500 group-hover:text-orange-600">
                View Categories →
              </p>

            </Link>


            {/* DESTINATIONS */}

            <Link
              to="/destinations"
              className="group rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="text-4xl">
                🧭
              </div>

              <h3 className="mt-5 text-2xl font-black text-slate-900">
                Popular Destinations
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Explore tourist destinations and plan your
                next Indian adventure.
              </p>

              <p className="mt-5 font-bold text-orange-500 group-hover:text-orange-600">
                View Destinations →
              </p>

            </Link>

          </div>

        </div>

      </section>


      {/* ==================================================
          ADMIN SECTION
      ================================================== */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-8 text-center shadow-sm sm:p-12">

            <div className="text-4xl">
              🔐
            </div>

            <h2 className="mt-4 text-3xl font-black text-slate-900">
              TravelBharat Administration
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Authorized administrators can manage tourism
              destinations and content from the admin dashboard.
            </p>

            <Link
              to="/admin/login"
              className="mt-7 inline-flex rounded-xl bg-orange-500 px-7 py-4 font-black text-white transition hover:bg-orange-600"
            >
              Admin Login →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;