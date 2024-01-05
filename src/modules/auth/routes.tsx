import ForgotPassword from "./views/ForgotPassword";
import Login from "./views/Login";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import VerifyAccount from "./views/VerifyAccount";

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
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    icon: "",
    component: <ForgotPassword />,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password",
    icon: "",
    component: <ResetPassword />,
  },
];
export default routes;
