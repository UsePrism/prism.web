import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../routes";
import NavbarPublic from "core/components/navbars/NavbarPublic";
import Footer from "core/components/Footer";

export default function PublicLayout() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="relative">
      <NavbarPublic />
      <div
        className="pt-[80px]"
        style={{
          zIndex: 50,
          minHeight: "90vh",
        }}
      >
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
