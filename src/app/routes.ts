import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { RaiseRequest } from "./pages/RaiseRequest";
import { TrackRequests } from "./pages/TrackRequests";
import { Contact } from "./pages/Contact";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Splash } from "./pages/Splash";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "request", Component: RaiseRequest },
      { path: "track", Component: TrackRequests },
      { path: "contact", Component: Contact },
      { path: "profile", Component: Profile },
    ],
  },
]);
