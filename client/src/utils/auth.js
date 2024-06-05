// src/utils/auth.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import { AuthContext } from "../context/AuthContext";

export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch (e) {
    return false;
  }
};

export const refreshAccessToken = async () => {
  let refreshToken = getRefreshToken(); // const can't reasigned so use let
  console.log(" in refreshtoken function: refresh: ", refreshToken);
  if (!refreshToken) {
    console.log("Refresh token not found or invalid, try re-login.");
    return null;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
      {refreshToken }
    );
    const newAccessToken = response.data.access;
    console.log("in response", response.data);
    console.log("New access token:", newAccessToken);
    setAccessToken(newAccessToken);
    setRefreshToken(response.data.refresh)
    return newAccessToken;
  } catch (e) {
    console.log("error in refresh token", e);
    return null;
  }
};
