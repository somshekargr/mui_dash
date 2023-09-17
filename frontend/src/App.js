import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import VideoSearch from "./pages/VideoSearch";
import AboutUs from "./pages/AboutUs";
import AppSettings from "./pages/AppSettings";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import ErrorPage from "./pages/ErrorPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as loginAction } from "./actions/login-action";
import { action as logoutAction } from "./actions/logout-action";
import { action as signupAction } from "./actions/signup-action";
import { loader as profileLoader } from "./pages/Profile";
import { loader as usersLoader } from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "video-search", element: <VideoSearch /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "settings", element: <AppSettings /> },
      { path: "users", element: <Users />, loader: usersLoader },
      {
        path: ":profileId",
        id: "profileId",
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
  { path: "/login", element: <SignIn />, action: loginAction },
  { path: "/signup", element: <SignUp />, action: signupAction },
  { path: "/logout", action: logoutAction },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
