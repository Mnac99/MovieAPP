import {createBrowserRouter} from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
const router = createBrowserRouter([
    {
    path: "/login",
    element:<Login/>,
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
        path:"*",
        element:<Login/>,
    }

])
export default router;