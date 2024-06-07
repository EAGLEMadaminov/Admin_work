import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {
  AgencyListPage,
  AddPostPage,
  ViewPostPage,
  UpdatePostPage,
  AgencyInfoPage,
  NotificationPage,
  EditInfoPage,
  MainPage,
  StatistcsPage,
  HelpPage,
} from '../../pages/dashboard/index.js';
import DashboardLayout from '../../layouts/dashboard/DashboardLayout';

const dashboarRoutes = {
  path: '',
  element: (
    <DashboardLayout>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ),

  children: [
    {
      path: 'dashboard',
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: 'agency',
          children: [
            {
              index: true,
              element: <AgencyInfoPage />,
            },
            {
              path: 'help',
              element: <HelpPage />,
            },
            {
              path: 'posts',
              children: [
                {
                  index: true,
                  element: <AgencyListPage />,
                },
                {
                  path: 'add',
                  element: <AddPostPage />,
                },
                {
                  path: 'view/:id',
                  element: <ViewPostPage />,
                },
                {
                  path: 'edit/:id',
                  element: <UpdatePostPage />,
                },
              ],
            },
            {
              path: 'info',
              children: [
                {
                  index: true,
                  element: <AgencyInfoPage />,
                },
                {
                  path: 'edit',
                  element: <EditInfoPage />,
                },
              ],
            },
            {
              path: 'notifications',
              element: <NotificationPage />,
            },
            {
              path: 'statistics',
              element: <StatistcsPage />,
            },
          ],
        },
      ],
    },
  ],
};

export default dashboarRoutes;
