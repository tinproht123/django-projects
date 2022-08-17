import React, { useState, useEffect } from "react";
import { getBook } from "../app/features/book-slice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/book-detail.css";

import Review from "../components/Review";

const BookDetail = () => {
  const [readmore, setReadmore] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector((state) => state.book.book);
  const isLoading = useSelector((state) => state.book.isLoading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook({ id }));
  }, []);

  const {
    title,
    author,
    author_id,
    genres,
    description,
    created,
    updated,
    image,
    reviews,
  } = book;

  if (!isLoading) {
    return (
      <div className="container my-5">
        <button
          className="btn text-primary mb-5"
          style={{ fontSize: 20 }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        {/* Book detail */}
        <div
          className="row mx-auto shadow py-5 px-3"
          style={{ maxWidth: 1100 }}
        >
          <div className="col-12 col-md-4">
            <img
              src={window.location.origin + `/utils/images/${image}`}
              className="card-img-top"
              style={{ maxHeight: 800, objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-8">
            <h2
              className="text-dark mt-4"
              style={{ fontFamily: "Merri Weather" }}
            >
              {title}
            </h2>
            <p className="fst-italic text-muted">
              -by <Link to={`/author/${author_id}`}>{author}</Link>-
            </p>
            <small>
              - created{" "}
              {created
                ? new Date(created).toISOString().split("T")[0]
                : created}
              -
            </small>
            <br />
            <small>
              - last updated at:{" "}
              {updated
                ? new Date(updated).toISOString().split("T")[0]
                : updated}
              -
            </small>
            <div className="d-block my-3">
              {genres?.map((genre, index) => (
                <div key={index} className="badge text-bg-dark me-2">
                  <Link
                    to={`/book-list/?q=${genre.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {genre}
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "Roboto Slab" }} className="my-3 d-inline">
              {readmore ? description : `${description?.substring(0, 800)}...`}
            </p>
            {description?.length > 800 && (
              <button
                className={`${readmore ? "btn-showless" : "btn-readmore"}`}
                onClick={() => setReadmore(!readmore)}
              >
                {readmore ? "show less" : "read more"}
              </button>
            )}
          </div>
        </div>
        {/* Book reviews */}
        <h4 className="mt-5 mb-3">Reviews:</h4>
        <hr />
        <div>
          {reviews?.length === 0 && (
            <p className="fs-itatlic" style={{ fontSize: 18 }}>
              This book has no reviews
            </p>
          )}
          {reviews?.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </div>
      </div>
    );
  }
};

export default BookDetail;
