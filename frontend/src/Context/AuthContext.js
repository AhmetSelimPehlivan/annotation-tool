import { useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import Axios from "../Api/axios"
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const axiosJWT = Axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    console.log(config)
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime())
          getCurrentUser();
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

  useEffect(() => {
    getCurrentUser();
  },[]);

  const getCurrentUser = async () => {
    try {
      await Axios.get('/getisAuth',{withCredentials: true}).then((response) =>{
        if (response.data.accessToken === undefined){
          setIsAuthenticated(false)
          navigate("/", { replace: true });
        }
        const decoded = jwt_decode(response.data.accessToken);
        setToken(response.data.accessToken);
        setExpire(decoded.exp);
        setIsAuthenticated(true)
        localStorage.setItem("user_name",decoded.user_name)
        });
    } catch (error) {
      setIsAuthenticated(false)
      navigate("/", { replace: true });
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
