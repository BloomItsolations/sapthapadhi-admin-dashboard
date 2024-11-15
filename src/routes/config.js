import { lazy } from "react";
// Pages import
import { CreatePackage } from "../pages/packages/CreatePackage";
import Inquary from "../pages/Inquary";
import CreateUserPage from "../pages/packages/CreateUserPage";
import BannerDisplay from "../pages/banner/BannerDisplay";
import GalleryManagement from "../pages/gallery/GalleryManagement";
import CreateCouple from "../pages/CreateCouple";
// Material UI Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupIcon from '@mui/icons-material/Group';
import ImageIcon from '@mui/icons-material/Image';
import BannerIcon from '@mui/icons-material/Bookmark';
import CoupleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';

const Dashboard = lazy(() => import("../pages/Dashboard"));

export const appRoutes = [
  {
    group: "Dashboard",
    title: "Dashboard",
    path: "/",
    element: <Dashboard />,
    icon: <DashboardIcon />, // Icon for Dashboard
  },
  {
    group: "Dashboard",
    title: "Plan Management",
    path: "/plan-management",
    element: <CreatePackage />,
    icon: <PaymentIcon />, // Icon for Plan Management
  },
  {
    group: "Dashboard",
    title: "User Management",
    path: "/user-management",
    element: <CreateUserPage />,
    icon: <GroupIcon />, // Icon for User Management
  },
  {
    group: "Dashboard",
    title: "Gallery Management",
    path: "/gallery-management",
    element: <GalleryManagement />,
    icon: <ImageIcon />, // Icon for Gallery Management
  },
  {
    group: "Dashboard",
    title: "Banner Management",
    path: "/banner-management",
    element: <BannerDisplay />,
    icon: <BannerIcon />, // Icon for Banner Management
  },
  {
    group: "Dashboard",
    title: "Couple Management",
    path: "/couple-management",
    element: <CreateCouple />,
    icon: <CoupleIcon />, // Icon for Couple Management
  },
  {
    group: "Dashboard",
    title: "Enquiry message",
    path: "/inquiry-message",
    element: <Inquary />,
    icon: <MessageIcon />, // Icon for Enquiry message
  },
];
