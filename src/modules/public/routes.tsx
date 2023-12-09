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
];
export default routes;
