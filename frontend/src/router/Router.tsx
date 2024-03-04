import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ]
    }
])

const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;