import { useState } from "react";

function ImageWithFallback({
  src,
  alt = "",
  className = "",
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
      >
        <div className="text-center text-gray-500">
          <div className="text-4xl">🖼️</div>

          <p className="mt-2 text-sm font-medium">
            Image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      {...props}
    />
  );
}

export default ImageWithFallback;