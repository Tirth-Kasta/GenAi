// pages/ErrorPage.tsx

import { isRouteErrorResponse, Link, useRouteError } from "react-router";


const ErrorPage = () => {
    const error = useRouteError();

    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message =
            error.status === 404
                ? "The page you're looking for doesn't exist."
                : error.data?.message || "Something went wrong.";
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-900">
                    {title}
                </h1>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;