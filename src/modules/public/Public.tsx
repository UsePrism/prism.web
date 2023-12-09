import { Routes, Route, Navigate } from "react-router-dom";
import NavbarPublic from "core/components/navbars/NavbarPublic";
import Footer from "core/components/Footer";
import { getRoutes } from "core/helpers/getRoutes";
import routes from "./routes";

export default function Public() {
  return (
    <div className="relative bg-black">
      <NavbarPublic />
      <div
        className="pt-[80px]"
        style={{
          zIndex: 50,
          minHeight: "80vh",
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
