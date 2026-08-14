
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DESTINATIONS_URL } from "../api";

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    stateId: "",
    stateName: "",
    category: "Nature",
    description: "",
    image: "",
    gallery: "",
    location: "",
    bestTimeToVisit: "",
    entryFeesAndTimings: "",
    nearbyAttractions: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${DESTINATIONS_URL}/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to load destination."
          );
        }

        const destination = result.data;

        setForm({
          name: destination.name || "",
          stateId: destination.stateId || "",
          stateName:
            destination.stateName || "",
          category:
            destination.category ||
            "Nature",
          description:
            destination.description || "",
          image: destination.image || "",

          gallery: Array.isArray(
            destination.gallery
          )
            ? destination.gallery.join("\n")
            : "",

          location:
            destination.location || "",

          bestTimeToVisit:
            destination.bestTimeToVisit ||
            "",

          entryFeesAndTimings:
            destination.entryFeesAndTimings ||
            "",

          nearbyAttractions:
            Array.isArray(
              destination.nearbyAttractions
            )
              ? destination.nearbyAttractions.join(
                  "\n"
                )
              : "",
        });

      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Unable to load destination."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError(
        "Destination name is required."
      );
      return;
    }

    if (!form.stateId.trim()) {
      setError("State ID is required.");
      return;
    }

    if (!form.stateName.trim()) {
      setError("State name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!form.image.trim()) {
      setError("Main image is required.");
      return;
    }

    try {
      setSaving(true);

      const updatedData = {
        name: form.name.trim(),

        stateId: form.stateId.trim(),

        stateName: form.stateName.trim(),

        category: form.category,

        description:
          form.description.trim(),

        image: form.image.trim(),

        gallery: form.gallery
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        location:
          form.location.trim(),

        bestTimeToVisit:
          form.bestTimeToVisit.trim(),

        entryFeesAndTimings:
          form.entryFeesAndTimings.trim(),

        nearbyAttractions:
          form.nearbyAttractions
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
      };

      const response = await fetch(
        `${DESTINATIONS_URL}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            updatedData
          ),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to update destination."
        );
      }

      setSuccess(
        "Destination updated successfully!"
      );

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 800);

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to update destination."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-slate-500">
            Loading destination...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8">

      <div className="mx-auto max-w-5xl">

        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
          }
          className="mb-6 font-bold text-orange-600"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
            TravelBharat Admin
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Edit Destination
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-600">
              ✅ {success}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label className="mb-2 block font-bold text-slate-700">
                Destination Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                State ID *
              </label>

              <input
                name="stateId"
                value={form.stateId}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                State Name *
              </label>

              <input
                name="stateName"
                value={form.stateName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
              >
                <option>Nature</option>
                <option>Heritage</option>
                <option>Religious</option>
                <option>Adventure</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block font-bold text-slate-700">
                Main Image URL *
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              {form.image && (
                <img
                  src={form.image}
                  alt="Destination preview"
                  className="mt-4 h-56 w-full rounded-2xl object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block font-bold text-slate-700">
                Gallery Images
              </label>

              <textarea
                name="gallery"
                value={form.gallery}
                onChange={handleChange}
                rows="4"
                placeholder="One image URL per line"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block font-bold text-slate-700">
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Best Time to Visit
              </label>

              <input
                name="bestTimeToVisit"
                value={
                  form.bestTimeToVisit
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">
                Entry Fees & Timings
              </label>

              <input
                name="entryFeesAndTimings"
                value={
                  form.entryFeesAndTimings
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block font-bold text-slate-700">
                Nearby Attractions
              </label>

              <textarea
                name="nearbyAttractions"
                value={
                  form.nearbyAttractions
                }
                onChange={handleChange}
                rows="5"
                placeholder="One attraction per line"
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/dashboard"
                )
              }
              className="rounded-xl bg-slate-100 px-6 py-3 font-bold text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-6 py-3 font-black text-white disabled:opacity-50"
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}

export default EditDestination;