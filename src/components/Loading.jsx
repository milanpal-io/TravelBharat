function Loading({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-6">
      <div className="text-center">

        {/* Spinner */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

        <p className="mt-5 text-sm font-medium text-gray-600">
          {text}
        </p>

      </div>
    </div>
  );
}

export default Loading;