import React from "react";
import { Routes, Route } from "react-router-dom";

// Template component
import DefaultTemplate from "../components/templates/DefaultTemplate";

// Routes configuration
import { RedirectToHome, publicRoutes } from "./routes";

const Index: React.FC = () => {
    return (
        <Routes>
            {publicRoutes.map((route, idx) => (
                <Route
                    path={route.path}
                    element={<DefaultTemplate>{route.component}</DefaultTemplate>}
                    key={idx}
                />
            ))}

			{/* Redirect undefined routes to home */}
            <Route path="*" element={<RedirectToHome />} />
        </Routes>
    );
};

export default Index;
