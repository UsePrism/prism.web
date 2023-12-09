import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAuth from "core/components/navbars/NavbarAuth";
import { getRoutes } from "core/helpers/getRoutes";
import routes from "./routes";

export default function Auth() {
  return (
    <div className="relative">
      <NavbarAuth />
      <div
        className="pt-[60px]"
        style={{
          zIndex: 50,
          minHeight: "80vh",
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
