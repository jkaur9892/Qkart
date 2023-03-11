import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [formData, setformData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setformData((values) => ({ ...values, [name]: value }));
    console.log(formData);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  const register = async () => {

    if(! validateInput(formData)) {
      return;  //not valid
    }

    let requestdata={
      username:formData.username,
      password:formData.password
}

    try {
      const response = await axios.post(
        `${config.endpoint}/auth/register`,
        requestdata
      );
      console.log(response);
      if (response.data.success) {
        history.push("/login", { from: "Register" })
        enqueueSnackbar("Success", { variant: "success",autoHideDuration: 3000 });
      }
    } catch (err) {
      if (err.response === undefined) {
        enqueueSnackbar("Backend not started!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      } else if (err.response.data.success === false) {
        enqueueSnackbar("Username is already taken", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;
    if (username.length < 6) {
      enqueueSnackbar("Minimum 6 characters required in Username", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return false;
    } else if (password.length < 6) {
      enqueueSnackbar("Minimum 6 characters required in password", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return false;
    } else if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username || ""}
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password || ""}
            onChange={handleChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword || ""}
            onChange={handleChange}
          />
          <Button className="button" onClick={register} variant="contained">
            Register Now
          </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
