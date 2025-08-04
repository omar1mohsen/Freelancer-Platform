"use client";

export default function Error({ error, reset }: any) {
  const getErrorMessage = (err: any) => {
    try {
      const statusCode = err?.statusCode || 500;
      const message = err?.message || "Something went wrong.";

      switch (statusCode) {
        case 400:
          return "400 - Bad Request. Please check your request.";
        case 401:
          return "401 - Unauthorized. Please log in.";
        case 403:
          return "403 - Forbidden. You don't have permission to access this resource.";
        case 404:
          return "404 - Page Not Found. The resource doesn't exist.";
        case 500:
          return `500 - Internal Server Error. ${message}`;
        default:
          return `Unexpected Error. ${message}`;
      }
    } catch (fallbackErr) {
      return "An unexpected error occurred.";
    }
  };

  return (
    <div className="min-h-[500px] flex flex-col justify-center items-center text-red-500">
      <h1 className="text-xl md:text-4xl font-bold">Oops! Something Went Wrong</h1>
      <p className="text-base max-sm:max-w-xs text-center md:text-lg mt-4 lg:max-w-[80%] mx-auto">{getErrorMessage(error)}</p>
      <button className="app-btn mt-6 px-5 !py-4" onClick={reset}>
        Try Again
      </button>
    </div>
  );
}
