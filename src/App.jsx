
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// PUBLIC COMPONENTS
// ======================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ======================================================
// PUBLIC PAGES
// ======================================================

import Home from "./pages/Home";
import States from "./pages/States";
import StateDetails from "./pages/StateDetails";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Search from "./pages/Search";
import About from "./pages/About";

// ======================================================
// ADMIN PAGES
// ======================================================

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDestination from "./pages/CreateDestination";
import EditDestination from "./pages/EditDestination";

// ======================================================
// ADMIN PROTECTION
// ======================================================

import AdminProtectedRoute from "./components/AdminProtectedRoute";


function App() {
  return (
    <BrowserRouter>

      {/* ==================================================
          PUBLIC NAVBAR
      ================================================== */}

      <Navbar />


      {/* ==================================================
          ROUTES
      ================================================== */}

      <Routes>

        {/* ==================================================
            HOME
        ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ==================================================
            STATES
        ================================================== */}

        <Route
          path="/states"
          element={<States />}
        />

        <Route
          path="/states/:stateId"
          element={<StateDetails />}
        />


        {/* ==================================================
            CATEGORIES
        ================================================== */}

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/categories/:category"
          element={<CategoryDetails />}
        />


        {/* ==================================================
            DESTINATIONS
        ================================================== */}

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/states/:stateId/:destinationId"
          element={<DestinationDetails />}
        />


        {/* ==================================================
            SEARCH
        ================================================== */}

        <Route
          path="/search"
          element={<Search />}
        />


        {/* ==================================================
            ABOUT
        ================================================== */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* ==================================================
            ADMIN LOGIN
            Publicly accessible, but linked from Home
        ================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==================================================
            ADMIN DASHBOARD
            PROTECTED
        ================================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />


        {/* ==================================================
            CREATE DESTINATION
            PROTECTED
        ================================================== */}

        <Route
          path="/admin/destinations/new"
          element={
            <AdminProtectedRoute>
              <CreateDestination />
            </AdminProtectedRoute>
          }
        />


        {/* ==================================================
            EDIT DESTINATION
            PROTECTED
        ================================================== */}

        <Route
          path="/admin/destinations/edit/:id"
          element={
            <AdminProtectedRoute>
              <EditDestination />
            </AdminProtectedRoute>
          }
        />


        {/* ==================================================
            404 PAGE
        ================================================== */}

        <Route
          path="*"
          element={
            <main className="min-h-screen bg-slate-50 px-6 py-20">

              <div className="mx-auto max-w-3xl text-center">

                <div className="text-6xl">
                  🧭
                </div>

                <h1 className="mt-5 text-4xl font-black text-slate-900">
                  Page Not Found
                </h1>

                <p className="mt-3 text-slate-500">
                  The page you are looking for does not exist.
                </p>

                <a
                  href="/"
                  className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Back to Home
                </a>

              </div>

            </main>
          }
        />

      </Routes>


      {/* ==================================================
          PUBLIC FOOTER
      ================================================== */}

      <Footer />

    </BrowserRouter>
  );
}

export default App;