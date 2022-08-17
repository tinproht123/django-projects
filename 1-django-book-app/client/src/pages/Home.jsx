import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="animate__animated animate__fadeInUp ms-5"
      style={{ marginTop: 100 }}
    >
      <h1
        className="my-5"
        style={{ fontSize: 60, letterSpacing: 4, fontFamily: "Merri Weather" }}
      >
        <span className="text-success">Django</span> Book App
      </h1>
      <button
        className="btn btn-success px-4 py-2 shadow me-5"
        style={{ fontSize: 20, letterSpacing: 4 }}
      >
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Login
        </Link>
      </button>
      <button
        className="btn btn-outline-success px-4 py-2 shadow"
        style={{ fontSize: 20, letterSpacing: 4 }}
      >
        <Link
          to="/book-list"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Book List
        </Link>
      </button>
    </div>
  );
};

export default Home;
