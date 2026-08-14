import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { states } from "../data/states";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // --------------------------------------------------
  // Create flat destination list
  // --------------------------------------------------

  const destinations = states.flatMap((state) =>
    (state.places || []).map((place) => ({
      ...place,
      stateName: state.name,
      stateId: state.id,
    }))
  );

  // --------------------------------------------------
  // Live suggestions
  // --------------------------------------------------

  const suggestions =
    searchTerm.trim().length > 0
      ? destinations
          .filter((place) => {
            const search = searchTerm.toLowerCase();

            return (
              place.name?.toLowerCase().includes(search) ||
              place.stateName?.toLowerCase().includes(search) ||
              place.category?.toLowerCase().includes(search)
            );
          })
          .slice(0, 6)
      : [];

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const handleSearch = () => {
    const query = searchTerm.trim();

    setShowSuggestions(false);

    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    } else {
      navigate("/search");
    }
  };

  // --------------------------------------------------
  // Enter key
  // --------------------------------------------------

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // --------------------------------------------------
  // Select suggestion
  // --------------------------------------------------

  const handleSuggestionClick = (place) => {
    const destinationId = place.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    setSearchTerm(place.name);
    setShowSuggestions(false);

    navigate(
      `/states/${place.stateId}/${destinationId}`
    );
  };

  // --------------------------------------------------
  // Close suggestions when clicking outside
  // --------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-900 px-6 text-white"
    >

      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}

      <img
        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=80"
        alt="India tourism"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/60" />


      {/* =================================================
          HERO CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

        {/* Small Heading */}

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400 md:text-base">
          Discover • Explore • Experience
        </p>


        {/* Main Heading */}

        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          Explore Incredible India 🇮🇳
        </h1>


        {/* Description */}

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-200 md:text-xl">
          Discover amazing destinations, rich heritage, beautiful
          nature, spiritual places and unforgettable adventures
          across India.
        </p>


        {/* =================================================
            SEARCH AREA
        ================================================= */}

        <div
          ref={searchRef}
          className="relative mx-auto mt-10 max-w-3xl"
        >

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search Input */}

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                if (searchTerm.trim()) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search destinations, states or categories..."
              className="flex-1 rounded-xl border border-white/20 bg-white px-5 py-4 text-base text-gray-900 shadow-lg outline-none transition placeholder:text-gray-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/30"
            />


            {/* Search Button */}

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-orange-600 hover:shadow-xl"
            >
              🔎 Search
            </button>

          </div>


          {/* =================================================
              LIVE SUGGESTIONS
          ================================================= */}

          {showSuggestions &&
            searchTerm.trim() &&
            suggestions.length > 0 && (

              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white text-left shadow-2xl">

                {suggestions.map((place) => {

                  const destinationId = place.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (

                    <button
                      key={`${place.stateId}-${place.name}`}
                      type="button"
                      onClick={() =>
                        handleSuggestionClick(place)
                      }
                      className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition last:border-b-0 hover:bg-orange-50"
                    >

                      {/* Thumbnail */}

                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                      />


                      {/* Information */}

                      <div className="min-w-0 flex-1">

                        <p className="font-bold text-gray-900">
                          {place.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          📍 {place.stateName}
                        </p>

                        {place.category && (
                          <span className="mt-1 inline-block text-xs font-semibold text-orange-500">
                            {place.category}
                          </span>
                        )}

                      </div>


                      {/* Arrow */}

                      <span className="text-lg text-orange-500">
                        →
                      </span>

                    </button>

                  );
                })}

              </div>

            )}


          {/* =================================================
              NO SUGGESTIONS
          ================================================= */}

          {showSuggestions &&
            searchTerm.trim() &&
            suggestions.length === 0 && (

              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl bg-white p-5 text-left text-gray-600 shadow-2xl">
                No matching destinations found.
              </div>

            )}

        </div>


        {/* =================================================
            EXPLORE BUTTON
        ================================================= */}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/destinations"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
          >
            Explore Destinations
            <span className="ml-2 text-lg">
              →
            </span>
          </Link>

          <Link
            to="/states"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            Explore States
          </Link>

        </div>


        {/* =================================================
            QUICK SEARCH SUGGESTIONS
        ================================================= */}

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <button
            type="button"
            onClick={() => {
              setSearchTerm("Darjeeling");
              navigate("/search?query=Darjeeling");
            }}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Darjeeling
          </button>


          <button
            type="button"
            onClick={() => {
              setSearchTerm("Nature");
              navigate("/search?query=Nature");
            }}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Nature
          </button>


          <button
            type="button"
            onClick={() => {
              setSearchTerm("Heritage");
              navigate("/search?query=Heritage");
            }}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Heritage
          </button>


          <button
            type="button"
            onClick={() => {
              setSearchTerm("Kerala");
              navigate("/search?query=Kerala");
            }}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Kerala
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;