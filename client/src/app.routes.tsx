import { createBrowserRouter } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])