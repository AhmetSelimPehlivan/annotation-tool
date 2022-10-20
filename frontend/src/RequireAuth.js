
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../src/Hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const auth_info = useAuth()
    if(auth_info.roles.some((role) => allowedRoles.includes(role)))
        return <Outlet />
    else
        return <Navigate to="/" state={{ from: location }} replace />
}
export default RequireAuth