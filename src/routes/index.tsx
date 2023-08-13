import React from "react";
import { Routes, Route } from "react-router-dom";

//template
import DefaultTemplate from "../components/templates/DefaultTemplate";

// routes
import { publicRoutes } from "./routes";

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
    </Routes>
  );
};

export default Index;
