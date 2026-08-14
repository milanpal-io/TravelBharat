import { Link } from "react-router-dom";

function EmptyState({
  title = "No Results Found",
  message = "We couldn't find anything matching your request.",
  buttonText = "Explore Destinations",
  buttonLink = "/destinations",
}) {
  return (
    <div className="flex min-h-[350px] items-center justify-center px-6">

      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
          🔎
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 leading-relaxed text-gray-500">
          {message}
        </p>

        {/* Button */}
        <Link
          to={buttonLink}
          className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          {buttonText}
        </Link>

      </div>

    </div>
  );
}

export default EmptyState;