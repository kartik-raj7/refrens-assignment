// AppRouter.js
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./services/utilities/routes";
import LoaderPage from "./pages/loadingpage";
const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          {routes.map(({ path, component: Component, exact, roles }) => (
            <Route
              key={path}
              path={path}
              element={<Component roles={roles} />}
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
