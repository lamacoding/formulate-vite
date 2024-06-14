import React from "react";
import logo from "../../assets/logo.svg";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverUri } from "../../backendServerConfig";

function Register() {
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if(formData.password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    console.log("Register");
    const response = await fetch(`${serverUri}/api/user/register`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleChange = (event, changeItem) => {
    setFormData({...formData, [changeItem]: event.target.value});
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1021%26quot%3b)' fill='none'%3e%3cpath d='M13.31 836.12 a23.57 23.57 0 1 0 47.14 0 a23.57 23.57 0 1 0 -47.14 0z' fill='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M404.44 683.08L468.09 683.08L468.09 786.41L404.44 786.41z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M999.18 9.55a66.14 66.14 0 1 0 50.2 122.38z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1513.57 62.72a51.59 51.59 0 1 0 44.87-92.92z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1344.36 449.37a34.75 34.75 0 1 0 2.64-69.45z' fill='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M807.07 998.19L870.72 998.19L870.72 1020.57L807.07 1020.57z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M8.32 869.59L32.71 869.59L32.71 930.55L8.32 930.55z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M189.73 40.74L224.57 40.74L224.57 75.58L189.73 75.58z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M1090.09 823.85a84.77 84.77 0 1 0-115.28-124.32z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1175.23 772.79L1234.42 772.79L1234.42 831.98L1175.23 831.98z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M68.38 399.12 a17.33 17.33 0 1 0 34.66 0 a17.33 17.33 0 1 0 -34.66 0z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M992.65 1028.37L1025.94 1028.37L1025.94 1061.66L992.65 1061.66z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M1278.57 205.02L1383.54 205.02L1383.54 309.99L1278.57 309.99z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M283.88 684.35a36.5 36.5 0 1 0 38.65-61.93z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1262.58 175.11 a48.32 48.32 0 1 0 96.64 0 a48.32 48.32 0 1 0 -96.64 0z' stroke='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M55.34 448.9L160.58 448.9L160.58 527.29L55.34 527.29z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M697.31 722.62a84.44 84.44 0 1 0-1.11-168.88z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M529.33 688.39 a37.44 37.44 0 1 0 74.88 0 a37.44 37.44 0 1 0 -74.88 0z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M874.21 610.53L953.76 610.53L953.76 682.06L874.21 682.06z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M432.09 680.43L487.81 680.43L487.81 736.15L432.09 736.15z' stroke='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3cpath d='M1145.56 338.67a87.92 87.92 0 1 0-152.93 86.78z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1860.46 144.62L1948.02 144.62L1948.02 251.77L1860.46 251.77z' fill='rgba(15%2c 233%2c 135%2c 1)'%3e%3c/path%3e%3cpath d='M1473.41 77.89L1473.74 77.89L1473.74 96.77L1473.41 96.77z' fill='rgba(135%2c 15%2c 233%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1021'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e\")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            padding: "30px 50px 80px 50px",
            backgroundColor: "background.paper",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            width: "450px",
            marginX: "20px",
          }}
        >
          <form onSubmit={handleRegister} autoComplete="off">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <img
                  src={logo}
                  width="30px"
                  style={{ marginRight: "10px" }}
                  alt="Formulate logo"
                />
                <h2 style={{ textAlign: "center" }}>Register</h2>
              </div>

              <TextField
                id="firstname"
                label="First name"
                variant="outlined"
                type="text"
                onChange={(e) => handleChange(e, "firstname")}
                required
              />
              <TextField
                id="lastname"
                label="Last name"
                variant="outlined"
                type="text"
                onChange={(e) => handleChange(e, "lastname")}
                required
              />
              <TextField
                id="username"
                label="E-Mail"
                variant="outlined"
                type="email"
                onChange={(e) => handleChange(e, "email")}
                required
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => handleChange(e, "password")}
                required
              />
              <TextField
                id="confirmpassword"
                label="Confirm password"
                variant="outlined"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <LoadingButton
                loading={false}
                variant="contained"
                type="submit"
                sx={{ marginTop: "24px" }}
              >
                Register
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
