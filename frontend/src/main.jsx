import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

import WelcomePage from "./components/pages/WelcomePage";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Dairy from "./components/pages/Dairy";
// import ResetPage from "./components/pages/ResetPage";

const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Profile = lazy(() => import("./components/pages/Profile"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<WelcomePage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/guest" id="guest" element={<Dairy />} />
      {/* <Route path="/password-reset" element={<ResetPage />} /> */}

      {/* ===== Private Route ========================== */}

      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" id="user" element={<Dairy />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ============================================== */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
