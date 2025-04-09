import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    return isAuthenticated() ? children : <Navigate to="/login" />;

    
}

export default ProtectedRoute;