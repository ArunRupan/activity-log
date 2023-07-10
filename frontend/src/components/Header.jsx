import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useState } from "react";

// dropdown, badge

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApi] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(clearCredentials());
      setMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-blue-900 fixed w-screen z-10">
      <nav className="w-full">
        <div className="px-8 mx-auto">
          <div className=" flex items-center justify-between  h-16">
            {userInfo ? (
              <>
                <Link to={"/home"}>Home</Link>
                <span className="hidden md:block">
                  {userInfo.name}
                  <Link className="mx-4" to={"/profile"}>
                    Profile
                  </Link>
                  <button onClick={logoutUser}>Logout</button>
                </span>
              </>
            ) : (
              <>
                <Link to={"/"} className="text-white">
                  Home
                </Link>
                <span className="hidden md:block ">
                  <Link to={"/login"} className="text-white ">
                    Log in
                  </Link>
                  <Link className="ms-4 text-white" to={"/register"}>
                    Resigter
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>
      </nav>

      {/*================= Mobile nav ===================*/}

      <div className="absolute md:hidden block top-6 right-3">
        {!menuOpen ? (
          <div
            onClick={() => setMenuOpen(true)}
            className="w-6 h-6 mr-2 text-white"
          >
            =
          </div>
        ) : (
          <div
            onClick={() => setMenuOpen(false)}
            className="w-6 h-6 mr-2 text-white"
          >
            X
          </div>
        )}
      </div>

      <div
        className={`absolute top-16 h-max w-2/5 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          menuOpen ? "right-0" : "right-full"
        }`}
      >
        {userInfo ? (
          <span className="flex flex-col items-center ">
            {/* {userInfo.name} */}
            <Link to={"/profile"} onClick={() => setMenuOpen(false)}>
              Edit Profile
            </Link>
            <button onClick={logoutUser}>Logout</button>
          </span>
        ) : (
          <span className="flex flex-col items-center">
            <Link to={"/login"} className="text-white">
              Log in
            </Link>{" "}
            <br />
            <Link to={"/register"} className="text-white">
              Resigter
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
