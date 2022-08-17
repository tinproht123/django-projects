import React, { useState } from "react";
import { login } from "../app/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ loginData, navigate }));
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div
          className="my-5 p-4 shadow rounded-3 mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <h4 className="text-center" style={{ letterSpacing: 4 }}>
            Login to <span className="text-success">Django</span> Book
          </h4>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary w-100"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
