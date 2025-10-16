import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import PageNotFound from "../common/PageNotFound";
import ForgotPassword from "../screens/auth/ForgotPassword";
import { Home } from "../screens/home/Home";
import PrivateRoute from "../routing/PrivateRoute"


export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PrivateRoute>  <Home /> </PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
