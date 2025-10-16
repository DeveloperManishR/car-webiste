import { Navigate } from "react-router-dom";
import PrivateLayout from "../layout/PrivateLayout";

export default function PrivateRoute({ children }) {
    // const accessToken = useSelector((state) => state.auth.accessToken);
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <PrivateLayout>{children}</PrivateLayout>;
}
