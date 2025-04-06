import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import SignInPage from "./auth/sign-in";
import App from "./App.jsx";
import Home from "./Home/index.jsx";
import Dashboard from "./dashboard/index";
import EditResume from "./dashboard/resume/[resumeId]/edit/index";
import { ClerkProvider } from "@clerk/clerk-react";
import ViewResume from "./my-resume/[resumeId]/view";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/my-resume/:resumeId/view",
    element: <ViewResume />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="light"
      hideProgressBar
      transition={Bounce}
      closeOnClick
    />
  </ClerkProvider>
);
