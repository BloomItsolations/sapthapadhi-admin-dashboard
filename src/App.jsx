import React, { useEffect, lazy } from "react";
import { v4 as uuidv } from "uuid";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// routes
import ProtectedRoute from "./routes/ProtectedRoute";
import { appRoutes } from "./routes/config";
// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/RegisterPage";
// layouts
const DashboardLayout = lazy(() =>
  import("./layouts/dashboard/DashboardLayout")
);
// pages
const Login = lazy(() => import("./pages/Login"));
const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const { userInfo } = useSelector((state) => state.user);

  return (
    <React.StrictMode>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-verifications/:phone" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {userInfo !== null
            ? appRoutes?.map((route) => (
                <Route
                  key={uuidv()}
                  path={route.path}
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                />
              ))
            : null}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </React.StrictMode>
  );
};

export default React.memo(App);