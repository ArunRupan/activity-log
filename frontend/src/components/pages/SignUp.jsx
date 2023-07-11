import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import Loader from "../Loader";
import FormContainer from "../FormContainer";

import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => setShowPassword((prev) => !prev);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs and submit form data
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/home");
      } catch (err) {
        // Style this to show error on screen
        console.log(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <form
        // action="/"
        // method="post"
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full px-10 "
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />

        <TextField
          margin="dense"
          fullWidth
          type="email"
          label="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* <TextField
          fullWidth
          type="password"
          label="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField> */}

        <FormControl variant="outlined" required fullWidth margin="dense">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField
          margin="dense"
          fullWidth
          type="password"
          label="Confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <FormControl variant="outlined" required fullWidth margin="dense">
          <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            label="Confirm password"
            name="confirm-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl> */}

        <div className="relative my-3 w-full">
          {isLoading && <Loader />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            Register
          </Button>
        </div>
      </form>
      <div className="text-center">
        Already have an account ? <Link to={"/login"}>Log in</Link>
      </div>
    </FormContainer>
  );
};

export default SignUp;
