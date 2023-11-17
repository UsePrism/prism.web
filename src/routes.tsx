import Dashboard from "views/admin/Dashboard";
import Login from "views/auth/Login";
import Signup from "views/auth/Signup";
import VerifyAccount from "views/auth/VerifyAccount";
import Home from "views/public/Home";

const routes = [
  {
    name: "Sign Up",
    layout: "/auth",
    path: "signup",
    icon: "",
    component: <Signup />,
  },
  {
    name: "Verify Account",
    layout: "/auth",
    path: "verify-account",
    icon: "",
    component: <VerifyAccount />,
  },
  {
    name: "Login",
    layout: "/auth",
    path: "login",
    icon: "",
    component: <Login />,
  },
  {
    name: "Home",
    layout: "/",
    path: "home",
    icon: "",
    component: <Home />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: "",
    component: <Dashboard />,
  },
];
export default routes;
