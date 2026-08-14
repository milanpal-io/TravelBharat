import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* ==========================================
          MAIN FOOTER
      ========================================== */}

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ==========================================
              BRAND
          ========================================== */}

          <div>

            <Link
              to="/"
              className="inline-block"
            >
              <h2 className="text-2xl font-extrabold text-orange-500">
                TravelBharat
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Explore Incredible India
              </p>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Discover India's beautiful destinations, rich heritage,
              natural wonders, spiritual places and exciting
              adventures — all in one place.
            </p>

          </div>


          {/* ==========================================
              QUICK LINKS
          ========================================== */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/"
                  className="transition hover:text-orange-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/states"
                  className="transition hover:text-orange-500"
                >
                  States & UTs
                </Link>
              </li>

              <li>
                <Link
                  to="/destinations"
                  className="transition hover:text-orange-500"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="transition hover:text-orange-500"
                >
                  Categories
                </Link>
              </li>

            </ul>

          </div>


          {/* ==========================================
              DISCOVER
          ========================================== */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Discover
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/search"
                  className="transition hover:text-orange-500"
                >
                  🔎 Search Destinations
                </Link>
              </li>

              <li>
                <Link
                  to="/categories/heritage"
                  className="transition hover:text-orange-500"
                >
                  🏛️ Heritage
                </Link>
              </li>

              <li>
                <Link
                  to="/categories/nature"
                  className="transition hover:text-orange-500"
                >
                  🌿 Nature
                </Link>
              </li>

              <li>
                <Link
                  to="/categories/adventure"
                  className="transition hover:text-orange-500"
                >
                  🏔️ Adventure
                </Link>
              </li>

            </ul>

          </div>


          {/* ==========================================
              ABOUT
          ========================================== */}

          <div>

            <h3 className="text-lg font-bold text-white">
              TravelBharat
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/about"
                  className="transition hover:text-orange-500"
                >
                  About Us
                </Link>
              </li>

              <li>
                <span className="text-gray-500">
                  Tourism Information
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  Explore India
                </span>
              </li>

              <li>
                <span className="text-gray-500">
                  Made with ❤️ in India
                </span>
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* ==========================================
          BOTTOM BAR
      ========================================== */}

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p>
            © {currentYear} TravelBharat. All rights reserved.
          </p>

          <p>
            Explore • Experience • Incredible India 🇮🇳
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;