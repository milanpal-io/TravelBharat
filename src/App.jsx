
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ======================================================
// PUBLIC COMPONENTS
// ======================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ======================================================
// ADMIN COMPONENTS
// ======================================================

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateDestination from "./pages/CreateDestination";
import EditDestination from "./pages/EditDestination";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

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
// PUBLIC PAGE WRAPPER
// ======================================================

function PublicPage({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


// ======================================================
// APP
// ======================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            PUBLIC HOME
        ================================================== */}

        <Route
          path="/"
          element={
            <PublicPage>
              <Home />
            </PublicPage>
          }
        />


        {/* ==================================================
            STATES
        ================================================== */}

        <Route
          path="/states"
          element={
            <PublicPage>
              <States />
            </PublicPage>
          }
        />

        <Route
          path="/states/:stateId"
          element={
            <PublicPage>
              <StateDetails />
            </PublicPage>
          }
        />


        {/* ==================================================
            CATEGORIES
        ================================================== */}

        <Route
          path="/categories"
          element={
            <PublicPage>
              <Categories />
            </PublicPage>
          }
        />

        <Route
          path="/categories/:category"
          element={
            <PublicPage>
              <CategoryDetails />
            </PublicPage>
          }
        />


        {/* ==================================================
            DESTINATIONS
        ================================================== */}

        <Route
          path="/destinations"
          element={
            <PublicPage>
              <Destinations />
            </PublicPage>
          }
        />

        <Route
          path="/states/:stateId/:destinationId"
          element={
            <PublicPage>
              <DestinationDetails />
            </PublicPage>
          }
        />


        {/* ==================================================
            SEARCH
        ================================================== */}

        <Route
          path="/search"
          element={
            <PublicPage>
              <Search />
            </PublicPage>
          }
        />


        {/* ==================================================
            ABOUT
        ================================================== */}

        <Route
          path="/about"
          element={
            <PublicPage>
              <About />
            </PublicPage>
          }
        />


        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==================================================
            ADMIN DASHBOARD
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
            UNKNOWN ROUTE
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;