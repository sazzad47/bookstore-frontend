import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

// Define public routes
const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/home", component: <Home /> },
];

// This component handles the redirection for undefined routes
const RedirectToHome = () => <Navigate to="/" />;

export { publicRoutes, RedirectToHome };
