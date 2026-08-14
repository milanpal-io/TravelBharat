import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";

function DestinationCard({ place, stateName, stateId }) {

  // =====================================================
  // DESTINATION URL
  // =====================================================
  // Use MongoDB _id instead of destination name.
  // This allows DestinationDetails.jsx to fetch the
  // exact destination from MongoDB.
  //
  // Falls back to place.id in case the backend's toJSON
  // transform renames _id to id (common with Mongoose
  // virtuals). Without this fallback, place._id can be
  // undefined and gets silently stringified into the URL
  // as the literal text "undefined".
  // =====================================================

  const destinationRefId = place._id || place.id;

  const destinationUrl = destinationRefId
    ? `/states/${stateId}/${destinationRefId}`
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* =================================================
          DESTINATION IMAGE
      ================================================= */}

      <div className="relative h-56 overflow-hidden">

        {destinationUrl ? (
          <Link
            to={destinationUrl}
            className="block h-full w-full"
            aria-label={`View details for ${place.name}`}
          >

            <ImageWithFallback
              src={place.image}
              alt={place.name}
              loading="lazy"
              className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-110"
            />

          </Link>
        ) : (
          <ImageWithFallback
            src={place.image}
            alt={place.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}


        {/* =================================================
            CATEGORY BADGE
        ================================================= */}

        {place.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-orange-600 shadow">
            {place.category}
          </span>
        )}

      </div>


      {/* =================================================
          CARD CONTENT
      ================================================= */}

      <div className="p-5">

        {/* State */}

        <p className="text-sm font-semibold text-orange-500">
          {stateName}
        </p>


        {/* Destination Name */}

        <h3 className="mt-1 text-xl font-bold text-gray-900">
          {place.name}
        </h3>


        {/* Category */}

        {place.category && (
          <span className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            {place.category}
          </span>
        )}


        {/* Description */}

        {place.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {place.description}
          </p>
        )}


        {/* =================================================
            VIEW DETAILS BUTTON
        ================================================= */}

        {destinationUrl ? (
          <Link
            to={destinationUrl}
            className="mt-5 inline-flex items-center font-semibold text-orange-500 transition hover:translate-x-1 hover:text-orange-600"
          >
            View Details →
          </Link>
        ) : (
          <span className="mt-5 inline-flex items-center font-semibold text-gray-400">
            Details unavailable
          </span>
        )}

      </div>

    </article>
  );
}

export default DestinationCard;
