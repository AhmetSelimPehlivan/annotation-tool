import { useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Axios from "../Api/axios"

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {
        await Axios.get('/getisAuth',{withCredentials: true}).then((response) =>{
            if(!response.data.isAuth)
              navigate("/", { replace: true });
            setIsAuthenticated(response.data.isAuth)
          });
      };
    getCurrentUser();
  },[]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
