import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import { Home, BookList, BookDetail, LoginPage, AuthorDetail } from "./pages";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-list/" element={<BookList />} />
        <Route path="/book-detail/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/author/:id" element={<AuthorDetail />} />
      </Routes>
    </>
  );
};

export default App;
