import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import UserAdd from "./pages/UserAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/add",
    element: <UserAdd />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
  },
]);

export default router;
