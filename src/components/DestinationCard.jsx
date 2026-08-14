
import { Link } from "react-router-dom";

function DestinationCard({
  place,
  stateName,
  stateId,
}) {
  if (!place) {
    return null;
  }

  const destinationName =
    place.name || "Unknown Destination";

  const destinationId =
    place._id ||
    place.id ||
    place.destinationId;

  const finalStateId =
    place.stateId ||
    stateId ||
    "";

  const image =
    place.image ||
    place.imageUrl ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

  const category =
    place.category || "Travel";

  const description =
    place.description ||
    "Discover this beautiful destination in India.";

  /*
   * MongoDB destinations use:
   *
   * /states/:stateId/:destinationId
   *
   * Static destinations may have their own id.
   */

  const destinationLink =
    destinationId && finalStateId
      ? `/states/${finalStateId}/${destinationId}`
      : `/destinations`;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* ==================================================
          IMAGE
      ================================================== */}

      <Link to={destinationLink}>

        <div className="relative h-56 overflow-hidden bg-slate-200">

          <img
            src={image}
            alt={destinationName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-600 backdrop-blur">
            {category}
          </span>

        </div>

      </Link>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="p-5">

        <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
          {stateName ||
            place.stateName ||
            "India"}
        </p>

        <Link to={destinationLink}>

          <h2 className="mt-2 text-xl font-black text-slate-900 transition hover:text-orange-600">
            {destinationName}
          </h2>

        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {description}
        </p>


        {/* ==================================================
            DETAILS
        ================================================== */}

        <div className="mt-5 flex items-center justify-between">

          <span className="text-sm font-bold text-slate-400">
            📍{" "}
            {place.location ||
              stateName ||
              "India"}
          </span>

          <Link
            to={destinationLink}
            className="text-sm font-black text-orange-600 hover:text-orange-700"
          >
            Explore →
          </Link>

        </div>

      </div>

    </article>
  );
}

export default DestinationCard;