import axiosInstance from "./axiosInstance";

// User Signup
export const signup = async (userData) => {
  return axiosInstance.post("/auth/signup", userData);
};

// User Login
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/authenticate", credentials);
  const {token} = response.data;

  // Save token in local storage
  localStorage.setItem("token", token);
  return response.data;
};

// Logout (Remove token)
export const logout = () => {
  localStorage.removeItem("token");
};
