import {createBrowserRouter} from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import Favorites from "../components/Favorites.jsx";
import Movies from "../components/Movies.jsx";
import MovieDetails from "../components/MovieDetails.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Register from "../components/Register.jsx";
const router = createBrowserRouter([
    {
    path: "/login",
    element:<Login/>,
    },
    {
        path:"/register",
        element:<Register/>,
    },
    {
        path:"/Home",
        element:(
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/movies/:id",
        element: (
            <ProtectedRoute>
                <MovieDetails />
            </ProtectedRoute>
        ),
    },
    {
        path: "/movies",
        element: (
            <ProtectedRoute>
                <Movies/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/favorites",
        element: (
            <ProtectedRoute>
                <Favorites />
            </ProtectedRoute>
        )
    },
    {
        path:"*",
        element:<Login/>,
    }

])
export default router;