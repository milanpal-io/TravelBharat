
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getDestinationById,
} from "../services/api";

function DestinationDetails() {
  const { destinationId } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDestination() {
      try {
        setLoading(true);
        setError("");

        const data = await getDestinationById(destinationId);

        setDestination(data);
      } catch (err) {
        console.error("Destination fetch error:", err);
        setError("Failed to load destination.");
      } finally {
        setLoading(false);
      }
    }

    if (destinationId) {
      fetchDestination();
    }
  }, [destinationId]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

          <p className="mt-4 text-gray-600">
            Loading destination...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !destination) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            Destination Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            Sorry, we couldn't find this destination.
          </p>

          <Link
            to="/destinations"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            ← Back to Destinations
          </Link>

        </div>
      </main>
    );
  }

  // =====================================================
  // DESTINATION PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <section className="relative h-[60vh] min-h-[450px] overflow-hidden">

        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/55" />

        {/* Hero Content */}

        <div className="relative z-10 flex h-full items-end px-6 pb-16">

          <div className="mx-auto w-full max-w-7xl text-white">

            <p className="mb-3 font-semibold uppercase tracking-widest text-orange-400">
              {destination.stateName}
            </p>

            <h1 className="text-5xl font-bold md:text-7xl">
              {destination.name}
            </h1>

            {destination.category && (
              <span className="mt-5 inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-bold">
                {destination.category}
              </span>
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          {/* Back */}

          <Link
            to={`/states/${destination.stateId}`}
            className="font-semibold text-orange-500 transition hover:text-orange-600"
          >
            ← Back to {destination.stateName}
          </Link>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="mt-8 grid gap-8 lg:grid-cols-3">

            <div className="lg:col-span-2 rounded-2xl bg-white p-8 shadow-md md:p-10">

              <h2 className="text-3xl font-bold text-gray-900">
                About {destination.name}
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                {destination.description}
              </p>

            </div>


            {/* =================================================
                QUICK INFORMATION
            ================================================= */}

            <div className="rounded-2xl bg-white p-8 shadow-md">

              <h2 className="text-2xl font-bold text-gray-900">
                Quick Information
              </h2>

              <div className="mt-6 space-y-5">

                {destination.location && (
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      Location
                    </p>

                    <p className="mt-1 text-gray-700">
                      {destination.location}
                    </p>
                  </div>
                )}


                {destination.bestTimeToVisit && (
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      Best Time to Visit
                    </p>

                    <p className="mt-1 text-gray-700">
                      {destination.bestTimeToVisit}
                    </p>
                  </div>
                )}


                {destination.entryFeesAndTimings && (
                  <div>
                    <p className="text-sm font-semibold text-orange-500">
                      Entry Fees & Timings
                    </p>

                    <p className="mt-1 text-gray-700">
                      {destination.entryFeesAndTimings}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              GALLERY
          ================================================= */}

          {destination.gallery &&
            destination.gallery.length > 0 && (

              <section className="mt-12">

                <h2 className="text-3xl font-bold text-gray-900">
                  Gallery
                </h2>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                  {destination.gallery.map(
                    (image, index) => (

                      <div
                        key={`${image}-${index}`}
                        className="group h-64 overflow-hidden rounded-2xl shadow-md"
                      >

                        <img
                          src={image}
                          alt={`${destination.name} ${index + 1}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          loading="lazy"
                        />

                      </div>

                    )
                  )}

                </div>

              </section>

            )}


          {/* =================================================
              NEARBY ATTRACTIONS
          ================================================= */}

          {destination.nearbyAttractions &&
            destination.nearbyAttractions.length > 0 && (

              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900">
                  Nearby Attractions
                </h2>

                <div className="mt-6 flex flex-wrap gap-3">

                  {destination.nearbyAttractions.map(
                    (attraction) => (

                      <span
                        key={attraction}
                        className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700"
                      >
                        {attraction}
                      </span>

                    )
                  )}

                </div>

              </section>

            )}

        </div>

      </section>

    </main>
  );
}

export default DestinationDetails;