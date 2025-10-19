import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import PageNotFound from "../components/common/PageNotFound";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import { Home } from "../pages/home/Home";
import PrivateRoute from "./PrivateRoute";
import ConfirmEmail from "../pages/auth/ConfirmEmail";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
