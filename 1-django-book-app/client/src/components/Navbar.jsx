import React, { useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateToken } from "../app/features/auth-slice";

const Navbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin, isLoading, authTokens } = authState;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const fiveMins = 1000 * 60 * 5;
    let interval = setInterval(() => {
      if (authTokens) {
        dispatch(updateToken({ navigate, authTokens }));
      }
    }, fiveMins);
    return () => clearInterval(interval);
  }, [authTokens, isLoading]);

  return (
    <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Book Django
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#fff",
                        fontSize: 20,
                      }
                    : { color: "#ffffff8c", fontSize: 20 }
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/book-list"
                className="nav-link"
                style={{ fontSize: 20 }}
              >
                Book List
              </NavLink>
            </li>
            <li className="nav-item">
              {!isLogin ? (
                <NavLink
                  to="/login"
                  className="nav-link active"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                          fontSize: 20,
                        }
                      : { color: "#ffffff8c", fontSize: 20 }
                  }
                >
                  Login
                </NavLink>
              ) : (
                <a
                  className="nav-link text-danger"
                  style={{ cursor: "pointer", fontSize: 20 }}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
