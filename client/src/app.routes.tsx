import { createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "./pages/error/ErrorPage";



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