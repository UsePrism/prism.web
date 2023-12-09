import { getRoutes } from "core/helpers/getRoutes";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";

export default function Admin() {
  return (
    <div className="relative">
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </div>
  );
}
