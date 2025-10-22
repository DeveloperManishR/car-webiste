import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import PageNotFound from "../pages/PageNotFound";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import { Home } from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import ConfirmEmail from "../pages/auth/ConfirmEmail";
import Consultation from "../pages/Consultation";
import Recommend from "../pages/Recommend";
import Profile from "../pages/Profile";
import Connected from "../pages/Connected";
import DeleteAccount from "../pages/DeleteAccount";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import QueryHistoryPage from "../pages/QueryHistory";
import PurchaseHistoryPage from "../pages/PurchaseHistory";

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-consultation"
        element={
          <PrivateRoute>
            <Consultation />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <QueryHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-recommendations"
        element={
          <PrivateRoute>
            <Recommend />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/purchases"
        element={
          <PrivateRoute>
            <PurchaseHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/always-connected"
        element={
          <PrivateRoute>
            <Connected />
          </PrivateRoute>
        }
      />
      <Route
        path="/delete-account"
        element={
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
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
  );
}
