const useAuth = () => {
    let user_name = sessionStorage.getItem("user_name")
    let user_role = sessionStorage.getItem("role")
    
    if (user_name && user_role) {
        const roles = [ user_role ]
        return {user_name, roles}
    }
    else
        return { username: '', roles: []}
}
export default useAuth