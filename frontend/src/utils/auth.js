import axios from "../services/api";
import { logout } from "../store/authSlice";



// Function to handle user logout
export const handleLogout = async (dispatch, navigate) => {
  // Clear token from axios headers
   const response = await axios.delete("/api/logout");
      console.log(response);

      if (response.data.type === "success") {
         delete axios.defaults.headers.common["Authorization"];

         // Dispatch logout action to clear Redux state
         dispatch(logout());

         // Redirect to login page
         if (navigate) {
           navigate("/login");
         }
      }
  
};

// Function to initialize auth state from localStorage
export const initializeAuth = (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    // Set axios default header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
