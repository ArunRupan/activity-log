import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import Loader from "../Loader";
import FormContainer from "../FormContainer";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";

const Profile = () => {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  // useEffect(() => {
  //   const { name, value } = userInfo;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // }, [formData]);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs and submit form data
    // if (formData.password !== formData.confirmPassword) {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,

          //unwrap this to key value
          // ...formData,

          name,
          email,
          password,
        }).unwrap();
        // const res = await register({name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        alert("Profile Updated");
      } catch (err) {
        // Style this to show error on screen
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            // value={formData.username}
            // onChange={handleChange}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            // value={formData.password}
            // onChange={handleChange}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            // value={formData.confirmPassword}
            // onChange={handleChange}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        {isLoading && <Loader />}
        <button type="submit">Update</button>
      </form>
    </FormContainer>
  );
};

export default Profile;
