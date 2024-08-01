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
    group: "plan",
    title: "Plan Management",
    path: "/plan-management",
    element: <CreatePackage />,
  },
  {
    group: "user",
    title: "User Managment",
    path: "/user-management",
    element: <CreateUserPage />,
  },
  {
    group: "Images",
    title: "Gallery Management",
    path: "/gallery-management",
    element: <GalleryManagement />,
  },
  {
    group: "Images",
    title: "Banner Management",
    path: "/banner-management",
    element: <BannerDisplay />,
  },
  {
    group: "Iouple",
    title: "Couple Management",
    path: "/couple-management",
    element: <CreateCouple />,
  },
  {
    group: "Enquiry",
    title: "Enquiry message",
    path: "/inquiry-message",
    element: <Inquary />,
  },
];
