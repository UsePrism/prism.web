import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../routes";
import NavbarAuth from "core/components/navbars/NavbarAuth";

export default function AuthLayout() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
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
      <NavbarAuth />
      <div
        className="pt-[60px]"
        style={{
          zIndex: 50,
          minHeight: "90vh",
        }}
      >
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}
