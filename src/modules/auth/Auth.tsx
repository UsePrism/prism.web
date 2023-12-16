import { Routes, Route, Navigate } from "react-router-dom";
import { getRoutes } from "core/helpers/getRoutes";
import routes from "./routes";
import NavbarPublic from "core/components/navbars/NavbarPublic";

export default function Auth() {
  return (
    <div className="relative">
      <NavbarPublic showLinks={false} />
      <div
        className="pt-[65px]"
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
