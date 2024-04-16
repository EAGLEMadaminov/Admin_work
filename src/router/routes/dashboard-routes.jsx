import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  AgencyListPage,
  AddPostPage,
  ViewPostPage,
  UpdatePostPage,
  AgencyInfoPage,
  NotificationPage,
  EditInfoPage,
} from "../../pages/dashboard/index.js";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

const dashboarRoutes = {
  path: "dashboard/agency",
  element: (
    <DashboardLayout>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ),
      children: [
        {
          path: "posts",
          children: [
            {
              index: true,
              element: <AgencyListPage />,
            },
            {
              path: "add",
              element: <AddPostPage />,
            },
            {
              path: "view/:id",
              element: <ViewPostPage />,
            },
            {
              path: "edit/:id",
              element: <UpdatePostPage />,
            },
          ],
        },
        {
          path: "info",
          children: [
            {
              index: true,
              element: <AgencyInfoPage />,
            },
            {
              path: "edit",
              element: <EditInfoPage />,
            },
          ],
        },
        {
          path: "notifications",
          element: <NotificationPage />,
        },
      ],
};

export default dashboarRoutes;
