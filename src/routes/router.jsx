import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import GuestsManagementLayout from "../layouts/GuestsManagementLayout";
import HotalManagementLayout from "../layouts/HotalManagementLayout";
import VerificationLayout from "../layouts/VerificationLayout";
import BookingManagementLayout from "../layouts/BookingManagementLayout";
import ContentManagementLayout from "../layouts/ContentManagementLayout";
import FinacialLayout from "../layouts/FinacialLayout";
import AnalyticsLayout from "../layouts/AnalyticsLayout";
import SystemConfigLayout from "../layouts/SystemConfigLayout";
import CustomerSupportLayout from "../layouts/CustomerSupportLayout";
import StaffManagementLayout from "../layouts/StaffManagementLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // default route for "/"
        element: <DashboardLayout />,
      },
      {
        path: "/guests-management",
        element: <GuestsManagementLayout />
      },
      {
        path: "/hotel-management",
        element: <HotalManagementLayout />
      },
      {
        path: "/verification",
        element: <VerificationLayout />
      },
      {
        path: "/booking-management",
        element: <BookingManagementLayout />
      },
      {
        path: "/content-management",
        element: <ContentManagementLayout />
      },
      {
        path: "/finacial-management",
        element: <FinacialLayout />
      },
      {
        path: "/analytics-report",
        element: <AnalyticsLayout />
      },
      {
        path: "/system-configuration",
        element: <SystemConfigLayout />
      },
      {
        path: "/customer-support",
        element: <CustomerSupportLayout />
      },
      {
        path: "/staff-management",
        element: <StaffManagementLayout />
      }
    ],
  },
]);

export default router;
