import React, { createContext, useState, useEffect } from "react";
import {
  isTokenValid,
  getAccessToken,
  removeTokens,
  setAccessToken,
  setRefreshToken,
  refreshAccessToken,
  getRefreshToken
} from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { Navigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated,] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getAccessToken();
      if (accessToken && !isTokenValid(accessToken)) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken!=null) {
          fetchUserDetails(jwtDecode(accessToken).user_id);
          setIsAuthenticated(true);
        } 
      } else if (accessToken) {
        setIsAuthenticated(true);
        fetchUserDetails(jwtDecode(accessToken).user_id);
      }
      setIsAuthChecked(true); // Authentication check is done
    };
    initAuth();
  }, []);

  const fetchUserDetails = async (
    userId = jwtDecode(getAccessToken()).user_id
  ) => {
    try {
      const response = await api.get(`/api/auth/user/${userId}/`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  const login = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    fetchUserDetails();
  };

  const logout = async () => {
    const refreshToken = getRefreshToken();
    try {
      const res=await api.post("/api/auth/logout/", { refresh: refreshToken });
      if(res.status==205){
      removeTokens();
      setIsAuthenticated(false);
      setUser(null);
      <Navigate to= "/login"/>
    }
    } catch (error) {
      console.error(
        "Failed to logout:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isAuthChecked,
        setUser,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
