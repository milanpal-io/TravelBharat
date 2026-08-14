
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function DestinationDetails() {
  const { stateId, destinationId } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        if (!destinationId) {
          throw new Error("Destination ID is missing.");
        }

        const response = await fetch(
          `${API_URL}/api/destinations/${destinationId}`
        );

        const result = await response.json();

        console.log(
          "Destination API response:",
          result
        );

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Destination not found."
          );
        }

        setDestination(result.data);

      } catch (err) {
        console.error(
          "Destination details error:",
          err
        );

        setError(
          err.message ||
            "Unable to load destination."
        );

      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [destinationId]);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12">

        <div className="mx-auto max-w-6xl text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-slate-500">
            Loading destination...
          </p>

        </div>

      </main>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error || !destination) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12">

        <div className="mx-auto max-w-3xl">

          <Link
            to={
              stateId
                ? `/states/${stateId}`
                : "/destinations"
            }
            className="font-bold text-orange-600"
          >
            ← Back
          </Link>

          <div className="mt-8 rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">
              ⚠️
            </div>

            <h1 className="mt-4 text-2xl font-black text-slate-900">
              Destination Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              {error ||
                "We could not find this destination."}
            </p>

            <p className="mt-4 break-all rounded-lg bg-slate-100 p-3 text-xs text-slate-500">
              Destination ID: {destinationId}
            </p>

            <Link
              to="/destinations"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              Explore Destinations
            </Link>

          </div>

        </div>

      </main>
    );
  }


  // ======================================================
  // DATA
  // ======================================================

  const gallery = Array.isArray(
    destination.gallery
  )
    ? destination.gallery
    : [];

  const nearbyAttractions = Array.isArray(
    destination.nearbyAttractions
  )
    ? destination.nearbyAttractions
    : [];


  // ======================================================
  // PAGE
  // ======================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="relative">

        {destination.image ? (
          <img
            src={destination.image}
            alt={destination.name}
            className="h-[420px] w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <div className="flex h-[420px] items-center justify-center bg-slate-300">
            <span className="text-lg font-bold text-slate-600">
              No image available
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-end">

          <div className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">

            <p className="text-sm font-black uppercase tracking-widest text-orange-300">
              {destination.category ||
                "Destination"}
            </p>

            <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
              {destination.name}
            </h1>

            <p className="mt-2 text-white/90">
              📍{" "}
              {destination.location ||
                destination.stateName ||
                "India"}
            </p>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

        <Link
          to={
            stateId
              ? `/states/${stateId}`
              : "/destinations"
          }
          className="font-bold text-orange-600 hover:text-orange-700"
        >
          ← Back to {destination.stateName || "Destinations"}
        </Link>


        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* ABOUT */}

          <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2">

            <h2 className="text-2xl font-black text-slate-900">
              About
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
              {destination.description}
            </p>

          </div>


          {/* QUICK INFORMATION */}

          <div className="rounded-3xl bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">
              Quick Information
            </h2>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  State
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {destination.stateName ||
                    "Not available"}
                </p>
              </div>


              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Category
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {destination.category ||
                    "Not available"}
                </p>
              </div>


              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Best Time
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {destination.bestTimeToVisit ||
                    "Not available"}
                </p>
              </div>


              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Entry Fees & Timings
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {destination.entryFeesAndTimings ||
                    "Not available"}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* GALLERY */}

        {gallery.length > 0 && (
          <section className="mt-10">

            <h2 className="text-2xl font-black text-slate-900">
              Gallery
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {gallery.map((image, index) => (

                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${destination.name} ${index + 1}`}
                  className="h-60 w-full rounded-2xl object-cover shadow-sm"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

              ))}

            </div>

          </section>
        )}


        {/* NEARBY */}

        {nearbyAttractions.length > 0 && (
          <section className="mt-10 rounded-3xl bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-black text-slate-900">
              Nearby Attractions
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              {nearbyAttractions.map(
                (attraction, index) => (

                  <div
                    key={`${attraction}-${index}`}
                    className="rounded-xl bg-slate-50 px-4 py-3 font-semibold text-slate-700"
                  >
                    📍 {attraction}
                  </div>

                )
              )}

            </div>

          </section>
        )}

      </section>

    </main>
  );
}

export default DestinationDetails;