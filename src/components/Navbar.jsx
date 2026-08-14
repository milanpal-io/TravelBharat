import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check active page
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex h-20 items-center justify-between">

          {/* ==========================================
              LOGO
          ========================================== */}

          <Link
            to="/"
            onClick={closeMenu}
            className="group flex flex-col"
          >
            <span className="text-2xl font-extrabold tracking-tight text-orange-500 transition group-hover:text-orange-600">
              TravelBharat
            </span>

            <span className="text-xs font-medium text-gray-500">
              Explore Incredible India
            </span>
          </Link>


          {/* ==========================================
              DESKTOP NAVIGATION
          ========================================== */}

          <div className="hidden items-center gap-7 md:flex">

            {/* Home */}
            <Link
              to="/"
              className={`font-medium transition ${
                isActive("/")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Home
            </Link>


            {/* States */}
            <Link
              to="/states"
              className={`font-medium transition ${
                isActive("/states")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              States
            </Link>


            {/* Categories */}
            <Link
              to="/categories"
              className={`font-medium transition ${
                isActive("/categories")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              Categories
            </Link>


            {/* Search */}
            <Link
              to="/search"
              className={`flex items-center gap-1 font-medium transition ${
                isActive("/search")
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              <span>🔎</span>
              <span>Search</span>
            </Link>


            {/* Destinations */}
            <Link
              to="/destinations"
              className="font-medium text-gray-700 transition hover:text-orange-500"
            >
              Destinations
            </Link>


            {/* About */}
            <Link
              to="/about"
              className="font-medium text-gray-700 transition hover:text-orange-500"
            >
              About
            </Link>

          </div>


          {/* ==========================================
              MOBILE MENU BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 md:hidden"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* ==========================================
            MOBILE NAVIGATION
        ========================================== */}

        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">

            <div className="flex flex-col gap-1">

              {/* Home */}
              <Link
                to="/"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  isActive("/")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                🏠 Home
              </Link>


              {/* States */}
              <Link
                to="/states"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  isActive("/states")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                📍 States & UTs
              </Link>


              {/* Categories */}
              <Link
                to="/categories"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  isActive("/categories")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                🗂️ Categories
              </Link>


              {/* Search */}
              <Link
                to="/search"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 font-medium transition ${
                  isActive("/search")
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                🔎 Search
              </Link>


              {/* Destinations */}
              <Link
                to="/destinations"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                🧭 Destinations
              </Link>


              {/* About */}
              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                ℹ️ About
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;