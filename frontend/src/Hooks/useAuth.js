import { selectCurrentToken } from "../Api/Redux/authReducer";
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isUser = false
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        let roles = [decoded.role]
        let user_name = decoded.name
        
        isUser = roles.includes('User')
        isAdmin = roles.includes('Admin')

        if (isUser) status = "User"
        if (isAdmin) status = "Admin"

        return { user_name, roles, status, isUser, isAdmin }
    }

    return { username: '', roles: [], isUser, isAdmin, status }
}
export default useAuth