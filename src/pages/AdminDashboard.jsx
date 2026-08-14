
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DESTINATIONS_URL } from "../api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        DESTINATIONS_URL
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load destinations."
        );
      }

      setDestinations(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err) {
      console.error(
        "Admin dashboard error:",
        err
      );

      setError(
        err.message ||
          "Unable to load destinations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Delete "${name}"? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `${DESTINATIONS_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete destination."
        );
      }

      setDestinations((previous) =>
        previous.filter(
          (destination) =>
            destination._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Delete destination error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete destination."
      );
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-slate-500">
            Loading admin dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              TravelBharat Admin
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              Destination Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage destinations stored in MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
            >
              View Website
            </Link>

            <Link
              to="/admin/destinations/create"
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600"
            >
              + Add Destination
            </Link>

          </div>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            ⚠️ {error}
          </div>
        )}


        {/* STATS */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Total Destinations
            </p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {destinations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              Categories
            </p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {
                new Set(
                  destinations
                    .map(
                      (item) =>
                        item.category
                    )
                    .filter(Boolean)
                ).size
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              States
            </p>

            <p className="mt-2 text-3xl font-black text-slate-900">
              {
                new Set(
                  destinations
                    .map(
                      (item) =>
                        item.stateName
                    )
                    .filter(Boolean)
                ).size
              }
            </p>
          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="font-black text-slate-900">
              Destinations
            </h2>
          </div>

          {destinations.length === 0 ? (

            <div className="px-6 py-16 text-center">
              <p className="text-lg font-bold text-slate-700">
                No destinations found.
              </p>

              <Link
                to="/admin/destinations/create"
                className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white"
              >
                Add First Destination
              </Link>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase text-slate-500">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase text-slate-500">
                      State
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {destinations.map(
                    (destination) => (

                      <tr
                        key={destination._id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            {destination.image ? (
                              <img
                                src={
                                  destination.image
                                }
                                alt={
                                  destination.name
                                }
                                className="h-14 w-20 rounded-xl object-cover"
                                onError={(event) => {
                                  event.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div className="h-14 w-20 rounded-xl bg-slate-100" />
                            )}

                            <div>
                              <p className="font-black text-slate-900">
                                {
                                  destination.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {
                                  destination.location ||
                                  "Location not added"
                                }
                              </p>
                            </div>

                          </div>

                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                          {
                            destination.stateName ||
                            "-"
                          }
                        </td>

                        <td className="px-6 py-5">

                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                            {
                              destination.category ||
                              "-"
                            }
                          </span>

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            <Link
                              to={`/admin/destinations/edit/${destination._id}`}
                              className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-100"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              disabled={
                                deletingId ===
                                destination._id
                              }
                              onClick={() =>
                                handleDelete(
                                  destination._id,
                                  destination.name
                                )
                              }
                              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
                            >
                              {deletingId ===
                              destination._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}

export default AdminDashboard;