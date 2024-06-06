import { lazy } from 'react';

export const AgencyListPage = lazy(
  () => import('./agency/AgencyPostListPage.jsx')
);
export const AddPostPage = lazy(() => import('./post/AddPost.jsx'));
export const ViewPostPage = lazy(() => import('./post/ViewPost.jsx'));
export const UpdatePostPage = lazy(() => import('./post/UpdatePost.jsx'));
export const AgencyInfoPage = lazy(() => import('./agency/AgencyInfo.jsx'));
export const EditInfoPage = lazy(() => import('./agency/EditInfo.jsx'));
export const NotificationPage = lazy(() => import('./agency/Notification.jsx'));
export const MainPage = lazy(() => import('./MainPage.jsx'));
export const StatistcsPage = lazy(() => import('./agency/Statistcs.jsx'));
export const HelpPage = lazy(() => import('./agency/Help.jsx'));
