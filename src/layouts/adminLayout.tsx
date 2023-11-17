import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../routes";

export default function AdminLayout() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </div>
  );
}
