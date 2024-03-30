import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes, dashboarRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  authRoutes,
  dashboarRoutes,
  {
    path: "404",
    element: <>Page not found</>,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
]);
export default router;
