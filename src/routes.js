import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import UserAdd from "./pages/UserAdd";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/add",
    element: (
      <ProtectedRoute>
        <UserAdd />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
