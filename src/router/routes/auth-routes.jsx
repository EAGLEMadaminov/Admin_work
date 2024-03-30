import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPage, RegisterPage, ActivationPage } from "../../pages/auth";
import AuthLayout from "../../layouts/auth/AuthLayout";

const authRoutes = {
  path: "auth",
  element: (
    <AuthLayout>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/sign-in" />,
    },
    {
      path: "sign-in",
      element: <LoginPage />,
    },
    {
      path: "sign-up",
      element: <RegisterPage />,
    },
    {
      path: "activation",
      element: <ActivationPage />,
    },
  ],
};

export default authRoutes;
