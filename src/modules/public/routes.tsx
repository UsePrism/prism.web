import Businesses from "./views/Businesses";
import Categories from "./views/Categories";
import Home from "./views/Home";

const routes = [
  {
    name: "Home",
    layout: "/",
    path: "home",
    icon: "",
    component: <Home />,
  },
  {
    name: "Home",
    layout: "/",
    path: "categories",
    icon: "",
    component: <Categories />,
  },
  {
    name: "Home",
    layout: "/",
    path: "businesses/:businessId",
    icon: "",
    component: <Businesses />,
  },
];
export default routes;
