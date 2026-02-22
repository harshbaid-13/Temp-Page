import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { RaiseRequest } from "./pages/RaiseRequest";
import { TrackRequests } from "./pages/TrackRequests";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Splash } from "./pages/Splash";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "request", Component: RaiseRequest },
      { path: "track", Component: TrackRequests },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);
