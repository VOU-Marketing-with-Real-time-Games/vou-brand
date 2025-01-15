import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import path from "../constants/paths.ts";
import HomePage from "../pages/private/HomePage.tsx";
import CampaignsPage from "../pages/private/CampaignsPage.tsx";
import BranchesPage from "../pages/private/BranchesPage.tsx";
import PrivateRoute from "../layout/private/PrivateRoute.tsx";
import LoginPage from "../pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: path.LOGIN,
        element: <LoginPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: path.HOME,
                element: <HomePage />,
              },
              {
                path: path.CAMPAIGNS,
                element: <CampaignsPage />,
              },
              {
                path: path.BRANCHES,
                element: <BranchesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;