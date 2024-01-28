import AddReview from "./views/AddReview";
import Business from "./views/Business";
import BusinessReview from "./views/BusinessReview";
import Businesses from "./views/Businesses";
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
    path: "businesses",
    icon: "",
    component: <Businesses />,
  },
  {
    name: "Home",
    layout: "/",
    path: "businesses/:businessId/:reviewId/comments",
    icon: "",
    component: <BusinessReview />,
  },
  {
    name: "Home",
    layout: "/",
    path: "businesses/:businessId",
    icon: "",
    component: <Business />,
  },
  {
    name: "Add Review",
    layout: "/",
    path: "/review",
    icon: "",
    component: <AddReview />,
  },
];
export default routes;
