import React, { useEffect, memo } from "react";
import { getAllBooks, setQ } from "../app/features/book-slice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import Book from "../components/Book";

const BookList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const q = useSelector((state) => state.book.q);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const authTokens = useSelector((state) => state.auth.authTokens);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setQ({ q: searchParams.get("q") || "" }));
  }, [searchParams]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    dispatch(getAllBooks({ q, authTokens }));
  }, [dispatch, q]);

  return (
    <div className="container my-5">
      <h1
        className="text-center mb-5"
        style={{ fontFamily: "Open Sans", letterSpacing: 5 }}
      >
        Book List
      </h1>
      <div className="row g-3" style={{ gridAutoRows: "1fr" }}>
        {books.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default memo(BookList);
