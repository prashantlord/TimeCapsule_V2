import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./pages/loginPage/Login.jsx";
import Register from "./pages/loginPage/Register.jsx";
import Home from "./pages/homePage/Home";
import Dashboard from "./pages/dashboardPage/Dashboard.jsx";
import Create from "./pages/dashboardPage/Create.jsx";
import MyCapsules from "./pages/dashboardPage/MyCapsules.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/create",
    element: <Create />,
  },
  {
    path: "/dashboard/my",
    element: <MyCapsules />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
