import { lazy } from "react";
import { CreatePackage } from "../pages/packages/CreatePackage";
import Inquary from "../pages/Inquary";
import CreateUserPage from "../pages/packages/CreateUserPage";
import BannerDisplay from "../pages/banner/BannerDisplay";
import GalleryManagement from "../pages/gallery/GalleryManagement";
import CreateCouple from "../pages/CreateCouple";
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const appRoutes = [
  { group: "Dashboard", title: "Dashboard", path: "/", element: <Dashboard /> },
  {
    group: "Dashboard",
    title: "Plan Management",
    path: "/plan-management",
    element: <CreatePackage />,
  },
  {
    group: "Dashboard",
    title: "User Managment",
    path: "/user-management",
    element: <CreateUserPage />,
  },
  {
    group: "Dashboard",
    title: "Gallery Management",
    path: "/gallery-management",
    element: <GalleryManagement />,
  },
  {
    group: "Dashboard",
    title: "Banner Management",
    path: "/banner-management",
    element: <BannerDisplay />,
  },
  {
    group: "Dashboard",
    title: "Couple Management",
    path: "/couple-management",
    element: <CreateCouple />,
  },
  {
    group: "Dashboard",
    title: "Enquiry message",
    path: "/inquiry-message",
    element: <Inquary />,
  },
];
