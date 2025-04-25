import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/api";
import Cookies from "js-cookie";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.delete("/logout");
      console.log(response);

      if (response.data.type === "success") {
        Cookies.remove("token");
        Cookies.remove("user");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
