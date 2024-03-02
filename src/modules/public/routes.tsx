import AddReview from "./views/AddReview";
import Business from "./views/Business";
import BusinessReview from "./views/BusinessReview";
import Businesses from "./views/Businesses";
import CookiePolicy from "./views/CookiePolicy";
import Home from "./views/Home";
import PrivacyPolicy from "./views/PrivacyPolicy";
import Search from "./views/Search";
import TermsCondition from "./views/TermsCondition";

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
    name: "Search",
    layout: "/",
    path: "search",
    icon: "",
    component: <Search />,
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
  {
    name: "Privacy Policy",
    layout: "/",
    path: "/privacy",
    icon: "",
    component: <PrivacyPolicy />,
  },
  {
    name: "Cookie Policy",
    layout: "/",
    path: "/cookies",
    icon: "",
    component: <CookiePolicy />,
  },
  {
    name: "Terms & Conditions",
    layout: "/",
    path: "/terms",
    icon: "",
    component: <TermsCondition />,
  },
];
export default routes;
