import { createBrowserRouter } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "./pages/error/ErrorPage";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Report from "./pages/interview/Report";
import Interview from "./pages/interview/Interview";
import MyReports from "./pages/interview/MyReports";



export const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/interview",
                        element: <Interview />,
                    },
                    {
                        path: "/report",
                        element: <Report />,
                    },
                    {
                        path: "/report/:reportId",
                        element: <Report />,
                    },
                    {
                        path: "/reports",
                        element: <MyReports />,
                    },
                ],
            },

            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
])
