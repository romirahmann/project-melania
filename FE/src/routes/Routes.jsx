/* eslint-disable no-unused-vars */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ProtectedRoute } from "../components/auth/ProtectedRoutes";
import { MainLayout } from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import { Dashboard } from "../pages/main/Dashboard";
import { LoginPage } from "../pages/auth/LoginPage";
import { Userpage } from "../pages/main/Userpage";
import { Targetpage } from "../pages/main/Targetpage";

const rootRoute = createRootRoute({
  notFoundComponent: NotFound,
});

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: ProtectedRoute,
});

const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const mainLayout = createRoute({
  getParentRoute: () => protectedLayout,
  id: "main-layout",
  component: MainLayout,
});

const dashboardpage = createRoute({
  getParentRoute: () => mainLayout,
  path: "/",
  component: Dashboard,
});

const userpage = createRoute({
  getParentRoute: () => mainLayout,
  path: "/data-users",
  component: Userpage,
});
const targetpage = createRoute({
  getParentRoute: () => mainLayout,
  path: "/targets",
  component: Targetpage,
});

const routeTree = rootRoute.addChildren([
  protectedLayout,
  mainLayout.addChildren([dashboardpage, userpage, targetpage]),
  authLayout,
]);

export const router = createRouter({
  routeTree,
  basepath: "/RS-MELANIA",
});
