import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="h-screen border grid place-items-center">
      <div className="w-1/2 md:w-1/4 text-center">
        <h1 className="text-4xl">Welcome Page</h1>

        <div className="flex gap-3 mt-10 justify-center">
          <Link to={"/login"} className="w-1/3">
            <Button variant="contained" className="w-full">
              Log in
            </Button>
          </Link>
          <Link to={"/register"} className="w-1/3">
            <Button variant="contained" className="w-full">
              Register
            </Button>
          </Link>
        </div>
        <p className="my-3">or</p>
        <div>
          Sign in as{" "}
          <Link
            to={"/guest"}
            // className="text-[blue] font-medium"
          >
            Guest
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
